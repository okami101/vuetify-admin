<template>
  <va-show>
    <va-tabbed-show
      :tabs="[
        { id: 'attributes', icon: 'mdi-eye' },
        { id: 'summary', icon: 'mdi-text' }
      ]"
    >
      <template v-slot:attributes>
        <va-text-field source="isbn"></va-text-field>
        <va-text-field source="publisher.name"></va-text-field>
        <va-text-field source="title"></va-text-field>
        <va-enum-field source="category" chip></va-enum-field>
        <va-text-field source="description"></va-text-field>
        <va-text-field source="author"></va-text-field>
        <va-array-field source="formats">
          <template v-slot="{ items }">
            <va-single-field-list :items="items">
              <template v-slot="{ item }">
                <va-enum-field
                  source="formats"
                  :item="item"
                  chip
                  inline
                ></va-enum-field>
              </template>
            </va-single-field-list>
          </template>
        </va-array-field>
        <va-number-field source="price" format="currency"></va-number-field>
        <va-boolean-field source="commentable"></va-boolean-field>
        <va-date-field source="publication_date" format="long"></va-date-field>
      </template>
      <template v-slot:summary>
        <va-rich-text-field
          source="summary"
          :add-label="false"
        ></va-rich-text-field>
      </template>
    </va-tabbed-show>
  </va-show>
</template>
