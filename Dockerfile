FROM php:7.4-fpm-alpine

# persistent / runtime deps
RUN apk add --no-cache \
		acl \
		file \
		gettext \
		git \
		openssl \
	;

RUN docker-php-ext-install exif && docker-php-ext-enable exif

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY docker/php/php.ini /usr/local/etc/php/php.ini

# https://getcomposer.org/doc/03-cli.md#composer-allow-superuser
ENV COMPOSER_ALLOW_SUPERUSER=1

WORKDIR /usr/src/api

# prevent the reinstallation of vendors at every changes in the source code
COPY composer.json composer.lock ./

RUN set -eux; \
	composer install --prefer-dist --no-dev --no-autoloader --no-scripts --no-progress --no-suggest; \
	composer clear-cache

# copy only specifically what we need
COPY app app/
COPY bootstrap bootstrap/
COPY config config/
COPY database database/
COPY public public/
COPY resources resources/
COPY routes routes/

VOLUME /srv/api/storage

CMD ["php-fpm"]
