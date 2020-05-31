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

This simple server provides multiple CRUD API endpoints for multiple resources as `posts`, `comments`, `users`, etc. You can find a format description of each route [here](https://github.com/typicode/json-server#routes). Vtec Admin will allows us to implement an nice material admin UI for manage them as quickest as possible.

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

## Data Provider

As you will see, the JSON Server data provider is a simple JS object that does all the magic behind the scenes. It translates the particular [JSON Server API format](https://github.com/typicode/json-server#routes) into simple methods that Vtec Admin can understand. For that each provider must follow a specific implementation as [explained here](data-data-providers.md). You can find the source code of JSON Server data provider [here](https://github.com/okami101/vtec-admin/blob/master/packages/admin/src/providers/data/json-server.js)

Vue CLI plugin comes with default simple CRUD templates pages for users resources. It's a basic functional single CRUD page interface with aside that should already totally working with actual `users` object of previous `data.json`, by using standard `name` and `email` properties.

![users](/assets/tutorial/users.png)

You can **create** new users, **show** and **edit** them on direct **aside region**, as well as **clone** them, **paginate** all list, **sort** by name, using **full text search** for **filtering** and finally **export** all data with current filtering and sorting inside CSV. All current context search is updated into URL as **query string** for keeping state on refresh. You can also **bulk delete** them by simply select multiple rows.

All users CRUD code templates can be found inside `src/resources/users`. `src/resources` will be your main working directory for all resources related CRUD pages development.

Now why not to try adding new resource as `posts` ?

## Adding new resource

All resources must be registred inside `src/resources/index.js`. This will allow Vtec Admin to prebuild all necessary CRUD client side routes as well as API call bridges towards registred data provider. By default only `users` is registred. For adding `posts` resource, all we have to do is to add a new resource descriptor object :

**`src/resources/index.js`**

```js {2-5}
export default [
  {
    name: "posts",
    icon: "mdi-post",
  },
  {
    name: "users",
    icon: "mdi-account",
    actions: ["list", "delete"],
  },
];
```

`name` is the unique identifier of resource that will be used as default route path as well as base URL for API calls. `icon` will be user for link icon identifier or any custom use for your own CRUD pages.

:::tip RESOURCE DOCUMENTATION
See [this dedicated section](resources.md) for all available options.
:::
