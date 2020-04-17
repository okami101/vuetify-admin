#!/bin/sh

cd /srv/api/laravel || exit

setfacl -R -m u:www-data:rwX -m u:"$(whoami)":rwX storage
setfacl -dR -m u:www-data:rwX -m u:"$(whoami)":rwX storage

composer install
cp .env.example .env
php artisan key:generate
php artisan storage:link
php artisan elfinder:publish
php artisan migrate
