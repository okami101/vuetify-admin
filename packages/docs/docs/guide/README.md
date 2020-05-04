# Introduction

Vtec Admin (VA) is an standalone SPA admin library for Vue.js designed for running on top of REST APIs. It's built on Vuetify and comes with dedicated Vue CLI plugin for RAD. It relies on replaceable low-level data and auth providers which allows you to choose your favorite backend framework.

Actually only Laravel providers are included but it's not that complicated to create your own by implementing specific contract which will ensure compatibility within VA. Follow [dedicated guide](data-providers.md) to know how it works.

## How It Works

![Architecture](/diagrams/architecture.svg)

> Legend

VA is composed of this basic elements :

- **Route and Module builders** which takes your resources (a simple JS array of resources object) and :
  - Register all necessary **CRUD routes** into existing Vue Router instance. Each route will use your defined CRUD page by following a naming convention.
  - Register **resources modules** into Vuex for data fetching. All of this modules will be bridged to your own data provider.
- **Contextual aware components**, that we can group into 3 categories :
  - **Layout components** built on top of Vuetify with App Bar, Navigation Drawer with hierarchical sidebar, Aside, Footer, User account menu.
  - **Pages components** which should be used as root components for your cruds pages. We will find here all contextualised CRUD buttons, as well as Data Iterator which can be associated to a datagrid or any custom layout.
  - **Fields and inputs components** which are superset of existing Vuetify components that will be mainly used on show and create/edit pages. Their functions is to heavily simplify the amount of code needed to made a functional CRUD page. All of this components shares a mixin which can be used for create your own VA compatible components.

To summary, VA will do this steps :

1. Takes your resources object and convert then as valid CRUD routes linked to your pages and Vuex modules linked to your data provider.
2. All internal VA components will be aware of the real context according to current route and use the adapted resource module for fetching or save to the API through data provider which acts as compatibility layer between VA and your API. In result, this pattern allows obviously far less boilerplate code needed in order to get CRUD working.

## Main features

**Quick starter**

- [Vue CLI Plugin](getting-started) : for immediate start
- [Vtec Laravel Crud](laravel) : for complete top to bottom development experience

**Powerful code generators**

- [CRUD generators](tutorial) : follow this really quick tutorial in order to understand possibility
- [YAML](generators) : more detailled section with JSON schema used

**Powerful resources builer**

VA will try to integrate within all of your existing plugins without hoisted them.

- [VA usage](admin) : How to use VA constructor
- [Resources](resources) : expected format of resource object
- [Internationalization](i18n) : 100% localizable resources via vue-i18n by following simple rules
- [Layout](layout) : Customizable menus

**All essential components**

- [Full-featured Datagrid](components/list) : multi-sort, pagination, global search, advanced filters, CSV export
- [Internal CRUD views](components/crud) : For detail or edition of any resources
- [Form](components/crud#form) : Global unique form V-model and server-side validation
- [Translatable fields](components/crud#translatable) : context switching resource locale
- [Fields](components/fields) : for list or show views, extensibles with your own fields
- [Inputs](components/inputs) : for all create / edit forms, extensibles with your own inputs

**Free of any backend**

Customizable providers by implementing a simple contract :

- [Auth providers](auth-providers)
- [Data providers](data-providers)
- [Authorization](authorization) : User permissions available everywhere

## Why Not ...?

### React Admin

- [React Admin](https://github.com/marmelab/react-admin/), the closest to VA admin panel but for React world. Far more mature, well tested, with bigger and bigger community. This is the funniest way for admin development and is the SPA admin framework I highly recommend.

:::warning NOTE
RA has a more extreme [DSL](https://en.wikipedia.org/wiki/Domain-specific_language) approach than VA by magical injection of props from parent to direct child components, which leads to well defined component responsibility and better testability. For VA I prefered a more flexible and Vue.js way to get global props usable on any templates. It mean's a simpler development in price of little more boilerplate code.
:::

### Other well known backend coupled admin builders

#### Nova

- [Official Laravel Nova](https://nova.laravel.com/), not free and expensive, but full featured, good community and very efficient SPA admin builder for Laravel with Vue.js. Beautiful UI Framework and nice Laravel-ish development experience. But tends to be a Nova-way for development.

#### EasyAdmin

- [EasyAdmin](https://github.com/EasyCorp/EasyAdminBundle), opensourced and free admin builder for Symfony with good old Bootstrap / jQuery and configuration-oriented development. Not many widgets by default but efficient and heavily configurable by YML config files and extendable with twig templates.

#### A very subjective comparison

| Features               | Vtec Admin | React Admin  | EasyAdmin | Nova | Backpack |
| ---------------------- | ---------- | ------------ | --------- | ---- | -------- |
| SPA                    | X          | X            |           | X    |          |
| Backend independency   | X          | X            |           |      |          |
| Backend helpers        | X          | Api Platform | X         | X    | X        |
| Fun                    | +++        | +++          | +         | ++   | -        |
| Code generators        | X          |              |           |      |          |
| Ready-to-go features   | ++         | -            | +         | +++  | +++      |
| Edge case managment    | ++         | +++          | -         | ++   | +        |
| Maturity / Community   | ---        | +++          | +         | ++   | +        |
| Free Licence           | X          | X            | X         |      |          |
