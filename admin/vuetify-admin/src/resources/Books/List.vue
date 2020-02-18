<template>
  <va-list>
    <va-datagrid>
      <template slot="filters">
        <va-text-input
          source="q"
          icon="mdi-magnify"
          :always-on="true"
        ></va-text-input>
        <va-text-input source="title"></va-text-input>
        <va-text-input source="author"></va-text-input>
      </template>
      <va-text-field source="id"></va-text-field>
      <va-text-field source="isbn"></va-text-field>
      <va-text-field source="title"></va-text-field>
      <va-text-field source="author"></va-text-field>
      <va-text-field source="publication_date"></va-text-field>
    </va-datagrid>
  </va-list>
</template>
