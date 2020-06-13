# Show

The show page is used to be display full detail of particular resource item via usage of `getOne` data provider method. Vtec Admin facilitates his development by providing a standard layout as well as many field components as value resource property formatters. As always, it's stay a standard view page component, so no real limit for delivering any advanced show view you can imagine.

![show](/assets/show.png)

## Show layout

|> docgen show-layout

### Custom actions

You can add specific global item actions on top header of `VaShowLayout` by using `actions` slot :

```vue
<template>
  <va-show-layout>
    <template slot="actions">
      <impersonate-button :item="item"></impersonate-button>
    </template>
    <!-- Default slot -->
  </va-show-layout>
</template>
```

### Tabbed layout

![tabs](/assets/tabs.png)

As you have total freedom on the layout, it's really easy to create a tabbed style show by using any vuetify or custom components. By example you can use the material tabs card component provided by Vue CLI Plugin :

```vue
<template>
  <va-show-layout>
    <va-show :item="item">
      <v-row justify="center">
        <v-col lg="8">
          <base-material-tabs-card
            :tabs="[
              { id: 'attributes', icon: 'mdi-eye' },
              { id: 'summary', icon: 'mdi-text' },
            ]"
          >
            <template v-slot:attributes>
              <!-- 1st tab content -->
            </template>
            <template v-slot:summary>
              <!-- 2st tab content -->
            </template>
          </base-material-tabs-card>
        </v-col>
      </v-row>
    </va-show>
  </va-show-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
```

## Injector

|> docgen show

Here a full showcase of this injector component :

```vue
<template>
  <va-show-layout>
    <va-show :item="item">
      <v-row justify="center">
        <v-col sm="6">
          <base-material-card>
            <template v-slot:heading>
              <div class="display-2">
                {{ title }}
              </div>
            </template>
            <v-card-text>
              <va-field
                source="logo"
                type="image"
                src="thumbnails.large"
                contain
              ></va-field>
              <v-row>
                <v-col>
                  <va-field source="name"></va-field>
                  <va-field source="type" type="select"></va-field>
                </v-col>
                <v-col>
                  <va-field source="founder"></va-field>
                  <va-field source="headquarter"></va-field>
                </v-col>
              </v-row>
              <va-field source="description"></va-field>
              <v-row>
                <v-col lg="6">
                  <va-field source="url" type="url"></va-field>
                  <va-field source="email" type="email"></va-field>
                  <va-field source="active" type="boolean"></va-field>
                </v-col>
                <v-col lg="6">
                  <va-field
                    source="address"
                    :label="$t('address')"
                    v-slot="{ value }"
                  >
                    {{ value.street }}, {{ value.postcode }} {{ value.city }}
                  </va-field>
                  <va-field source="opening_date" type="date"></va-field>
                  <va-field source="books_count" type="number"></va-field>
                </v-col>
              </v-row>
              <va-field
                source="local"
                type="image"
                src="thumbnails.medium"
              ></va-field>
            </v-card-text>
          </base-material-card>
        </v-col>
      </v-row>
    </va-show>
  </va-show-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
```

As you can guess, the main role of `VaShow` is to inject full item resource object on every VA field components which leads to minimal boilerplate code. Then VA field will be able to catch the value of resource property indicated on the `source` prop.

## Field wrapper

|> docgen field

:::tip DEFAULT LABEL
By default, `VaField` will try to guess the proper localized label from `source` prop by following [this structure](../i18n.md#resources).
:::

If no default slot is provided, `VaField` will automatically use a specific [Va field component](../components/fields.md) under the hood according to the `type` prop.

So :

```vue
<template>
  <va-show-layout>
    <va-show :item="item">
      <va-field source="type" type="select" chip></va-field>
    </va-show>
  </va-show-layout>
</template>
```

Is perfectly equivalent to :

```vue
<template>
  <va-show-layout>
    <va-show :item="item">
      <va-field source="type">
        <va-select-field source="type" chip></va-select-field>
      </va-field>
    </va-show>
  </va-show-layout>
</template>
```

Or :

```vue
<template>
  <va-show-layout>
    <va-show :item="item">
      <va-field source="type" v-slot="{ item }">
        <va-select-field source="type" :item="item" chip></va-select-field>
      </va-field>
    </va-show>
  </va-show-layout>
</template>
```

You can use this component only for label and item value provider and made your own customization. Simply use the default slot provider that will give you the value and full item.

```vue
<template>
  <va-show-layout>
    <va-show :item="item">
      <va-field
        source="address"
        :label="$t('address')"
        v-slot="{ value }"
      >
        {{ value.street }}, {{ value.postcode }} {{ value.city }}
      </va-field>
    </va-show>
  </va-show-layout>
</template>
```

:::tip ALL FIELD COMPONENTS
Go to separated [fields guide reference](../components/fields.md) to get all supported components for display data.
You can still create your [own field component](../components/fields.md#custom-field-component) if none suit your needs.
:::
