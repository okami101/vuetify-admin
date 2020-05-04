# Tutorial

In this tutorial, we will show you how to start as quickly as possible from top to bottom, including API backend (based on Laravel) and usage of a YAML file descriptor for quick API and UI CRUD code generation.

:::tip SOURCE CODE
You will find complete source code of this tutorial [in the main repo](https://github.com/okami101/vtec-admin/tree/master/examples/tutorial).
:::

## YAML based code generation

Before we start, let's take a look to [YAML file descriptor](https://github.com/okami101/vtec-admin/tree/master/examples/tutorial/admin/generators) which will serve as a basis for resources code generation.

In order to facilitates your YAML generator creation, a [JSON Schema](https://json-schema.org/) is available on [this URL](https://vtec.okami101.io/schemas/generator.json).  
Use this [VSCode extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) and set `https://vtec.okami101.io/schemas/generator.json` on your workspace by link it in `yaml.schemas` settings, which is already done in this project if you open the workspace in the root of this main repo. Now You have autocompletion with full documention !

It means that you can simply initiate structure of your new web site or new resource directly by create your YAML file instead of writing base boilerplate code by hand !

## Installation

1. `laravel new tutorial && cd tutorial`, initial Laravel skeleton
2. `composer install vtec/crud-laravel && php artisan admin:install`, see [this installation](https://vtec.okami101.io/guide/laravel#installation) for explanation.
3. `php artisan crud:yaml admin/generators/monsters.en.yml -mfs`, which generate all API based backend files (see [docs](https://vtec.okami101.io/guide/generators#api) for all detail).
4. `cd admin && vue add vtec-admin`, see [Getting Started docs](https://vtec.okami101.io/guide/getting-started#installation) for more detail of what this plugin do.
5. `yarn crud:yaml --file .\generators\monsters.en.yml --locale en` (for english sample), generate all crud pages for each entity inside `src/resources` with full searchable datagrid list, show, create and edit forms. The sample yaml generator includes 2 entities, monsters (with many different types of fields) and child monsters for resource relationship purpose.

> In short, only factory, seed data, validation rules and model eloquent relation on server-side has been written by hand.
