# Layout

By using Vue CLI plugin, your project will be initialized with a premade default admin layout. The vue template of this layout is located into `src/layout/admin.vue` and linked into parent authenticated route inside `src/routes/admin.js` as following :

**`src/routes/admin.js`**

```js {1,8}
import AdminLayout from "@/layouts/Admin";
//...

export default {
  path: "/",
  name: "home",
  redirect: "/dashboard",
  component: AdminLayout,
  meta: {
    title: i18n.t("routes.home"),
  },
  children: [
    //...
  ],
};
```

## Regions

The main layout, alias VaLayout, is composed of different regions as shown here :

![layout](/assets/layout.png)

| Region         | Default VAComponent               | Description                                                     |
| -------------- | --------------------------------- | --------------------------------------------------------------- |
| **AppBar**     | [`VaAppBar`](#app-bar)           | Main app bar, mainly a `VAppBar`.                               |
| **Sidebar**    | [`VaSidebar`](#sidebar)         | Main sidebar, mainly a `VNavigationDrawer`.                     |
| **Header**     | [`VaBreadcrumbs`](#breadcrumbs) | Page header, perfect for a `VBreadcrumbs` or any custom alerts. |
| **RouterView** | -                                 | All CRUD pages or any custom authenticated page will show here. |
| **Aside**      | [`VaAside`](#aside)             | Asidecontent, for any contextualized additional infos.          |
| **Footer**     | [`VaFooter`](#footer)           | App footer, for some corporate informations.                    |

## Components

### Admin layout

|> docgen layout

This slot composition system allows a complete customization possibility. By default Vue CLI Plugin will generate functional basic layout with all default components placed for each slot. You can totally customize or replace each component by your own.

**`src/layout/admin.vue`**

```vue
<template>
  <va-layout>
    <va-app-bar
      slot="app-bar"
      :header-menu="headerMenu"
      :profile-menu="profileMenu"
      @mini="mini = !mini"
    ></va-app-bar>
    <va-sidebar slot="sidebar" :menu="sidebarMenu" :mini="mini"></va-sidebar>
    <va-breadcrumbs slot="header"></va-breadcrumbs>
    <va-aside slot="aside"></va-aside>
    <va-footer slot="footer" :menu="footerMenu"></va-footer>
  </va-layout>
</template>
```

:::tip OPTIONAL
You can totally replace the layout component by your own if you need total personalization !

In this case you'll need to use at least the below [`VaMessages`](#messages) component in order to have all toaster notifications and confirmation dialogs.
:::

:::tip LINKS
See [below section](#links).
:::

### App bar

|> docgen app-bar

:::tip CREATE RESOURCE LINKS
The create action links will be automatically generated from your registred resources if the current user has permissions for it.
:::

:::tip RELOAD BUTTON
The reload button will dynamically spin for every fetch calls from you data provider, i.e. `getList`, `getOne` or `getMany`. A manual clic will redo the call from current state for freshed content. It will be apply on all CRUD pages.

The show, create, edit page will reload the route linked resource and refresh all related field or input components, while list page will reload current resources list from current iterator context.
:::

### Sidebar

|> docgen sidebar

:::tip MINIMIZE
Use `mini` event from `VaAppBar` and play with `mini` prop in order to toggle sidebar minimization state.
:::

### Footer

|> docgen footer

### Breadcrumbs

|> docgen breadcrumbs

### Aside

|> docgen aside

### Messages

|> docgen messages

## Links

All navigation menu that can be putted on next components are simple array of object which represents a link. VA Components that support nav are `VaAppBar`, `VaSidebar` and `VaFooter` for a total of 4 differents menus, `header`, `profile`, `sidebar` and `footer`. Example of simple menu array :

```js
[
  {
    icon: "mdi-account",
    text: this.$t("menu.profile"),
    link: "/profile",
  },
  {
    icon: "mdi-settings",
    text: this.$t("menu.settings"),
    link: "/settings",
  },
]
```

Object link structure :

| Property     | Type              | Description                                                                                                 |
| ------------ | ----------------- | ----------------------------------------------------------------------------------------------------------- |
| **icon**     | `string`          | Icon of menu, shown on left side. Must be a valid MDI an is only supported on `sidebar` and `profile` menu. |
| **text**     | `string`          | Label of link.                                                                                              |
| **link**     | `string | object` | Valid Vue Router menu. Can't be used with children.                                                         |
| **href**     | `string`          | Use for free external link. Will open as target blank. Can't be used with children.                         |
| **children** | `array`           | Child links for hierarchical menu, for sidebar only. Can't be used with link or href.                       |
| **expanded** | `boolean`         | Show children expanded by default. Only affect links with children.                                         |
| **heading**  | `string`          | Transform link into section label heading, for sidebar menu only. Will disable all other properties.        |
| **divider**  | `boolean`         | Transform link into divider, for sidebar menu only. Will disable all other properties.                      |

:::tip SIDEBAR NAV
Because sidebar hierarchical menu can be cumbersome, Vue CLI Plugin will set it on a separated `src/_nav.js` file. In addition to standard link, sidebar nav support 2 specifics items :

* Heading title, a simple object with a heading property. Ideal for many links section.
* Divider, just put `{ divider: true }` for making a simple section divider.
:::

:::tip LINKS TO RESOURCES
You can easily build resources actions links thanks to [resources link helpers](../resources.md#link-helpers).
:::

:::tip PERMISSIONS ON LINKS
You can easily show hide each link by using [some authorization helpers](../authorization.md#helpers).
:::
