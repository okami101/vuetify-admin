# Getting Started

Even if Vtec Admin can be used as standalone NPM package via `yarn add vtec-admin`, the recommended way is to use dedicated [Vue CLI plugin](https://www.npmjs.com/package/vue-cli-plugin-vtec-admin) on fresh Vuetify app project.  
It takes care of all minimal boilerplate code generation for quick start admin development as well as including material theme and UI CRUD generators scripts.

::: tip TUTORIAL
If first discover, I highly recommend you to go through the [tutorial](tutorial.md) for step-by-step Vtec Admin showcase using a fake API server.
:::

## Use Vue CLI Plugin

![demo](/assets/dashboard.png)

> As a CLI project, be sure to have installed [Vue CLI](https://cli.vuejs.org/guide/installation.html).

### Install

::: tip BACKEND API
You should have a separate API backend project before using this package.

Fortunately you can quickly start with a fully functional Laravel API backend thanks to separated [Vtec Laravel Crud](https://github.com/okami101/vtec-laravel-crud) composer package. As a bonus, this package will use an integrated laravel optimized Vue CLI preset for even less install steps. Go [here](laravel.md) for full showcase.

In case you want to use it on your custom API, you may probably need to write your own [data provider](data-providers.md).
:::

Initialize your brand new Vue CLI admin project with this single line command :

```bash
vue create my-admin-project --preset okami101/vtec-admin-preset
```

In the end you should arrive to a wizard installer. Select suited options according to your needs.

Finally start your admin panel by `yarn serve`. Don't forget to have your backend running next to. Now you have a full basic admin working and are ready to start !

::: tip PRODUCTION
On production, you may need to adapt `BASE_URL` and `VUE_APP_API_URL` variables. If your admin app relies on specific `admin` sub folder of main API backend, the general use case is to put next values inside `.env.local` :

```env
VUE_APP_API_URL=/
BASE_URL=/admin
```

:::

#### Under the hood

This above command use [this online preset](https://github.com/okami101/vtec-admin-preset/blob/master/preset.json) which will initialize all admin project by preparing a valid basic Vuetify project with proper Vue router and Vuex as well as installing Vtec Admin CLI plugin.

It's equivalent to :

```bash
vue create admin
# select at least the Router, the Vuex as well as a code style formatter like Prettier
cd admin
vue add vuetify # the main UI framework
vue add i18n # the internationalization plugin
vue add vtec-admin # install the main admin library
```

:::warning CODE STYLING
A CS for Eslint is heavily recommended, besides without this a strange `transpileDependencies` duplication error will occurs on Vtec install because a shitty hack of official [Vuetify CLI plugin](https://github.com/vuetifyjs/vue-cli-plugins/blob/master/packages/vue-cli-plugin-vuetify/generator/tools/vuetify.js) which rewrite all `vue.config.js` instead of using `extendPackage` Vue CLI API...
:::

The final Vtec Admin installer command will do all this steps :

* Install main Vtec Admin library.
* Install third-party required dependencies as [PortalVue](https://portal-vue.linusb.org/), [Vue.Draggable](https://github.com/SortableJS/Vue.Draggable).
* Add UI CRUD generators scripts, [see dedicated section](generators.md) for more detail.
* Generate inside your project all minimal boilerplate by selecting them via on-demand wizard for quick start :
  * Data provider, select [custom implementation](data-providers.md) if you intend to use it with your own API. It will prepare for you a basic implemented data provider file.
  * Auth provider, between stateless JWT, basic HTTP, fake testing or full state auth with cookies for [Laravel Sanctum](https://github.com/laravel/sanctum). Provide a login page unless you choose guest mode. Select custom for if you intend to use a [custom provider](authentication.md) by starting with an empty implemented file.
  * Pre configured API URL endpoint for above providers using axios.
  * Supported UI locales.
  * Basic profile edition page with password change support. You'll need to [configure endpoints](authentication.md#profile-page) for profile update on API side.
  * User management single page list default template with direct aside creation / show / edition.
  * Add impersonation components if your API support it.
  * [Material theme by Creative Tim](https://github.com/creativetimofficial/vuetify-material-dashboard) as a superset theme on Vuetify with nice static dashboard sample using [Chartist.js](https://gionkunz.github.io/chartist-js/).
  * Finally initialize admin plugin with automatic crud pages webpack context load and create base admin layout page.

### Directory structure

Once installation finished, you should get this following `src` directory structure (main elements you should know are `highlighted`) :

:::vue
src
├── assets
│   ├── logo.svg _(**Brand logo used on login and error pages**)_
│   └── splash.jpg _(**Image background for login page**)_
│
├── components
│   ├── base _(**Some material components taken from [Creative Tim](https://github.com/creativetimofficial/vuetify-material-dashboard/tree/master/src/components/base)**)_
│   ├── buttons
│   │   └── ImpersonateButton.vue _(**Impersonate action button by user**)_
│   └── ImpersonateMessage.vue _(**Impersonation alert which allows leaving**)_
│
├── layouts
│   └── `Admin.vue` _(**Main admin layout, [see dedicated doc](crud/layout.md)**)_
│
├── `locales` _(**I18n, localized resources label are here, [see dedicated doc](i18n.md)**)_
│   ├── en.json
│   └── fr.json
│
├── plugins
│   ├── `admin.js` _(**Main admin plugin where VA is [instantiated](#instantiation)**)_
│   ├── base.js _(**Material components loader from above components/base directory**)_
│   ├── chartist.js _(**Chartist plugin for nice dashboard sample**)_
│   ├── `i18n.js` _(**Some default [i18n](i18n.md#date-and-number-format) date and number formatters**)_
│   └── vuetify.js _(**Vuetify plugin**)_
│
├── providers
│   ├── `authProvider.js` _(**Pre-implemented custom [auth provider](authentication.md)**)_
│   └── `dataProvider.js` _(**Pre-implemented custom [data provider](data-providers.md)**)_
│
├── `resources` _(**Main resources directory, main workspace for admin development**)_
│   ├── `users` _(**User CRUD pages location**)_
│   │   ├── Form.vue
│   │   ├── List.vue
│   │   └── Show.vue
│   └── `index.js` _(**Resources file descriptor, [see dedicated doc](resources.md)**)_
│
├── router
│   ├── `admin.js` _(**Authenticated private routes**)_
│   └── index.js _(**Vue Router instance with your custom public routes**)_
│
├── sass _(**Vuetify Material Theme taken from [Creative Tim](https://github.com/creativetimofficial/vuetify-material-dashboard/tree/master/src/sass)**)_
│   ├── vuetify-material _(**Components material CSS**)_
│   ├── overrides.sass _(**Vuetify material overrides**)_
│   └── variables.scss _(**Vuetify variables**)_
│
├── store
│   └── index.js _(**Vue Store instance with your custom modules**)_
│
├── `views` _(**Best place for specific custom public or private pages**)_
│   ├── Dashboard.vue _(**Static dashboard sample**)_
│   ├── [Error.vue](admin.md#error-page) _(**Generic error page**)_
│   ├── [Login.vue](authentication.md#login-page) _(**Public page**)_
│   └── [Profile.vue](authentication.md#profile-page) _(**Private page**)_
│
├── `_nav.js` _(**Main Sidebar Menu**)_
├── App.vue
├── i18n.js _(**Vue I18n Plugin**)_
└── main.js
:::

Your main working directory will be the `resources` folder. Use `views` for your custom public or private pages.

The next steps is to [register your backend resources and write your CRUD pages](#at-a-glance).

## Bare metal installation

If you can't use dedicated Vue CLI plugin, you can still try to install main Vtec Admin library as-is but it will be far more complex to get it properly configured. First add all required dependencies by `yarn add vue-router vuex vuetify vue-i18n vtec-admin portal-vue vuedraggable`. Then import and register them as following :

**`src/plugins/admin.js`**

```js
import Vue from "vue";
import VtecAdmin from "vtec-admin";

import "vtec-admin/src/loader";

Vue.use(VtecAdmin);
```

Next you must instantiate Vtec Admin with proper providers and options. Follow [full guide here](admin.md).

## At a glance

The 1st step is to describe backend resources you want to administer.

**`src/resources/index.js`**

```js
export default [
  {
    name: "books",
    icon: "mdi-book",
    translatable: true,
    permissions: ["admin", "editor", "author"],
  },
  {
    name: "reviews",
    icon: "mdi-comment",
    permissions: ["admin", "editor", "author"],
  },
  {
    name: "users",
    icon: "mdi-account",
    actions: ["list", "delete"],
    permissions: ["admin"],
  },
];
```

> You will find more detail on resources registering [here](resources.md).

Then next step is to define CRUD pages for each resource by following this naming convention : `src/resources/{resource}/{action}.vue`.

By default if no custom page action component is found, Vtec Admin uses basic CRUD page action that will try to guess all suited typed fields or inputs according to type of each property value of the first found resource item via `getList` data provider method.

::: warning GUESSER MODE
Note that it's more a quick starter mode and it should never be used on production ! So create your own CRUD page as below stay heavily recommended.
:::

This guesser pages have one big utility. They display full generated Vue component template code as well as the target file where to paste it on browser console ! It will overriding default current page, and you're already ready to customize it as normal Vue page.

![guesser](/assets/guesser.png)

Here some full CRUD page samples for `reviews` resource :

:::: tabs

::: tab LIST
**`src/resources/reviews/List.vue`**

```vue
<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list>
      <va-data-table :fields="fields">
        <template v-slot:quality="{ item }">
          {{ item.rating >= 3 ? $t("good") : $t("bad") }}
        </template>
      </va-data-table>
    </va-list>
  </base-material-card>
</template>

<script>
export default {
  props: ["resource", "title"],
  data() {
    return {
      fields: [
        {
          source: 'status',
          type: 'select',
        },
        { source: 'rating', type: 'rating' },
        'quality',
        'author',
        {
          source: 'publication_date',
          type: 'date',
        },
      ],
    };
  },
};
</script>
```

:::

::: tab SHOW
**`src/resources/reviews/Show.vue`**

```vue
<template>
  <va-show-layout>
    <va-show :item="item">
      <v-row justify="center">
        <v-col lg="4">
          <base-material-card>
            <template v-slot:heading>
              <div class="display-2">
                {{ title }}
              </div>
            </template>
            <v-card-text>
              <va-field
                source="status"
                type="select"
                chip
              ></va-field>
              <va-field source="quality" v-if="item">
                {{ item.rating >= 3 ? $t("good") : $t("bad") }}
              </va-field>
              <va-field source="rating" type="rating"></va-field>
              <va-field source="body"></va-field>
              <va-field source="author"></va-field>
              <va-field source="publication_date" type="date"></va-field>
            </v-card-text>
          </base-material-card>
        </v-col>
      </v-row>
    </va-show>
  </va-show-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
```

:::

::: tab CREATE
**`src/resources/reviews/Create.vue`**

```vue
<template>
  <va-create-layout>
    <reviews-form :title="title" :item="item"></reviews-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
```

:::

::: tab EDIT
**`src/resources/reviews/Edit.vue`**

```vue
<template>
  <va-edit-layout>
    <reviews-form :id="id" :title="title" :item="item"></reviews-form>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
```

:::

::: tab FORM
**`src/resources/reviews/Form.vue`**

```vue
<template>
  <va-form :id="id" :item="item">
    <v-row justify="center">
      <v-col lg="6">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2">
              {{ title }}
            </div>
          </template>
          <v-card-text>
            <va-radio-group-input source="status" row></va-radio-group-input>
            <va-rating-input source="rating"></va-rating-input>
            <va-text-input source="body" multiline></va-text-input>
            <va-text-input source="author"></va-text-input>
            <va-date-input
              source="publication_date"
              format="long"
            ></va-date-input>
          </v-card-text>
          <va-save-button></va-save-button>
        </base-material-card>
      </v-col>
    </v-row>
  </va-form>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
```

:::

::::

> More detail on CRUD page development on separate guides :
>
> * [List](crud/list.md)
> * [Show](crud/show.md)
> * [Create / Edit](crud/form.md)
>
> NB : This pages can be pre-generated by code generators. See [dedicated section](generators.md).

::: tip VETUR AND JETBRAINS SUPPORT
Use [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) or any Jetbrains products for best development experience. All VA tags and attributes components are fully documented in a way to allow autocompletion support !
:::
