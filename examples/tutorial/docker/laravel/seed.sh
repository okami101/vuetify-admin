#!/bin/sh

cd /srv/api || exit

php artisan db:seed
