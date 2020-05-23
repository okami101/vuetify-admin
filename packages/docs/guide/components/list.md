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

Here a quick sample usage within the `VaDataTable` component :

```vue
<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list v-slot="props" v-model="selected" :options.sync="options">
      <va-data-table
        :fields="[
          { source: 'name', link: 'show' },
          { source: 'type', type: 'select' },
          'founder',
          'headquarter',
          { source: 'url', type: 'url' },
          { source: 'active', type: 'boolean' },
          { source: 'opening_date', type: 'date', format: 'long' },
        ]"
        v-bind="props"
        v-model="selected"
        :options.sync="options"
      >
      </va-data-table>
    </va-list>
  </base-material-card>
</template>

<script>
export default {
  props: ["resource", "title"],
  data() {
    return {
      options: {},
      selected: [],
    };
  },
};
</script>
```

It will produce this simple structure :

![list](/assets/samples/list.png)

:::tip DISABLE GLOBAL SEARCH
A global search filter will be enabled by default. To disable it, use `disable-global-search` prop.
:::

#### Pagination

TODO

#### Actions

TODO

#### Filters

TODO

#### Bulk actions

TODO

#### Usage outside list page

You're not forced to use it on list page ! As the same way for most of VA components, all of them can be used anywhere on any page.

But for that you will probably need to explicitly set the main `resource` prop which is present on all resource aware VA components. If not defined, the default resource will be the one linked to the current route.

Next example shows a perfect good case of `VaList` usage inside a `VaEdit` page in order to show some related resources linked to the current edited resource.

```vue {6-10}
<template>
  <va-edit>
    <publishers-form :id="id" :title="title" :item="item"></publishers-form>
    <base-material-card icon="mdi-book" title="Books">
      <va-list
        resource="books"
        disable-query-string
        :filter="{
          publisher: id,
        }"
        v-model="selected"
        :options.sync="options"
        v-slot="props"
      >
        <va-data-table
          :fields="[
            // ...
          ]"
          v-bind="props"
          v-model="selected"
          :options.sync="options"
        >
          <!-- ... -->
        </va-data-table>
      </va-list>
    </base-material-card>
  </va-edit>
</template>

<script>
export default {
  props: ["id", "title", "item"],
  data() {
    return {
      options: {},
      selected: [],
    };
  },
};
</script>
```

![list](/assets/samples/relationship.png)

:::warning QUERY STRING

:::

#### Associations

You can use the

TODO

#### Custom layout

### VaDataTable
