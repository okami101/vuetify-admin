# Getting Started

Even if Vtec Admin can be used as standalone NPM package via `yarn add vtec-admin`, the recommended way is to use dedicated [Vue CLI plugin](https://www.npmjs.com/package/vue-cli-plugin-vtec-admin) on fresh Vuetify app project.  
It takes care of all minimal boilerplate code generation for quick start admin development as well as including material theme and UI CRUD generators scripts.

You should have a separate API backend project for real development. Fortunately you can quickly start with a fully functional Laravel API backend thanks to separated [Vtec Laravel Crud](https://github.com/okami101/vtec-laravel-crud) composer package. As a bonus, this package will used an integrated Vue CLI preset for even less install steps.

:::tip API
If you choose Laravel as API backend, jump to the more optimized [Laravel installation section](laravel) steps.  
As of today, only Laravel providers are available. So for all other types of backend, you'll need to implements your own data and auth providers which will ensure compatibility between VA and your backend. Follow [this separate guide](data-providers) in order to get into it.
:::

## Use Vue CLI Plugin

> As a CLI projet, be sure to have installed [Vue CLI](https://cli.vuejs.org/guide/installation.html).

### Prepare

Initialize your brand new Vue CLI admin project by `vue create admin` and go enter by `cd admin`.

Then install all required plugins.

```bash
vue add router # if not already selected at project init
vue add vuex # if not already selected at project init
vue add vuetify # the main UI framework
vue add i18n # the internationalization plugin
```

### Installation

Then you can finally launch `vue add vtec-admin` which will do all this steps :

* Install main Vtec Admin library
* Install third-party required dependencies as [PortalVue](https://portal-vue.linusb.org/), [Vue.Draggable](https://github.com/SortableJS/Vue.Draggable)
* Generate inside your project all minimal boilerplate code to quickly start :
  * Nice material theme as superset on Vuetify
  * Explicit preload of all Vuetify components used by Vtec Admin (because a-la-carte mode can't work on precompiled libs)
  * Initialize admin plugin with automatic crud pages webpack context preload and create base admin layout page on your App.vue entry file
  * Login page plugged with default [Laravel Sanctum](https://github.com/laravel/sanctum) auth provider (totally replaceable by [your own provider](auth-providers))
  * Static dashboard sample with usage of [Chartist.js](https://gionkunz.github.io/chartist-js/)
  * Functional basic profile edition page
  * User management page list with direct aside creation / show / edition
* Add UI CRUD generators scripts

If your backend run different address than [http://localhost:8000](http://localhost:8000) (which is admin API default url), edit `VUE_APP_API_URL` environment variable according to inside `.env.local`.

> On production, don't forget to adapt BASE_URL and VUE_APP_API_URL variables. The general use case is to put this inside `.env.local` :

```env
VUE_APP_API_URL=/
BASE_URL=/admin
```

> For TinyMCE 5 usage, you may add your own api key :

```env
VUE_APP_TINYMCE_API_KEY=my_api_key
VUE_APP_TINYMCE_LANGUAGE=my_default_locale
```

Finally start your admin panel by `yarn serve`. Don't forget to have your backend running next to.

This plugin will also add 2 new npm generator scripts, [see dedicated section](generators) for more detail.

## Bare metal installation

If you can't use dedicated Vue CLI plugin, you have to install main Vtec Admin library as-is. First add all required dependencies by `yarn add vue-router vuex vuetify vue-i18n vtec-admin portal-vue vuedraggable`. Then you import and register them as following.

<code-heading type="js" path="src/plugins/admin.js"></code-heading>
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
