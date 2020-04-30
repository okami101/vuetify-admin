# Vue cli plugin for Vtec Admin

Vue CLI plugin of main [Vtec Admin](https://github.com/okami101/vtec-admin/tree/master/packages/admin) library which allow quick start on fresh Vue CLI app. Use [Material Theme by Creative Tim](https://github.com/creativetimofficial/vuetify-material-dashboard) with sass overrides and some material components as base for Vuetify UI.

Include scripts for quick scaffolding crud pages of specific resource.

## Requirements

This CLI plugin is intended be installed on a fresh new Vue CLI project.

* As a CLI projet, you must obviously have installed [Vue CLI](https://cli.vuejs.org/guide/installation.html)
* You should have a prepared separate API backend project for real development. Fortunately you can quickly start with a fully functional Laravel API backend thanks to separated [Vtec Laravel Crud](https://github.com/okami101/vtec-laravel-crud) composer package. Just follow the dedicated [installation section](https://github.com/okami101/vtec-laravel-crud#installation) steps.

## Prepare

> If you choose Laravel as backend API, it's recommended to follow [this dedicated installation guide](https://github.com/okami101/vtec-laravel-crud#installation) instead which is more integrated. Besides it used an included Vue CLI preset for even less install steps.

Initialize your brand new Vue CLI admin project by `vue create admin` and go enter by `cd admin`.

Then install all required plugins.

```bash
vue add router # if not already selected at project init
vue add vuex # if not already selected at project init
vue add vuetify # the main UI framework
vue add i18n # the internationalization plugin
```

## Installation

Then you can finally launch `vue add vtec-admin` which will do all this steps :

* Install main Vtec Admin library
* Install third-party required dependencies as [PortalVue](https://portal-vue.linusb.org/), [Vue.Draggable](https://github.com/SortableJS/Vue.Draggable)
* Prepare inside your projects all minimal boilerplate code to quickly start :
  * Nice material theme as superset on Vuetify
  * Explicit preload of all Vuetify components used by Vtec Admin (because a-la-carte mode can't work on precompiled libs)
  * Initialize admin plugin with automatic crud pages webpack context preload and create base admin layout page on your App.vue entry file
  * Login page plugged with default [Laravel Sanctum](https://github.com/laravel/sanctum) auth provider (totally replaceable by your own provider)
  * Static dashboard sample with usage of [Chartist.js](https://gionkunz.github.io/chartist-js/)
  * Functional basic profile edition page
  * Comme with user management page list with direct aside creation / show / edition
* Add UI CRUD generators scripts

If your backend run different address than [http://localhost:8000](http://localhost:8000) (which is admin API default url), edit `VUE_APP_API_URL` environment variable according to inside `.env.local`.

> On production, don't forget to adapt BASE_URL and VUE_APP_API_URL variables. The general use case is to put this inside `.env.local` :

```env
VUE_APP_API_URL=/
BASE_URL=/admin
```

> For TinyMCE 5 usage, you may add your own api key :

```env
VUE_APP_TINYMCE_API_KEY=my_api_key
VUE_APP_TINYMCE_LANGUAGE=my_default_locale
```

Finally start your admin panel by `yarn serve`. Don't forget to have your backend running next to.

## [Available generators commands](#scaffolding)

You'll got 2 new npm scripts :

* `yarn crud:make` : Main UI crud command maker which :
  * Generate all necessary basic crud views with additional form component inside dedicated resource folder under `src/resources/`. This views will be autoloaded as Vue components via Webpack. You can even generate all basic fields and inputs by passing full object into "fields" options.
  * Register new resource to `src/resources/index.js` file.
  * Add resource locales to `src/locales/{locale}.js` file. Locale will be `en` by default unless you pass `locale` as command option.
  * Add new sidebar entry to `src/_nav.js` file.
* `yarn crud:generate` : Superset of previous command which use a YAML file descriptor for crud generation, which can be very useful for quick start by simply describe your initial resources structure following [this schema](https://vtec.okami101.io/schemas/generator.json).

> Use `yarn vue-cli-service help crud:make` for all options documentation  
> For best explanation of YAML schema, follow [this tutorial guide](https://vtec.okami101.io/tutorial).

## Full documentation

Full documentation can be found on the [Vtec docs website](https://vtec.okami101.io).

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
