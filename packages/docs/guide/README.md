# Introduction

Vtec Admin (VA) is an standalone [SPA](https://en.wikipedia.org/wiki/Single-page_application) admin library for Vue.js designed for managing server resources and running on top of REST APIs. It's built on Vuetify and comes with dedicated Vue CLI plugin for [RAD](https://en.wikipedia.org/wiki/Rapid_application_development). It relies on replaceable low-level data and auth providers which allows you to choose your favorite backend framework.

Actually only Laravel providers are included but it's not that complicated to create your own by implementing specific contract which will ensure compatibility within VA. Follow [dedicated guide](data-providers.md) to know how it works.

> For next guide, a "resource" means a given server entity which can be managed by Vtec Admin, aka created/read/updated/deleted.

## Purpose

His main purpose is to accelerate SPA resources management development, aka CRUD RAD, on both API and UI side, while allowing full customization on UI by delivering full Vue.js power at hand. This is possible by reducing most of CRUD code boilerplate by following a [DSL](https://en.wikipedia.org/wiki/Domain-specific_language) approach and using powerful code generators. To summary :

* Nice ready-to-go Vuetify UI theme.
* SPA admin which delivers complete Vue.js power for admin UI development.
* Full backend independence by relying on low-level and replaceable auth and data providers.
* [DSL](https://en.wikipedia.org/wiki/Domain-specific_language) approach, minimal boilerplate code for best development experience.
* Powerful API (Laravel only) and UI code generators for highest productivity.
* Best balance between productivity and customization.
* Maximize usage of many other opensource projects.

This is a sort of Vue.js little brother equivalent to well known [React Admin](https://github.com/marmelab/react-admin/), which uses even more extensive DSL approach.

## How It Works

> Vtec Admin
>
> * VAConstructor : resources builder of Vtec Admin, transform resources object ino CRUD VueRoutes and Vuex modules
> * VAComponents : contextual aware components
>
> Your codebase
>
> * Resources : simple JS array of resources descriptor object
> * VueRouter : CRUD pages which uses VAComponents and API translated resources
> * Providers : Bridge between resources modules and your API which ensure compatibility within VA

![Architecture](/diagrams/architecture.svg)

VA is composed of this basic elements :

* **Route and Module builders** which takes your resources (a simple JS array of resources object) and :
  * Register all necessary **CRUD routes** into existing Vue Router instance. Each route will use your defined CRUD page by following a naming convention.
  * Register **resources modules** into Vuex for data fetching. All of this modules will be bridged to your own data provider.
* **Contextual aware components**, that we can group into 3 categories :
  * **Layout components** built on top of Vuetify with App Bar, Navigation Drawer with hierarchical sidebar, Aside, Footer, User account menu.
  * **Pages components** which should be used as root components for your cruds pages. We will find here all contextualised CRUD buttons, as well as Data Iterator which can be associated to a datatable or any custom layout.
  * **Fields and inputs components** which are superset of existing Vuetify components that will be mainly used on show and create/edit pages. Their functions is to heavily simplify the amount of code needed to made a functional CRUD page. All of this components shares a mixin which can be used for create your own VA compatible components.

To summary, VA will do this steps :

1. Takes your resources object and convert then as valid CRUD routes linked to your pages and Vuex modules linked to your data provider.
2. All internal VA components will be aware of the real context according to current route and use the adapted resource module for fetching or save to the API through data provider which acts as compatibility layer between VA and your API. In result, this pattern allows obviously far less boilerplate code needed in order to get CRUD working.

## Main features

**Quick starter**

* [Vue CLI Plugin](getting-started.md) : for immediate start
* [Vtec Laravel Crud](laravel.md) : for complete top to bottom development experience

**Powerful code generators**

* [CRUD generators](tutorial.md) : follow this really quick tutorial in order to understand possibility
* [YAML](generators.md) : more detailled section with JSON schema used

**Powerful resources builer**

VA will try to integrate within all of your existing plugins without hoisted them.

* [VA usage](admin.md) : How to use VA constructor
* [Resources](resources.md) : expected format of resource object
* [Internationalization](i18n.md) : 100% localizable resources via vue-i18n by following simple rules
* [Layout](layout.md) : Customizable menus

**All essential components**

* [Full-featured DataTable](crud/list.md) : multi-sort, pagination, global search, advanced filters, CSV export
* [Internal CRUD views](crud/show.md) : For detail or edition of any resources
* [Form](crud/form.md) : Global unique form V-model and server-side validation
* [Translatable fields](crud/show.md#translatable) : context switching resource locale
* [Fields](components/fields.md) : for list or show views, extensibles with your own fields
* [Inputs](components/inputs.md) : for all create / edit forms, extensibles with your own inputs

**Free of any backend**

Customizable providers by implementing a simple contract :

* [Auth providers](authentication.md)
* [Data providers](data-providers.md)
* [Authorization](authorization.md) : User permissions available everywhere

## Why Not ...?

### React Admin

* [React Admin](https://github.com/marmelab/react-admin/), the closest to VA admin panel but for React world. Far more mature, well tested, with bigger and bigger community. This is the funniest way for admin development and is the SPA admin framework I highly recommend.

:::warning NOTE
RA has a more extreme [DSL](https://en.wikipedia.org/wiki/Domain-specific_language) approach than VA by magical injection of props from parent to direct child components, which leads to well defined component responsibility and better testability. For VA I prefered a more flexible and Vue.js way to get global props usable on any templates. It mean's a simpler development in price of little more boilerplate code.
:::

### Other well known backend coupled admin builders

#### Nova

* [Official Laravel Nova](https://nova.laravel.com/), not free and expensive, but full featured, good community and very efficient SPA admin builder for Laravel with Vue.js. Beautiful UI Framework and nice Laravel-ish development experience. But tends to be a Nova-way for development.

#### EasyAdmin

* [EasyAdmin](https://github.com/EasyCorp/EasyAdminBundle), opensourced and free admin builder for Symfony with good old Bootstrap / jQuery and configuration-oriented development. Not many widgets by default but efficient and heavily configurable by YML config files and extendable with twig templates.

#### A very subjective comparison

| Features             | Vtec Admin | React Admin  | EasyAdmin | Nova | Backpack |
| -------------------- | ---------- | ------------ | --------- | ---- | -------- |
| SPA                  | X          | X            |           | X    |          |
| Backend independency | X          | X            |           |      |          |
| Backend helpers      | X          | Api Platform | X         | X    | X        |
| Fun                  | +++        | +++          | +         | ++   | -        |
| Code generators      | X          |              |           |      |          |
| Ready-to-go features | ++         | *            | +         | +++  | +++      |
| Edge case managment  | ++         | +++          | *         | ++   | +        |
| Maturity / Community | ---        | +++          | +         | ++   | +        |
| Free Licence         | X          | X            | X         |      |          |
