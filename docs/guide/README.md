# Introduction

[Vuetify Admin](https://www.npmjs.com/package/vuetify-admin) (VA) is an standalone [SPA](https://en.wikipedia.org/wiki/Single-page_application) admin UI framework for Vue.js designed for building CRUD pages for managing remote server resources with minimal amount of code while allowing large customization. It's built on Vuetify, runs on top of REST APIs and comes with dedicated [Vue CLI plugin](https://www.npmjs.com/package/vue-cli-plugin-vuetify-admin) for [RAD](https://en.wikipedia.org/wiki/Rapid_application_development).

It relies on replaceable low-level data and auth providers which allows you to stay independent of any backend framework. This is simply doable by implementing specific contract which will ensure compatibility within VA. Follow [dedicated guide](data-providers.md) for further detail.

::: tip RESOURCE
For next guide, a **resource** means a given server API entity which can be managed by Vuetify Admin, i.e. created/read/updated/deleted.
:::

## Purpose

His main purpose is to accelerate resources CRUD UI development in a full SPA, while allowing full customization by delivering full Vue.js power at hand. This is possible by reducing most of CRUD code boilerplate by following a [DSL](https://en.wikipedia.org/wiki/Domain-specific_language) approach and using powerful code generators. To summary :

* Nice ready-to-go Vuetify UI theme.
* SPA admin which delivers complete Vue.js power for admin UI development.
* Full backend independence by relying on low-level and replaceable auth and data providers.
* [DSL](https://en.wikipedia.org/wiki/Domain-specific_language) approach, minimal boilerplate code for best development experience.
* Powerful API (Laravel only) and UI code generators for highest productivity.
* Best balance between productivity and customization.
* Maximize usage of many other open source projects.

See it as a Vue.js little brother equivalent to well known battle tested [React Admin](https://github.com/marmelab/react-admin/).

::: danger ALPHA STATUS
This project is still experimental on alpha version and BC can be frequent. Actually without any test suite and therefore not really suited for production unless you feel adventurous.
:::

## How It Works

**Vuetify Admin :**

* VAConstructor : resources builder of Vuetify Admin, transform resources object ino CRUD VueRoutes and Vuex modules
* VAComponents : contextual resources aware components

**Your codebase :**

* Resources : simple JS array of resources descriptor object
* VueRouter : CRUD pages which uses VAComponents and API resources objects
* Providers : Bridge between resources modules and your API which ensure compatibility within VA

![Architecture](../diagrams/architecture.svg)

VA is composed of this basic elements :

* **Route and Module builders** which takes your resources (a simple JS array of resources object) and :
  * Register all necessary **CRUD routes** into existing Vue Router instance. Each route will use your defined CRUD page by following a naming convention.
  * Register **resources modules** into Vuex for data fetching. This modules will be bridged to your data provider.
* **Contextual aware components**, that we can group into 3 categories :
  * **Layout components** built on top of Vuetify with App Bar, Navigation Drawer with hierarchical sidebar, Aside, Footer, User account menu.
  * **Pages components** which should be used as root components for your cruds pages. We will find here all contextualized CRUD buttons, as well as Data Iterator which can be associated to a data table or any custom layout.
  * **Fields and inputs components** which are superset of existing Vuetify components that will be mainly used on show and create/edit pages. Their functions is to heavily simplify the amount of code needed to made a functional CRUD page. All of this components shares a mixin which can be used for create your own VA compatible components.

To summary :

1. VA will takes your resources object and convert then as valid routes that will point towards your CRUD pages and Vuex modules that will call your implemented data provider methods.
2. All internal VA components will be aware of the real context according to current route and use the adapted resource module for fetching or save to the API through data provider which acts as compatibility layer between VA and your API. As a result, this pattern allows far less boilerplate code needed in order to get CRUD working.

## Main features

**Quick starter :**

* [Vue CLI Plugin](getting-started.md) : for immediate start.
* [Tutorial](tutorial.md) : follow this quick tutorial if you want a good starting point.
* [API Platform](api-platform.md) : tutorial with advanced backend API for more real use case.
* [Laravel Admin](laravel.md) : for complete top to bottom development experience with Laravel backend.

**Resources builder :**

VA will try to integrate within all of your existing plugins without hoisted them.

* [VA usage](admin.md) : How to use VA constructor.
* [Resources](resources.md) : expected format of resource object.
* [Internationalization](i18n.md) : 100% translatable resources via vue-i18n by following simple rules.
* [Layout](crud/layout.md) : Customizable menus.

**All essential components :**

* [Full-featured DataTable](crud/list.md) : multi-sort, pagination, global search, advanced filters, CSV export.
* [Show view](crud/show.md) : For show detail of any resources.
* [Form](crud/form.md) : Global unique form V-model and server-side validation.
* [Fields](components/fields.md) : for list or show views, extensible with your own fields.
* [Inputs](components/inputs.md) : for all create / edit forms, extensible with your own inputs.

**Free of any backend :**

Customizable providers by implementing a simple contract :

* [Data providers](data-providers.md).
* [Auth providers](authentication.md).
* [Authorization](authorization.md) : User permissions available everywhere.

**Code generators :**

* [Generators](generators.md) : YAML driven development that follows a JSON schema.

## Other admin builders

### React Admin

* [React Admin](https://github.com/marmelab/react-admin/) for React world. Far more mature than VA, highly tested, with bigger and bigger community. Free licence and actually the funniest way for admin development and is the SPA admin framework I highly recommend. Not the most productive as is (no backend helpers if we exclude [API Platform](https://github.com/api-platform/api-platform)), and highest learning curve compared to the others.

### Free Symfony admin panels

* [EasyAdmin](https://github.com/EasyCorp/EasyAdminBundle), very efficient and heavily configurable. The recent V3 finally [give up the YAML hell](https://symfony.com/doc/master/bundles/EasyAdminBundle/upgrade.html) and return to more configurable pure PHP code setup inside controllers. This way is therefore very similar to below Laravel Backpack but with the pro of free licence and nicer API and the con of less available widgets by default although you can easily create some custom one. Powerful maker generators included as well.
* [Sonata Admin](https://github.com/sonata-project/SonataAdminBundle), maybe one of the most powerful free admin panel on the market, but slow evolution, no Symfony 5 compatibility yet and not really the best seamless development experience (personal opinion) with still old Admin LTE with Bootstrap 3... With the last V3 release, the above EasyAdmin has clearly taken the lead as far as I'm concerned.

### Laravel admin panels

* [Official Laravel Nova](https://nova.laravel.com/), commercial product, full featured, good community and very efficient SPA admin builder for Laravel with Vue.js. Beautiful UI Framework and nice Laravel-ish development experience. But tends to be a Nova-way for development.
* [Backpack](https://backpackforlaravel.com/), not free for commercial projects, with the good old school Bootstrap/jQuery combo with CoreUI theme. Can have quickly bloated code in case of specific custom development needs, but still stay one of the most productive admin panel on the market with a tons of widgets.
* [Voyager](https://voyager.devdojo.com/), another free admin panel for Laravel, more CMS oriented with all field configs stored inside database.

### Experimental Vuetify SPA Admin projects

* [Vue Admin](https://github.com/Cambalab/vue-admin)
* [Vue Crud](https://github.com/what-crud/vue-crud)

### A very subjective comparison

| Features             | Vuetify Admin | React Admin | EasyAdmin | Nova    | Backpack |
| -------------------- | ---------- | ----------- | --------- | ------- | -------- |
| SPA                  | X          | X           |           | X       |          |
| Standalone UI        | X          | X           |           |         |          |
| Backend helpers      | Laravel    | -           | Symfony   | Laravel | Laravel  |
| Fun (subjective)     | +++        | +++         | ++        | ++      | +        |
| Ready-to-go*         | ++         | -           | +         | +++     | +++      |
| Customization        | ++         | +++         | ++        | ++      | +        |
| Maturity / Community | ---        | +++         | +         | ++      | +        |
| Free Licence         | X          | X           | X         |         |          |

> \* Comes with ready top to bottom functional backend site with basic working Admin UI, with authentication, profile, impersonation, file browser, users management, real Wysiwyg with image upload handling (no base64), resources translations, etc.
