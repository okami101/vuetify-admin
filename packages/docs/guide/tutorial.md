# Tutorial

This tutorial will show you how to get quick ready for admin development, by using the faking API server [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

:::tip SOURCE CODE
You will find complete source code of this tutorial [in the main repo](https://github.com/okami101/vtec-admin/tree/master/examples/tutorial).
:::

:::tip I PREFER PLAY WITH REAL API BACKEND
Check [Laravel guide](laravel.md) for quick starting with generators samples or [create your own provider](data-providers.md) for your custom API. This tutorial stay useful as it's more focused on how to play with Vtec Admin with any existing API.
:::

## Installation

### Backend API

First you will need a function local API in order to test Vtec Admin. We will use JSONPlaceholder as DB sample but it's really adviced to run it locally instead of current online version for preventing slow response. Don't worry it's done in less than 2 minutes in 3 steps :

```bash
npm install -g json-server

wget https://github.com/typicode/jsonplaceholder/raw/master/data.json
json-server --watch data.json
```

And voilà ! You should have a working API. Example of endpoint : [http://localhost:3000/posts?_start=0&_end=15](http://localhost:3000/posts?_start=0&_end=15).

### Admin UI

First prepare new Vue CLI admin project as explained on [getting started guide](getting-started.md) by using dedicated Vue CLI Plugin. To summary :

```bash
vue create vtec-admin-tutorial
cd vtec-admin-tutorial
vue add router
vue add vuex
vue add vuetify
vue add i18n
vue add vtec-admin
```

The last step will finish installation process with additional questions. Select `JSON Server` as **data provider**, you can always edit it after by simple couple of code lines. Let the approprate default **API endpoint** according to the local previous launched JSON server. In this tutorial we don't need (for now) any **authentication** or full **static dashboard** so let them disabled. Then launch app by `yarn serve` you should arrive to this step :

![dashboard](/assets/tutorial/dashboard.png)

:::tip CUSTOMIZE THE LAYOUT
You can perfectly customize the layout, which is a simple template component in `src/layouts/Admin.vue` file. Go to [dedicated section](crud/layout.md) for further detail.
:::
