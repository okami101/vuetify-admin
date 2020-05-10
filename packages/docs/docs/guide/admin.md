# Admin

The next piece of code represent the bare minimal code in order to get VtecAdmin working :

**`src/plugins/admin.js`**

```js
import Vue from "vue";
import VtecAdmin from "vtec-admin";

/**
 * Register all third-party components as Portal Vue, Vuedraggable
 * Will automatically load all CRUD pages resources as well
 */
import "vtec-admin/dist/loader";
// Import custom admin CSS
import "vtec-admin/dist/admin.css";

// Load data and auth providers to use with your API
import { laravelDataProvider, sanctumAuthProvider } from "vtec-admin";

// UI locales your want to support
import { en, fr } from "vtec-admin";

// Custom authenticated admin pages as dashboard, profile, etc.
import routes from "@/router/admin";

// Resources to register into VA
import resources from "@/resources";

// Main required Vue libraries instances
import router from "@/router";
import store from "@/store";
import i18n from "@/i18n";

// Axios as default HTTP client
import axios from "axios";

// Load Admin UI components
Vue.use(VtecAdmin);

// Create global axios instance, it will bridged into above providers
const http = axios.create();
Vue.prototype.$axios = http;

// Main VA constructor that will build resources routes and modules
export default new VtecAdmin({
  router,
  store,
  i18n,
  title: "My Admin App",
  routes,
  locales: { en, fr },
  translations: {
    en: i18n.t("locales.english"),
    fr: i18n.t("locales.french"),
  },
  authProvider: sanctumAuthProvider(http),
  dataProvider: laravelDataProvider(http),
  fileBrowserUrl: '/elfinder/tinymce5',
  resources,
});
```

The main steps are :

* Register all third-party components as Portal Vue, Vuedraggable as well as CRUD pages resources from `resources` directory.
* Import custom CSS.
* Load providers, locales, admin routes.
* Load resources you want to register.
* Get current instances of Vue Route, Vuex and Vue I18n.
* Load VA UI components.
* Initiate VA by his constructor.

:::tip BOILERPLATE
All this boring stuf are already prepared for you by the offical [Vue CLI Plugin](https://www.npmjs.com/package/vue-cli-plugin-vtec-admin), go to [Getting Started](getting-started) in order to get in through.
:::

## Components & resources loading

In order to work, you need to load all Vuetify components used by VA manually. Indeed, as VA is precompiled as a standalone library, [a-la-carte](https://vuetifyjs.com/en/customization/a-la-carte/#a-la-carte-treeshaking) (the Vuetify treeshaking system) will not work as-is. All you have to do is to import `vtec-admin/dist/vuetify` which will load all necessary components inside `src/plugins/vuetify.js` file. You can remove `Vue.use(Vuetify)` line as it's already done by the import.

> TL;DR : add `import "vtec-admin/dist/vuetify"` and remove `Vue.use(Vuetify)` inside **`src/plugins/vuetify.js`**

:::warning IMPORT LOCATION
This import line should be in `src/plugins/vuetify` for avoiding CSS overrides issues
:::

Next, you have to import VA loader which import some external third-party components as well as all your CRUD pages, which will avoid us to the immensely boring manual import.

> TL;DR : add `import "vtec-admin/dist/loader"` inside **`src/plugins/vuetify.js`**

Finally, in you entrypoint, don't forget to add `vuetify` and `admin` into main Vue constructor options. It will register `$admin` global object into all of your Vue components, which allows you to use some useful helper functions.

**`src/main.js`**

```js{2-3,10-11}
// ...
import vuetify from "./plugins/vuetify";
import admin from "./plugins/admin";
// ...

new Vue({
    router,
    store,
    i18n,
    vuetify,
    admin,
    render: (h) => h(App),
}).$mount("#app");
```

## Instantiation

In order to operate, VtecAdmin constructor needs all of this parameters :

* Vue Router instance, which can contains all your public custom routes.
* Vue Store instance, which can contains all your custom modules, for automatic resource API modules bridge registering.
* Vue I18n instance, which can contains all your custom localized labels, for full internationalization support.
* Title of your admin app.
* List of authenticated routes, which will inherit from all admin layout. All resources routes CRUD pages will be registered here as children.
* At least one provided locale, only `en` and `fr` are 100% supported, but you can easily add your own by following [this model](src/locales/fr.json).
* All supported traductions for your resources. More detail [here](i18n).
* [Auth](authentication) and [data](data-providers) providers.
* Optional file browser URL, which will appear on included TinyMCE file picker.
* A resources array which contain all resources to administer. More detail of resource object structure [here](resources).

![instantiation](/diagrams/instantiation.svg)

> Vtec Admin will transform your resources into client-side CRUD routes and valid Vuex modules for data fetching. This modules will be able to seamlessly communicate to your API server thanks to your injected providers which will do the conversion work. See [how it works](guide/#how-it-works). More explanation in code initialization inside [admin guide section](guide/admin). This "boilerplate code" can be automatically pre-generated by [Vtec Admin Vue CLI Plugin](https://www.npmjs.com/package/vue-cli-plugin-vtec-admin).
