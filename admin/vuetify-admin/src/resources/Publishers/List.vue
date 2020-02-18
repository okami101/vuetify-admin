<template>
  <va-list>
    <va-datagrid>
      <template slot="filters">
        <va-text-input
          source="q"
          icon="mdi-magnify"
          :always-on="true"
        ></va-text-input>
        <va-text-input source="name"></va-text-input>
        <va-text-input source="founder"></va-text-input>
        <va-text-input source="headquarter"></va-text-input>
      </template>
      <va-text-field source="id"></va-text-field>
      <va-text-field source="name"></va-text-field>
      <va-text-field source="founder"></va-text-field>
      <va-text-field source="headquarter"></va-text-field>
      <va-text-field source="opening_date"></va-text-field>
    </va-datagrid>
  </va-list>
</template>
