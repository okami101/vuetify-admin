<template>
  <va-show>
    <v-card>
      <v-card-text>
        <va-field source="photo">
          <va-image-field
            source="photo"
            preview="thumbnails.large"
          ></va-image-field>
        </va-field>
        <va-field source="name"></va-field>
        <va-field
          source="description"
          :options="{ multiline: true }"
        ></va-field>
      </v-card-text>
    </v-card>
  </va-show>
</template>
