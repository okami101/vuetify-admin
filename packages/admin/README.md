# Vtec Admin

SPA admin builder running on top of REST APIs, based on Vuetify with Vue CLI plugin. Can be used on every backend of your choice with your own data and authentication providers.

> See [full documentation](https://vtec.okami101.io)\
> Check [online demo](https://vtec-bookstore-demo.okami101.io/admin) and use prefilled login (read only)

<p align="center">
<a href="https://laravel.com" target="_blank" rel="noopener"><img src="https://user-images.githubusercontent.com/3679080/79634627-ec0d4d80-816b-11ea-8db5-63b8f54c9aeb.png" width="800"></a>
</p>

## Features

See [main readme](https://github.com/okami101/vtec-admin#features) of this repo for detail.

## Usage

Even if this package can be used as-is, the recommended way is to use dedicated Vue CLI plugin on fresh Vuetify app project.\
It takes care of prepare of all minimal boilerplate code for quick start admin development and include material theme and UI CRUD generators commands.\
See [separate readme](https://github.com/okami101/vtec-admin/tree/master/packages/cli) of this plugin for installation detail.

## Included components

### Layout

Standard admin layout with :

* App header bar with customizable links and profile links
* Sidebar for advanced menu, with hierarchy and icons
* Aside panel where you can put anything you want
* App footer with customizable links and corporate message

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

> You can of course create you custom fields by creating your own vue component and using this specific mixin "vtec-admin/mixins/field";

### Supported inputs

Inputs are obviously intended to be used on any form in order to either edit specific property of a resource or filter on resource list.

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

> You can of course create you own input by creating your own vue component and using this specific mixin "vtec-admin/mixins/input";

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
