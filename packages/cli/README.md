# Vue CLI plugin for Vtec Admin

Vue CLI plugin of main [Vtec Admin](https://www.npmjs.com/package/vtec-admin) library which allow quick start on fresh Vue CLI app. Use [Material Theme by Creative Tim](https://github.com/creativetimofficial/vuetify-material-dashboard) with sass overrides and some material components as base for Vuetify UI.

Include scripts for quick scaffolding crud pages of specific resource.

## Install

Initialize your brand new Vue CLI admin project with this single line command :

```bash
vue create my-admin-project --preset okami101/vtec-admin-preset
```

> On any existing Vue CLI Vuetify project you can try `vue add vtec-admin`.

Then select suited options according to your needs and start your admin panel by `yarn serve`.

> You must have valid API backend in order to use this project. You can start with [https://jsonplaceholder.okami101.io](https://jsonplaceholder.okami101.io) which is a fake writeable API. Don't hesitate to go through the [the tutorial](https://vtec.okami101.io/guide/tutorial.html#admin-ui) which use this API.

## Getting started

* [How it works](https://vtec.okami101.io/guide/)
* [Usage](https://vtec.okami101.io/guide/getting-started.html)
* [Tutorial](https://vtec.okami101.io/guide/tutorial.html)
* [Data providers](https://vtec.okami101.io/guide/data-providers.html)
* [Instantiation](https://vtec.okami101.io/guide/admin.html)
* [Resources](https://vtec.okami101.io/guide/resources.html)
* [Internationalization](https://vtec.okami101.io/guide/i18n.html)
* [Authentication](https://vtec.okami101.io/guide/authentication.html)
* [Authorization](https://vtec.okami101.io/guide/authorization.html)

> Check [Laravel tutorial](https://vtec.okami101.io/guide/laravel.html) for complete top-to-bottom development experience showcase with separate [Vtec Laravel Crud](https://github.com/okami101/vtec-laravel-crud) composer package.

## Available generators commands

You'll got 2 new npm scripts :

* `yarn crud:make my_new_resource [options]` : Main UI crud command maker. Resource name is required.
* `yarn crud:yaml my-new-resource.yml` : Superset of previous command which use a YAML file descriptor.

> Use `yarn vue-cli-service help crud:make` for all options documentation  
> See [dedicated guide](https://vtec.okami101.io/guide/generators.html)

## Documentation

Documentation for Vtec Admin can be found on the [Vtec website](https://vtec.okami101.io).

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
