<template>
  <va-tabbed-form
    :tabs="[
      { id: 'attributes', icon: 'mdi-eye' },
      { id: 'summary', icon: 'mdi-text' }
    ]"
  >
    <template v-slot:attributes>
      <v-row>
        <v-col sm="3">
          <va-text-input source="isbn"></va-text-input>
          <va-text-input source="title"></va-text-input>
          <va-text-input source="description"></va-text-input>
          <va-text-input source="author"></va-text-input>
          <va-text-input source="publication_date"></va-text-input>
        </v-col>
      </v-row>
    </template>
    <template v-slot:summary>
      <va-text-input multiline source="summary"></va-text-input>
    </template>
  </va-tabbed-form>
</template>
