<template>
  <va-list title="Reviews list">
    <va-datagrid>
      <va-text-field
        source="id"
        label="ID"
        align="right"
        sortable
      ></va-text-field>
      <va-text-field source="rating" label="Rating" sortable></va-text-field>
      <va-text-field source="author" label="Author" sortable></va-text-field>
      <va-text-field
        source="publication_date"
        label="Publication date"
        align="center"
        sortable
      ></va-text-field>
    </va-datagrid>
  </va-list>
</template>
