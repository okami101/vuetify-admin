# Laravel

For Laravel case, we will use official [Vtec Laravel Crud](https://github.com/okami101/vtec-laravel-crud) in a spirit of simplicity.  
This package will install all needed packages, as many essential dev tools and API resources code generators. [Vtec Admin Vue CLI plugin](https://www.npmjs.com/package/vue-cli-plugin-vtec-admin)

## Features

* On-asking installer for quick start by optional packages selection, including associated Vue CLI admin project !
* Many optional dev packages proposed by the installer as [IDE Helper](https://github.com/barryvdh/laravel-ide-helper), PHP CS Fixer with Laravel preset, [Clockwork](https://github.com/itsgoingd/clockwork), [Laracasts Generators](https://github.com/laracasts/Laravel-5-Generators-Extended).
* [Laravel Sanctum](https://github.com/laravel/sanctum) for admin SPA auth.
* [Laravel elFinder](https://github.com/barryvdh/laravel-elfinder) for direct disk file management with Wysiwyg bridges.
* Media support thanks to [spatie/laravel-medialibrary](https://github.com/spatie/laravel-medialibrary).
* Translatable model support thanks to [spatie/laravel-translatable](https://github.com/dimsav/laravel-translatable).
* Simple account controller for profile editing and password change.
* User impersonation with dedicated middleware.
* Quick resource api generator commands including direct YAML descriptor file !
* Preconfigured docker files included with ready to use MySQL, phpMyadmin, Nginx and Redis !

## [Requirements](#requirements)

* You must have at least PHP 7.4 (required by spatie media library package).
* Install [Vue CLI](https://cli.vuejs.org/guide/installation.html).
* Should be installed on fresh laravel 7 installation.

## [Installation](#installation)

Simply init your project by this simple 2 steps :

```bash
composer require vtec/laravel-crud
php artisan admin:install
```

Simply follow wizard. The installer will preconfigure all asked packages for you and generate all minimal boilerplate code for quick start, including auth, users controller with impersonation.  
Laravel Sanctum is ready to use for [Vtec Admin](https://github.com/okami101/vtec-admin).

At the end of installation, a full ready Vue CLI Admin project will be installed inside `admin` subfolder (default) with all required dependencies by using [this preset](preset.json).

### Run backend

After the installation, if you selected docker, simply launch `docker-compose up`. Don't forget to adapt your environments variables with those outputted by installer when finished.

Then you just have to setup laravel installation as normal :

```bash
php artisan storage:link
php artisan migrate:fresh --seed
```

Finally create your first user by `php artisan admin:user:create admin@example.com`. You will be prompted for the user name and password.

> If you use docker, use `docker-compose exec laravel` before each command.  
> By default admin URL is configured at [http://localhost:8080](http://localhost:8080) which is default Vue CLI dev serve URL.  
> Dont forget to edit it on production. Just edit ADMIN_URL environment variable for that.

### Run admin UI
  
Finish UI installation by install dedicated [Vtec Admin Vue CLI plugin](https://www.npmjs.com/package/vue-cli-plugin-vtec-admin) and run it by this commands :

```bash
cd admin
vue add vtec-admin # Will generated all minimal admin boilerplate as well as UI crud commands
yarn serve
```

> See [Vue CLI plugin installation section](https://www.npmjs.com/package/vue-cli-plugin-vtec-admin#installation) for more detail of what this plugin do.

## [Scaffold API crud resources](#scaffolding)

Use `php artisan crud:make [MyNewResource] [options]` with many as option as possible. This will scaffold following files :

* Model
* Controller with all crud operations
* Policy for authorization
* Store and update requests for validation rules (empty by default, so don't forget to add your own rules)
* Http Resource for API data transformer
* Migration with all pre-generated fields (including foreigns !)
* Factory and seeder (empty by default)

Launch `php artisan crud:make --help` for all options documentation.  
Don't hesitate to use `php artisan ide-helper:models` after in order to have all fields Model autocompletion enabled !

In addition, api routes should be registered automatically at `routes/api.php` file in this place :

```php
Route::apiResources([
    /** previous entities */
    'my_new_resource' => 'MyNewResourceController',
]);
```

### [YAML based generation](#yaml)

For even more auto generation power, and because `crud:make` can be exhausting to write with all options, a direct resource yaml file descriptor can be used via `php artisan crud:yaml my-new-resource.yml`.  
You can also directly provide a directory which contains all necessary YAML resource descriptor files as needed.

Follow [tutorial](https://vtec.okami101.io/tutorial) for more details on what based YAML generation can offer.

> For both generator commands, you may add `-mfs` options to generate full migration file with all pre-generated fields, in addition to factory and seeder files.  
> In case of model relation, even if foreign keys can be generated in migration file by `foreign` on schema, you must manually add related eloquent relation in you model.  
> For server-side validation, you must manually add rules inside store and update generated request files.
