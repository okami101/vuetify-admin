# Inputs

VA input components allow editing of particular property of existing API resource object. Mainly used on [forms](../crud/form) for create and edit views. Can also be used as filter input for [`VaDataIterator`](../crud/list#data-iterator). For resource edition, it must be used within [`VaForm`](../crud/form#injector), which handle item injection and form model supply with error messages.

## VA inputs

### Text

|> docgen text-input

**`SAMPLE`**

```vue
<template>
  <v-row>
    <v-col sm="6">
      <va-text-input source="founder"></va-text-input>
    </v-col>
    <v-col sm="6">
      <va-text-input source="headquarter"></va-text-input>
    </v-col>
  </v-row>
  <va-text-input source="description" multiline></va-text-input>
</template>
```

Will render :

![text-input](/assets/inputs/text.png)

### Password

|> docgen password-input

**`SAMPLE`**

```vue
<template>
  <va-password-input source="password"></va-password-input>
</template>
```

Will render :

![password](/assets/inputs/password.png)

### Number

|> docgen number-input

**`SAMPLE`**

```vue
<template>
  <va-number-input source="level" :step="1" :min="0" :max="99"></va-number-input>
</template>
```

### Date

|> docgen date-input

**`SAMPLE`**

```vue
<template>
  <va-date-input source="publication_date" format="short"></va-date-input>
</template>
```

Will render :

![date](/assets/inputs/date.png)

### Boolean

|> docgen boolean-input

**`SAMPLE`**

```vue
<template>
  <va-boolean-input source="active"></va-boolean-input>
</template>
```

### Rating

|> docgen rating-input

**`SAMPLE`**

```vue
<template>
  <va-rating-input source="rating" length="5" half-increments></va-rating-input>
</template>
```

Will render :

![rating](/assets/inputs/rating.png)

### Rich text

|> docgen rich-text-input

**`SAMPLE`**

```vue
<template>
  <va-rich-text-input source="summary"></va-rich-text-input>
</template>
```

Will render :

![rich-text](/assets/inputs/rich-text.png)

:::warning API KEY
You'll probably need a API key. Add it to you `.env.local` file with the default language to use :

```env
VUE_APP_TINYMCE_API_KEY=my_api_key
VUE_APP_TINYMCE_LANGUAGE=my_default_locale
```

:::

:::tip TINYMCE 5 DOCUMENTATION
Check the [official documentation](https://www.tiny.cloud/docs/general-configuration-guide/basic-setup/) for further details on `plugins` and `toolbar` configuration. Use `init` prop for full control, it will replace other props.

Default init value for `init` :

```js
{
  language: process.env.VUE_APP_TINYMCE_LANGUAGE,
  height: 500,
  menubar: false,
  plugins: [
    "advlist autolink lists link image charmap print preview anchor",
    "searchreplace visualblocks code fullscreen",
    "insertdatetime media table paste code help wordcount",
  ],
  toolbar: "undo redo | formatselect | bold italic backcolor | \
    alignleft aligncenter alignright alignjustify | \
    bullist numlist outdent indent | image media | removeformat | help",,
  inline: false,
}

```

:::

:::tip IMAGE UPLOAD HANDLER
You may need a real backend image upload handler in order to avoid the default base64. Use global `imageUploadUrl` admin options [as explain here](../admin#options) for setting a handler URL compatible with TinyMCE 5. It will add a direct upload zone on images plugin and as well as enable drag and drop.

[Vtec Laravel Crud](../laravel) already integrate a functional upload handler that you can activate by adding the upload route :

**`routes/api.php`**

```php {6}
Route::group(['middleware' => Impersonate::class], function () {
    // ...

    Route::account();
    Route::impersonate();
    Route::upload();

    // ...
});
```

:::

:::tip FILE BROWSER
You may want to bridge the Wysiwyg within a file browser. Use global `fileBrowserUrl` admin options [as explain here](../admin#options) for setting a backend file browser solution. It will add a picker button for images and media that allows file selection from the file browser.

If you use any PHP framework you should try `elFinder` which is already integrated on official [Vtec Laravel Crud](../laravel) package :

![file-browser](/assets/inputs/file-browser.png)
:::

### Select

|> docgen select-input

### RadioGroup

|> docgen radio-group-input

### Autocomplete

|> docgen autocomplete-input

### File

|> docgen file-input

### Array

|> docgen array-input

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
