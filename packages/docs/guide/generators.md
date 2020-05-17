# Generators

Vtec Admin offers powerful generators commands that can considerably accelerate admin development. That is particulary useful as VA uses a highly customizable Vue templating development approach rather than configuration oriented development (i.e. develop UI on a full JSON or YAML file as [EasyAdmin](https://github.com/EasyCorp/EasyAdminBundle) do) which tends to be harder to extend.

Thanks to all resource-aware VA components, the DSL approach helps to reduce many boilerplate code but it's still not as efficient than writing you UI on YAML file. That's here the generators comes in. You write Admin UI on YAML format, by following a [JSON schema validator](https://vtec.okami101.io/schemas/generator.json), and then you generate all API code and Vue templates from it. So it embraces the **initial high productivity** of YAML development while **maintaining full template customization** at hand.

:::danger CUSTOMIZATION
Consequently, this file will mainly be used for your first resource code generation. After each each generation, all customization made inside targetted resource templates will be lost.
:::

## API

See specific section of each supported API package :

* [Laravel](laravel#generators)

## Admin UI

:::warning Vue CLI Plugin
Nexts commands are only available if you install Vtec Admin by his Vue CLI plugin, so install it first by [following this guide](getting-started).
:::

Vue CLI plugin will provide to you a new npm command `yarn crud:make [options]`, which helps for generated initial resources CRUD pages boilerplate :

* Generate all necessary basic crud views with additional form component inside dedicated resource folder under `src/resources/`. This views will be autoloaded as Vue components via Webpack. You can even generate all basic fields and inputs by passing full object into `fields` options.
* Register new resource to `src/resources/index.js` file.
* Add resource locales to `src/locales/{locale}.js` file. Locale will be `en` by default unless you pass `locale` as command option.
* Add new sidebar entry to `src/_nav.js` file.

:::tip HELP COMMAND
Use `yarn vue-cli-service help crud:make` for all options documentation.
:::

### YAML

:::tip TUTORIAL
For best showcase of YAML driven development, follow [this tutorial guide](tutorial).
:::

* `yarn crud:yaml --file my-new-resource.yml` : Superset of previous command which use a YAML file descriptor for crud generation, which can be very useful for quick start by simply describe your initial resources structure following [this schema](/schemas/generator.json).

This is how it works :

![generators](/diagrams/generators.svg)

> For both generator commands, you may add `-mfs` options to generate full migration file with all pre-generated fields, in addition to factory and seeder files.  
> In case of model relation, even if foreign keys can be generated in migration file by `foreign` on schema, you must manually add related eloquent relation in you model.  
> For server-side validation, you must manually add rules inside store and update generated request files.

This files follow a particular Vtec Generator [JSON Schema](https://json-schema.org/) which is available on [this URL](https://vtec.okami101.io/schemas/generator.json).  

This allows to have autocompletion with full documention when writing you own files.

Use this [VSCode extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) and set `https://vtec.okami101.io/schemas/generator.json` on your workspace by link it in `yaml.schemas` settings, which is already done in this project if you open the workspace in the root of this main repo. Now You have autocompletion with full documention !

It means that you can simply initiate structure of your new web site or new resource directly by create your YAML file instead of writing base boilerplate code by hand !
