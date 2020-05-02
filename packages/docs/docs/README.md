---
home: true
heroImage: /hero.png
actionText: Get Started →
actionLink: /guide/
footer: MIT Licensed | Copyright © 2020 Adrien Beaudouin
---

::: tip DEMO
Check [online demo](https://vtec-bookstore-demo.okami101.io/admin) -> use prefilled login (read only)  
Note : this project is heavily inspired by [React Admin](https://github.com/marmelab/react-admin/) made by awesome [Marmelab Team](https://marmelab.com/)
:::

![demo](/screenshot.png)

<div class="features">
  <div class="feature">
    <h2>Built on top of Vuetify</h2>
    <p>Nice ready-to-go Vuetify UI theme with nice <a href="https://github.com/creativetimofficial/vuetify-material-dashboard">Material Theme</a> by Creative Tim. Fully customizable theme by using
    your existing Vuetify plugin.</p>
  </div>
  <div class="feature">
    <h2>Standalone SPA Admin</h2>
    <p>Full independant SPA Admin Interface, released from any backend. Rely on low-level data and auth providers
    which can pe replaced by your own simply by implementing interface compatibility layer.</p>
  </div>
  <div class="feature">
    <h2>Minimal code</h2>
    <p>Bare minimal Vue.js code needed to get your CRUD pages working via <a href="https://en.wikipedia.org/wiki/Domain-specific_language">Domain Specific Language</a> approach.</p>
  </div>
  <div class="feature">
    <h2>High productivity</h2>
    <p>Immediate quick start by using <a href="https://www.npmjs.com/package/vue-cli-plugin-vtec-admin">Vue CLI plugin</a>
    with additional UI CRUD code generators for quick init basic functional CRUD pages.</p>
  </div>
  <div class="feature">
    <h2>Keep control</h2>
    <p>Use your existing Vue CLI plugins. Keep total control of your Vue app by adding your own routes with custom pages, custom store modules, and full Vuetify theming as you are used to on Vue CLI base project.</p>
  </div>
  <div class="feature">
    <h2>Laravel ready</h2>
    <p>If you select Laravel as API backend, use official <a href="https://github.com/okami101/vtec-laravel-crud">Vtec Laravel Crud</a> composer package for even more immediate start from top to bottom. Server-side API CRUD code generators included as a bonus !</p>
  </div>
  <div class="feature">
    <h2>Respectful</h2>
    <p>No black magic pitfall, if you know well Laravel and Vue CLI basics, so you're ready to go !</p>
  </div>
  <div class="feature">
    <h2>The ultimate alchimy</h2>
    <p>With combination of Vtec Admin, code generators as well as Vue.js power, feel the better mix between productivity, nice development experience and limitless customization.</p>
  </div>
  <div class="feature">
    <h2>Full-featured datagrid</h2>
    <p>Full-featured datagrid, including multi-sort, pagination, global search, advanced filters, basic CSV export, live query string context. Customizable by-row, bulk and global actions.</p>
  </div>
  <div class="feature">
    <h2>Custom fields</h2>
    <p>All basic fields and inputs components for various data types: select, autocomplete with resource relations, boolean, number, rich text, etc. TinyMCE 5 as default Wysiwyg with elFinder bridge.</p>
    <p>Create your own fields and inputs simply by extending mixins.</p>
  </div>
  <div class="feature">
    <h2>Internationalization</h2>
    <p>Internationalization support via Vue I18n, with full english and french translations provided. Can be easily configured by taking user browser language.</p>
    <p>Even more, translatable resource fields by contextual language selection on each crud page is supported !</p>
  </div>
  <div class="feature">
    <h2>Advanced permissions</h2>
    <p>All specific user roles or permissions can be accessible on every CRUD pages for show/hide specific UI sections. All sidebar menu can be filtred as well as general resources operations.</p>
  </div>
</div>

### LIST

```vue
<template>
  <!-- src/resources/Reviews/List.vue -->
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

### SHOW

```vue
<template>
  <!-- src/resources/Reviews/Show.vue -->
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

### CREATE

```vue
<template>
  <!-- src/resources/Reviews/Create.vue -->
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

### EDIT

```vue
<template>
  <!-- src/resources/Reviews/Edit.vue -->
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

### FORM

```vue
<template>
  <!-- src/resources/Reviews/Form.vue -->
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

### TL;DR

Select your most suitable guide :

* If you choose Laravel as backend, follow [this optimized guide](https://github.com/okami101/vtec-laravel-crud#requirements).
* For all other cases, follow [the standard Vue CLI path](https://www.npmjs.com/package/vue-cli-plugin-vtec-admin#requirements).

### CRUD code generators

For best explanation of this feature, follow [this tutorial](/tutorial).

### All related projects

* [Vtec Admin Library](https://www.npmjs.com/package/vtec-admin), the main admin library.
* [Vtec Admin Vue CLI Plugin](https://www.npmjs.com/package/vue-cli-plugin-vtec-admin), the associated Vue CLI plugin which contains all base code boilerplate for quick install and UI commands code generator.
* [Vtec Laravel Crud](https://packagist.org/packages/vtec/laravel-crud), composer package to use on fresh Laravel project which facilitates Vtec Admin integration and includes server-side API commands generator.
* [Bookstore Admin Demo](https://github.com/okami101/vtec-admin/tree/master/examples/demo), full-featured admin sample build on top of main Vtec Admin Library.
* [Bookstore Laravel Demo](https://github.com/okami101/vtec-admin/tree/master/examples/laravel), suitable API backend for bookstore admin demo based on Laravel.
* [Admin Tutorial](https://github.com/okami101/vtec-admin/tree/master/examples/tutorial), finished tutorial after following [dedicated docs](/tutorial) which aims to made a good showcase of YAML code generation power.
* [Vtec Docs](https://github.com/okami101/vtec-admin/tree/master/packages/docs), vuepress docs.
