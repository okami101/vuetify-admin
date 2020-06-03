# Resources

A "resource" means a given server entity which can be managed by Vtec Admin, i.e. created/read/updated/deleted. It must correspond to a valid API endpoint that allows all of this CRUD operations.

The next piece of code represent an example of expected structure that must be sended to Vtec Admin constructor [as seen previously](admin.md) :

**`src/resources/index.js`**

```js
export default [
  {
    name: "users",
    icon: "mdi-account",
    label: "name",
    actions: ["list", "delete"],
    permissions: ["admin"],
  },
  {
    name: "monsters",
    icon: "mdi-alien",
    label: "name",
    translatable: true,
    permissions: ["admin", "parent"],
  },
  {
    name: "monster_children",
    icon: "mdi-baby-carriage",
    label: "name",
    except: ["delete"],
  },
];
```

## Resource object structure

A resource object must follow this structure :

| Property               | Type                 | Description                                                                                                                                |
| ---------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **name**               | `string`             | A mandatory unique slug name which will be used for client-side router base path.                                                          |
| **api**                | `string`             | Correspond to API base path calls. Equal to above name by default.                                                                         |
| **icon**               | `string`             | A identifier icon in sidebar or list page, should be a valid [MDI](https://materialdesignicons.com/).                                      |
| **label**              | `string`, `function` | Return an identifiable label of resource.                                                                                                  |
| **include**            | `array`, `object`    | Some additional object or array that will be added to data providers for all `GET` based methods for further actions inside data provider. |
| **actions**            | `array`              | List of all valid actions for this resource.                                                                                               |
| **except**             | `array`              | Same as `actions` but on blacklist mode, not used if `actions` is explicitly setted.                                                       |
| **translatable**       | `boolean`            | Indicate if this resource can be [translated](i18n.md#translation).                                                                        |
| **permissions**        | `array`              | Enable resource according to user permissions, as shown [here](authorization.md#resource).                                                 |
| **autocompleteFields** | `array`              | List of resource fields to return from API from autocomplete for avoiding over-fetching.                                                   |

:::tip LABEL
The `label` property can take a string or function, and is equal to `label` by default. Use string for simple case which represents a valid property of the targeted resource, as `name` for a `users` resource. Use a function which is a callback that takes the full resource API object, allowing you to return more complex combination of properties, as ``(r) => `${r.title} (${r.isbn})` ``.

This label will be used for default page title for every show and edit CRUD pages as well as every reference-based fields and inputs (`ReferenceField`, `ReferenceArrayField`, `AutocompleteInput`, `SelectInput`, `RadioGroupInput`).
:::

:::tip ACTIONS
For actions, you have to choose between `list` / `show` / `create` / `edit` / `delete`. If none `actions` or `except` is setted, all 5 operations are active by default.

All removed actions will be reflected on all crud pages and Vue Router will be adapted accordingly as well. For example, if you set `except` to `["show"]`, it will disable `show` route and all `show` actions (mainly buttons) associates to the concerned resource.
:::

:::danger DISABLING ACTIONS
Note that it will only disable routes client-side generation and change action buttons behavior. The resource API module has always all actions method available. You must also adapt your backend accordingly.
:::

### Reuse API endpoints

You can perfectly reuse the same backend resource api endpoint for different resources. Imagine a first group of cruds pages that show only active resources and a separate second group of cruds pages that show only archived ones.

Use the `api` property for that. It will override API default base path in resource store module. Then every CRUD pages inside `src/resources/{name-1}` and `src/resources/{name-2}` will use the same API endpoint.

See this example :

```js {11}
export default [
  {
    name: "users",
    icon: "mdi-account",
    label: "name",
    actions: ["list", "delete"],
    permissions: ["admin"],
  },
  {
    name: "archived_users",
    api: "users",
    icon: "mdi-account",
    label: "name",
    actions: ["list", "delete"],
    permissions: ["admin"],
  },
];
```

The `archived_users` resource will reuse the same API endpoints as `users` resource.

## Resource CRUD pages and API modules

With the above resources informations, it's enough for Vtec Admin to recreate all necessary CRUD routes and API actions structures.

Each CRUD route search for a component named as `${ResourceName}${Action}`, both on `StudlyCase`. 4 action pages are supported : `List`, `Show`, `Create` and `Edit`. So for a given resource called `monsters` and for a `create` route, VA search for a `MonstersCreate` page component. If not found it fallbacks to a [copiable guesser page](getting-started.md#at-a-glance). All you have to do is to register all your CRUD resources pages with this component naming convention in mind.

In order to facilitate this boring task, use the provided loader to do this automatically by importing it with `import "vtec-admin/src/loader"`. It will search for all `vue` files inside `src/resources` directory and register them to main Vue instance by given a proper component name. With this loader, you just have to create one vue component for each action inside a resource folder which will take the sluggified name of resource.

Example for a `monster_children` and `users` resources :

:::vue
resources
├── `monster-children` _(**The kebab-case format of resource slug or name**)_
│   ├── [Create.vue](crud/form.md#create)
│   ├── [Edit.vue](crud/form.md#edit)
│   ├── [Form.vue](crud/form.md) _(**Form component reused for both Create and Edit views**)_
│   ├── [List.vue](crud/list.md)
│   └── [Show.vue](crud/show.md)
│
├── `users` _(**No need of Create or Edit here as we use direct list aside feature for this**)_
│   ├── Form.vue
│   ├── List.vue
│   └── Show.vue
│
└── `index.js` _(**Resources file descriptor as seen above**)_
:::

:::tip COMPOUND NAME
If the name resource is a compound format, use a hyphen between each word (this is the kebab-case format). Example `monster-chrildren` for a resource named as `monster_children`.
:::

### Action mapping

Some quick tables to resume (we take `monster_children` resource name as example).

#### Action route and API mapping

| Action     | Vue Route                     | API call format                     |
| ---------- | ----------------------------- | ----------------------------------- |
| **list**   | `/monster-children`           | **GET** `/monster_children`         |
| **show**   | `/monster-children/{id}`      | **GET** `/monster_children/{id}`    |
| **create** | `/monster-children/create`    | **POST** `/monster_children`        |
| **edit**   | `/monster-children/{id}/edit` | **PUT** `/monster_children/{id}`    |
| **delete** | -                             | **DELETE** `/monster_children/{id}` |

#### Action component mapping

| Action     | Page Component          | Path from `src/resources`      |
| ---------- | ----------------------- | ------------------------------ |
| **list**   | `MonsterChildrenList`   | `/monster-children/List.vue`   |
| **show**   | `MonsterChildrenShow`   | `/monster-children/Show.vue`   |
| **create** | `MonsterChildrenCreate` | `/monster-children/Create.vue` |
| **edit**   | `MonsterChildrenEdit`   | `/monster-children/Edit.vue`   |

### Injected props

On every CRUD pages, the following props will be injected for easy reuse :

| Action          | Type     | Path from `src/resources`                                   |
| --------------- | -------- | ----------------------------------------------------------- |
| **resource**    | `object` | The resource object descriptor linked to the current route. |
| **title**       | `string` | The [localized title](i18n.md) of resource action page.     |
| **id**          | `id`     | ID of current resource to be displayed or edited.           |
| **item**        | `object` | Current item to be displayed, edited or cloned.             |
| **permissions** | `array`  | Current user permissions.                                   |

To use it, you simply have to declare them on props page component :

```vue
<script>
export default {
  props: ["resource", "title", "item"],
};
</script>
```

### Link helpers

You may need to put some links through your app that point to list or create resource pages, mainly in the sidebar. For that you can use `getResourceLink` and `getResourceLinks` helpers that will build for you a working link object that follow [this format](crud/layout.md#links). Moreover, this helpers will test the current users permissions for this specific action of this resource. If failed, it returns false.

For exemple this piece of code will return a link object to the user page list with localized resource label as well as resource icon. Simply put this function in the `sidebar-menu` as it was a link object. No need to deal with permissions or adding nulling test since a false menu will simply not be rendered.

```js
[
  //...
  this.$admin.getResourceLink("users"),
  //...
]
```

Use `getResourceLinks` in order to make many resource links at once. Only links where users has the resource action permissions will be returned.

```js
[
  //...
  ...this.$admin.getResourceLinks([
    "publishers",
    "authors",
    "books",
    "reviews",
  ]),
  //...
]
```

For this helpers, you can pass a full link object instead of resource name that will override the default generated. For example this code will generate a new link to the user create page with a plus icon and a "Create new user" as text :

```js
[
  //...
  this.$admin.getResourceLink({ name: "users", action: "create", icon: "mdi-plus", text: "Create new user" }),
  //...
]
```

The `getResourceLinks` helper can accept hierarchical menu as following :

```js
[
  //...
  ...admin.getResourceLinks([
    {
      icon: "mdi-globe-model",
      text: "Publishers,
      expanded: true,
      children: [
        admin.getResourceLink({ name: "publishers", icon: "mdi-view-list", text: "List" }),
        admin.getResourceLink({ name: "publishers", icon: "mdi-plus", text: "Create" }),
      ],
    },
    "authors",
    "books",
    "reviews",
  ]),
  //...
]
```
