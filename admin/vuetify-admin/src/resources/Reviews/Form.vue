<template>
  <reviews-form>
    <va-simple-form>
      <v-row>
        <v-col sm="3">
          <va-text-input source="rating"></va-text-input>
          <va-text-input source="body" multiline></va-text-input>
          <va-text-input source="author"></va-text-input>
          <va-date-input source="publication_date"></va-date-input>
        </v-col>
      </v-row>
    </va-simple-form>
  </reviews-form>
</template>
