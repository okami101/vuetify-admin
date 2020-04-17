# Bookstore API Demo

This demo project is the API backend part of [this online demo](https://vtec-bookstore-demo.okami101.io).
It is intended for showcase of Vue CLI separated [bookstore admin demo](../demo) project.
This project is also a good platform for developing external [separate crud generator](https://github.com/okami101/vtec-laravel-crud) composer package.

## Note on crud package

The [vtec/laravel-crud](https://github.com/okami101/vtec-laravel-crud) composer package is directly symlinked to `vtec-laravel-crud` root git submodule folder of this repo.  
So direct live package development is fully working, even inside docker !

## Features

* Common API bookstore resources with :
  * Publishers
  * Authors
  * Books
  * Reviews
* All Vtec Crud features (account profile, sanctum auth, impersonation, docker files, etc.)

## How to run

### The coolest way via docker

First adapt last docker environment variables for your own available free host port inside .env file.  
By default, it runs at port 8000.

```bash
docker-compose up
# initialize laravel app and db schema
docker-compose exec laravel init
# for development purpose, initialize
docker-compose exec laravel seed
```

Laravel app should be loaded at default [http://localhost:8000](http://localhost:8000).  
You can access phpMyAdmin via default [http://localhost:9000](http://localhost:9000).

For artisan commands, just use `docker-compose exec laravel php artisan my:command`.  
So to access tinker : `docker-compose exec laravel php artisan tinker`  
For full DB reset + dummy data : `docker-compose exec laravel php artisan migrate:fresh --seed`

### The boring way

```bash
cp .env.example .env
# adapt environment variables to your local settings, check Laravel documentation
composer install
php artisan key:generate
php artisan storage:link
php artisan elfinder:publish
php artisan migrate:fresh --seed
```

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
