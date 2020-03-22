FROM php:7.4-fpm-alpine

# persistent / runtime deps
RUN apk add --no-cache \
		acl \
		file \
		gettext \
		git \
		openssl \
		$PHPIZE_DEPS \
	;

RUN docker-php-ext-install exif && docker-php-ext-enable exif
RUN pecl install redis && docker-php-ext-enable redis

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY docker/php/php.ini /usr/local/etc/php/php.ini

# https://getcomposer.org/doc/03-cli.md#composer-allow-superuser
ENV COMPOSER_ALLOW_SUPERUSER=1

WORKDIR /srv/api

# prevent the reinstallation of vendors at every changes in the source code
COPY composer.json composer.lock ./

# copy only specifically what we need
COPY app app/
COPY bootstrap bootstrap/
COPY config config/
COPY database database/
COPY public public/
COPY resources resources/
COPY routes routes/
COPY artisan ./

ARG COMPOSER_HOME
COPY ${COMPOSER_HOME} $HOME/.composer

RUN composer install --no-dev
RUN php artisan key:generate
RUN php artisan storage:link
RUN php artisan migrate

VOLUME /srv/api/storage

CMD ["php-fpm"]
