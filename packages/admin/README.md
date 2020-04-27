<p align="center">
<a href="https://laravel.com" target="_blank" rel="noopener"><img src="https://user-images.githubusercontent.com/3679080/79393326-6758de80-7f75-11ea-9196-8ecf990b40fd.png" width="300"></a>
</p>

# Vtec Admin

SPA admin builder running on top of REST APIs, based on Vuetify with Vue CLI plugin. Can be used on every backend of your choice with your own data and authentication providers.

> See [full documentation](https://vtec.okami101.io)  
> Check [online demo](https://vtec-bookstore-demo.okami101.io/admin) and use prefilled login (read only)

<p align="center">
<a href="https://laravel.com" target="_blank" rel="noopener"><img src="https://user-images.githubusercontent.com/3679080/79634627-ec0d4d80-816b-11ea-8db5-63b8f54c9aeb.png" width="800"></a>
</p>

## Features

See [main readme](https://github.com/okami101/vtec-admin#features) of this repo for detail.

## Usage

Even if this package can be used as-is, the recommended way is to use dedicated Vue CLI plugin on fresh Vuetify app project.  
It takes care of prepare of all minimal boilerplate code for quick start admin development and include material theme and UI CRUD generators commands.  
See [separate readme](https://github.com/okami101/vtec-admin/tree/master/packages/cli) of this plugin for installation detail.

In order to operate, VtecAdmin constructor needs all of this instances :

* Vue Router, which can contains all your custom routes
* Vue Store, which can contains all your custom modules
* Vue I18n
* At least one provided locale
* One auth provider (see detail after)
* One data provider (see detail after)
* A resources array which contain all resources to administer. Each resource can have :
  * A mandatory slug name which will be used for api url calls
  * An icon for identify it in sidebar or list page
  * Indicator if this resource can be translated, in this case, a new query string with locale will be added on each api calls, it's up to you to handle it on backend
  * List of available actions for this resource. By default all 5 operations are active (list / show / create / edit / delete). You can use `except` or `only` properties for blacklist or whitelist few actions. All removed actions will reflected on all crud pages and Vue Router will be adapted accordingly.
  * Permissions for which user can access to this resource

## Included auth and data Providers

* [Laravel Sanctum auth provider](src/providers/sanctumAuthProvider.js) which use good old full state cookies authentication. You are free to replace it by your own provider by implementing [auth actions methods](src/utils/authActions.js). JWT is a more common way for SPA app but is also sensitive to XSS attacks, contrary to standard cookies if set to http only. If admin app is on the same main domain, it's often preferable to stay with cookies. Besides, this is by far the easiest way to get impersonation and elFinder (best known of PHP files manager) working as-is. If you use JWT, you can forget about them...
* [Laravel data provider](src/providers/laravelDataProvider.js) which has full compatibility with Laravel resource API and work with [Spatie query builder](https://github.com/spatie/laravel-query-builder) for browsing resources. You can use your own provider for any type of backend simply by implementing [data actions methods](src/utils/dataActions.js) which allow full compatibility with Vtec Admin.

> Both providers needs axios in order to work, you can simply add it by `vue add axios`

## Included cmponents

### Layout

Standard admin layout with :

* App header bar with customizable links and profile links
* Sidebar for advanced menu, with hierarchy and icons
* Breadcrumbs
* Aside panel where you can put anything you want
* App footer with customizable links and corporate message
* Multi UI language (en and fr), takes browser language as default

### CRUD

Classic crud pages that can be generated :

* List : classic resource browser, paginable, filtrable, multi-sortable and exportable. Has global SQL Like search filter and use dumb datagrid component by default that can be replaced by your own custom data-iterable layout list component.
* Show : entirely customizable layout show page. Use fields components as formatted show for each resource properties.
* Create : form page for new resource creation. Can use an other existing resource as source for input prefilling (clone).
* Edit : customizable form page for an existing resource. Ideal place (as show page) for add other related resources with prefiltred datagrid list.

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
* ReferenceField

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
