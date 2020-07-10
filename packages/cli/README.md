# Vue CLI plugin for Vtec Admin

Vue CLI plugin of main [Vtec Admin](https://www.npmjs.com/package/vtec-admin) library which allow quick start on fresh Vue CLI app. Use [Material Theme by Creative Tim](https://github.com/creativetimofficial/vuetify-material-dashboard) with sass overrides and some material components as base for Vuetify UI.

Include scripts for quick scaffolding crud pages of specific resource.

> See [dedicated guide](https://vtec.okami101.io/guide/getting-started.html)

## 💿 Install

Initialize your brand new Vue CLI admin project with this single line command :

```bash
vue create my-admin-project --preset okami101/vtec-admin-preset
```

Then select suited options according to your needs.

Finally start your admin panel by `yarn serve`. Don't forget to have your backend running next to.

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
