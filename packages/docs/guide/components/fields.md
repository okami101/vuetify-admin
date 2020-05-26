# Fields

VA field components allow custom and optimized display of specific resource property. It's mainly means to be used on [show](../crud/show) and [list](../crud/list) views. Use required `source` prop as resource property to fetch and display. Must be used with [`VaShow`](../crud/show#injector) component injector or with an explicit item object via `item` prop.

## VA field components

### Text

|> docgen text-field

```vue
<template>
  <va-text-field source="name"></va-text-field>
</template>
```

### Number

|> docgen number-field

### Rating

|> docgen rating-field

### Date

|> docgen date-field

### Boolean

|> docgen boolean-field

### RichText

|> docgen rich-text-field

### Chip

|> docgen chip-field

### Select

|> docgen select-field

### Email

|> docgen email-field

### Url

|> docgen url-field

### File

|> docgen file-field

### Image

|> docgen image-field

### Array

|> docgen array-field

### Reference

|> docgen reference-field

## Custom field component
