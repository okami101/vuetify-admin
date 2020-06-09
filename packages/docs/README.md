---
home: true
heroImage: /logo.svg
actionText: Get Started →
actionLink: /guide/
footer: MIT Licensed | Copyright © 2020 Adrien Beaudouin
---

> Check [online demo](https://vtec-bookstore-demo.okami101.io) -> go to admin and use prefilled login (read only)  
> Heavily inspired by [React Admin](https://github.com/marmelab/react-admin/) made by awesome [Marmelab Team](https://marmelab.com/)

![demo](/assets/screenshot.png)

<div class="features">
  <div class="feature">
    <img src="/icons/vue-dot-js.svg" alt="vuetify" />
    <h2>Built on top of Vuetify</h2>
    <p>Ready-to-go Vuetify UI theme with nice <a href="https://github.com/creativetimofficial/vuetify-material-dashboard">Material Theme</a> by Creative Tim. Fully customizable theme by using your existing Vuetify plugin.</p>
  </div>
  <div class="feature">
    <img src="/icons/power-cord.svg" alt="decoupled" />
    <h2>Standalone SPA Admin</h2>
    <p>Full responsive SPA Admin UI decoupled from backend. Rely on low-level data and auth providers which can pe replaced by your own simply by implementing specific interface compatibility layer.</p>
  </div>
  <div class="feature">
    <img src="/icons/embed2.svg" alt="code" />
    <h2>Minimal code</h2>
    <p>Bare minimal Vue.js code needed to get your CRUD pages working via <a href="https://en.wikipedia.org/wiki/Domain-specific_language">Domain Specific Language</a> approach.</p>
  </div>
  <div class="feature">
    <img src="/icons/power.svg" alt="rad" />
    <h2>High productivity</h2>
    <p>Immediate quick start by using <a href="https://npm.okami101.io/-/web/detail/vue-cli-plugin-vtec-admin">Vue CLI plugin</a> with additional UI CRUD code generators. Guesser CRUD pages which give you all generated Vue template code for quick starting. YAML driven code generation given a JSON schema available !</p>
  </div>
  <div class="feature">
    <img src="/icons/equalizer.svg" alt="control" />
    <h2>Keep control</h2>
    <p>Use your existing Vue CLI plugins. Keep total control of your Vue app by adding your own routes with custom pages, custom store modules, and Vuetify theme as you are used to on Vue CLI base project.</p>
  </div>
  <div class="feature">
    <img src="/icons/laravel.svg" alt="laravel" />
    <h2>Laravel ready</h2>
    <p>If you select Laravel as API backend, use official <a href="https://github.com/okami101/vtec-laravel-crud">Vtec Laravel Crud</a> composer package for even more immediate start from top to bottom. Server-side API CRUD code generators included as a bonus !</p>
  </div>
  <div class="feature">
    <img src="/icons/books.svg" alt="documented" />
    <h2>Respectful and documented</h2>
    <p>No black magic pitfall, if you know well Laravel and Vue CLI basics, you're ready to go !</p>
    <p>All VA components has intellisense integration within VSCode Vetur and all Jetbrains products.</p>
  </div>
  <div class="feature">
    <img src="/icons/lab.svg" alt="alchemy" />
    <h2>The ultimate alchemy</h2>
    <p>With combination of Vtec Admin, code generators as well as Vue.js power, feel the better mix between productivity, nice development experience and limitless customization.</p>
  </div>
  <div class="feature">
    <img src="/icons/table2.svg" alt="datatable" />
    <h2>Full-featured DataTable</h2>
    <p>Full-featured DataTable, including multi-sort, pagination, global search, advanced filters, basic CSV export, bulk actions, live query string context. Possibility of total list layout customization thanks to separate data iterator !</p>
  </div>
  <div class="feature">
    <img src="/icons/wrench.svg" alt="customizable" />
    <h2>Custom fields</h2>
    <p>All basic fields and inputs components for various data types: select, autocomplete with resource relations, boolean, number, rich text, etc. TinyMCE 5 as default Wysiwyg.</p>
    <p>Create your own fields and inputs simply by extending mixins.</p>
  </div>
  <div class="feature">
    <img src="/icons/earth.svg" alt="i18n" />
    <h2>Internationalization</h2>
    <p>Internationalization support via Vue I18n, with full english and french translations provided.</p>
    <p>Even more, translatable resource fields by contextual language selection on each crud page is supported !</p>
  </div>
  <div class="feature">
    <img src="/icons/key.svg" alt="permissions" />
    <h2>Advanced permissions</h2>
    <p>All specific user roles or permissions can be accessible on every CRUD pages for show/hide specific UI sections. All sidebar menu can be filtered as well as general resources operations.</p>
  </div>
</div>

## At a glance

### 1. New resource

**`src/resources/index.js`**

```js
export default [
  {
    name: "posts",
    icon: "mdi-post",
    label: "title",
  },
];
```

### 2. List page

**`src/resources/posts/List.vue`**

```vue
<template>
  <v-card>
    <v-card-title>
      <h1>{{ title }}</h1>
    </v-card-title>
    <v-card-text>
      <va-list>
        <va-data-table :fields="fields"></va-data-table>
      </va-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      fields: ["title", "body"],
    };
  },
};
</script>
```

### 3. Show page

**`src/resources/posts/Show.vue`**

```vue
<template>
  <va-show-layout :title="title">
    <va-show :item="item">
      <v-card>
        <v-card-text>
          <va-field source="title"></va-field>
          <va-field source="body"></va-field>
        </v-card-text>
      </v-card>
    </va-show>
  </va-show-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
```

### 4. Create page

**`src/resources/posts/Create.vue`**

```vue
<template>
  <va-create-layout :title="title">
    <posts-form :item="item"></posts-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
```

> Item here is for clone feature needs

### 5. Edit page

**`src/resources/posts/Edit.vue`**

```vue
<template>
  <va-edit-layout :title="title">
    <posts-form :id="id" :item="item"></posts-form>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
```

### 6. Form

**`src/resources/posts/Form.vue`**

```vue
<template>
  <va-form :id="id" :item="item">
    <v-card>
      <v-card-text>
        <va-text-input source="title"></va-text-input>
        <va-text-input source="body" multiline></va-text-input>
        <va-save-button></va-save-button>
      </v-card-text>
    </v-card>
  </va-form>
</template>

<script>
export default {
  props: ["id", "item"],
};
</script>
```
