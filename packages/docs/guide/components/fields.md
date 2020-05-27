# Fields

VA field components allow custom and optimized display of specific resource property. It's mainly means to be used on [show](../crud/show) and [list](../crud/list) views. Use required `source` prop as resource property to fetch and display. Must be used with [`VaShow`](../crud/show#injector) component injector or with an explicit item object via `item` prop.

:::tip CELL TEMPLATING
You may use this VA fields as cells template for `VaDataTable`, see [this section](../crud/list#fields).
:::

:::tip FIELD WRAPPER
Contrary to VA inputs, the typed VA fields doesn't include any wrapper with label, only simple display formatter. You may use [`VaField`](../crud/show#field-wrapper) for that.

Besides this wrapper include a nice shortand with specific `type` property that avoid to retype full field component inside default slot. All supported type field attributes will be merged into child field component. See [more](../crud/show#field-wrapper) for further detail.
:::

## VA fields

### Text

|> docgen text-field

**`SAMPLE`**

```vue
<template>
  <va-text-field source="name"></va-text-field>
</template>
```

### Email

|> docgen email-field

**`SAMPLE`**

```vue
<template>
  <va-email-field source="email"></va-email-field>
</template>
```

### Url

|> docgen url-field

**`SAMPLE`**

```vue
<template>
  <va-url-field source="url" target="_self"></va-url-field>
</template>
```

### Rich text

|> docgen rich-text-field

**`SAMPLE`**

```vue
<template>
  <va-rich-text-field source="body"></va-rich-text-field>
</template>
```

### Number

|> docgen number-field

**`SAMPLE`**

```vue
<template>
  <va-number-field source="price" format="currency"></va-number-field>
</template>
```

:::warning FORMAT
You must register a valid number format first for targetted i18n locale as next :

```js
i18n.setNumberFormat("en", {
  currency: {
    style: "currency",
    currency: "USD",
  },
});
i18n.setNumberFormat("fr", {
  currency: {
    style: "currency",
    currency: "EUR",
  },
});
```

See [VueI18n documentation](https://kazupon.github.io/vue-i18n/guide/number.html)
:::

### Date

|> docgen date-field

**`SAMPLE`**

```vue
<template>
  <va-date-field source="publication_date" format="short"></va-date-field>
</template>
```

:::warning FORMAT
You must register a valid date format first for targetted i18n locale as next :

```js
i18n.setDateTimeFormat("en", {
  short: {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
  long: {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  },
});
```

See [VueI18n documentation](https://kazupon.github.io/vue-i18n/guide/datetime.html).

:::

### Boolean

|> docgen boolean-field

**`SAMPLE`**

```vue
<template>
  <va-boolean-field source="active" icon-false="mdi-cancel"></va-boolean-field>
</template>
```

### Rating

|> docgen rating-field

**`SAMPLE`**

```vue
<template>
  <va-rating-field source="rating" length="10" half-increments></va-rating-field>
</template>
```

### Chip

|> docgen chip-field

**`SAMPLE`**

```vue
<template>
  <va-chip-field source="type" color="secondary" small></va-chip-field>
</template>
```

:::tip ENUMS
If you need format value in terms of choices or enums, use [`VaSelectField`](#select) with `chip` prop.
:::

### Select

|> docgen select-field

**`SAMPLE`**

```vue
<template>
  <va-select-field source="category" chip :choices="choices"></va-select-field>
</template>

<script>
export default {
  data() {
    return {
      choices: [
        { value: 'comics', text: 'Comics' },
        { value: 'novels', text: 'Novels' }
      ]
    }
  }
}
</script>
```

:::tip LOCALIZED ENUMS
You may centralized all choices for reuse directly inside you locales as [explain here](../i18n#resources). If no choices setted, `VaSelectField` will lookup for this valid translated key format : `resources.{resource}.enums.{source}.{value}`.
:::

### File

|> docgen file-field

**`SAMPLE`**

```vue
<template>
  <va-file-field source="files"></va-file-field>
</template>
```

### Image

|> docgen image-field

**`SAMPLE`**

```vue
<template>
  <va-image-field source="photos" src="thumbnails.medium"></va-image-field>
</template>
```

You can play with `lg` and `height` for sort of gallery when multiple files :

![images](/assets/images.png)

### Array

|> docgen array-field

**`SAMPLE`**

```vue
<template>
  <va-array-field source="formats" select></va-array-field>
</template>
```

:::tip ENUMS
You can combine this field with `VaSelectField` for enums or choices support by activating `select` prop.
:::

:::tip NESTED OBJECT
Use default slot for inner chip templating :

```vue
<template>
  <va-array-field source="formats" v-slot="{ value }">
    {{ value.date }} : {{ value.url }}
  </va-array-field>
</template>
```

For more complex case, use a simple `v-for` custom template.
:::

### Reference

|> docgen reference-field

**`SAMPLE`**

```vue
<template>
  <va-reference-field
    source="publisher"
    reference="publishers"
    chip
    color="orange"
    action="edit"
  ></va-reference-field>
</template>
```

:::tip DEFAULT SLOT
Use default slot for custom resource labelization. It takes by default the value of property configured on `label` of [main resource object property](../resources#resource-object-structure). If you want just ID instead :

```vue
<template>
  <va-reference-field
    source="publisher"
    reference="publishers"
    chip
    color="orange"
    action="edit"
    v-slot="{ value }"
  >
    {{ value.id }}
  </va-reference-field>
</template>
```

:::

:::warning NO AUTOFETCH SUPPORT
Contrary to React Admin reference field equivalent, this field doesn't support resource autofetch via `getMany`, because too much code needed for aggregation support in my taste. Your backend must eager-load all related resources at once. For list via `VaDataIterator` you can lean on `include` prop for on asking eager loading.
:::

### Reference array

|> docgen reference-array-field

**`SAMPLE`**

```vue
<template>
  <va-reference-array-field
    source="reviews"
    reference="reviews"
    color="green"
    column
    action="edit"
  ></va-reference-array-field>
</template>
```

Will render :

![references](/assets/references.png)

:::tip DEFAULT SLOT
Use default slot for custom resource labelization.
:::

## Custom component

You can prefectly create your own VA field component by using [`field`](mixins#field) mixin component. Very useful for displaying complex property object or custom advanced display for primitives.

**`src/components/fields/MyCustomField.vue`**

```vue
<template>
  <span class="my-custom-field">
    My custom field component : {{ value }}
  </span>
</template>

<script>
import Field from "vtec-admin/src/mixins/field";

export default {
  mixins: [Field],
};
</script>
```

Then register it globally :

**`src/main.js`**

```js
import MyCustomField from "./components/fields/MyCustomField";

Vue.component("VaMyCustomField", MyCustomField)
```

:::warning NAMESPACE
Note as we add `Va` as prefix component name. That allows us to have a functional `type` prop for [`VaDataTable`](../crud/list#data-table) and [`VaField`](../crud/show#field-wrapper) components. So next code will perfectly working :

```vue
<template>
  <va-field source="custom_property" type="my-custom"></va-field>
</template>
```

:::
