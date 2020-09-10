# Bookstore API Demo

This demo project is the API backend used by separate Vue CLI [bookstore admin demo](../demo) project, and is a good showcase for backend-side development.
It's also a good platform for developing external [Laravel Admin](https://github.com/okami101/laravel-admin) composer package.

> [Access to online demo](https://va-demo.okami101.io)  
> The [okami101/laravel-admin](https://github.com/okami101/laravel-admin) composer package is directly symlinked to `packages/laravel` root git submodule folder of this repo.  
> So direct live package development is fully working, even inside docker !

## Features

* Common API bookstore resources with :
  * Publishers
  * Authors
  * Books
  * Reviews
* All [Laravel package features](https://github.com/okami101/laravel-admin#features) (account profile, sanctum auth, impersonation, docker files, etc.)

## How to run

### [The coolest way via docker](#docker)

```bash
cp .env.example .env
# adapt docker environment variables for your own available free host port  
docker-compose up
# initialize laravel app and db schema
docker-compose exec laravel init
# for development purpose, initialize
docker-compose exec laravel seed
```

Laravel app should be loaded at default [http://localhost:8000](http://localhost:8000).  
You can access phpMyAdmin via default [http://localhost:9000](http://localhost:9000).

For artisan commands, just use `docker-compose exec laravel php artisan my:command`.  
Access to tinker : `docker-compose exec laravel php artisan tinker`  
For full DB reset + dummy data : `docker-compose exec laravel php artisan migrate:fresh --seed`

### [The boring way](#classic)

```bash
cp .env.example .env
# remove DB_HOST,REDIS_HOST,CACHE_DRIVER,SESSION_DRIVER variables which ar default setted for docker
# adapt other environment variables to your local settings, check Laravel documentation
composer install
php artisan key:generate
php artisan storage:link
php artisan elfinder:publish
php artisan migrate:fresh --seed
```

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
