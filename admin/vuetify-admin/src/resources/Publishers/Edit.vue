<template>
  <va-edit>
    <va-simple-form>
      <v-row>
        <v-col sm="3">
          <va-text-input source="name" full-width></va-text-input>
          <va-text-input source="founder" full-width></va-text-input>
          <va-text-input
            source="description"
            multiline
            full-width
          ></va-text-input>
          <va-text-input source="headquarter" full-width></va-text-input>
          <va-date-input source="opening_date" full-width></va-date-input>
        </v-col>
      </v-row>
    </va-simple-form>
  </va-edit>
</template>
