# Vtec Admin

SPA admin builder running on top of REST APIs, based on Vuetify with Vue CLI plugin. Can be used on every backend of your choice with your own data and authentication providers.

> See [full documentation](https://vtec.okami101.io)\
> Check [online demo](https://vtec-bookstore-demo.okami101.io/admin) and use prefilled login (read only)

## Features

See [main readme](https://github.com/okami101/vtec-admin#features) for details.

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
