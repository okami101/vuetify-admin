# List

The list page is the main UI entry point of your resource where you can do all sort of resources browsing operations, as paginating, sorting, filtering, exporting, etc. It's the best place to put a `VaDataIterator` data iterator component that will use `getList` data provider with all the search context. The traditional UI layout data list stay the good old full datatable by using `VaDataTable` components, but it can be totally replaced by anything you want.

![list](/assets/list.png)

:::tip PAGE CUSTOMIZATION
Note that for every CRUD pages you are free to put anything you want, and you have not forced to use provided optimized components.

Since all data provider methods are available in a dedicated store module for each resource, it's not that complicated to create your own list components that will fetch your data. And you can of course use the current global `$axios` instance if you need to fetch all sort of custom data that coming out of data provider logic. See [usage here](../data-providers#store).
:::

## VaDataIterator

|> docgen va-data-iterator

### Usage

Here a quick sample usage within the `VaDataTable` component :

```vue
<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-data-iterator v-slot="props" v-model="selected" :options.sync="options">
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
    </va-data-iterator>
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

Note that `VaDataIterator` will try to be synchronized on real time within query string in order to allow any bookmark or keep state on every browser refresh. All browsing action as paginate, filter and sorting will be updated into the URL query string.

:::tip DISABLE GLOBAL SEARCH
A global search filter will be enabled by default. To disable it, use `disable-global-search` prop.
:::

:::warning SHOW DATA
`VaDataIterator` is only responsible for data iteration UI controls. You will need to display the data list on your own or use the providing `VaDataTable`.
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

Next example shows a perfect good case of `VaDataIterator` usage inside a `VaEditLayout` page in order to show some related resources linked to the current edited resource.

```vue {6-10}
<template>
  <va-edit-layout>
    <publishers-form :id="id" :title="title" :item="item"></publishers-form>
    <base-material-card icon="mdi-book" title="Books">
      <va-data-iterator
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
      </va-data-iterator>
    </base-material-card>
  </va-edit-layout>
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

![relationship](/assets/samples/relationship.png)

:::warning QUERY STRING
For this case usage, you may need to disable default query string update in order to prevent unexpected behavior. Use `disable-query-string` for that.
:::

#### Associations

You can use the

TODO

#### Custom layout

As you can see, `VaDataIterator` is mainly a data iterator that will provide items result into his default slot children components, which is `VaDataTable` here. As the browsing UI structure is totally separated from the data list display, you can use any custom list layout as you want.

```vue
<template>
  <base-material-card>
    <va-data-iterator
      :items-per-page="8"
      :items-per-page-options="[4, 8, 16, 32]"
    >
      <template v-slot="{ items }">
        <v-row>
          <v-col lg="3" v-for="item in items" :key="item.id">
            <v-card
              class="my-3 fill-height"
              flat
              :to="{ name: 'authors_show', params: { id: item.id } }"
            >
              <v-card-title>
                {{ item.name }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </va-data-iterator>
  </base-material-card>
</template>
```

It will allow you to have this kind of nice card list layout while conserving all UI resource browsing controls with full pagination and filters :

![custom-list-layout](/assets/samples/custom-list-layout.png)

### VaDataTable
