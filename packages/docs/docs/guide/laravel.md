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

### Required or suggested packages

The installer will suggest you to install :

* Many optional dev packages as :
  * [IDE Helper](https://github.com/barryvdh/laravel-ide-helper), will heavily help for IDE integration and intellisense.
  * [PHP CS Fixer](https://github.com/FriendsOfPhp/PHP-CS-Fixer) with Laravel preset.
  * [Clockwork](https://github.com/itsgoingd/clockwork), very helpful for API debugging.
  * [Laracasts Generators](https://github.com/laracasts/Laravel-5-Generators-Extended) for advanced migration with all fields and foreigns pregeneration feature.
* Required production packages :
  * [Laravel Sanctum](https://github.com/laravel/sanctum), a cookie-based authentication for SPA apps, which is ideal for Vtec Admin.
  * [Laravel elFinder](https://github.com/barryvdh/laravel-elfinder) for file browser support with Wysiwyg bridges.
  * [Laravel Query Builder](https://github.com/spatie/laravel-query-builder) for api resource browsing with all pagination, fields, and filters support.
  * [Laravel MediaLibrary](https://github.com/spatie/laravel-medialibrary) for media files support.
  * [Laravel Translatable](https://github.com/spatie/laravel-translatable) for simple translatable model support saved on JSON format.

### Provided features and generated code

Finally, the installer will integrate some code to get basic features working within Vtec Admin :

* Modify some configs as cors for ready-to-go API SPA plugging.
* User controller for admin user management.
* Simple account controller for profile editing and password change.
* User impersonation with dedicated middleware registred inside `routes/api.php` file.
* Inject docker files with ready to use MySQL, phpMyadmin, Nginx and Redis !

### Vue CLI admin UI project

**At the end of installation, a full ready Vue CLI Admin project will be installed inside `admin` subfolder (default) with all required dependencies by using [this preset](https://github.com/okami101/vtec-laravel-crud/blob/master/preset.json).**

:::tip UI admin project initialization
You can still generate new admin UI without reuse full installer by using `php artisan vtec:ui`.
:::

### Run backend

After the installation, if you selected docker, simply launch `docker-compose up`. Don't forget to adapt your environments variables with those outputted by installer when finished.

Then you just have to setup laravel installation as normal :

```bash
php artisan storage:link
php artisan migrate:fresh --seed
```

Finally create your first user by `php artisan vtec:user admin@example.com`. You will be prompted for the user name and password.

:::tip DOCKER
If you use docker, use `docker-compose exec laravel` before each command.
:::

:::tip ADMIN URL
By default admin URL is configured at [http://localhost:8080](http://localhost:8080) which is default Vue CLI dev serve URL.  
Dont forget to edit it on production. Just edit ADMIN_URL environment variable for that.
:::

### Run admin UI
  
Finish UI installation by installing dedicated [Vtec Admin Vue CLI plugin](https://www.npmjs.com/package/vue-cli-plugin-vtec-admin) :

```bash
cd admin
vue add vtec-admin # Will generated all minimal admin boilerplate as well as UI crud commands
yarn serve
```

:::tip DIRECTORY STRUCTURE
See [this getting started section](getting-started#directory-structure) for more detail of what you get inside the `admin` folder.
:::

## [API crud generators commands](#crud)

This package provides 2 specific crud commands. Use `php artisan crud:make [MyNewResource] [options]` with many as option as possible. This will scaffold following files :

* Model
* Controller with all crud operations
* Policy for authorization
* Store and update requests for validation rules (empty by default, so don't forget to add your own rules)
* Http Resource for API data transformer
* Migration with all pre-generated fields (including foreigns !)
* Factory and seeder (empty by default)

In addition, api routes should be registered automatically at `routes/api.php` file in this place :

```php
Route::apiResources([
    /** previous entities */
    'my_new_resource' => 'MyNewResourceController',
]);
```

> Launch `php artisan crud:make --help` for all options documentation.  

:::tip IDE Autocompletion
Use `php artisan ide-helper:models` after in order to have full model autocompletion !
:::

## Other internal traits or services included

### Specific resource base

For resource fetching, you should use [Eloquent Resources](https://laravel.com/docs/eloquent-resources) that extends `Vtec\Crud\Http\Resources\BaseResource` if you need media or translatable fields support for this resource within Vtec Admin.

This class will do 2 things :

* Automatically only fetch the targeted locale for each translatable field.
* Fetch minimal info (id, title and url) for each media files attached to the model.

### Available model traits

This package includes some third party request related model traits in order to reduce controller code boilerplate. It means to be used directly on your models.

#### RequestMediaTrait

Import `InteractsWithMedia` from [Spatie MediaLibrary](https://github.com/spatie/laravel-medialibrary) with addition of request save management.  
This trait will be responsible for taking all valid request files that correspond to a valid collection name, as well as delete asked media for given collection.

Let's take this model media registration :

```php
public function registerMediaCollections(): void
{
    $this->addMediaCollection('logo')->singleFile();
    $this->addMediaCollection('local');
}
```

This trait will automatically search for all `logo_file` and `local_file` for uploaded file.  
For media deletion, he looks for `logo_delete` and `local_delete` with valid media ids (can be array or single value).  
The Vtec Admin file upload component `va-file-input` will take care of all of that.

#### RequestTranslatableTrait

Import `HasTranslations` from [Spatie Translatable](https://github.com/spatie/laravel-translatable) with addition of default locale detection from request for translatable fields saving or fetching.  
This trait will intercept all `locale` request input and set his value as default locale for saving. If not set default locale will be the user browser language in case you use included `Locale` middleware, if not this will be the app default locale.
It should be used in conjunction with Vtec Admin resource translation feature as explained in [dedicated section](i18n#translatable).

### Global search filter

If you need to add global search support in [Vtec Admin Iterator](components/list), use `Vtec\Crud\Filters\SearchFilter` with all searchable fields as a specific filter inside allowedFilters method of [Spatie Query Builder](https://docs.spatie.be/laravel-query-builder/v2/features/filtering/) as next :

```php{4}
return new BookCollection(
  QueryBuilder::for(Book::class)
      ->allowedFilters([
          AllowedFilter::custom('q', new SearchFilter(['isbn', 'title', 'description'])),
      ->exportOrPaginate()
    );
}
```

:::tip
Use `exportOrPaginate` specific macro after end of each QueryBuilder in order to add both export and pagination with only one line of code. It will apply pagination only in case of `perPage` detection on request query string. In all cases, filtering and sorting are kept.
:::

### Html Faker provider

You can use `Vtec\Crud\Faker\Provider\Html` for easy html generation your factories :

```php{6,15,16}
use App\Book;
use Faker\Generator as Faker;
use Vtec\Crud\Faker\Provider\Html;

$factory->define(Book::class, function (Faker $faker) {
    $faker->addProvider(new Html($faker));

    return [
        'isbn' => $faker->isbn13,
        'description' => [
            'en' => $faker->paragraph(10),
            'fr' => $faker->paragraph(10),
        ],
        'summary' => [
            'en' => $faker->htmlParagraphs(10, 10, 10),
            'fr' => $faker->htmlParagraphs(10, 10, 10),
        ],
        //
    ];
});
```
