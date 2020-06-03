# List

The list page is the main UI entry point of your resource where you can do all sort of resources browsing operations, as paginating, sorting, filtering, exporting, etc. It's the best place to put a `VaList` data iterator component that will use `getList` data provider with all the search context. The traditional UI layout data list stay the good old full data table by using `VaDataTable` components, but it can be totally replaced by anything you want.

![list](/assets/list.png)

:::tip PAGE CUSTOMIZATION
Note that for every CRUD pages you are free to put anything you want, and you have not forced to use provided optimized components.

Since all data provider methods are available in a dedicated store module for each resource, it's not that complicated to create your own list components that will fetch your data. And you can of course use the current global `$axios` instance if you need to fetch all sort of custom data that coming out of data provider logic. See [usage here](../data-providers.md#store).
:::

## Data iterator

|> docgen data-iterator

Here a quick sample usage within the `VaDataTable` component :

```vue
<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list>
      <va-data-table :fields="fields"></va-data-table>
    </va-list>
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
    };
  },
};
</script>
```

It will produce this simple structure :

![list](/assets/list-sample.png)

Note that `VaList` will try to be synchronized on real time within query string in order to allow any bookmark or keep state on every browser refresh. All browsing action as paginate, filter and sorting will be updated into the URL query string.

:::warning DISPLAY DATA
`VaList` is only responsible for data iteration UI controls. You still need to display the data list on your own or use the providing `VaDataTable`.
:::

## Data table

|> docgen data-table

:::warning CONTEXT SYNCHRONIZATION
As the `VaDataTable` is a dumb component, it needs to be synchronized with a context data. As seen at the above code example, the simplest way is to use `VaList` as data browsing control that will automatically inject following behaviors :

* **Current resource and items** : Pass all result data from iterator into data table with total.
* **Loading state** : for activating busy mode when fetching on API.
* **Selected items** : Keep selected items used for bulk operation synchronized, all selected items in data table will be reflected on data iterator and vice-versa.
* **Current search context**: Keep current search query context synchronized between all components, as the data table will add sorting support.
:::

### Fields

![fields](/assets/fields.png)

Use `fields` prop in order to define all columns. It's an array of string or object where can precise the best suited field formatter for data display. You need at least to set `source` property which defined the field of resources you want to fetch, then the type for data formatter if different than simple text format. For all supported fields, check the [fields section](../components/fields.md).

```vue {9,25-72}
<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list>
      <va-data-table :fields="fields" show-expand></va-data-table>
    </va-list>
  </base-material-card>
</template>

<script>
export default {
  props: ["resource", "title"],
  data() {
    return {
      fields: [
        { source: "isbn", link: "show" },
        {
          source: "cover",
          type: "image",
          link: "show",
          attributes: {
            src: "thumbnails.small",
          },
        },
        { source: "category", type: "select", attributes: { chip: true } },
        {
          source: "publisher",
          type: "reference",
          attributes: {
            reference: "publishers",
            text: "name",
            chip: true,
            color: "orange",
          },
        },
        { source: "title", sortable: true },
        {
          source: "price",
          type: "number",
          sortable: true,
          attributes: {
            format: "currency",
          },
        },
        { source: "commentable", type: "boolean", editable: true },
        {
          source: "formats",
          type: "array",
          attributes: {
            select: true,
            color: "yellow",
            small: true,
            column: true,
          },
        },
        {
          source: "publication_date",
          type: "date",
          sortable: true,
        },
        "authors",
      ],
    };
  },
};
</script>
```

See all supported field properties :

| Property       | Type      | Description                                                                                  |
| -------------- | --------- | -------------------------------------------------------------------------------------------- |
| **source**     | `string`  | Resource property to display.                                                                |
| **type**       | `string`  | Type of [field](../components/fields.md) to use.                                                              |
| **label**      | `string`  | Column title header, use [localized property source](../i18n.md) by default.                    |
| **sortable**   | `boolean` | Activate server-side sort.                                                                   |
| **align**      | `string`  | You can Use `left`, `right`, `center` for each cell `align` attribute.                       |
| **link**       | `string`  | Use any valid `show` or `edit` action if you want to wrap field inside resource action link. |
| **attributes** | `object`  | All props or attributes to merge to the [field component](../components/fields.md).                           |
| **editable**   | `boolean` | Replace field by a live edit input. Ideal for quick live toggle switch updates.              |

:::tip SHORTHAND
You can use a simple string for each field column, `"my-property"` is similar to `{ source: "my-property" }`.
:::

### Field templating

In case of all above field options doesn't suit your needs, you can percectly use advanced slot templating for each field. You can even use all VA fields inside it. Very useful when you need to nest this field component within parent component as shown next :

```vue {15-28}
<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list>
      <va-data-table :fields="fields" show-expand>
        <template v-slot:field.authors="{ value }">
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
      </va-data-table>
    </va-list>
  </base-material-card>
</template>
```

You just have to use a slot named as `field.{source}` for that, where `source` is the name of field. This slot will provide to you full row resource item and value of the cell that will be rendered as default.

### Expandable row

![expandable](/assets/expandable.png)

You can use the `expanded-item` slot for an additional togglable full collspan cell under the item row. Ideal for quick view.

```vue {10,15-17}
<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list>
      <va-data-table :fields="fields" show-expand>
        <template v-slot:expanded-item="{ item }">
          {{ item.description }}
        </template>
      </va-data-table>
    </va-list>
  </base-material-card>
</template>
```

### Custom row actions

If you need other item actions in addition to classic crud operations, use the dedicated `item.actions` slot.

```vue {14-20}
<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list>
      <va-data-table :fields="fields">
        <template v-slot:item.actions="{ resource, item }">
          <impersonate-button
            :resource="resource"
            :item="item"
            icon
          ></impersonate-button>
        </template>
      </va-data-table>
    </va-list>
  </base-material-card>
</template>
```

## Search filter

A global search filter will be enabled by default. To disable it, use `disableGlobalSearch` prop.

This filter will send the string search query on backend via the key configured on `globalSearchQuery`, which is `q` by default.

Then you have to deal on backend side for SQL processing, for example via a multi columns `LIKE` search. If you use the Vtec Laravel package for your Laravel app, you can use the dedicated `SearchFilter` for that :

```php {4}
return UserResource::collection(
    QueryBuilder::for(User::class)
        ->allowedFilters([
            AllowedFilter::custom('q', new SearchFilter(['name', 'email'])),
            AllowedFilter::exact('id'),
            AllowedFilter::partial('roles'),
        ])
        ->allowedSorts(['id', 'name', 'email'])
        ->exportOrPaginate()
);
```

:::tip INTERNAL FILTERS
In addition to exposed filters, you may need some internal filters that user cannot modify through UI. Use `filter` prop for that. It's an simple key-value object that will be automatically sent to your data provider, merged with any other active filters.
:::

## Advanced filters

In addition to global search, `VaList` supports advanced custom filters as well with many supported inputs as shown here :

![filters](/assets/filters.png)

Use the "Add filter" button for adding more filters that will add a new `AND` condition. The supported inputs for filtering are `text`, `number`, `boolean`, `date`, `rating`, `select`, `autocomplete`. Each filter are removable.

In order to define new filters, use the `filters` props. Here are a code sample usage of this advanced filters :

```vue {4,19-42}
<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list :filters="filters">
      <!-- VaDataTable -->
    </va-list>
  </base-material-card>
</template>

<script>
export default {
  props: ["resource", "title"],
  data() {
    return {
      filters: [
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
      ],
    };
  },
};
</script>
```

You will mainly use mandatory `source` property as well as `type` for input type. Each added filter will be added to the "Add filter" dropdown button for on-asking filter activation, unless `alwaysOn` property is set to `true`. In that case, filter will be always visible and not removable.

Use `attributes` property in order to merge specific attributes into input component. See [dedicated inputs section](../components/inputs.md) for further detail on valid props for each filterable inputs.

See all supported field properties :

| Property       | Type      | Description                                                               |
| -------------- | --------- | ------------------------------------------------------------------------- |
| **source**     | `string`  | Resource property to display.                                             |
| **type**       | `string`  | Type of [input](../components/inputs.md) to use.                                            |
| **label**      | `string`  | Column title header, use [localized property source](../i18n.md) by default. |
| **alwaysOn**   | `boolean` | Keep filter always active and visible. Not removable                      |
| **attributes** | `object`  | All props or attributes to merge to the [input component](../components/inputs.md)          |

### Filter templating

As same way as field templating you can even template your filter directy by using `filter.{source}` slot, where `source` is the name of filter. However, as your custom filter component must return input on change in order to work with current active filter, you will need to expose the internal filter of `VaList` by `filter.sync`, and then update the filter with new value on each input change.

Here is a full working sample :

```vue {7,9-16,34,48-55}
<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list :filters="filters" :filter.sync="filter">
      <template v-slot:filter.headquarter="props">
        <va-text-input
          hide-details
          :filled="false"
          v-bind="props"
          @input="(val) => update('headquarter', val)"
        ></va-text-input>
      </template>
      <va-data-table :fields="fields"></va-data-table>
    </va-list>
  </base-material-card>
</template>

<script>
export default {
  props: ["resource", "title"],
  data() {
    return {
      filter: {},
      filters: [
        "name",
        "founder",
        "headquarter",
        { source: "active", type: "boolean" },
      ],
      fields: [
        //...
      ],
    };
  },
  methods: {
    update(source, value) {
      this.filter = {
        ...this.filter,
        [source]: value,
      };
    },
  },
};
</script>
```

## Global actions

This `VaList` component comes with 2 provided global actions, which are `create` and `export`. The create button will only appear if current resource has create action and if authenticated user has create permission on this resource.

:::tip ACTION EVENTS
You're not forced keep the default redirect behavior button. If you prefer a create event, juste subscribe to `action` event and disable create redirect via `disableCreateRedirect` prop for preventing create button to redirect to linked action page.

You will have the same bahavior for `show`, `edit` and `clone` actions inside `VaDataTable`. Use `item-action` event and disable default redirect if you need custom behavior on your side as aside or dialog edition.

Note that all of this buttons will autohide if no action exist for each related button. Deactivation of each relevent action redirect will force buttons to reappear.

This action events will always provide you the freshed item from the API as well as the adapted CRUD title.
:::

### Export

The export button will process a CSV file download on client side. It simply takes the current search context and refetch data on server side, while keeping current filters and sorts without any pagination infos.

:::tip SERVER-SIDE EXPORT
Because the client-side exports has it's own limits and limited to basic CSV, you can always create a custom action that do an export on server-side. Create a custom `href` button as shown below and use `disableExport` prop. Your href should contain all search context provided by `options` without any pagination infos and redirect to a valid API endpoint that return a response with attachment content in order to provoke a file download.
:::

### Custom actions

You can add custom actions via `actions` slot :

```vue {4-6}
<template>
  <base-material-card>
    <va-list>
      <template v-slot:actions>
        <my-custom-button></my-custom-button>
      </template>
      <!-- VaDataTable -->
    </va-list>
  </base-material-card>
</template>
```

## Bulk actions

The data iterator support all sort of bulk operations, whether it be updating or deleting. This feature will use `updateMany` and `deleteMany` methods of you data provider. All available bulk actions will appear at header as soon as you have selected some items.

![bulk-actions](/assets/bulk-actions.png)

### Custom bulk actions

By default VA provides a bulk delete action, but you can add any multiple bulk actions as needed by using `bulk.actions` slots and [`VaBulkActionButton`](../components/buttons.md#bulk-action) that will use `updateMany` under the hood. This last component needs a required `action` prop that will be the object to send to your API. This object will contain all properties you want to bulk update.

The next example will show you a bulk publish and unpublish bulk actions :

```vue {4-23}
<template>
  <base-material-card>
    <va-list>
      <template v-slot:actions>
        <va-bulk-action-button
          resource="users"
          :label="$t('users.enable')"
          icon="mdi-publish"
          color="success"
          :action="{ active: true }"
          text
        ></va-bulk-action-button>
        <va-bulk-action-button
          resource="users"
          :label="$t('users.disable')"
          icon="mdi-download"
          color="orange"
          :action="{ active: false }"
          text
        ></va-bulk-action-button>
      </template>
      <va-data-table :fields="fields"></va-data-table>
    </va-list>
  </base-material-card>
</template>
```

:::tip SELECTED ITEMS
`VaBulkActionButton` will automatically use injected search state to get all items to interact.
:::

## Pagination

By default, `VaList` will use the default vuetify pagination control which allows direct page control navigation as well as number of shown item per page. Use `itemsPerPage` and `itemsPerPageOptions` in order to initialized the maximum number of shown item per page.

This default control is totally replaceable by your own pagination control. Use `footer` slot property for that and set `hideDefaultFooter` prop to `true`. This slot will provide all pagination context infos as well as server-side total of items.

## Usage outside list page

![relationship](/assets/relationship.png)

You're not forced to use `VaList` on list page ! As the same way for most of VA components, it can be used anywhere on any page or context thanks to `resource` prop which is present on all resource aware VA components. When not defined, the default resource will be the one linked to the current route.

Next example shows a good use case of `VaList` inside a `VaEditLayout` page in order to show some related resources linked to the current edited item resource.

```vue {6-10}
<template>
  <va-edit-layout>
    <publishers-form :id="id" :title="title" :item="item"></publishers-form>
    <base-material-card icon="mdi-book" title="Books">
      <va-list
        resource="books"
        disable-query-string
        :filter="{
          publisher: id,
        }"
      >
        <va-data-table :fields="fields">
          <!-- VaDataTable -->
        </va-data-table>
      </va-list>
    </base-material-card>
  </va-edit-layout>
</template>
```

Note that the only thing to do is to provide explicitly the resource to fetch and use the `filter` which allows us to add internal filters, perfect place for adding the current resource as filter.

:::warning QUERY STRING
For this case usage, you may disable default query string update in order to prevent unexpected behavior. Use `disable-query-string` for that.
:::

### Associations

![associations](/assets/associations.png)

You can go even further by managing associations thanks to provided `association` prop object that give us the ability of attach or detach relationship between related resources directly from the list. It will automatically generate a autocomplete search on given list ressource that allow us to attach via the associate button. Each row item can be detach via dissaciate button.

See this example :

```vue {15,29,48-52}
<template>
  <va-edit-layout>
    <authors-form :id="id" :title="title" :item="item"></authors-form>
    <base-material-card
      icon="mdi-book"
      :title="$tc('resources.books.name', 10)"
    >
      <va-list
        resource="books"
        disable-global-search
        disable-pagination
        disable-query-string
        disable-create
        disable-export
        :association="association"
        :filter="{
          authors: id,
        }"
        :include="['publisher', 'reviews']"
      >
        <va-data-table
          resource="books"
          disable-sort
          disable-select
          disable-clone
          disable-delete
          :association="association"
          :fields="fields"
        ></va-data-table>
      </va-list>
    </base-material-card>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
  data() {
    return {
      fields: [
        //...
      ],
      association: {
        resource: "authors",
        source: "author_id",
        id: this.id,
      },
    };
  },
};
</script>
```

Expected properties of `association` :

| Property     | Type     | Description                                                              |
| ------------ | -------- | ------------------------------------------------------------------------ |
| **resource** | `string` | Resource that you want to link / unlink. Just for labellisation purpose. |
| **source**   | `string` | Name of request key data to send on backend.                             |
| **id**       | `number` | ID of current ressource to detach.                                       |

For both associate and dissociate actions, the `update` data provider method will be called on the listed resource (which is `books` for this example) with this data : `{ <type>_<source>: <id> }`. `type` will correspond to the type of operation, which is `add` or `remove`. It's up to you to make the effective association from server-side.

:::tip LARAVEL EXAMPLE
Here is a code sample you can use on your `update` endpoint of your controller for a pivot relation :

```php
if ($id = $request->input('add_author_id')) {
    $book->authors()->attach($id);
}

if ($id = $request->input('remove_author_id')) {
    $book->authors()->detach($id);
}
```

:::

## Custom layout

As you can see, `VaList` is mainly a data iterator that will provide items result into his default slot children components, which is `VaDataTable` here. As the browsing UI structure is totally separated from the data list display, you can use any custom list layout as you want.

It will allow you to have this kind of nice card list layout while conserving all UI resource browsing controls with full pagination and filters.

![custom-list-layout](/assets/custom-list-layout.png)

The only thing to do is to use the default slot of `VaList` which allows you to implement your custom template item list from the provided `items` binding value as shown here :

```vue {7-21}
<template>
  <base-material-card>
    <va-list
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
    </va-list>
  </base-material-card>
</template>
```

## Aside usage sample

Instead of have separate CRUD pages for each action, it's possible to regroup all CRUD view operations into single page list thanks to `VaAsideLayout` component. It's perfect if you show and form views are relatively small.

![aside](/assets/aside.png)

### AsideLayout

|> docgen aside-layout

:::tip USELESS ROUTES
If you use aside for crud operations, you may disable related `show`, `create` and `edit` routes. As shown in [resources guide section](../resources.md), use `actions` or `except` resource properties for that :

**`src/resources/index.js`**

```js {7}
export default [
  //...
  {
    name: "users",
    icon: "mdi-account",
    label: "name",
    actions: ["list", "delete"],
    permissions: ["admin"],
  },
];
```

:::

The default users template generated by Vue CLI Plugin is a good showcase for that :

```vue {3-6,13,24}
<template>
  <div>
    <va-aside-layout v-model="asideOpened" :title="asideTitle">
      <users-show v-if="show" :item="item"></users-show>
      <users-form v-else :id="id" :item="item" @saved="onSaved"></users-form>
    </va-aside-layout>
    <base-material-card :icon="resource.icon" :title="title">
      <va-list
        ref="list"
        disable-create-redirect
        @action="onAction"
      >
        <va-data-table
          :fields="fields"
          disable-create-redirect
          disable-show-redirect
          disable-edit-redirect
          @item-action="onAction"
        ></va-data-table>
      </va-list>
    </base-material-card>
  </div>
</template>

<script>
export default {
  props: ["resource", "title"],
  data() {
    return {
      fields: [
        //...
      ],
      asideOpened: false,
      asideTitle: null,
      id: null,
      item: null,
      show: false,
    };
  },
  methods: {
    async onAction({ action, title, id, item }) {
      this.asideTitle = title;
      this.id = id;
      this.show = action === "show";
      this.item = item;
      this.asideOpened = true;
    },
    onSaved() {
      this.asideOpened = false;
      this.$refs.list.fetchData();
    },
  },
};
</script>
```

It's mainly a comination of all available event actions via `action` and `item-action` which retrieve the freshed item from the API and CRUD title. Then all that's left is to disable default redirect and made some additional logic for show or hide the view or form while auto open aside via `value` prop of `VaAsideLayout`. Check the users CRUD sample for further detail.
