<template>
  <va-simple-form>
    <v-row>
      <v-col sm="3">
        <va-file-input source="photo">
          <va-image-field
            source="photo"
            preview="thumbnails.medium"
            clearable
          ></va-image-field>
        </va-file-input>
        <va-text-input source="name"></va-text-input>
        <va-text-input source="description" multiline></va-text-input>
      </v-col>
      <v-col sm="3" offset="3">
        <va-array-input
          source="backlinks"
          :label="$t('backlinks')"
          v-slot="props"
        >
          <va-text-input v-bind="props" source="text"></va-text-input>
          <va-date-input
            v-bind="props"
            source="date"
            format="long"
          ></va-date-input>
          <va-text-input v-bind="props" source="url"></va-text-input>
        </va-array-input>
      </v-col>
    </v-row>
  </va-simple-form>
</template>
