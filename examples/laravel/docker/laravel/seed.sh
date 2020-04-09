#!/bin/sh

cd /srv/api/laravel || exit

php artisan db:seed
