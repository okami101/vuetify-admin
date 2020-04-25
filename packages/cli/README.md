# Vue cli plugin for Vtec Admin

Vue CLI plugin of main [Vtec Admin](https://github.com/okami101/vtec-admin/tree/master/packages/admin) library which allow quick start on fresh Vue CLI app. Use [Material Theme by Creative Tim](https://github.com/creativetimofficial/vuetify-material-dashboard) with sass overrides and some specific components as base for Vuetify UI.

Include some scripts for generate crud pages of a specific resource.

> See [full documentation](https://vtec.okami101.io).

## Requirements

This CLI plugin is intended be installed on a fresh new Vue CLI project.

* As a CLI projet, you must obviously have installed [Vue CLI](https://cli.vuejs.org/guide/installation.html)
* You should have a prepared separate API backend project for real development. Fortunately you can quickly start with a fully functional Laravel API backend thanks to [this CRUD composer package](https://github.com/okami101/vtec-laravel-crud). Just follow the dedicated [installation section](https://github.com/okami101/vtec-laravel-crud#installation) steps.

Then initialize your brand new Vue CLI admin project. Just launch `vue create admin` directly inside your root backend directory and go enter by `cd admin`.

Then install all required plugins.

```bash
vue add router # if not already selected at project init
vue add vuex # if not already selected at project init
vue add vuetify # the main UI framework
vue add i18n # the internationalisation plugin
```

## Usage

The you can finally launch `vue add vtec-admin` which will do all this steps :

* Install main Vtec Admin library
* Install other required dependencies as [PortalVue](https://portal-vue.linusb.org/), [Vue.Draggable](https://github.com/SortableJS/Vue.Draggable)
* Prepare inside your projects all minimal boilerplate code to quickly start, default it includes :
  * Nice material theme as superset on Vuetify
  * Explicit preload of all Vuetify components used by Vtec Admin (a-la-carte can't obviously work on precompiled libs)
  * Initialize admin plugin with automatic crud pages webpack context preload and prepare admin layout page on your App.vue entry file
  * Login page plugged with default Laravel Sanctum auth provider (totally replaceable)
  * Static dashboard sample with usage of [Chartist.js](https://gionkunz.github.io/chartist-js/)
  * Functional profile edition page
  * Generate user page list with direct aside creation / show / edition
* Add UI CRUD generators scripts

If your backend run different address than [http://localhost:8000](http://localhost:8000) (which is admin API default url), edit `VUE_APP_API_URL` environment variable according to inside `.env.local`.

> On production, don't forget to adapt BASE_URL and VUE_APP_API_URL variables. The general use case is to put this inside `.env.local` :

```env
VUE_APP_API_URL=/
BASE_URL=/admin
```

> For TinyMCE 5 usage, you should have your own api key :

```env
VUE_APP_TINYMCE_API_KEY=my_api_key
VUE_APP_TINYMCE_LANGUAGE=my_default_locale
```

Finally start your backend and admin panel. From backend root project :

```bash
php artisan serve # should be http://localhost:8000 by default
cd admin && yarn serve
```

## Available generators commands

You'll got 2 new npm scripts :

* `yarn crud:make` : Main crud views command maker which :
  * Generate all necessary basic crud views with separate form component inside dedicated resource folder under `src/resources/`. You can even generate all basic fields and inputs by passing complex object into "fields" options
  * Register new resource to `src/resources/index.js` file
  * Add new sidebar entry to `src/_nav.js` file

> Use `yarn vue-cli-service help crud:make` for all options detail

* `yarn crud:generate` : Superset of previous command which use a YAML file descriptor for crud generation, which can be very useful for quick start by simply describe your initial resources structure.

> For supported YAML schema, see [full documentation](https://vtec.okami101.io).

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
