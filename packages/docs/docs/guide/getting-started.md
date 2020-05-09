# Getting Started

Even if Vtec Admin can be used as standalone NPM package via `yarn add vtec-admin`, the recommended way is to use dedicated [Vue CLI plugin](https://www.npmjs.com/package/vue-cli-plugin-vtec-admin) on fresh Vuetify app project.  
It takes care of all minimal boilerplate code generation for quick start admin development as well as including material theme and UI CRUD generators scripts.

:::tip API
You should have a separate API backend project for real development.  
Fortunately you can quickly start with a fully functional Laravel API backend thanks to separated [Vtec Laravel Crud](https://github.com/okami101/vtec-laravel-crud) composer package. As a bonus, this package will used an integrated Vue CLI preset for even less install steps.  
If you choose Laravel as API backend, jump to the more optimized [Laravel installation section](laravel).  
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

:::warning Does it work with my API
Definitly. Vtec Admin uses an abstraction layer, with a concept called Data Providers.  
As of today, only Laravel providers are available. So for all other types of backend, you'll need to implements your own data and auth providers which will ensure compatibility between VA and your backend.  
Follow [this separate guide](data-providers) in order to get into it.
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

The next steps is to [register your backend resources and write your CRUD pages](#at-a-glance).

:::tip NEW NPM SCRIPTS
This plugin will also add 2 new npm code generator scripts, [see dedicated section](generators) for more detail.
:::

#### Bare metal installation

If you can't use dedicated Vue CLI plugin, you have to install main Vtec Admin library as-is. First add all required dependencies by `yarn add vue-router vuex vuetify vue-i18n vtec-admin portal-vue vuedraggable`. Then you import and register them as following.

**`src/plugins/admin.js`**

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

Next you must instantiate Vtec Admin as [explained here](admin).

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
    only: ["list", "delete"],
    permissions: ["admin"],
  },
];
```

> You will find more detail on resources registering [here](resources).

Then next step is to define CRUD pages for each resource.

:::details LIST
**`src/resources/Reviews/List.vue`**

```vue
<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list
      v-model="selected"
      :options.sync="options"
      v-slot="props"
      flat
    >
      <va-datagrid
        :fields="fields"
        v-bind="props"
        v-model="selected"
        :options.sync="options"
      >
        <template v-slot:quality="{ item }">
          {{ item.rating >= 3 ? $t("good") : $t("bad") }}
        </template>
      </va-datagrid>
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
          format: 'long',
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
  <va-show>
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
            <va-field
              source="publication_date"
              type="date"
              format="long"
            ></va-field>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </va-show>
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
  <va-create>
    <reviews-form :title="title" :item="item"></reviews-form>
  </va-create>
</template>

<script>
import ReviewsForm from "./Form";

export default {
  props: ["title", "item"],
  components: {
    ReviewsForm,
  },
};
</script>
```

:::

:::details EDIT
**`src/resources/Reviews/Edit.vue`**

```vue
<template>
  <va-edit>
    <reviews-form :id="id" :title="title" :item="item"></reviews-form>
  </va-edit>
</template>

<script>
import ReviewsForm from "./Form";

export default {
  props: ["id", "title", "item"],
  components: {
    ReviewsForm,
  },
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
> * [List](components/list)
> * [Show / Create / Edit](components/crud)
>
> NB : This pages can be pre-generated by code generators. See [dedicated section](guide/generators).
