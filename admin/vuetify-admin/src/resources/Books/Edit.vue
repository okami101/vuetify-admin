<template>
  <va-edit>
    <va-tabbed-form
      :tabs="[
        { id: 'attributes', icon: 'mdi-eye' },
        { id: 'summary', icon: 'mdi-text' }
      ]"
    >
      <template v-slot:attributes>
        <va-text-input source="isbn"></va-text-input>
        <va-text-input source="title"></va-text-input>
        <va-text-input source="description"></va-text-input>
        <va-text-input source="author"></va-text-input>
        <va-text-input source="publication_date"></va-text-input>
      </template>
      <template v-slot:summary>
        <va-text-input multiline source="summary"></va-text-input>
      </template>
    </va-tabbed-form>
  </va-edit>
</template>
