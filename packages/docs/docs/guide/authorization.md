# Authorization

For many admin app, you will often need of users with different roles or permissions who will have only access to some parts of admin with limited access to resources management. VA fully support this feature at many levels.

:::danger BACKEND HIGH PRIORITY
This authorization that we discuss here is only about display or hide links, actions, or any UI related components. You always must consider that any user will have access to a full admin UI in case of SPA admin, just because all JS bundle code is here, so it's only a matter of activating some permissions via javascript for unlock all UI.

Therefore always prioritize the permissions on the backend at first before any UI concerns !
:::

## Get permissions

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
