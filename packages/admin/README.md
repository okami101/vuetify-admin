# Vtec Admin

SPA admin library for Vue.js running on top of REST APIs, built on top of Vuetify and come with dedicated Vue CLI plugin. Can be used on every backend of your choice with your own data and authentication providers.

> See [full documentation](https://vtec.okami101.io)  
> Check [online demo](https://vtec-bookstore-demo.okami101.io) and use prefilled login (read only)

[![demo](https://vtec.okami101.io/assets/screenshot.png)](https://vtec-bookstore-demo.okami101.io)

## Features

See [main readme](https://github.com/okami101/vtec-admin#features) of this repo for detail.

## Usage

See [dedicated guide](https://vtec.okami101.io/guide/getting-started).

### Instantiation

See [dedicated guide](https://vtec.okami101.io/guide/admin).

## Included components

### Layout

Standard admin layout with :

* App header bar with customizable links and profile links
* Sidebar for hierarchical menu with icons
* Breadcrumbs
* Aside panel where you can put anything you want on any context
* App footer with customizable links and corporate message
* Multi UI language (en and fr), takes browser language as default

> See [dedicated guide](https://vtec.okami101.io/guide/crud/layout).

### CRUD

Classic crud pages that can be generated with CLI plugin :

* [List](https://vtec.okami101.io/guide/crud/list) : classic resource browser, paginable, filtrable as-you-type, multi-sortable and exportable. Can have global SQL like search filter as well as advanced specific filters. Use datatable component by default that can be replaced by your own custom data-iterable layout list component.
* [Show](https://vtec.okami101.io/guide/crud/show) : entirely customizable layout show page. Use fields components as formatter for each resource properties.
* [Create](https://vtec.okami101.io/guide/crud/form#create) : form page for new resource creation. Can use an other existing resource as source for input prefilling (clone).
* [Edit](https://vtec.okami101.io/guide/crud/form#edit) : customizable form page for an existing resource. Ideal place (as show page) for adding other related resources with contextualized datatable or any other layout you want.

### Supported fields

Fields is a custom show formatter of a given data, generally a property of a resource.

* TextField
* NumberField
* RatingField
* DateField
* BooleanField
* RichTextField
* ChipField
* SelectField
* EmailField
* UrlField
* FileField
* ImageField
* ArrayField
* ReferenceField
* ReferenceArrayField

> You can create you custom fields by creating your own vue component which extend this specific mixin `vtec-admin/mixins/field`
> See [dedicated guide](https://vtec.okami101.io/guide/components/fields).

### Supported inputs

Inputs are intended to be used on any form in order to either edit specific property of a resource or filter on resource list.

* TextInput
* PasswordInput
* NumberInput
* RatingInput
* DateInput
* BooleanInput
* RichTextInput
* ArrayInput
* SelectInput
* RadioGroupInput
* AutocompleteInput
* FileInput

> You can create you own input by creating your own vue component which extend this specific mixin `vtec-admin/mixins/input`
> See [dedicated guide](https://vtec.okami101.io/guide/components/inputs).

## Internationalization

See [dedicated guide](https://vtec.okami101.io/guide/i18n).

## Full documentation

Full documentation can be found on the [Vtec docs website](https://vtec.okami101.io).

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
