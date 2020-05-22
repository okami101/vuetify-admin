# List

The list page is the main UI entry point of your resource where you can do all sort of resources browsing operations, as paginating, sorting, filtering, exporting, etc. It's the best place to put a `VaList` data iterator component that will use `getList` data provider with all the search context. The traditional UI layout data list stay the good old full datatable by using `VaDataTable` components, but it can be totally replaced by anything you want.

![list](/assets/list.png)

:::tip PAGE CUSTOMIZATION
Note that for every CRUD pages you are free to put anything you want, and you have not forced to use provided optimized components.

Since all data provider methods are available in a dedicated store module for each resource, it's not that complicated to create your own list components that will fetch your data. And you can of course use the current global `$axios` instance if you need to fetch all sort of custom data that coming out of data provider logic. See [usage here](../data-providers#store).
:::

## VaList

|> docgen va-list

### Usage

```vue
<template>
  <v-card>
    <va-list
      :filters="[
        'q',
        'name',
        'founder',
        'headquarter',
        { source: 'active', type: 'boolean' },
      ]"
      :include="['media', 'books_count']"
    >
      <!-- Any custom list layout -->
    </va-list>
  </v-card>
</template>
```

:::tip USAGE OUTSIDE OF PAGE LIST
You're not forced to use it on list page ! As the same way for most of VA components, all of them can be used anywhere on any page.

But for that you will probably need to explicitly set the main `resource` prop which is present on all resource aware VA components. If not defined, the default resource will be the one linked to the current route.
:::

#### Filters

TODO
