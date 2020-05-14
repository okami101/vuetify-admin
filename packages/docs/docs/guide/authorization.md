# Authorization

For many admin app, you will often need of users with different roles or permissions who will have only access to some parts of admin with limited access to resources management or specific component as some fields. VA fully support this feature at many levels.

:::danger BACKEND HIGH PRIORITY
This authorization that we discuss here is only about display or hide links, actions, or any UI related components. You always must consider that any user will have access to a full admin UI in case of SPA admin, just because all JS bundle code is here, so it's only a matter of activating some permissions via javascript for unlock all UI.

Therefore always prioritize the permissions on the backend at first before any UI concerns !
:::

## Get user permissions

:::tip AUTHENTICATION
Before continue you should consider to check the related [authentication section](authentication) of this guide. It contains all you should know about user authentication and user informations fetching.
:::

As you have seen on authentication guide, every auth providers must implement a specific `getPermissions` method. His role is to fetch permissions from a valid user object returned by the API through the `checkAuth` provider method. This permissions must be returned as a format of array of strings.

It can be anything you want, from a low level specific permission as `create_book` up to a more global role as `editor`. It's up tu you to find the suited granularity you need. For example we can imagine generic role-based as `["editor", "author"]` or more granular permission-based as `["list_author", "show_author", "list_book", "show_book", "create_book"]`.

:::tip INCLUDED PROVIDERS
All included providers of VA can have a `getPermissions` callback which allows you to customize the implemented method. It takes a user object from your API and looks by default for an existing `roles` property and return it as-is.
:::

## Resources

You can define specific permissions access for each action of each resource. This permissions will be reflected to the entire app, notably hide or show resource specific menus when using `getResourceLink` helper, as well as all crud related actions buttons linked to the concerned resource. For that simply define a new `permissions` to the concerned resource object :

**`src/resources/index.js`**

```js{5-9}
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
By default, if no permissions are setted, all authenticated users can access to any operations of this resource.
:::

:::warning EXCLUDED ACTIONS
Global `actions` or `except` are prioritized to `permissions` option only for excluded actions. So if you use `actions` or `except` properties, then specific `permissions` for excluded actions will have no effect.
:::

## Menu

As you can see in this [dedicated layout section](components/layout), you can define all sort of menu for header, sidebar or footer. All this menu can support a specific `permissions` property that allow to show hide this link according to current user permissions. It uses a simple array a string that contains allowed permissions for access.

:::tip DEFAULT BEHAVIOR
By default, if no permissions are setted, this link is available for all users.
:::

## Permissions helpers

## Permissions page props
