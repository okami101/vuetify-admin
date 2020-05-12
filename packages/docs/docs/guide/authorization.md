# Authorization

For many admin app, you will often need of users with different roles or permissions who will have only access to some parts of admin with limited access to resources management. VA fully support this feature at many levels.

:::danger BACKEND HIGH PRIORITY
This authorization that we discuss here is only about display or hide links, actions, or any UI related components. You always must consider that any user will have access to a full admin UI in case of SPA admin, just because all JS bundle code is here, so it's only a matter of activating some permissions via javascript for unlock all UI.

Therefore always prioritize the permissions on the backend at first before any UI concerns !
:::

## Get user permissions

:::tip AUTHENTICATION
Before continue you should consider to check the related [authentication section](authentication) of this guide. It contains all you should know about user authentication and user informations fetching.
:::

As you have seen on authentication guide, every auth providers must implement a specific `getPermissions` method whose role is to fetch permissions for a valid user object return by the API through the `checkAuth` provider method. This permissions must be returned in a array of strings format. It can be anything you want, from a low level specific permission as `create_book` up to a more global role as `editor`. It's up tu you to find the suited granularity you need. For example we can imagine `["editor", "author"]` or real specific `["list_author", "show_author", "list_book", "show_book", "create_book"]`.

## Resources permissions

```js
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

## Permissions helpers

## Permissions page props
