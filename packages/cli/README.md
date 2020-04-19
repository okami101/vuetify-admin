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
vue add axios # the http client used by providers
```

## Usage

The you can finally launch `vue add vtec-admin` which will do all this steps :

* Install main Vtec Admin library
* Install other required dependencies as [portal-vue](https://portal-vue.linusb.org/) and [vuedraggable](https://github.com/SortableJS/Vue.Draggable)
* Prepare inside your projects all minimal boilerplate code to quickly start
* Add UI CRUD generators scripts

> On production, don't forget to adapt BASE_URL and VUE_APP_API_URL variables. The general use case is :

```env
VUE_APP_API_URL=/
BASE_URL=/admin
```

VUE_APP_API_URL=
VUE_APP_TINYMCE_API_KEY=
VUE_APP_TINYMCE_LANGUAGE=

## Injected Commands

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
