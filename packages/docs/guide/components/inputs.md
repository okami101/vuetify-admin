# Inputs

VA input components allow editing of particular property of existing API resource object. Mainly used on [forms](../crud/form) for create and edit views. Can also be used as filter input for [`VaDataIterator`](../crud/list#data-iterator). For resource edition, it must be used within [`VaForm`](../crud/form#injector), which handle item injection and form model supply with error messages.

## VA inputs

### Text

|> docgen text-input

### Password

|> docgen password-input

### Number

|> docgen number-input

### Rating

|> docgen rating-input

### Date

|> docgen date-input

### Boolean

|> docgen boolean-input

### RichText

|> docgen rich-text-input

### Array

|> docgen array-input

### Select

|> docgen select-input

### RadioGroup

|> docgen radio-group-input

### Autocomplete

|> docgen autocomplete-input

### File

|> docgen file-input

## Custom component

You can prefectly create your own VA input component by using [`input`](mixins#input) mixin component. Very useful for editing complex property object or custom advanced input UI for primitives.

**`src/components/inputs/MyCustomInput.vue`**

```vue
<template>
  <va-input v-bind="$props">
    <v-btn @click="decrement">
      <v-icon small>mdi-minus-circle-outline</v-icon>
    </v-btn>
    <input type="number" :value="value" @blur.native="change" @input="update" />
    <v-btn @click="increment">
      <v-icon small>mdi-plus-circle-outline</v-icon>
    </v-btn>
  </va-input>
</template>

<script>
import Input from "vtec-admin/src/mixins/input";

export default {
  mixins: [Input],
  props: {
    /**
     * Number to be edited.
     * @model
     */
    value: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    decrement() {
      this.update(this.value - 1);
    },
    increment() {
      this.update(this.value + 1);
    }
  }
};
</script>
```

:::warning V-MODEL
You should use `update` method provided by input mixin with the new value in order to update the injected parent model on `VaForm`.
:::

:::tip INPUT WRAPPER
You may use [`VaInput`](#wrapper) wrapper if you want full error display handling without any effort.
:::

Then register it globally :

**`src/main.js`**

```js
import MyCustomInput from "./components/fields/MyCustomInput";

Vue.component("VaMyCustomInput", MyCustomInput)
```

:::warning NAMESPACE
Note as we add `Va` as prefix component name. That allows us to have a functional `type` prop for `VaDataTable` [filters](../crud/list#advanced-filters) if suitable. So next code will perfectly working :

```vue
<template>
  <va-data-iterator :filters="filters">
    <!-- VaDataTable -->
  </va-data-iterator>
</template>

<script>
export default {
  data() {
    return {
      filters: [
        { source: 'level', type: 'my-custom' },
        // ...
      ],
      // ...
    };
  },
};
</script>
```

:::

### Wrapper

|> docgen input
