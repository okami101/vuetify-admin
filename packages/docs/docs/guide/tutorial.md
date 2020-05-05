# Tutorial

In this tutorial, we will show you how to get quick ready for admin development, including API backend (based on Laravel) and usage of a YAML file descriptor for quick API and UI CRUD code generation.

:::tip SOURCE CODE
You will find complete source code of this tutorial [in the main repo](https://github.com/okami101/vtec-admin/tree/master/examples/tutorial).
:::

## Installation

First start a new Laravel project by following [this installation guide](laravel#installation).
Then start your admin [as explained here](laravel#run-admin-ui).

:::warning REQUIREMENTS
We will use docker as default for running backend API, [so install it first](https://www.docker.com/get-started).
If you won't this, follow classical laravel installation.
:::

To summary we have done this :

```sh
# Laravel installation
laravel new my-brand-new-project && cd my-brand-new-project
composer require vtec/laravel-crud
php artisan vtec:install # with all wizard default

# Laravel run
docker-compose up # backend will run default at localhost:8000
docker-compose exec laravel php artisan storage:link
docker-compose exec laravel php artisan migrate
docker-compose exec laravel php artisan vtec:user admin@example.com # create admin user

# Vtec Admin serve
cd admin
vue add vtec-admin
yarn serve
```

Now you should already have all basic full admin project working with functional API backend !

## API & UI resources development

### Create YAML resources descriptor file

The next step is to create a YAML resource descriptor file, which will be consumed by API and UI CRUD commands that will generate all basic working code, instead of creating all boring stuf all by hand.  

:::warning JSON SCHEMA
This file must follow a particular Vtec Generator [JSON Schema](https://json-schema.org/). More detail on file creation in [dedicated section](generators#yaml).
:::

In this tutorial we will take an already made file for quick showcase. A complete section of YAML creation is available in a [this dedicated chapiter](generators#yaml).  
So before we continue, take one of this [YAML files descriptors](https://github.com/okami101/vtec-admin/tree/master/examples/tutorial/admin/generators) on your prefered locale and put it inside `admin/generators` folder (or anywhere you want). This file will serve as a basis for next resources code generation.

This file contains 2 simple resources :

* Monsters : sample for show all different type of fields.
* Child monsters : essentialy for resource relationship purpose.

### Use provided generator commands

Finally it's time to generate our basic CRUD boilerplate code. First we begin with server-side commands, so use `php artisan crud:yaml admin/generators/monsters.en.yml -mfs`. That will generate all API based backend files as well as registering all crud resource API routes. See [laravel specific section](guide/laravel#crud) for all detail of what's going on.

1. `yarn crud:yaml --file .\generators\monsters.en.yml --locale en` (for english sample), generate all crud pages for each entity inside `src/resources` with full searchable datagrid list, show, create and edit forms.

> In short, only factory, seed data, validation rules and model eloquent relation on server-side has been written by hand.
