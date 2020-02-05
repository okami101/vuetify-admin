<template>
  <va-list title="Books list">
    <va-datagrid>
      <va-text-field
        source="id"
        label="ID"
        text-align="right"
        sortable
      ></va-text-field>
      <va-text-field
        source="isbn"
        label="ISBN"
        text-align="right"
        sortable
      ></va-text-field>
      <va-text-field source="title" label="Title" sortable></va-text-field>
      <va-text-field source="description" label="Description"></va-text-field>
      <va-text-field source="author" label="Author" sortable></va-text-field>
      <va-text-field
        source="publication_date"
        label="Publication date"
        text-align="center"
        sortable
      ></va-text-field>
    </va-datagrid>
  </va-list>
</template>
