<template>
  <va-show>
    <va-simple-show>
      <va-text-field source="name"></va-text-field>
      <va-enum-field source="type"></va-enum-field>
      <va-text-field source="founder"></va-text-field>
      <va-text-field source="description"></va-text-field>
      <va-text-field source="headquarter"></va-text-field>
      <va-boolean-field source="active"></va-boolean-field>
      <va-date-field source="opening_date" format="long"></va-date-field>
      <va-number-field source="books_count"></va-number-field>
    </va-simple-show>
  </va-show>
</template>
