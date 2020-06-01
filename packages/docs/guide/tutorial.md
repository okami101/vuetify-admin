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

## Enhance user list

Let's add some new fields to user's list :

**`src/resources/users/List.vue`**

```vue {11-18}
<template>
  <!-- DataIterator -->
</template>

<script>
export default {
  props: ["resource", "title"],
  data() {
    return {
      fields: [
        { source: "id", sortable: true },
        { source: "name", sortable: true },
        { source: "username", sortable: true },
        { source: "email", type: "email" },
        "address.street",
        "phone",
        { source: "website", type: "url" },
        "company.name",
      ],
      //...
    };
  },
  //...
};
</script>
```

As you can see, fields for datatable are just an list of object. `source` correspond to the targetted property of resource item where to get the value and `type` is the best suited field for display it on table cells. For basic text a simple string can be put in place of full object. `source` support dot notation as well.

![users-list](/assets/tutorial/users-list.png)

:::tip FULL DOCUMENTATION
More detail [here](crud/list.md#fields). See [all supported fields](components/fields.md).
:::

:::tip LABEL CUSTOMIZATION
You can use `label` property to customize header column label. However, it's more appropriate to use locales of Vue I18n, because you will have to think about it only once for all fields and inputs, as the default `source` prop will be the main key. Each property of each resource must follow a convention in order to be recognized. See [dedicated section](i18n.md) if you want more.
:::

:::tip CELL TEMPLATING
You can of course use full Vue.js power for customize all columns instead of using field type thanks to [cell slots](crud/list.md#field-templating).

Imagine you want customize address cell with complete information :

```vue {4-6}
<template>
  <va-data-iterator v-slot="props">
    <va-data-table :fields="fields" v-bind="props">
      <template v-slot:field.address="{ value }">
        {{ value.street }} {{ value.zipcode }} {{ value.city }}
      </template>
    </va-data-table>
  </va-data-iterator>
</template>
```

:::

:::tip CUSTOM FIELDS
You're not limited to the existing fields. You have the possibility of [creating your own fields](components/fields.md#custom-component).

Next a example of a custom specific address field :

**`src/components/fields/AddressField.vue`**

```vue
<template>
  <span class="address-field" v-if="value">
    {{ value.street }} {{ value.zipcode }} {{ value.city }}
  </span>
</template>

<script>
import Field from "vtec-admin/src/mixins/field";

export default {
  mixins: [Field],
};
</script>
```

Then register it :

**`src/main.js`**

```js
import AddressField from "./components/fields/AddressField";

Vue.component("VaAddressField", AddressField);
```

You can finally use it for fields :

**`src/resources/users/List.vue`**

```vue {12}
<template>
  <!-- DataIterator -->
</template>

<script>
export default {
  props: ["resource", "title"],
  data() {
    return {
      fields: [
        //...
        { source: "address", type: "address" },
        //...
      ],
      //...
    };
  },
  //...
};
</script>
```

:::

## Adding new resource

Now why not to try adding new resource as `posts` ?

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

Next add new link towards this new resource inside `src/_nav.js` file, dedicated for sidebar links which supports hierarchical menu as shown [here](crud/layout.md#links). We can use specific [resource link helpers](resources.md#link-helpers) for that :

**`src/_nav.js`**

```js {8}
export default (i18n, admin) => [
  {
    icon: "mdi-view-dashboard",
    text: i18n.t("menu.dashboard"),
    link: "/",
  },
  { divider: true },
  admin.getResourceLink("posts"),
  admin.getResourceLink("users"),
];
```

Now you should have direct link to a default posts page list. This page is a sort of guesser page that will try to detect the best suited fields by introspecting each value of each resource item properties.

As you can guess, by theirs own nature, this fallback pages should not be used on production on any way. Their greatest utility is to print a direct full usable Vue template code to your browser console with a link to the target CRUD page file where to paste this code.

![console](/assets/tutorial/console.png)

As soon you create this file and paste your code inside it, VA will recognize it and it will take place of guesser page (you should not have specific console message anymore). Do the same for each CRUD pages, i.e. `List`, `Create`, `Show`, `Edit`. No you're ready for full customization !

Sample for posts list :

**`src/resources/posts/List.vue`**

```vue
<template>
  <v-card>
    <v-card-title>
      <h1 class="display-2">
        {{ title }}
      </h1>
    </v-card-title>
    <v-card-text>
      <va-data-iterator
        v-slot="props"
        v-model="selected"
        :options.sync="options"
      >
        <va-data-table
          :fields="fields"
          v-bind="props"
          v-model="selected"
          :options.sync="options"
        >
        </va-data-table>
      </va-data-iterator>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      fields: [
        {
          source: "user",
          type: "reference",
          attributes: { reference: "users", action: "edit", chip: true },
        },
        { source: "title", type: "text" },
        { source: "body", type: "text" },
      ],
      options: {},
      selected: [],
    };
  },
};
</script>
```

:::tip MATERIAL CARD
Vtec Admin doesn't know about any custom UI components on client side and will print basic `VCard` by default. If you want use nicer `BaseMaterialCard` component instead, just replace `VCard` as next :

```vue {2,6,11}
<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-data-iterator v-slot="props" v-model="selected" :options.sync="options">
      <!-- DataTable -->
    </va-data-iterator>
  </base-material-card>
</template>

<script>
export default {
  props: ["resource", "title"],
  //...
};
</script>
```

:::

## Use dedicated show, create and edit page for users

If you don't like the default aside for users, we can use the same above methods for quickly create dedicated CRUD pages for users. Simply remove actions filter from next file :

**`src/resources/index.js`**

```diff
export default [
  {
    name: "posts",
    icon: "mdi-post",
  },
  {
    name: "users",
    icon: "mdi-account",
-    actions: ["list", "delete"],
  },
];
```

It will active all CRUD routes actions for user. Now delete `src/resources/users/Show.vue` and `src/resources/users/Form.vue` files. Then cleanup users list template as next :

**`src/resources/users/List.vue`**

```vue
<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-data-iterator v-model="selected" :options.sync="options">
      <template v-slot="props">
        <va-data-table
          :fields="fields"
          v-bind="props"
          v-model="selected"
          :options.sync="options"
        >
        </va-data-table>
      </template>
    </va-data-iterator>
  </base-material-card>
</template>

<script>
export default {
  props: ["resource", "title"],
  data() {
    return {
      fields: [
        { source: "id", sortable: true },
        { source: "name", sortable: true },
        { source: "username", sortable: true },
        { source: "email", type: "email" },
        { source: "address", type: "address" },
        "phone",
        { source: "website", type: "url" },
        "company.name",
      ],
      options: {},
      selected: [],
    };
  },
};
</script>
```

Next recreate `Show`, `Edit` and `Create` as you have done for above `posts`.

## Show pages

Main use of show pages is to display full resource information, associated to various global actions. It's mainly composed of component infector, aka `VaShow` that wil inject current ressource item to display through all `VaField` components. Similarly as above fields for `VaDataTable`, we must use specific `source` prop for property value to fetch as well as `type` for define the best suited field for format the value. All others attributes will be merge to under field component. See next show user page :

**`src/resources/users/Show.vue`**

```vue
<template>
  <va-show-layout>
    <va-show :item="item">
      <v-row justify="center">
        <v-col sm="4">
          <base-material-card>
            <template v-slot:heading>
              <div class="display-2">
                {{ title }}
              </div>
            </template>
            <v-card-text>
              <va-field source="name"></va-field>
              <va-field source="username"></va-field>
              <va-field source="email"></va-field>
              <va-field source="address" type="address"></va-field>
              <va-field source="phone"></va-field>
              <va-field source="website" type="url"></va-field>
              <va-field source="company.name"></va-field>
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

It's enough to render :

![show](/assets/tutorial/show.png)

:::tip FULL DOCUMENTATION
See [dedicated section](crud/show.md).
:::

## Create and edit pages

Create and edit page will share in general the same form. It's a good practice to separate it to a dedicated `Form` component. It will automatically registered as global `{resource}-form` component so you can directly use it as-is. See next exemple for user edition page :

**`src/resources/users/Edit.vue`**

```vue
<template>
  <va-edit-layout :title="title">
    <users-form :id="id" :item="item"></users-form>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
```

**`src/resources/users/Form.vue`**

```vue
<template>
  <va-form :id="id" :item="item" :saving.sync="saving">
    <v-row justify="center">
      <v-col sm="6">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2">
              {{ title }}
            </div>
          </template>
          <v-card-text>
            <va-text-input source="name"></va-text-input>
            <v-row>
              <v-col>
                <va-text-input source="username"></va-text-input>
              </v-col>
              <v-col>
                <va-text-input source="email"></va-text-input>
              </v-col>
            </v-row>
            <va-text-input source="address.street"></va-text-input>
            <v-row>
              <v-col>
                <va-text-input source="address.zipcode"></va-text-input>
              </v-col>
              <v-col>
                <va-text-input source="address.city"></va-text-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <va-text-input source="phone"></va-text-input>
              </v-col>
              <v-col>
                <va-text-input source="website"></va-text-input>
              </v-col>
            </v-row>
            <va-text-input source="company.name"></va-text-input>
            <va-save-button :saving="saving"></va-save-button>
          </v-card-text>
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
    };
  },
};
</script>
```

It's enough to render :

![form](/assets/tutorial/form.png)

As you can see, `VaForm` is simply a injector component that will register an internal full form model initialized by all VA inputs child components. This model is the one that will be sent to the API. For all supported inputs, go [here](components/inputs.md).

:::tip FULL DOCUMENTATION
See [dedicated section](crud/form.md).
:::

## Relationships

Now how we will dealing with relationships between posts and users ?

JSON Server use specific `userId` property for each post that can be help for linking to a specific user :

```json {2}
{
  "userId": 1,
  "id": 3,
  "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
  "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
}
```

It will be nice to have a direct link towards existing show or edit user page (you have to create this pages before !). It can simply done thanks to a reference field component.

**`src/resources/posts/List.vue`**

```vue {11-15}
<template>
  <!-- DataIterator -->
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      fields: [
        {
          source: "userId",
          type: "reference",
          attributes: { reference: "users", link: "edit", chip: true },
        },
        { source: "title", type: "text" },
        { source: "body", type: "text" },
      ],
      options: {},
      selected: [],
    };
  },
};
</script>
```

Note as we add a specific `attributes` field property that allows specific usage of props or any attributes that inner field component can accept. Check [full reference here](components/fields.md). In case of [reference field](components/fields.md#reference), we can see it can accept a specific `resource` prop where we should put the name of the target linked resource. Then it will show a direct link towards user show page. Use `action` prop if different thant default `show` page. Use `chip` for material chip instead of basic anchor.

Now it will be better with a real name instead of basic ID. But the API don't give us this info. However JSON server API allows linked resource expand on demand. You can see it by using this query `/posts/1?_expand=user` :

```json {6-28}
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  "user": {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }
}
```

:::warning NO AUTOFETCH FROM USERS ?
Contrary to React Admin equivalent, reference field doesn't support autofetching target resource from API. Instead we prefer to rely on backend capacity to give full object on demand that allows internal eager loading for better performance.
:::

So how can use it ? Simply by using specific `include` prop of `VaDataIterator` component. In case of JSON server data provider, it's an object which accepts both `expand` and `embed` property. Then don't forget to change `userId` to `user` as source prop for reference field.

```vue {9,24}
<template>
  <base-material-card :icon="resource.icon" :title="title">
    <!-- Title -->
    <v-card-text>
      <va-data-iterator
        v-slot="props"
        v-model="selected"
        :options.sync="options"
        :include="{ expand: ['user'] }"
      >
        <!-- DataTable -->
      </va-data-iterator>
    </v-card-text>
  </base-material-card>
</template>

<script>
export default {
  props: ["resource", "title"],
  data() {
    return {
      fields: [
        {
          source: "user",
          type: "reference",
          attributes: { reference: "users", action: "edit", chip: true },
        },
        //...
      ],
      //...
    };
  },
};
</script>
```

But now you have an ugly full json object. How can we stringify it ? 2 options : either locally by using `itemText` prop or globally which is recommended as it will apply for all cases, notably autocomplete, referencable choices, etc. Just set the `label` property at the resource level. Note as it can be a function callback that take a valid resource object as argument. We will set it for both `posts` and `users` :

**`src/resources/index.js`**

```js {5,10}
export default [
  {
    name: "posts",
    icon: "mdi-post",
    label: "title",
  },
  {
    name: "users",
    icon: "mdi-account",
    label: "name",
  },
];
```

Then you should have nice labelled chip for users :

![relationships](/assets/tutorial/relationships.png)

:::tip RELATIONSHIP IN SHOW PAGE
Use the `include` property on global resource object descriptor to define it globally. It will be used as default for all `GET` based method for data fetching. `VaDataIterator` will use it as well if not defined, but it still can be overridden.
:::

### Form

Now we may add the possibility of attach user on any posts. We can use a simple select input for that :

```vue {8-11}
<template>
  <va-form :id="id" :item="item" :saving.sync="saving">
    <v-row justify="center">
      <v-col sm="4">
        <base-material-card>
          <!-- Title -->
          <v-card-text>
            <va-select-input
              source="userId"
              reference="users"
            ></va-select-input>
            <va-text-input source="title"></va-text-input>
            <va-text-input source="body" multiline></va-text-input>
            <va-save-button :saving="saving"></va-save-button>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </va-form>
</template>
```

Just use `userId` as source, `users` as reference and you're done :

![relationships-select](/assets/tutorial/relationships-select.png)

:::tip AUTOCOMPLETE
Just replace `va-select-input` by `va-autocomplete-input` and you're done ! User search will be already functional by using default `q` query parameter for full text search of JSON Server.
:::

## Filters

So we have global search as default filter from posts page list. It will be trivial to have the possibility to filter by user to. It's also as simple as adding fields. Simply add a new select filter object and bind it to `VaDataIterator` component as next :

```vue {5,19-26}
<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-data-iterator
      :filters="filters"
      v-slot="props"
      v-model="selected"
      :options.sync="options"
    >
      <!-- DataTable -->
    </va-data-iterator>
  </base-material-card>
</template>

<script>
export default {
  props: ["resource", "title"],
  data() {
    return {
      filters: [
        {
          source: "userId",
          type: "select",
          alwaysOn: true,
          attributes: { reference: "users" },
        },
      ],
      //...
    };
  },
};
</script>
```

It's a simple object that will translate it on valid supported inputs that react as you type. Same behavior than fields apply for `source`, `type`, and `attributes`. Note as by default filter is hidden under a dropdowns next to global actions on right side. It will allow filter activation on demand, without UI pollution with many inputs. the `alwaysOn` prop will always reveal filter without being able to remove it.

![filters](/assets/tutorial/filters.png)

:::tip FULL DOCUMENTATION
More detail [here](crud/list.md#filters). See [all supported inputs](components/inputs.md).
:::

:::tip FILTER TEMPLATING
It's possible to use direct Vue.js code for filters via [filter slots](crud/list.md#filter-templating).
:::
