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
          <va-reference-input
            source="publisher_id"
            reference="publishers"
            property="name"
            v-slot="{ choices }"
          >
            <va-select-input
              source="publisher_id"
              :choices="choices"
            ></va-select-input>
          </va-reference-input>
          <va-text-input source="isbn"></va-text-input>
          <va-select-input source="category"></va-select-input>
          <va-text-input source="title"></va-text-input>
          <va-text-input source="description"></va-text-input>
          <va-text-input source="author"></va-text-input>
          <va-select-input source="formats" multiple></va-select-input>
          <va-number-input source="price" format="currency"></va-number-input>
          <va-boolean-input source="commentable"></va-boolean-input>
          <va-date-input
            source="publication_date"
            format="long"
          ></va-date-input>
        </v-col>
      </v-row>
    </template>
    <template v-slot:summary>
      <va-rich-text-input source="summary"></va-rich-text-input>
    </template>
  </va-tabbed-form>
</template>
