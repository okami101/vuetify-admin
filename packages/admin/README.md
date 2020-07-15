# Vtec Admin

SPA admin framework for Vue.js running on top of REST APIs, built on Vuetify and comes with dedicated [Vue CLI plugin](https://www.npmjs.com/package/vue-cli-plugin-vtec-admin) for 🚀. Can be used on every backend of your choice with your own data and authentication providers.

> See [full documentation](https://vtec.okami101.io)  
> Check [online demo](https://vtec-bookstore-demo.okami101.io) -> go to admin and use pre-filled login (read only)  
> Check [tutorial CodeSandbox](https://codesandbox.io/s/github/okami101/vtec-admin/tree/master/examples/tutorial) -> use any login (fake writeable API)  

[![demo](https://vtec.okami101.io/assets/screenshot.png)](https://vtec-bookstore-demo.okami101.io)

## Features

See [main readme](https://github.com/okami101/vtec-admin#features) of this repo for detail.

## Install

> You must have valid API backend in order to use this project. You can start with [https://jsonplaceholder.okami101.io](https://jsonplaceholder.okami101.io) which is a fake writeable API.

Initialize your brand new Vue CLI admin project with this single line command :

```bash
vue create my-admin-project --preset okami101/vtec-admin-preset
```

> On any existing Vue CLI Vuetify project use dedicated [Vue CLI plugin](https://www.npmjs.com/package/vue-cli-plugin-vtec-admin) by `vue add vtec-admin`.  

Then select suited options according to your needs and start your admin panel by `yarn serve`.

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

## Included components

### Layout

Standard admin layout with :

* App header bar with customizable links and profile links
* Sidebar for hierarchical menu with icons
* Breadcrumbs
* Aside panel where you can put anything you want on any context
* App footer with customizable links and corporate message
* Multi UI language (en and fr), takes browser language as default

> See [dedicated guide](https://vtec.okami101.io/guide/crud/layout.html).

### CRUD

Classic crud pages that can be generated with CLI plugin :

* [List](https://vtec.okami101.io/guide/crud/list.html) : classic resource browser, pagination, filtrable as-you-type, multi-sortable and exportable. Can have global SQL like search filter as well as advanced specific filters. Use data table component by default that can be replaced by your own custom data-iterable layout list component.
* [Show](https://vtec.okami101.io/guide/crud/show.html) : entirely customizable layout show page. Use fields components as formatter for each resource properties. Ideal place (as edit page) for adding other related resources with contextualized data table or any other layout you want.
* [Create and Edit](https://vtec.okami101.io/guide/crud/form.html) : customizable form page for new resource creation or resource edition. Can use an other existing resource as source for input pre filling (clone).

### Supported fields

Fields is a custom show formatter of a given data, generally a property of a resource.

* [TextField](https://vtec.okami101.io/guide/components/fields.html#text)
* [NumberField](https://vtec.okami101.io/guide/components/fields.html#number)
* [RatingField](https://vtec.okami101.io/guide/components/fields.html#rating)
* [DateField](https://vtec.okami101.io/guide/components/fields.html#date)
* [BooleanField](https://vtec.okami101.io/guide/components/fields.html#boolean)
* [RichTextField](https://vtec.okami101.io/guide/components/fields.html#rich-text)
* [ChipField](https://vtec.okami101.io/guide/components/fields.html#chip)
* [SelectField](https://vtec.okami101.io/guide/components/fields.html#select)
* [EmailField](https://vtec.okami101.io/guide/components/fields.html#email)
* [UrlField](https://vtec.okami101.io/guide/components/fields.html#url)
* [FileField](https://vtec.okami101.io/guide/components/fields.html#file)
* [ImageField](https://vtec.okami101.io/guide/components/fields.html#image)
* [ArrayField](https://vtec.okami101.io/guide/components/fields.html#array)
* [ReferenceField](https://vtec.okami101.io/guide/components/fields.html#reference)
* [ReferenceArrayField](https://vtec.okami101.io/guide/components/fields.html#reference-array)

> You can create you custom fields by creating your own vue component which extend this specific mixin `vtec-admin/mixins/field`
> See [dedicated guide](https://vtec.okami101.io/guide/components/fields.html).

### Supported inputs

Inputs are intended to be used on any form in order to either edit specific property of a resource or filter on resource list.

* [TextInput](https://vtec.okami101.io/guide/components/inputs.html#text)
* [PasswordInput](https://vtec.okami101.io/guide/components/inputs.html#password)
* [NumberInput](https://vtec.okami101.io/guide/components/inputs.html#number)
* [RatingInput](https://vtec.okami101.io/guide/components/inputs.html#rating)
* [DateInput](https://vtec.okami101.io/guide/components/inputs.html#date)
* [BooleanInput](https://vtec.okami101.io/guide/components/inputs.html#boolean)
* [RichTextInput](https://vtec.okami101.io/guide/components/inputs.html#rich-text)
* [SelectInput](https://vtec.okami101.io/guide/components/inputs.html#select)
* [RadioGroupInput](https://vtec.okami101.io/guide/components/inputs.html#radio-input)
* [AutocompleteInput](https://vtec.okami101.io/guide/components/inputs.html#autocomplete)
* [FileInput](https://vtec.okami101.io/guide/components/inputs.html#file)
* [ArrayInput](https://vtec.okami101.io/guide/components/inputs.html#array)

> You can create you own input by creating your own vue component which extend this specific mixin `vtec-admin/mixins/input`
> See [dedicated guide](https://vtec.okami101.io/guide/components/inputs.html).

## API documentation

API documentation for all VA components are auto generated from source code thanks to [Vue Docgen API](https://vue-styleguidist.github.io/docs/Docgen.html).

Use `node docgen` command in order to generate it inside `dist/json` folder for VuePress. All meta file autocompletion for Vetur and Jetbrains products will be generated as well.

## Documentation

Documentation for Vtec Admin can be found on the [Vtec website](https://vtec.okami101.io).

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
