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
    </v-row>
  </va-simple-form>
</template>
