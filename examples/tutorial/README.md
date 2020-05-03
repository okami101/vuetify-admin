# Vtec Admin Tutorial

Tutorial project with both Laravel backend and admin Vue CLI. This should be the final state after following the [dedicated docs](https://vtec.okami101.io/tutorial).  
This is the perfect way to show the power of both backend and client generators. Ideal place for code generation testing by using [included YAML sample generators]("admin/generators").

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

Almost all code of this project has been fully generated, mainly thanks to installers and use of [this YAML descriptor files]("admin/generators") which is used by generator commands. To summary, here are the main steps :

1. `laravel new tutorial && cd tutorial`, initial Laravel skeleton
2. `composer install vtec/crud-laravel && php artisan admin:install`, see [this installation](https://github.com/okami101/vtec-laravel-crud#installation) for explanation.
3. Develop generators inside admin/generators directory (see [YAML section](#yaml))
4. `php artisan crud:yaml admin/generators/monsters.en.yml -mfs`, which generate all API based backend files (see [docs](https://github.com/okami101/vtec-laravel-crud#scaffolding) for all detail).
5. `cd admin && vue add vtec-admin`, see [Getting Started docs](https://vtec.okami101.io/getting-started#installation) for more detail of what this plugin do.
6. `yarn crud:yaml --file .\generators\monsters.en.yml --locale en` (for english sample), generate all crud pages for each entity inside `src/resources` with full searchable datagrid list, show, create and edit forms. The sample yaml generator includes 2 entities, monsters (with many different types of fields) and child monsters for resource relationship purpose.

> In short, only factory, seed data, validation rules and model eloquent relation on server-side has been written by hand.

## [YAML generator structure](#yaml)

In order to facilitates your YAML generator creation, a [JSON Schema](https://json-schema.org/) is available on [this URL](https://vtec.okami101.io/schemas/generator.json).  
Use this [VSCode extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) and set `https://vtec.okami101.io/schemas/generator.json` on your workspace by link it in `yaml.schemas` settings, which is already done in this project if you open the workspace in the root of this main repo. Now You have autocompletion with full documention !

It means that you can simply initiate structure of your new web site or new resource directly by create your YAML file instead of writing base boilerplate code by hand !

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
