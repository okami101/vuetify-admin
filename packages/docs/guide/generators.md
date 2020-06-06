# Generators

Vtec Admin offers powerful generators commands that can considerably accelerate admin development. That is particularly useful as VA uses a highly customizable Vue templating development approach rather than configuration oriented development (i.e. develop UI on a full JSON or YAML file as [EasyAdmin](https://github.com/EasyCorp/EasyAdminBundle) do) which tends to be harder to extend.

Thanks to all resource-aware VA components, the DSL approach helps to reduce many boilerplate code but it's still not as efficient than writing you UI on YAML file. That's here the generators comes in. You write Admin UI on YAML format, by following a [JSON schema validator](https://vtec.okami101.io/schemas/generator.json), and then you generate all API code and Vue templates from it. So it embraces the **initial high productivity** of YAML development while **maintaining full template customization** at hand.

:::danger CUSTOMIZATION
Consequently, this file will mainly be used for your first resource code generation. After each each generation, all customization made inside targeted resource templates will be lost.
:::

## API

See specific section of each supported API package :

* [Laravel](laravel.md#generators)

## Admin UI

:::warning Vue CLI Plugin
Nexts commands are only available if you install Vtec Admin by his Vue CLI plugin, so install it first by [following this guide](getting-started.md).
:::

Vue CLI plugin will provide to you a new npm command `yarn crud:make [options]`, which helps for generated initial resources CRUD pages boilerplate :

* Generate all necessary basic crud views with additional form component inside dedicated resource folder under `src/resources/`. This views will be autoloaded as Vue components via Webpack. You can even generate all basic fields and inputs by passing full object into `fields` options.
* Register new resource to `src/resources/index.js` file.
* Add resource locales to `src/locales/{locale}.js` file. Locale will be `en` by default unless you pass `locale` as command option.
* Add new sidebar entry to `src/_nav.js` file.

:::tip HELP COMMAND
Use `yarn vue-cli-service help crud:make` for all options documentation.
:::

## YAML

Vue CLI plugin provides an additional advanced `crud:yaml` command which is a superset of previous command and allows you to generate all initial admin interface code from a YAML file. You can see it as a developer-friendly admin panel code generator.

This is how it works :

![generators](/diagrams/generators.svg)

### JSON Schema

This file must to validate against a [particular JSON schema](/schemas/generator.json) in order to ensure compatibility.

Each YAML file can contain a list of resources identified by a slug name on `snake_case` format. Each resource can contain many properties that will help for code generation on both API and UI sides.

|> schema generator resource

You can even to generate all fields as needed thanks to `fields` properties. Here is the expected structure :

|> schema generator field

:::tip FIELD TYPE
The `type` must correspond to a valid UI field widget you will find [here](components/fields.md). At this time it can be `text`, `number`, `rating`, `date`, `boolean`, `rich-text`, `chip`, `select`, `email`, `url`, `file`, `image`, `reference`, `array`.

For primitive type on API side, use the below `db` option.
:::

For database API, each field can contain a specific `db` property which will precise DB related attributes :

|> schema generator db

The `attributes` property define all valid attributes for UI field widget :

|> schema generator field.properties.attributes

The `form` property allows you advanced control on UI input widget :

|> schema generator field.properties.form

Same for advanced `filter` property :

|> schema generator field.properties.filter

:::tip YAML DEVELOPMENT
For better YAML development experience you should use this [VSCode extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml). Next set `https://vtec.okami101.io/schemas/generator.json` value on your workspace settings for each generator YAML file inside `yaml.schemas` settings. Now you have autocompletion with full documentation !
:::

## Tutorial

In this tutorial, we will show you how to get quick ready for admin development, including API backend (based on Laravel) and usage of a YAML file descriptor for quick API and UI CRUD code generation.

:::tip SOURCE CODE
You will find complete source code of this tutorial [in the main repo](https://github.com/okami101/vtec-admin/tree/master/examples/generators).
:::

### Installation

First start a new Laravel project by following [this installation guide](laravel.md#installation).
Then start your admin [as explained here](laravel.md#run-admin-ui).

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
yarn serve
```

Now you should already have all basic full admin project working with functional API backend !

### API & UI resources development

The next step is to create a YAML resource descriptor file that will validate above JSON schema, which will be consumed by API and UI CRUD commands that will generate all basic working code, instead of creating all boring stuff all by hand.

In this tutorial we will use existing YAML files as sample. Take one of this [YAML files descriptors](https://github.com/okami101/vtec-admin/tree/master/examples/generators/admin/generators) according to your preferred locale and put it inside `admin/generators` folder (or anywhere you want). This file will serve as a basis for next resources code generation and contains 2 resources :

* Monsters : sample for show all different type of fields.
* Child monsters : essentially for resource relationship purpose.

### API generator commands

:::tip DOCKER
For all next artisan commands, don't forget to add `docker-compose exec laravel` before.
:::

Finally it's time to generate our basic CRUD boilerplate code.

First begin with server-side commands by using `php artisan crud:yaml admin/generators/monsters.en.yml -mfs`. That will generate all API based backend files as well as registering all crud resource API routes. See [laravel specific section](laravel.md#generators) for all detail of what's going on.

### Add specific model relations

Foreign DB keys are already done by migration, but you need to manually add all needed eloquent relationship for each model.

**`app/Monster.php`**

```php
public function children()
{
    return $this->hasMany(MonsterChild::class);
}
```

**`app/MonsterChild.php`**

```php
public function monster()
{
    return $this->belongsTo(Monster::class);
}
```

### Dummy data

The next step is to write you seed data. Use generated factory and seeder for that. For get quicker start, pick this files from tutorial source code :

* [MonsterFactory](https://github.com/okami101/vtec-admin/blob/master/examples/generators/database/factories/MonsterFactory.php)
* [MonsterChildFactory](https://github.com/okami101/vtec-admin/blob/master/examples/generators/database/factories/MonsterChildFactory.php)
* [MonsterSeeder](https://github.com/okami101/vtec-admin/blob/master/examples/generators/database/seeds/MonsterSeeder.php)

Then generate all DB with dummy data by `php artisan migrate:fresh --seed`.

### Server-side data validation

We will not use them for this tutorial, but for real app it's heavily recommended to write your server-side validations on both store and update form requests for each resource (generated inside `app/Http/Requests`).

### UI generator commands

Note at this above commands generate only API side code. For UI side go to `admin` folder and launch `yarn crud:yaml generators/monsters.en.yml --locale en` (for english sample). This will generate all CRUD pages for each entity inside `src/resources` with full searchable data table list, show, create and edit forms.

> In short, only factory, seed data, validation rules and model eloquent relation on server-side has been written by hand.
