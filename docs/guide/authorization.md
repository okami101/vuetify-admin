# Authorization

For many admin app, you will often need of users with different roles or permissions whose will have only access to some parts of admin with limited access to resources management or specific component as some fields. VA support this feature at few levels.

:::danger BACKEND PRIORITY
This authorization that we discuss here is only about display or hide links, actions, UI components, or change some client side logic. You always must consider that any user will have access to a full admin UI in case of SPA admin, just because all JS bundle code is here, so it's only a matter of activating some permissions via javascript for unlock all UI.

Therefore **always prioritize the permissions on the backend** at first before any UI concerns !
:::

## Get user permissions

:::tip AUTHENTICATION
Before continue you should consider to check the related [authentication section](authentication.md) of this guide. It contains all you should know about user authentication and user information fetching.
:::

As you have seen on authentication guide, every auth providers must implement a specific `getPermissions` method. His role is to fetch permissions from a valid user object returned by the API through the `checkAuth` provider method. This permissions must be returned as array of strings.

It can be anything you want, from a low level specific permission as `create_book` up to a more global role as `editor`. It's up tu you to find the suited granularity you need. For example we can imagine generic role-based as `["editor", "author"]` or more granular permission-based as `["list_author", "show_author", "list_book", "show_book", "create_book"]`.

:::tip INCLUDED PROVIDERS
All included providers of VA can have a `getPermissions` callback which allows you to customize the implemented method. It takes a user object from your API and looks by default for an existing `roles` property and return it as-is.
:::

## Resources

You can define specific permissions access for each action of each resource. This permissions will be reflected to the entire app, notably hide or show resource specific menus when using `getResourceLink` helper, as well as all crud related actions buttons linked to the concerned resource. For that simply define a new `permissions` to the concerned resource object :

**`src/resources/index.js`**

```js {5-9}
export default [
  {
    name: "reviews",
    icon: "mdi-comment",
    permissions: [
      "admin",
      "editor",
      { name: "author", actions: ["list", "show"] },
    ],
  },
]
```

The `permissions` property is a simple array of strings or objects. Use simple string when you want this permission to apply to all actions. The object format allows you to define more granular permission for each action of resources. Just use `name` for permission name and `actions` for list of allowed actions when user own this permission.

:::tip DEFAULT BEHAVIOR
By default, if no permissions are set, all authenticated users can access to any operations of this resource.
:::

:::warning EXCLUDED ACTIONS
Global `actions` or `except` are prioritized to `permissions` option only for excluded actions. So if you use `actions` or `except` properties, then specific `permissions` for excluded actions will have no effect.
:::

### Advanced usage

In case of this resource permission API above is not enough for you, you can still pass to VtecAdmin options a specific `canAction` callback, which allows you to have more control for permission action filtering. It's executed on each resource link (if you use `$admin.getResourceLink` or `$admin.getResourceLinks`) or any resource CRUD action button in order to know if it must be active according the user permissions.

This callback takes an `params` object with 3 properties :

* `resource` : name of concerned resource.
* `action` : asked action.
* `can` : a helper function which allows direct permissions ability from authenticated user.

**`src/plugins/admin.js`**

```js
export default new VtecAdmin({
  //...
  canAction: ({ resource, action, can }) => {
    if (can(["admin"])) {
      return true;
    }

    // any other custom actions on given resource and action...
  },
```

:::warning OVERRIDES OR DEFAULT
If this callback return a valid boolean, the action will be considered as valid or not whatever the permissions value set on the concerned resource.

If nothing is returned, the default behavior is executed.
:::

## Access to permissions

You can access to current user permissions everywhere in your apps, which allows you to make custom actions according to user rights, as hide some UI elements as component, entire section, etc. To access this permissions, the simplest way is to add `permissions` props if you are in CRUD page.

```vue {3}
<script>
export default {
  props: ["permissions"],
  //...
},
</script>
```

:::warning ONLY CRUD PAGE
This prop is only available on CRUD pages, as this props is injected from VA routes.
:::

For any other cases, on any components apart from CRUD pages or custom pages as dashboard, you can get this permissions from the `getPermissions` of `auth` store module as shown here :

```vue {8}
<script>
import { mapGetters } from "vuex";

export default {
  //...
  computed: {
    ...mapGetters({
      permissions: "auth/getPermissions",
    }),
  },
};
</script>
```

:::tip USE CAN HELPER
It is often enough to use the [dedicated can helper](#helpers) which allows you to make quick permissions ability assertions against the authenticated user.
:::

## Helpers

VA offers to you a global `$admin.can` helper that you can use anywhere which allows to quickly test if current user have given abilities. It takes a array of strings, which is the list of permissions you want to test and return `true` if the authenticated user owns one of them.

```vue {3,12}
<template>
  <va-form :id="id" :item="item">
    <va-text-input source="isbn" v-if="$admin.can(['isbn_edit'])"></va-text-input>
  </va-form>
</template>

<script>
export default {
  //...
  method() {
    onSubmit() {
      if (this.$admin.can(["book_edit"])) {
        //...
      }
    },
  },
};
</script>
```

:::warning OR condition
It tests the list of abilities with a `OR` condition, so if only one permission is owned by current user, then it return `true`.
:::

You can use it for easy hide or show links from the sidebar directly inside the array by using the `&&` combination :

**`src/_nav.js`**

```js {8,13}
export default (i18n, admin) => [
  {
    icon: "mdi-view-dashboard",
    text: i18n.t("menu.dashboard"),
    link: "/",
  },
  ...admin.getResourceLinks(["publishers", "authors", "books", "reviews"]),
  admin.can(["admin"]) && {
    icon: "mdi-settings",
    text: i18n.t("menu.settings"),
    link: "/settings",
  },
  admin.can(["admin", "editor"]) && {
    icon: "mdi-message",
    text: i18n.t("menu.feedback"),
    link: "/feedback",
  },
  { icon: "mdi-help-circle", text: i18n.t("menu.help"), link: "/help" },
];
```

:::warning ADMIN
Don't forget to pass `this.$admin` on `nav` call inside `src/layouts/Admin.vue`
:::
