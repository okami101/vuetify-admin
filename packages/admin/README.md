# Vuetify Admin

SPA admin framework for Vue.js running on top of REST APIs, built on Vuetify and comes with dedicated [Vue CLI plugin](https://www.npmjs.com/package/vue-cli-plugin-vuetify-admin) for 🚀. Can be used on every backend of your choice with your own data and authentication providers.

> See [full documentation](https://www.okami101.io/vuetify-admin)  
> Check [online demo](https://va-demo.okami101.io) -> go to admin and use pre-filled login (read only)  
> Check [tutorial CodeSandbox](https://codesandbox.io/s/github/okami101/vuetify-admin/tree/master/examples/tutorial) -> use any login (fake writeable API)  

[![demo](https://www.okami101.io/vuetify-admin/assets/screenshot.png)](https://va-demo.okami101.io)

## Features

See [main readme](https://github.com/okami101/vuetify-admin#features) of this repo for detail.

## Install

> You must have valid API backend in order to use this project. You can start with [https://jsonplaceholder.okami101.io](https://jsonplaceholder.okami101.io) which is a fake writeable API.

Initialize your brand new Vue CLI admin project with this single line command :

```bash
vue create my-admin-project --preset okami101/vuetify-admin-preset
```

> On any existing Vue CLI Vuetify project use dedicated [Vue CLI plugin](https://www.npmjs.com/package/vue-cli-plugin-vuetify-admin) by `vue add vuetify-admin`.  

Then select suited options according to your needs and start your admin panel by `yarn serve`.

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

## Included components

### Layout

Standard admin layout with :

* App header bar with customizable links and profile links
* Sidebar for hierarchical menu with icons
* Breadcrumbs
* Aside panel where you can put anything you want on any context
* App footer with customizable links and corporate message
* Multi UI language (en and fr), takes browser language as default

> See [dedicated guide](https://www.okami101.io/vuetify-admin/guide/crud/layout.html).

### CRUD

Classic crud pages that can be generated with CLI plugin :

* [List](https://www.okami101.io/vuetify-admin/guide/crud/list.html) : classic resource browser, pagination, filtrable as-you-type, multi-sortable and exportable. Can have global SQL like search filter as well as advanced specific filters. Use data table component by default that can be replaced by your own custom data-iterable layout list component. Hierarchical data support with treeview component.
* [Show](https://www.okami101.io/vuetify-admin/guide/crud/show.html) : entirely customizable layout show page. Use fields components as formatter for each resource properties. Ideal place (as edit page) for adding other related resources with contextualized data table or any other layout you want.
* [Create and Edit](https://www.okami101.io/vuetify-admin/guide/crud/form.html) : customizable form page for new resource creation or resource edition. Can use an other existing resource as source for input pre filling (clone).

### Supported fields

Fields is a custom show formatter of a given data, generally a property of a resource.

* [TextField](https://www.okami101.io/vuetify-admin/guide/components/fields.html#text)
* [NumberField](https://www.okami101.io/vuetify-admin/guide/components/fields.html#number)
* [RatingField](https://www.okami101.io/vuetify-admin/guide/components/fields.html#rating)
* [DateField](https://www.okami101.io/vuetify-admin/guide/components/fields.html#date)
* [BooleanField](https://www.okami101.io/vuetify-admin/guide/components/fields.html#boolean)
* [RichTextField](https://www.okami101.io/vuetify-admin/guide/components/fields.html#rich-text)
* [ChipField](https://www.okami101.io/vuetify-admin/guide/components/fields.html#chip)
* [SelectField](https://www.okami101.io/vuetify-admin/guide/components/fields.html#select)
* [EmailField](https://www.okami101.io/vuetify-admin/guide/components/fields.html#email)
* [UrlField](https://www.okami101.io/vuetify-admin/guide/components/fields.html#url)
* [FileField](https://www.okami101.io/vuetify-admin/guide/components/fields.html#file)
* [ImageField](https://www.okami101.io/vuetify-admin/guide/components/fields.html#image)
* [ArrayField](https://www.okami101.io/vuetify-admin/guide/components/fields.html#array)
* [ReferenceField](https://www.okami101.io/vuetify-admin/guide/components/fields.html#reference)
* [ReferenceArrayField](https://www.okami101.io/vuetify-admin/guide/components/fields.html#reference-array)

> You can create you custom fields by creating your own vue component which extend this specific mixin `vuetify-admin/mixins/field`
> See [dedicated guide](https://www.okami101.io/vuetify-admin/guide/components/fields.html).

### Supported inputs

Inputs are intended to be used on any form in order to either edit specific property of a resource or filter on resource list.

* [TextInput](https://www.okami101.io/vuetify-admin/guide/components/inputs.html#text)
* [PasswordInput](https://www.okami101.io/vuetify-admin/guide/components/inputs.html#password)
* [NumberInput](https://www.okami101.io/vuetify-admin/guide/components/inputs.html#number)
* [RatingInput](https://www.okami101.io/vuetify-admin/guide/components/inputs.html#rating)
* [DateInput](https://www.okami101.io/vuetify-admin/guide/components/inputs.html#date)
* [BooleanInput](https://www.okami101.io/vuetify-admin/guide/components/inputs.html#boolean)
* [RichTextInput](https://www.okami101.io/vuetify-admin/guide/components/inputs.html#rich-text)
* [SelectInput](https://www.okami101.io/vuetify-admin/guide/components/inputs.html#select)
* [RadioGroupInput](https://www.okami101.io/vuetify-admin/guide/components/inputs.html#radio-input)
* [AutocompleteInput](https://www.okami101.io/vuetify-admin/guide/components/inputs.html#autocomplete)
* [FileInput](https://www.okami101.io/vuetify-admin/guide/components/inputs.html#file)
* [ArrayInput](https://www.okami101.io/vuetify-admin/guide/components/inputs.html#array)

> You can create you own input by creating your own vue component which extend this specific mixin `vuetify-admin/mixins/input`
> See [dedicated guide](https://www.okami101.io/vuetify-admin/guide/components/inputs.html).

## API documentation

API documentation for all VA components are auto generated from source code thanks to [Vue Docgen API](https://vue-styleguidist.github.io/docs/Docgen.html).

Use `node docgen` command in order to generate it inside `dist/json` folder for VuePress. All meta file autocompletion for Vetur and Jetbrains products will be generated as well.

## Documentation

Documentation for Vuetify Admin can be found on the [Okami101 website](https://www.okami101.io/vuetify-admin).

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
