<template>
  <va-list title="Publishers list">
    <va-datagrid>
      <va-text-field
        source="id"
        label="ID"
        align="right"
        sortable
      ></va-text-field>
      <va-text-field source="name" label="Name" sortable></va-text-field>
      <va-text-field source="founder" label="Founder" sortable></va-text-field>
      <va-text-field
        source="headquarter"
        label="Headquarter"
        sortable
      ></va-text-field>
      <va-text-field
        source="opening_date"
        label="Opening date"
        align="center"
        sortable
      ></va-text-field>
    </va-datagrid>
  </va-list>
</template>
