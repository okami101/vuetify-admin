# Generators

## [API crud generators commands](#api)

See specific section of each server's package :

* [Laravel](guide/laravel#crud)

## [Available UI generators commands](#ui)

Vue CLI plugin will prepare for you 2 new npm scripts :

* `yarn crud:make [options]` : Main UI crud command maker which :
  * Generate all necessary basic crud views with additional form component inside dedicated resource folder under `src/resources/`. This views will be autoloaded as Vue components via Webpack. You can even generate all basic fields and inputs by passing full object into "fields" options.
  * Register new resource to `src/resources/index.js` file.
  * Add resource locales to `src/locales/{locale}.js` file. Locale will be `en` by default unless you pass `locale` as command option.
  * Add new sidebar entry to `src/_nav.js` file.
* `yarn crud:yaml --file my-new-resource.yml` : Superset of previous command which use a YAML file descriptor for crud generation, which can be very useful for quick start by simply describe your initial resources structure following [this schema](/schemas/generator.json).

> Use `yarn vue-cli-service help crud:make` for all options documentation  
> For best explanation of YAML usage, follow [this tutorial guide](tutorial).

### [YAML based generation](#yaml)

For even more auto generation power, and because `crud:make` can be exhausting to write with all options, a direct resource yaml file descriptor can be used via `php artisan crud:yaml my-new-resource.yml`.  
You can also directly provide a directory which contains all necessary YAML resource descriptor files as needed.

Follow [tutorial](https://vtec.okami101.io/guide/tutorial) for more details on what based YAML generation can offer.

> For both generator commands, you may add `-mfs` options to generate full migration file with all pre-generated fields, in addition to factory and seeder files.  
> In case of model relation, even if foreign keys can be generated in migration file by `foreign` on schema, you must manually add related eloquent relation in you model.  
> For server-side validation, you must manually add rules inside store and update generated request files.

This files follow a particular Vtec Generator [JSON Schema](https://json-schema.org/) which is available on [this URL](https://vtec.okami101.io/schemas/generator.json).  

This allows to have autocompletion with full documention when writing you own files.

Use this [VSCode extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) and set `https://vtec.okami101.io/schemas/generator.json` on your workspace by link it in `yaml.schemas` settings, which is already done in this project if you open the workspace in the root of this main repo. Now You have autocompletion with full documention !

It means that you can simply initiate structure of your new web site or new resource directly by create your YAML file instead of writing base boilerplate code by hand !
