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
        <va-text-field source="title"></va-text-field>
        <va-text-field source="description"></va-text-field>
        <va-text-field source="author"></va-text-field>
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
