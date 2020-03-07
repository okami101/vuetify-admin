<template>
  <va-simple-form>
    <v-row>
      <v-col sm="3">
        <va-file-input source="logo">
          <va-image-field
            source="logo"
            preview="thumbnails.small"
            clearable
          ></va-image-field>
        </va-file-input>
        <va-text-input source="name"></va-text-input>
        <va-select-input source="type" enum></va-select-input>
        <va-text-input source="founder"></va-text-input>
        <va-text-input source="description" multiline></va-text-input>
        <va-text-input source="headquarter"></va-text-input>
        <va-text-input source="url"></va-text-input>
        <va-text-input source="email"></va-text-input>
        <va-boolean-input source="active"></va-boolean-input>
        <va-text-input source="address.street"></va-text-input>
        <va-text-input source="address.postcode"></va-text-input>
        <va-text-input source="address.city"></va-text-input>
        <va-file-input source="local" multiple>
          <va-image-field
            source="local"
            preview="thumbnails.small"
            clearable
          ></va-image-field>
        </va-file-input>
        <va-date-input source="opening_date" format="long"></va-date-input>
      </v-col>
    </v-row>
  </va-simple-form>
</template>
