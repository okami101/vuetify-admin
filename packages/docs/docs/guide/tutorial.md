# Tutorial

1. `laravel new tutorial && cd tutorial`, initial Laravel skeleton
2. `composer install vtec/crud-laravel && php artisan admin:install`, see [this installation](https://vtec.okami101.io/guide/laravel#installation) for explanation.
3. Develop generators inside admin/generators directory (see [YAML section](#yaml))
4. `php artisan crud:yaml admin/generators/monsters.en.yml -mfs`, which generate all API based backend files (see [docs](https://vtec.okami101.io/guide/generators#api) for all detail).
5. `cd admin && vue add vtec-admin`, see [Getting Started docs](https://vtec.okami101.io/guide/getting-started#installation) for more detail of what this plugin do.
6. `yarn crud:yaml --file .\generators\monsters.en.yml --locale en` (for english sample), generate all crud pages for each entity inside `src/resources` with full searchable datagrid list, show, create and edit forms. The sample yaml generator includes 2 entities, monsters (with many different types of fields) and child monsters for resource relationship purpose.

> In short, only factory, seed data, validation rules and model eloquent relation on server-side has been written by hand.

## [YAML generator structure](#yaml)

In order to facilitates your YAML generator creation, a [JSON Schema](https://json-schema.org/) is available on [this URL](https://vtec.okami101.io/schemas/generator.json).  
Use this [VSCode extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) and set `https://vtec.okami101.io/schemas/generator.json` on your workspace by link it in `yaml.schemas` settings, which is already done in this project if you open the workspace in the root of this main repo. Now You have autocompletion with full documention !

It means that you can simply initiate structure of your new web site or new resource directly by create your YAML file instead of writing base boilerplate code by hand !
