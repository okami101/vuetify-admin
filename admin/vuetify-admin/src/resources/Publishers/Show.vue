<template>
  <va-show>
    <va-simple-show>
      <va-field source="name"></va-field>
      <va-field source="type" type="enum"></va-field>
      <va-field source="founder"></va-field>
      <va-field source="description"></va-field>
      <va-field source="headquarter"></va-field>
      <va-field source="active" type="boolean"></va-field>
      <va-field
        source="opening_date"
        type="date"
        :options="{ format: 'long' }"
      ></va-field>
      <va-field source="books_count" type="number"></va-field>
    </va-simple-show>
  </va-show>
</template>
