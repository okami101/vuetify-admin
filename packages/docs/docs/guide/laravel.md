# Laravel

For Laravel case, we will use official [Vtec Laravel Crud](https://github.com/okami101/vtec-laravel-crud) which will heavily facilitates Vtec Admin integration.

:::warning REQUIREMENTS
* You must have at least PHP 7.4 (required by spatie media library package).
* [Laravel installer](https://laravel.com/docs#installing-laravel).
* [Vue CLI](https://cli.vuejs.org/guide/installation.html).
* Should be installed on fresh laravel 7 installation.
:::

## Installation

Simply init your project by this simple 3 steps :

```bash
laravel new my-brand-new-project && cd my-brand-new-project
composer require vtec/laravel-crud
php artisan vtec:install
```

The installer will suggest you to install :

* Many optional dev packages as :
  * [IDE Helper](https://github.com/barryvdh/laravel-ide-helper), will heavily help for IDE integration and intellisense.
  * [PHP CS Fixer](https://github.com/FriendsOfPhp/PHP-CS-Fixer) with Laravel preset.
  * [Clockwork](https://github.com/itsgoingd/clockwork), very helpful for API debugging.
  * [Laracasts Generators](https://github.com/laracasts/Laravel-5-Generators-Extended) for advanced migration with all fields and foreigns pregeneration feature.
* Required production packages :
  * [Laravel Sanctum](https://github.com/laravel/sanctum), a cookie-based authentication for SPA apps, which is ideal for Vtec Admin.
  * [Laravel elFinder](https://github.com/barryvdh/laravel-elfinder) for file browser support with Wysiwyg bridges.
  * [Laravel MediaLibrary](https://github.com/spatie/laravel-medialibrary) for media files support.
  * [Laravel Translatable](https://github.com/spatie/laravel-translatable) for simple translatable model support saved on JSON format.
* Generate some code to get basic features working within Vtec Admin :
  * Modify some configs as cors for ready-to-go API SPA plugging.
  * User controller for admin user management.
  * Simple account controller for profile editing and password change.
  * User impersonation with dedicated middleware.
* Finally installer will ask you for inject docker files with ready to use MySQL, phpMyadmin, Nginx and Redis !

**At the end of installation, a full ready Vue CLI Admin project will be installed inside `admin` subfolder (default) with all required dependencies by using [this preset](https://github.com/okami101/vtec-laravel-crud/blob/master/preset.json).**

### Run backend

After the installation, if you selected docker, simply launch `docker-compose up`. Don't forget to adapt your environments variables with those outputted by installer when finished.

Then you just have to setup laravel installation as normal :

```bash
php artisan storage:link
php artisan migrate:fresh --seed
```

Finally create your first user by `php artisan vtec:user admin@example.com`. You will be prompted for the user name and password.

> If you use docker, use `docker-compose exec laravel` before each command.  
> By default admin URL is configured at [http://localhost:8080](http://localhost:8080) which is default Vue CLI dev serve URL.  
> Dont forget to edit it on production. Just edit ADMIN_URL environment variable for that.

### Run admin UI
  
Finish UI installation by installing dedicated [Vtec Admin Vue CLI plugin](https://www.npmjs.com/package/vue-cli-plugin-vtec-admin) :

```bash
cd admin
vue add vtec-admin # Will generated all minimal admin boilerplate as well as UI crud commands
yarn serve
```

> See [Vue CLI plugin installation section](https://vtec.okami101.io/guide/getting-started#installation) for more detail of what this plugin do.
