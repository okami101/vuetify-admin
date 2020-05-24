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
        :fields="fields"
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
      fields: [
        { source: 'name', link: 'show' },
        { source: 'type', type: 'select' },
        'founder',
        'headquarter',
        { source: 'url', type: 'url' },
        { source: 'active', type: 'boolean' },
        { source: 'opening_date', type: 'date' },
      ],
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

:::warning DISPLAY DATA
`VaDataIterator` is only responsible for data iteration UI controls. You still need to display the data list on your own or use the providing `VaDataTable`.
:::

## VaDataTable

|> docgen va-data-table

:::warning CONTEXT SYNCHRONIZATION
As the `VaDataTable` is a dumb component, it needs to be synchronized with a context data. As seen at the above code example, the simplest way is to use `VaDataIterator` as data browsing control and do next additional attachments :

* `v-slot="props"` and `v-bind="props"` : Pass all data iterator slot bindings into data table as props.
* `v-model="selected"` : Keep selected items used for bulk operation synchronized, all selected items in data table will be reflected on data iterator and vice-versa.
* `:options.sync="options"`: Keep current search query context synchronized between all components, as the data table will add sorting support.
:::

### Fields

Use `fields` prop in order to define all columns. It's an array of string or object where can precise the best suited field formatter to use for data. As for filters above, you need at least to set `source` property which defined the field of resources you want to fetch, then the type for data formatter if different than simple text format. For all supported fields, check the [fields section](fields).

```vue {9-47}
<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-data-iterator
      v-model="selected"
      :options.sync="options"
      v-slot="props"
    >
      <va-data-table
        :fields="fields"
        show-expand
        v-bind="props"
        v-model="selected"
        :options.sync="options"
      >
        <template v-slot:authors="{ value }">
          <v-chip-group column>
            <va-reference-field
              reference="authors"
              v-for="(item, i) in value"
              :key="i"
              color="primary"
              small
              chip
              :item="item"
            >
            </va-reference-field>
          </v-chip-group>
        </template>
        <template v-slot:expanded-item="{ item }">
          {{ item.description }}
        </template>
      </va-data-table>
    </va-data-iterator>
  </base-material-card>
</template>
```

See all supported field properties :

| Property       | Type      | Description                                                                                       |
| -------------- | --------- | ------------------------------------------------------------------------------------------------- |
| **source**     | `string`  | Resource property to display.                                                                     |
| **type**       | `string`  | Type of [field](field) to use.                                                                    |
| **label**      | `string`  | Column title header, use [localized property source](../i18n) by default.                         |
| **sortable**   | `boolean` | Activate server-side sort.                                                                        |
| **align**      | `string`  | You can Use `left`, `right`, `center` for each cell `align` attribute.                            |
| **link**       | `string`  | Use any valid `show` or `edit` action in order to add an anchor wrapper link for each cell field. |
| **attributes** | `object`  | All props or attributes to merge to the [field component](field)                                  |
| **editable**   | `boolean` | Replace field by a live edit input. Ideal for quick live toggle switch updates.                   |

#### Advanced column templating

TODO

#### Filters

:::tip GLOBAL SEARCH
A global search filter will be enabled by default. To disable it, use `disableGlobalSearch` prop.

This filter will send the string search query on backend via the key configured on `globalSearchQuery`, which is `q` by default.

Then you have to deal on backend side for SQL processing, for example via a multi columns `LIKE` search. If you use the Vtec Laravel package for your Laravel app, you can use the dedicated `SearchFilter` for that.
:::

In addition to global search, `VaDataIterator` supports advanced custom filters as well with many supported inputs as shown here :

![filters](/assets/samples/filters.png)

Use the "Add filter" button for adding more filters that will add a new `AND` condition. It's all filter as you type so no need for any manual apply input. The supported inputs for filtering are `text`, `number`, `boolean`, `date`, `rating`, `select`, `autocomplete`. Each filter are removable.

In order to define new filters, use the `filters` props. Here are a code sample usage of this advanced filters :

```vue
<template>
  <va-data-iterator
    :filters="[
      {
        source: 'book',
        type: 'autocomplete',
        optionText: 'title',
        multiple: true,
        reference: 'books',
      },
      { source: 'rating', type: 'rating' },
      {
        source: 'status',
        type: 'select',
        multiple: true,
      },
      'author',
      {
        source: 'published_before',
        type: 'date',
      },
      {
        source: 'published_after',
        type: 'date',
      },
    ]"
  >
    <!-- Default slot -->
  </va-data-iterator>
</template>
```

Each added filter will be added to the "Add filter" dropdown button for on-asking filter activation, unless `alwaysOn` property is set to `true`. In that case, filter will be always visible and not removable.

Other filter properties will correspond to props that you can use for inputs. See [dedicated inputs section](inputs) for further detail on valid props for each filterable inputs. You will mainly use mandatory `source` property as well as `type` for input type. All other properties will be merged in input component as props or attributes.

See all supported field properties :

| Property       | Type      | Description                                                               |
| -------------- | --------- | ------------------------------------------------------------------------- |
| **source**     | `string`  | Resource property to display.                                             |
| **type**       | `string`  | Type of [input](input) to use.                                            |
| **label**      | `string`  | Column title header, use [localized property source](../i18n) by default. |
| **alwaysOn**   | `boolean` | Keep filter always active and visible. Not removable                      |
| **attributes** | `object`  | All props or attributes to merge to the [input component](input)          |

##### Internal filters

In addition to exposed filters, you may need some internal filters that user cannot modify through UI. Use `filter` prop for that. It's an simple key-value object that will be automatically sent to your data provider, merged with any other active filters.

#### Actions

This list component comes with 2 provided global actions, which are `create` and `export`. The create button will only appear if current resource has create action and if authenticated user has create permission on this resource.

:::tip ACTION EVENTS
You're not forced keep the default redirect behavior button. If you prefer a create event, juste subscribe to `create` event and the button will not redirect to linked action page.

You will have the same bahavior for `show`, `edit` and `clone` actions inside `VaDataTable`. A subscribe to each respective event will disable redirect.

Note that this buttons will autohide if no action exist for this button. A subscription to relevent action will force the button to reappear.
:::

##### Export

The export button will process a CSV file download on client side. It simply takes the current search context and refetch data on server side, while keeping current filters and sorts without any pagination infos.

##### Custom actions

You can add custom actions via `actions` slot :

```vue {4-6}
<template>
  <base-material-card>
    <va-data-iterator>
      <template v-slot:actions>
        <my-custom-button></my-custom-button>
      </template>
      <template v-slot="props">
        <!-- VaDataTable -->
      </template>
    </va-data-iterator>
  </base-material-card>
</template>
```

:::warning DEFAULT V-SLOT
In case you need other slots than default one, you must move `v-slot="props"` into immediate parent template of list layout as shown above.
:::

#### Bulk actions

The data iterator support all sort of bulk operations, whether it be updating or deleting. This feature will use `updateMany` and `deleteMany` methods of you data provider. All available bulk actions will appear at header as soon as you have selected some items.

![bulk-actions](/assets/samples/bulk-actions.png)

##### Custom bulk actions

By default VA provides a bulk delete action, but you add any multiple bulk actions as needed by using `bulk.actions` slots and [`VaBulkActionButton`](buttons#vabulkactionbutton) that will use `updateMany` under the hood. This last component needs a required `action` prop that will be the object to send to your API. This object will contain all properties you want to bulk update.

The next example will show you a bulk publish and unpublish bulk actions :

```vue {4-23}
<template>
  <base-material-card>
    <va-data-iterator>
      <template v-slot:actions>
        <va-bulk-action-button
          resource="users"
          v-model="selected"
          :label="$t('users.enable')"
          icon="mdi-publish"
          color="success"
          :action="{ active: true }"
          text
        ></va-bulk-action-button>
        <va-bulk-action-button
          resource="users"
          v-model="selected"
          :label="$t('users.disable')"
          icon="mdi-download"
          color="orange"
          :action="{ active: false }"
          text
        ></va-bulk-action-button>
      </template>
      <template v-slot="props">
        <va-data-table
          :fields="fields"
          v-bind="props"
          v-model="selected"
          :options.sync="options"
        ></va-data-table>
      </template>
    </va-data-iterator>
  </base-material-card>
</template>
```

:::warning SELECTED V-MODEL
In order to keep all components synchronized with current selected items, you may add `v-model="selected"` on any components that need to interact with them.
:::

#### Pagination

By default, `VaDataIterator` will use the default vuetify pagination control which allows direct page control navigation as well as number of shown item per page. Use `itemsPerPage` and `itemsPerPageOptions` in order to initialized the maximum number of shown item per page.

This default control is totally replaceable by your own pagination control. Use `footer` slot property for that.

## Usage outside list page

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
          :fields="fields"
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
      fields: [
        // ...
      ],
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

## Associations

You can use the

TODO

## Custom layout

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
