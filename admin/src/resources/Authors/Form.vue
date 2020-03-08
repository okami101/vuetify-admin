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
        <va-array-input source="backlinks" v-slot="{ items }">
          <va-simple-form-list :items="items" v-slot="{ item }">
            <va-text-input :item="item" source="text"></va-text-input>
            <va-date-input :item="item" source="date"></va-date-input>
            <va-text-input :item="item" source="url"></va-text-input>
          </va-simple-form-list>
        </va-array-input>
      </v-col>
    </v-row>
  </va-simple-form>
</template>
