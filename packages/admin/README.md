# Vtec Admin

SPA admin library for Vue.js running on top of REST APIs, built on top of Vuetify and come with dedicated Vue CLI plugin. Can be used on every backend of your choice with your own data and authentication providers.

> See [full documentation](https://vtec.okami101.io)  
> Check [online demo](https://vtec-bookstore-demo.okami101.io/admin) and use prefilled login (read only)

[![sc](https://user-images.githubusercontent.com/3679080/80732263-58913080-8b0c-11ea-9074-56668c44a876.png)](https://vtec-bookstore-demo.okami101.io/admin)

## Features

See [main readme](https://github.com/okami101/vtec-admin#features) of this repo for detail.

## Usage

Even if this package can be used as standalone NPM package, the recommended way is to use dedicated [Vue CLI plugin](https://www.npmjs.com/package/vue-cli-plugin-vtec-admin) on fresh Vuetify app project.  
It takes care of all minimal boilerplate code generation for quick start admin development as well as including material theme and UI CRUD generators scripts.  
See [separate readme](https://www.npmjs.com/package/vue-cli-plugin-vtec-admin#prepare) of this plugin for installation detail.

> If you choose to start with a Laravel backend, I recommend you to use [this installation guide](https://github.com/okami101/vtec-laravel-crud#installation) for even more top to bottom optimized quick start.

### Bare metal installation

If you really want to install this library as-is, you'll need to add all required dependencies by `yarn add vue-router vuex vuetify vue-i18n vtec-admin portal-vue vuedraggable`. Then you can import and register them by :

```js
import Vue from "vue";
import VtecAdmin from "vtec-admin";

// Register all used Vuetify components
import "vtec-admin/dist/vuetify";
// Import custom admin CSS
import "vtec-admin/dist/admin.css";

import PortalVue from "portal-vue";
import draggable from "vuedraggable";

Vue.use(VtecAdmin);
Vue.use(PortalVue);
Vue.component("draggable", draggable);
```

Then instanciate VtecAdmin object with all required options (I wish you good luck...).

### [Instanciation](#instanciation)

In order to operate, VtecAdmin constructor needs all of this options :

* Vue Router instance, which can contains all your custom routes, for automatic resource URL Crud pages registering.
* Vue Store instance, which can contains all your custom modules, for automatic resource API modules bridge registering.
* Vue I18n instance, which can contains all your custom localized labels, for full internationalization support.
* Title of your admin app.
* At least one provided locale, only `en` and `fr` are 100% supported, but you can easily add your own by following [this model](src/locales/fr.json).
* Auth and data providers (see next section).
* Optional file browser URL, which will appear on included TinyMCE file picker.
* A resources array which contain all resources to administer. Each resource can have :
  * A mandatory slug name which will be used for api url calls.
  * An icon for identify it in sidebar or list page.
  * Indicator if this resource can be translated, in this case, a new query string with locale will be added on each api calls, it's up to you to handle it on backend.
  * List of available actions for this resource. By default all 5 operations are active (list / show / create / edit / delete). You can use `except` or `only` properties for blacklist or whitelist few actions. All removed actions will reflected on all crud pages and Vue Router will be adapted accordingly.
  * Permissions for user resource operations filtering.

> Check code sample on [main readme](https://github.com/okami101/vtec-admin#code)

## Included auth and data Providers

* [Laravel Sanctum auth provider](src/providers/sanctumAuthProvider.js) which use good old full state cookies authentication. You are free to replace it by your own provider by implementing [auth actions methods](src/utils/authActions.js). JWT is a more common way for SPA app but is also sensitive to XSS attacks, contrary to standard cookies if set to http only. If admin app is on the same main domain, it's often preferable to stay with cookies. Besides, this is by far the easiest way to get impersonation and elFinder (best known of PHP files manager) working as-is. If you use JWT, you can forget about them...
* [Laravel data provider](src/providers/laravelDataProvider.js) which has full compatibility with Laravel resource API and work seamlessly with [Spatie query builder](https://github.com/spatie/laravel-query-builder), the ideal package for browsing resources. But as this package is intended to be fully independent of any backends, you can obviously use your own provider for any type of backend by implementing [data actions methods](src/utils/dataActions.js) which allow full compatibility with Vtec Admin.

> Both included providers needs [axios](https://github.com/axios/axios) in order to work.

## Included components

### Layout

Standard admin layout with :

* App header bar with customizable links and profile links
* Sidebar for hierarchical menu with icons
* Breadcrumbs
* Aside panel where you can put anything you want on any context
* App footer with customizable links and corporate message
* Multi UI language (en and fr), takes browser language as default

### CRUD

Classic crud pages that can be generated with CLI plugin :

* List : classic resource browser, paginable, filtrable as-you-type, multi-sortable and exportable. Can have global SQL like search filter as well as advanced specific filters. Use datagrid component by default that can be replaced by your own custom data-iterable layout list component.
* Show : entirely customizable layout show page. Use fields components as formatter for each resource properties.
* Create : form page for new resource creation. Can use an other existing resource as source for input prefilling (clone).
* Edit : customizable form page for an existing resource. Ideal place (as show page) for adding other related resources with contextualized datagrid or any other layout you want.

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

> You can create you custom fields by creating your own vue component which extend this specific mixin `vtec-admin/mixins/field`;

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

> You can create you own input by creating your own vue component which extend this specific mixin `vtec-admin/mixins/input`;

## Internationalization

All localoized resource specific labels should be added to your own i18n json locale (`src/locales/[locale].json` as default for vue-i18n), by following a specific structure. Example for `monsters` resource :

* For resource name : `resources.monsters.name`, should have both singular and plural format separated by a pipe.
* For each field label : `resources.monsters.fields.[my-field]`
* For each specific resource enum (choices) : `resources.monsters.enums.[my-enum]`, mostly used for radio and simple select fields and inputs as default choices if none has been set.

Sample :

```json
{
  "resources": {
    "users": {
      "name": "User | Users"
    },
    "monsters": {
      "name": "Monster | Monsters",
      "fields": {
        "name": "Name",
        "email": "Email"
      },
      "enums": {
        "category": {
          "history": "History",
          "novel": "Novel",
          "comics": "Comics"
        }
      }
    }
  }
}
```

## Full documentation

Full documentation can be found on the [Vtec docs website](https://vtec.okami101.io).

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
