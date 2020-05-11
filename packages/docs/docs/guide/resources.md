# Resources

A "resource" means a given server entity which can be managed by Vtec Admin, i.e. created/read/updated/deleted. It must correspond to a valid API endpoint that allows all of this CRUD operations.

The next piece of code represent an example of expected structure that must be sended to Vtec Admin constructor [as seen previously](admin) :

**`src/resources/index.js`**

```js
export default [
  {
    name: "users",
    icon: "mdi-account",
    actions: ["list", "delete"],
    permissions: ["admin"],
  },
  {
    name: "monsters",
    icon: "mdi-alien",
    translatable: true,
    permissions: ["admin", "parent"],
  },
  {
    name: "monster_children",
    icon: "mdi-baby-carriage",
    except: ["delete"],
  },
];
```

## Resource object structure

A resource object must follow this structure :

| Property       | Type    | Description                                                                                          |
| -------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `name`         | String  | A mandatory slug name which will be used for api base URL calls                                      |
| `icon`         | String  | A identifier icon in sidebar or list page, should be a valid [MDI](https://materialdesignicons.com/) |
| `actions`      | Array   | List of all valid actions for this resource                                                          |
| `except`       | Array   | Same as `actions` but on blacklist mode, not used if `actions` is explicitly setted                  |
| `translatable` | Boolean | Indicate if this resource can be [translated](i18n#translation)                                      |
| `permissions`  | Array   | Enable resource according to user permissions, as shown [here](authorization)                        |

:::tip ACTIONS
For actions, you have to choose between `list` / `show` / `create` / `edit` / `delete`. If none `actions` or `except` is setted, all 5 operations are active by default.

All removed actions will be reflected on all crud pages and Vue Router will be adapted accordingly as well. For example, if you set `except` to `["show"]`, it will disable `show` route and all `show` actions (mainly buttons) associates to the concerned resource.
:::

:::warning DISABLING ACTIONS
The deactivation of actions is obviously only done on the client side. You must also adapt your backend accordingly.
:::

## Resource CRUD pages and API modules

With the above resources informations, it's enough for Vtec Admin to recreate all necessary CRUD routes and API actions structures. However, all the main stuf remains to be done, i.e. the CRUD pages. The link between builded CRUD routes and the final resource action page component follows a specific naming convention.

Each CRUD route search for a component named as `${ResourceName}${Action}`, both on `StudlyCase`. 4 action pages are supported : `List`, `Show`, `Create` and `Edit`. So for a given resource called `monsters` and for a `create` route, VA search for a `MonstersCreate` page component. All you have to do is to register all your CRUD resources pages with this component naming convention in mind.

In order to facilitate this boring work, use the provided loader to do this automatically by importing it with `import "vtec-admin/dist/loader"`. It will search for all `vue` files inside `src/resources` directory and register them to main Vue instance by given a proper component name. With this loader, you just have to create one vue component for each action inside a resource folder which will take the sluggified name of resource.

Example for a `monster_children` and `users` resources :

:::vue
resources
├── `monster-children` _(**The kebab-case format of resource name**)_
│   ├── [Create.vue](components/crud#create)
│   ├── [Edit.vue](components/crud#edit)
│   ├── Form.vue _(**Form component for reusing into Create and Edit views**)_
│   ├── [List.vue](components/list)
│   └── [Show.vue](components/crud#show)
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

| Action   | Vue Route                     | API call format                     |
| -------- | ----------------------------- | ----------------------------------- |
| `list`   | `/monster-children`           | **GET** `/monster_children`         |
| `show`   | `/monster-children/{id}`      | **GET** `/monster_children/{id}`    |
| `create` | `/monster-children/create`    | **POST** `/monster_children`        |
| `edit`   | `/monster-children/{id}/edit` | **PUT** `/monster_children/{id}`    |
| `delete` | -                             | **DELETE** `/monster_children/{id}` |

#### Action component mapping

| Action   | Page Component          | Path from `src/resources`      |
| -------- | ----------------------- | ------------------------------ |
| `list`   | `MonsterChildrenList`   | `/monster-children/List.vue`   |
| `show`   | `MonsterChildrenShow`   | `/monster-children/Show.vue`   |
| `create` | `MonsterChildrenCreate` | `/monster-children/Create.vue` |
| `edit`   | `MonsterChildrenEdit`   | `/monster-children/Edit.vue`   |
