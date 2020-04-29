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

Almost all code of this project has been fully generated, mainly thanks to boilerplate initializers and use of [this YAML descriptor file]("admin/generators/monsters.fr.yml") which is used by generator commands. To summary, here are the main steps :

1. `laravel new tutorial && cd tutorial`, initial Laravel skeleton
2. `composer install vtec/crud-laravel`
3. `php artisan crud:install`, which prepare initial minimal boilerplate on your new fresh Laravel API project. Install all needed dependencies and base user controllers with impersonation and auth by [Laravel Sanctum](https://github.com/laravel/sanctum).
4. `php artisan crud:generate admin/generators/monsters.fr.yml -mfs`, which generate all API based backend files, notably :
   * Model (for eloquent relationship, you must add code by hand)
   * Controller with all crud operations (routes are also presaved inside `routes/api.php`)
   * Policy for authorization
   * Store and update requests for validation rules (empty by default, so don't forget to add your own rules)
   * Resource for API data transformer
   * Migration with all pre-generated fields (including foreigns !)
   * Factory and seeder (empty by default)

5. `vue create admin && cd admin` with Vuex and Vue Router installed
6. `vue add vuetify`
7. `vue add i18n`
8. `vue add vtec-admin`, this will install main Vtec Admin library, prepare admin plugin with auth and data providers, and generate minimal boilerplate code with already full functional basic admin panel (auth, sample dashboard, profile editor, users management and impersonation)
9. `yarn crud:generate --file .\generators\monsters.fr.yml --locale fr` (for french sample), generate all crud pages for each entity inside `src/resources` with full searchable datagrid list, show, create and edit forms. The used sample yaml generator include 2 entities, monsters (with many different types of fields) and child monsters for reource relationship purpose.

> In short, only factory, seed data, validation rules and model eloquent relation on server-side has been written by hand.

## YAML generator structure

In order to facilitates your YAML generator creation, A [JSON Schema](https://json-schema.org/) is available on [this URL](https://vtec.okami101.io/schemas/generator.json).  
Use this [VSCode extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) and set the previous URL on your workspace by link it in `yaml.schemas` settings (already done in this project if you open the workspace in the root of this repo). You know have autocompletion with full documention integrated !

It means that you can simply initiate structure of your new web site or new resource directly by writing it by YAML file !

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
