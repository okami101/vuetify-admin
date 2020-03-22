ARG PHP_VERSION=7.4
FROM php:${PHP_VERSION}-fpm-alpine

# persistent / runtime deps
RUN apk add --no-cache \
		acl \
		file \
		gettext \
		git \
		openssl \
	;

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY php${PHP_VERSION}.ini /usr/local/etc/php/php.ini

# https://getcomposer.org/doc/03-cli.md#composer-allow-superuser
ENV COMPOSER_ALLOW_SUPERUSER=1

WORKDIR /usr/src/api

# build for production
ARG APP_ENV=production

# prevent the reinstallation of vendors at every changes in the source code
COPY composer.json composer.lock ./

RUN set -eux; \
	composer install --prefer-dist --no-dev --no-autoloader --no-scripts --no-progress --no-suggest; \
	composer clear-cache

# copy only specifically what we need
COPY bin bin/
COPY config config/
COPY public public/
COPY src src/
# only for demo
COPY fixtures fixtures/

VOLUME /srv/api/var

CMD ["php-fpm"]
