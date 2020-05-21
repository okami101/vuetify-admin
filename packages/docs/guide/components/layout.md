# Layout

By using Vue CLI plugin, your project will be initialized with a premade default admin layout. The vue template of this layout is located into `src/layout/admin.vue` and linked into parent authenticated route inside `src/routes/admin.js` as following :

**`src/routes/admin.js`**

```js {1,8}
import AdminLayout from "@/layouts/Admin";
// ...

export default {
  path: "/",
  name: "home",
  redirect: "/dashboard",
  component: AdminLayout,
  meta: {
    title: i18n.t("routes.home"),
  },
  children: [
    // ...
  ],
};
```

## Regions

![demo](/assets/layout.png)
