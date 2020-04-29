# Vtec Admin Tutorial

Tutorial project with both Laravel backend and admin Vue CLI. This should be the final state after following the [dedicated docs](https://vtec.okami101.io/tutorial).  
This is the perfect way to show the power of both backend and client generators. Ideal place for code generation testing by using [included YAML sample generator]("admin/generators/monsters.fr.yml").

## How to run

For backend :

```bash
cp .env.example .env
composer install
php artisan key:generate
php artisan storage:link
php artisan elfinder:publish
php artisan migrate:fresh --seed # configurate DB according to your local before inside .env
php artisan serve # Should run at localhost:8000 as default
```

For admin :

```bash
cd admin
yarn
yarn serve
```

> Then on localhost:8080, you should be able to login as admin@example.com / password

## Note on this tutorial

Almost all code of this project has been generated thanks to this file !

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
