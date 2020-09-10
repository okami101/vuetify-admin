# Vue CLI plugin for Vuetify Admin

Vue CLI plugin of main [Vuetify Admin](https://www.npmjs.com/package/vuetify-admin) library which allow quick start on fresh Vue CLI app. Use [Material Theme by Creative Tim](https://github.com/creativetimofficial/vuetify-material-dashboard) with sass overrides and some material components as base for Vuetify UI.

Include scripts for quick scaffolding crud pages of specific resource.

## Install

Initialize your brand new Vue CLI admin project with this single line command :

```bash
vue create my-admin-project --preset okami101/vuetify-admin-preset
```

> On any existing Vue CLI Vuetify project you can try `vue add vuetify-admin`.

Then select suited options according to your needs and start your admin panel by `yarn serve`.

> You must have valid API backend in order to use this project. You can start with [https://jsonplaceholder.okami101.io](https://jsonplaceholder.okami101.io) which is a fake writeable API. Don't hesitate to go through the [the tutorial](https://www.okami101.io/vuetify-admin/guide/tutorial.html#admin-ui) which use this API.

## Getting started

* [How it works](https://www.okami101.io/vuetify-admin/guide/)
* [Usage](https://www.okami101.io/vuetify-admin/guide/getting-started.html)
* [Tutorial](https://www.okami101.io/vuetify-admin/guide/tutorial.html)
* [Data providers](https://www.okami101.io/vuetify-admin/guide/data-providers.html)
* [Instantiation](https://www.okami101.io/vuetify-admin/guide/admin.html)
* [Resources](https://www.okami101.io/vuetify-admin/guide/resources.html)
* [Internationalization](https://www.okami101.io/vuetify-admin/guide/i18n.html)
* [Authentication](https://www.okami101.io/vuetify-admin/guide/authentication.html)
* [Authorization](https://www.okami101.io/vuetify-admin/guide/authorization.html)

> Check [Laravel tutorial](https://www.okami101.io/vuetify-admin/guide/laravel.html) for complete top-to-bottom development experience showcase with separate [Laravel Admin](https://github.com/okami101/laravel-admin) composer package.

## Available generators commands

You'll got 2 new npm scripts :

* `yarn crud:make my_new_resource [options]` : Main UI crud command maker. Resource name is required.
* `yarn crud:yaml my-new-resource.yml` : Superset of previous command which use a YAML file descriptor.

> Use `yarn vue-cli-service help crud:make` for all options documentation  
> See [dedicated guide](https://www.okami101.io/vuetify-admin/guide/generators.html)

## Documentation

Documentation for Vuetify Admin can be found on the [Okami101 website](https://www.okami101.io/vuetify-admin).

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
