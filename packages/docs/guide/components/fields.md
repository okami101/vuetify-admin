# Fields

VA field components allow custom and optimized display of specific resource property. It's mainly means to be used on [show](../crud/show) and [list](../crud/list) views. Use required `source` prop as resource property to fetch and display. Must be used with [`VaShow`](../crud/show#injector) component injector or with an explicit item object via `item` prop.

:::tip WRAPPER
Contrary to VA inputs, the typed VA fields doesn't include any wrapper with label, only simple display formatter. You may use [`VaField`](../crud/show#field-wrapper) for that.

Besides this wrapper include a nice shortand with specific `type` property that avoid to retype full field component inside default slot. All supported type field attributes will be merged into child field component. See [more](../crud/show#field-wrapper) for further detail.
:::

## VA field components

### Text

|> docgen text-field

```vue
<template>
  <va-text-field source="name"></va-text-field>
</template>
```

### Email

|> docgen email-field

```vue
<template>
  <va-email-field source="email"></va-email-field>
</template>
```

### Url

|> docgen url-field

```vue
<template>
  <va-url-field source="url" target="_self"></va-url-field>
</template>
```

### RichText

|> docgen rich-text-field

```vue
<template>
  <va-rich-text-field source="body"></va-rich-text-field>
</template>
```

### Number

|> docgen number-field

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

```vue
<template>
  <va-boolean-field source="active" icon-false="mdi-cancel"></va-boolean-field>
</template>
```

### Rating

|> docgen rating-field

```vue
<template>
  <va-rating-field source="rating" length="10" half-increments></va-rating-field>
</template>
```

### Chip

|> docgen chip-field

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

### Image

|> docgen image-field

### Array

|> docgen array-field

### Reference

|> docgen reference-field

## Custom field component
