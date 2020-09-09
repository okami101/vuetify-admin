# Laravel Tutorial

Generators showcase project with both Laravel backend and admin Vue CLI. Most code of this project has been generated as shown in this [dedicated guide](https://www.okami101.io/vuetify-admin/guide/laravel.html).

This is the perfect way to show the power of both backend and client generators. Ideal place for code generation testing by using [included YAML sample generators](admin/generators).

## How to run

### Laravel

```bash
cp .env.example .env
composer install
php artisan key:generate
php artisan storage:link
php artisan elfinder:publish
php artisan migrate:fresh --seed # configure DB according to your local before inside .env
php artisan serve # Should run at localhost:8000 as default
```

### Admin UI

```bash
cd admin
yarn
yarn serve
```

Then on localhost:8080, you should be able to login as admin@example.com / password

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
