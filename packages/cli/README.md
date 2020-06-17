# Vue CLI plugin for Vtec Admin

Vue CLI plugin of main [Vtec Admin](https://npm.okami101.io/-/web/detail/vtec-admin) library which allow quick start on fresh Vue CLI app. Use [Material Theme by Creative Tim](https://github.com/creativetimofficial/vuetify-material-dashboard) with sass overrides and some material components as base for Vuetify UI.

Include scripts for quick scaffolding crud pages of specific resource.

> See [dedicated guide](https://vtec.okami101.io/guide/getting-started.html)

## Prepare

Initialize your brand new Vue CLI admin project :

```bash
vue create admin -d
cd admin
vue add router
vue add vuex
vue add vuetify
vue add i18n
```

## Installation

Then you can finally launch `vue add vtec-admin`. [Check here](https://vtec.okami101.io/guide/getting-started.html#installation) for explanation of what this plugin does.

If your backend run different address than [http://localhost:8000](http://localhost:8000) (which is admin API default url), edit `VUE_APP_API_URL` environment variable according to inside `.env.local`.

> On production, don't forget to adapt BASE_URL and VUE_APP_API_URL variables. The general use case is to put this inside `.env.local` :

```env
VUE_APP_API_URL=/
BASE_URL=/admin
```

Finally start your admin panel by `yarn serve`. Don't forget to have your backend running next to.

## Available generators commands

You'll got 2 new npm scripts :

* `yarn crud:make my_new_resource [options]` : Main UI crud command maker. Resource name is required.
* `yarn crud:yaml my-new-resource.yml` : Superset of previous command which use a YAML file descriptor.

> Use `yarn vue-cli-service help crud:make` for all options documentation  
> See [dedicated guide](https://vtec.okami101.io/guide/generators.html)

## Full documentation

Full documentation can be found on the [Vtec docs website](https://vtec.okami101.io).

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
