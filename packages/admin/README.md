# Vtec Admin

SPA admin library for Vue.js running on top of REST APIs, built on Vuetify and comes with dedicated [Vue CLI plugin](https://www.npmjs.com/package/vue-cli-plugin-vtec-admin) for 🚀. Can be used on every backend of your choice with your own data and authentication providers.

> See [full documentation](https://vtec.okami101.io)  
> Check [online demo](https://vtec-bookstore-demo.okami101.io) -> go to admin and use prefilled login (read only)  

[![demo](https://vtec.okami101.io/assets/screenshot.png)](https://vtec-bookstore-demo.okami101.io)

## Features

See [main readme](https://github.com/okami101/vtec-admin#features) of this repo for detail.

## Getting started

* [How it works](https://vtec.okami101.io/guide/)
* [Usage](https://vtec.okami101.io/guide/getting-started.html)
* [Instantiation](https://vtec.okami101.io/guide/admin.html)
* [Resources](https://vtec.okami101.io/guide/resources.html)
* [Internationalization](https://vtec.okami101.io/guide/i18n.html)

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

* [List](https://vtec.okami101.io/guide/crud/list.html) : classic resource browser, paginable, filtrable as-you-type, multi-sortable and exportable. Can have global SQL like search filter as well as advanced specific filters. Use datatable component by default that can be replaced by your own custom data-iterable layout list component.
* [Show](https://vtec.okami101.io/guide/crud/show.html) : entirely customizable layout show page. Use fields components as formatter for each resource properties. Ideal place (as edit page) for adding other related resources with contextualized datatable or any other layout you want.
* [Create and Edit](https://vtec.okami101.io/guide/crud/form.html) : customizable form page for new resource creation or resource edition. Can use an other existing resource as source for input prefilling (clone).

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

API documentation for all VA components are autogenerated from source code thanks to [Vue Docgen API](https://vue-styleguidist.github.io/docs/Docgen.html).

Use `node docgen` command in order to generate it inside `dist/json` folder for VuePress. All metas file autocompletion for Vetur and Jetbrains products will be generated as well.

## Full documentation

Full documentation can be found on the [Vtec docs website](https://vtec.okami101.io).

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
