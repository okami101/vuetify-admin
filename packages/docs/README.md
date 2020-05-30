---
home: true
heroImage: /hero.png
actionText: Get Started →
actionLink: /guide/
footer: MIT Licensed | Copyright © 2020 Adrien Beaudouin
---

> Check [online demo](https://vtec-bookstore-demo.okami101.io) -> go to admin and use prefilled login (read only)  
> Heavily inspired by [React Admin](https://github.com/marmelab/react-admin/) made by awesome [Marmelab Team](https://marmelab.com/)

![demo](/assets/screenshot.png)

<div class="features">
  <div class="feature">
    <h2>Built on top of Vuetify</h2>
    <p>Ready-to-go Vuetify UI theme with nice <a href="https://github.com/creativetimofficial/vuetify-material-dashboard">Material Theme</a> by Creative Tim. Fully customizable theme by using your existing Vuetify plugin.</p>
  </div>
  <div class="feature">
    <h2>Standalone SPA Admin</h2>
    <p>Full SPA Admin UI decoupled from backend. Rely on low-level data and auth providers which can pe replaced by your own simply by implementing specific interface compatibility layer.</p>
  </div>
  <div class="feature">
    <h2>Minimal code</h2>
    <p>Bare minimal Vue.js code needed to get your CRUD pages working via <a href="https://en.wikipedia.org/wiki/Domain-specific_language">Domain Specific Language</a> approach.</p>
  </div>
  <div class="feature">
    <h2>High productivity</h2>
    <p>Immediate quick start by using <a href="https://npm.okami101.io/-/web/detail/vue-cli-plugin-vtec-admin">Vue CLI plugin</a> with additional UI CRUD code generators. Guesser CRUD pages which give you all generated Vue template code for quick starting. YAML driven code generation given a JSON schema available !</p>
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
    <h2>Respectful and documented</h2>
    <p>No black magic pitfall, if you know well Laravel and Vue CLI basics, you're ready to go !</p>
    <p>All VA components has intellisense integration within VSCode Vetur and all Jetbrains products.</p>
  </div>
  <div class="feature">
    <h2>The ultimate alchimy</h2>
    <p>With combination of Vtec Admin, code generators as well as Vue.js power, feel the better mix between productivity, nice development experience and limitless customization.</p>
  </div>
  <div class="feature">
    <h2>Full-featured DataTable</h2>
    <p>Full-featured DataTable, including multi-sort, pagination, global search, advanced filters, basic CSV export, bulk actions, live query string context. Possibility of total list layout customization thanks to separate DataIterator !</p>
  </div>
  <div class="feature">
    <h2>Custom fields</h2>
    <p>All basic fields and inputs components for various data types: select, autocomplete with resource relations, boolean, number, rich text, etc. TinyMCE 5 as default Wysiwyg.</p>
    <p>Create your own fields and inputs simply by extending mixins.</p>
  </div>
  <div class="feature">
    <h2>Internationalization</h2>
    <p>Internationalization support via Vue I18n, with full english and french translations provided.</p>
    <p>Even more, translatable resource fields by contextual language selection on each crud page is supported !</p>
  </div>
  <div class="feature">
    <h2>Advanced permissions</h2>
    <p>All specific user roles or permissions can be accessible on every CRUD pages for show/hide specific UI sections. All sidebar menu can be filtred as well as general resources operations.</p>
  </div>
</div>

:::tip HOW TO GET STARTED
Select your most suitable guide :

* If you choose Laravel as backend, follow [this optimized guide](guide/laravel.md).
* For all other cases, follow [the standard Vue CLI path](guide/getting-started.md).

For best explanation of **CRUD code generators** feature, follow [this tutorial](guide/tutorial.md).
:::

### All Vtec Admin related projects

* [Vtec Admin Library](https://npm.okami101.io/-/web/detail/vtec-admin), the main admin library.
* [Vtec Admin Vue CLI Plugin](https://npm.okami101.io/-/web/detail/vue-cli-plugin-vtec-admin), the associated Vue CLI plugin which contains all base code boilerplate for quick install and UI commands code generator.
* [Vtec Laravel Crud](https://github.com/okami101/vtec-laravel-crud), composer package to use on fresh Laravel project which facilitates Vtec Admin integration and includes server-side API commands generator.
* [Bookstore Admin Demo](https://github.com/okami101/vtec-admin/tree/master/examples/demo), full-featured admin sample build on top of main Vtec Admin Library.
* [Bookstore Laravel Demo](https://github.com/okami101/vtec-admin/tree/master/examples/laravel), suitable API backend for bookstore admin demo based on Laravel.
* [Admin Tutorial](https://github.com/okami101/vtec-admin/tree/master/examples/tutorial), finished tutorial after following [dedicated docs](guide/tutorial.md) which aims to made a good showcase of YAML code generation power.
* [Vtec Docs](https://github.com/okami101/vtec-admin/tree/master/packages/docs), vuepress docs.
