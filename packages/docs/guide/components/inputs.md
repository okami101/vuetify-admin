# Inputs

VA input components allow editing of particular property of existing API resource object. Mainly used on [forms](../crud/form.md) for create and edit views. Can also be used as filter input for [`VaDataIterator`](../crud/list.md#data-iterator). For resource edition, it must be used within [`VaForm`](../crud/form.md#injector), which handle item injection and form model supply with error messages.

:::tip SOURCE AND MODEL
Va inputs support both `source` and `model` prop. Source is the original property object where to fetch the value and model will be the final property name with the new value that will be sent on your data provider.
:::

:::tip DOT NOTATION SUPPORT
VA inputs accept dot notation for `source` prop. Very useful for nested object :

```vue
<template>
  <va-text-input source="address.street"></va-text-input>
  <va-text-input source="address.postcode"></va-text-input>
  <va-text-input source="address.city"></va-text-input>
</template>
```

It will directly get the value of street property of address object and take the localized label from nested structure.
The final form model data that will be sent on your data provider will also respect this nested structure.
:::

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
You may need a real backend image upload handler in order to avoid the default base64. Use global `imageUploadUrl` admin options [as explain here](../admin.md#options) for setting a handler URL compatible with TinyMCE 5. It will add a direct upload zone on images plugin and as well as enable drag and drop.

[Vtec Laravel Crud](../laravel.md) already integrate a functional upload handler that you can activate by adding the upload route :

**`routes/api.php`**

```php {6}
Route::group(['middleware' => Impersonate::class], function () {
    //...

    Route::account();
    Route::impersonate();
    Route::upload();

    //...
});
```

You may provide admin axios instance to [VtecAdmin constructor](../admin.md#instantiation) for CSRF integration. If you don't use axios, don't forget to exclude upload route from CSRF inside `app/Http/Middleware/VerifyCsrfToken.php`.

:::

:::tip FILE BROWSER
You may want to bridge the Wysiwyg within a file browser. Use global `fileBrowserUrl` admin options [as explain here](../admin.md#options) for setting a backend file browser solution. It will add a picker button for images and media that allows file selection from the file browser.

If you use any PHP framework you should try `elFinder` which is already integrated on official [Vtec Laravel Crud](../laravel.md) package :

![file-browser](/assets/inputs/file-browser.png)
:::

### Select

|> docgen select-input

**`SAMPLE`**

```vue
<template>
  <va-select-input source="formats" multiple></va-select-input>
</template>
```

Will render :

![select](/assets/inputs/select.png)

:::tip LOCALIZED ENUMS
You may centralized all choices for reuse directly inside you locales as [explain here](../i18n.md#resources). If no choices setted, `VaSelectInput` will lookup for this valid translated key format : `resources.{resource}.enums.{source}.{value}`.
:::

:::tip REFERENCES
If you want select from existing resource reference, use `reference` prop as follow :

```vue
<template>
  <va-select-input
    source="publisher"
    model="publisher_id"
    reference="publishers"
    :filter="{ active: true }"
  ></va-select-input>
</template>
```

It will automatically fetch all publishers and integrate them as choices. Multiple is also supported. Use `filter` prop for filtering. You may use `model` in case of the update property request on backend side is different than `source`.
:::

### Radio group

|> docgen radio-group-input

**`SAMPLE`**

```vue
<template>
  <va-radio-group-input source="status" row></va-radio-group-input>
</template>
```

Will render :

![radio-group](/assets/inputs/radio-group.png)

:::tip NO CHECKBOX GROUP
Use above select with `multiple` prop enabled.
:::

:::tip REFERENCES
Same above related `VaSelectInput` references tip applies, without multiple support obviously.
:::

### Autocomplete

|> docgen autocomplete-input

**`SAMPLE`**

```vue
<template>
  <va-autocomplete-input
    source="authors"
    model="author_ids"
    multiple
    reference="authors"
  ></va-autocomplete-input>
</template>
```

Will render :

![autocomplete](/assets/inputs/autocomplete.png)

:::tip SEARCH
Use `minChars` and `searchQuery` to configure the minimal char needed before search and the query search parameter key which is `q` by default. It will reuse `getList` data provider method with a custom search filter.

Use `fields` prop to reduce API query overfetching for better performance.
:::

:::tip TAGGABLE
Autocomplete will be transformed into combobox component as soon as you enable `taggable` prop. It will allow you to create new tags on the fly.
:::

### File

|> docgen file-input

**`SAMPLE`**

```vue
<template>
  <va-file-input
    source="local"
    preview
    multiple
    src="thumbnails.medium"
    lg="4"
  >
  </va-file-input>
</template>
```

Will render :

![file](/assets/inputs/file.png)

:::tip IMAGES
Use `preview` for image gallery support, use [`VaImageField`](fields.md#image) under the hood.
:::

:::tip DATA PROVIDER FILE UPLOAD
2 different solutions :

* Base64 : JSON friendly but more payload size and generally poorly integrated on server-side.
* FormData : Send raw binary file as-is inside classic `multipart/form-data`. Poor FormData API but better native server-side integration thanks to `UploadedFile` with native MIME validation.

Data providers of VtecAdmin use the second method for easier server-side integration. It uses a `objectToFormData` helper for this, more info [here](../data-providers.md#usage) in case you want use it for your custom data provider.

Raw files will be send into your update or create API according to given `source` or `model` prop.
:::

:::tip DATA PROVIDER FILE DELETION
This file input will use `VaFileField` or `VaImageField` with `clearable` prop enabled under the hood which allows file removing. It will fill an array which contains media id that should be deleted on backend. You can use `itemValue` prop if media value different than `id`. Then this array will be send to your update API with a specific delete property which will take this name format : `{source}_delete`.

If using Vtec Laravel Crud, this [RequestMediaTrait](../laravel.md#requestmediatrait) will done already everything for you.
:::

### Array

|> docgen array-input

**`SAMPLE`**

```vue
<template>
  <va-array-input source="backlinks" :label="$t('backlinks')" v-slot="props">
    <v-row>
      <v-col sm="6">
        <va-date-input v-bind="props" source="date"></va-date-input>
      </v-col>
      <v-col sm="6">
        <va-text-input v-bind="props" source="url"></va-text-input>
      </v-col>
    </v-row>
  </va-array-input>
</template>
```

Will render :

![array](/assets/inputs/array.png)

:::tip LABEL
For proper inner localization, use nested structure :

```json
//...
  "fields": {
    //...
    "backlinks": {
      "date": "Date",
      "url": "Url"
    }
  }
//...
```

As we cannot have proper label for `backlinks`, use `label` prop for explicit label.
:::

:::tip API VALIDATION HANDLING
The final form model will stay a classic array. In the above example, if encoded in FormData, it will be sent on this format : `backlinks[$i][(date|url)]`. In case of Laravel using, you may use this validation rule :

```php
public function rules()
{
    return [
        //...
        'backlinks.*.date' => 'required|date',
        'backlinks.*.url' => 'required|url',
    ];
}
```

And it should work perfectly fine :

![array-validation](/assets/inputs/array-validation.png)
:::

## Custom component

You can prefectly create your own VA input component by using [`input`](mixins.md#input) mixin component. Very useful for editing complex property object or custom advanced input UI for primitives.

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
Note as we add `Va` as prefix component name. That allows us to have a functional `type` prop for `VaDataTable` [filters](../crud/list.md#advanced-filters) if suitable. So next code will perfectly working :

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
        //...
      ],
      //...
    };
  },
};
</script>
```

:::

### Wrapper

|> docgen input
