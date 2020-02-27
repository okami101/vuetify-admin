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
        <va-chip-field source="category" enum></va-chip-field>
        <va-text-field source="description"></va-text-field>
        <va-text-field source="author"></va-text-field>
        <va-array-field source="formats" v-slot="{ items }">
          <va-single-field-list :items="items" v-slot="{ item }">
            <va-chip-field color="yellow" inline>
              <va-enum-field
                source="formats"
                :item="item"
                inline
              ></va-enum-field>
            </va-chip-field>
          </va-single-field-list>
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
