# Getting Started

Even if Vtec Admin can be used as standalone NPM package via `yarn add vtec-admin`, the recommended way is to use dedicated [Vue CLI plugin](https://www.npmjs.com/package/vue-cli-plugin-vtec-admin) on fresh Vuetify app project.  
It takes care of all minimal boilerplate code generation for quick start admin development as well as including material theme and UI CRUD generators scripts.

:::tip API
You should have a separate API backend project for real development.  
Fortunately you can quickly start with a fully functional Laravel API backend thanks to separated [Vtec Laravel Crud](https://github.com/okami101/vtec-laravel-crud) composer package. As a bonus, this package will used an integrated Vue CLI preset for even less install steps.  
If you choose Laravel as API backend, jump to the more optimized [Laravel installation section](laravel.md).  
:::

## Use Vue CLI Plugin

![demo](/assets/dashboard.png)

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
  * Login page plugged with default [Laravel Sanctum](https://github.com/laravel/sanctum) auth provider (totally replaceable by [your own provider](authentication.md))
  * Static dashboard sample with usage of [Chartist.js](https://gionkunz.github.io/chartist-js/)
  * Functional basic profile edition page
  * User management page list with direct aside creation / show / edition
* Add UI CRUD generators scripts

:::warning Does it work with my API
Definitly. Vtec Admin uses an abstraction layer, with a concept called Data Providers.  
As of today, only Laravel providers are available. So for all other types of backend, you'll need to implements your own data and auth providers which will ensure compatibility between VA and your backend.  
Follow [this separate guide](data-providers.md) in order to get into it.
:::

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
Now you have a full basic admin working and are ready to start !

:::tip NEW NPM SCRIPTS
This plugin will also add 2 new npm code generator scripts, [see dedicated section](generators.md) for more detail.
:::

### Directory structure

Once installation finished, you should get this following `src` directory structure (main elements you should know are `highlighted`) :

:::vue
src
├── assets
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
│   ├── `admin.js` _(**Main admin plugin where VA is [instanciated](#instantiation)**)_
│   ├── base.js _(**Material components loader from above components/base directory**)_
│   ├── chartist.js _(**Chartist plugin for nice dashboard sample**)_
│   └── vuetify.js _(**Vuetify plugin**)_
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
│   ├── [Login.vue](authentication.md#login-page) _(**Public page**)_
│   └── [Profile.vue](authentication.md#profile-page) _(**Private page**)_
│
├── `_nav.js` _(**Main Sidebar Menu**)_
├── App.vue
├── i18n.js _(**Vue I18n Plugin**)_
└── main.js
:::

As you can guess, main working directory will be the `resources` folder. Use `views` for your custom public or private pages.  
The next steps is to [register your backend resources and write your CRUD pages](#at-a-glance).

## Bare metal installation

If you can't use dedicated Vue CLI plugin, you have to install main Vtec Admin library as-is. First add all required dependencies by `yarn add vue-router vuex vuetify vue-i18n vtec-admin portal-vue vuedraggable`. Then import and register them as following :

**`src/plugins/admin.js`**

```js
import Vue from "vue";
import VtecAdmin from "vtec-admin";

import "vtec-admin/src/loader";

Vue.use(VtecAdmin);
```

Next you must instantiate Vtec Admin as [explained here](admin.md).

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

Then next step is to define CRUD pages for each resource.

By default if no custom page action component is found, Vtec Admin uses basic CRUD page action that will try to guess all suited typed fields according to type of each property value of resource item.

:::warning GUESSER MODE
Note that it's more a quick starter mode and it should never be used on production ! So create your own CRUD page as below stay heavily recommended.
:::

This guesser pages have one big utility. They display full generated Vue.js component template code on browser console ! That will be very helpful as quick starter code for your own custom CRUD pages :

![guesser](/assets/guesser.png)

Just copy paste the result and go create the related CRUD page action with this starter code. It should works seamlessly.

Here some samples :

:::details LIST
**`src/resources/Reviews/List.vue`**

```vue
<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-data-iterator
      v-model="selected"
      :options.sync="options"
      v-slot="props"
    >
      <va-data-table
        :fields="fields"
        v-bind="props"
        v-model="selected"
        :options.sync="options"
      >
        <template v-slot:quality="{ item }">
          {{ item.rating >= 3 ? $t("good") : $t("bad") }}
        </template>
      </va-data-table>
    </va-data-iterator>
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
      ]
      options: {},
      selected: [],
    };
  },
};
</script>
```

:::

:::details SHOW
**`src/resources/Reviews/Show.vue`**

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

:::details CREATE
**`src/resources/Reviews/Create.vue`**

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

:::details EDIT
**`src/resources/Reviews/Edit.vue`**

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

:::details FORM
**`src/resources/Reviews/Form.vue`**

```vue
<template>
  <va-form :id="id" :item="item" :saving.sync="saving" v-model="model">
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
          <va-save-button :saving="saving"></va-save-button>
        </base-material-card>
      </v-col>
    </v-row>
  </va-form>
</template>

<script>
export default {
  props: ["id", "title", "item"],
  data() {
    return {
      saving: false,
      model: {},
    };
  },
};
</script>
```

:::

> More detail on CRUD page development on separate guides :
>
> * [List](crud/list.md)
> * [Show](crud/show.md)
> * [Create / Edit](crud/form.md)
>
> NB : This pages can be pre-generated by code generators. See [dedicated section](generators.md).
