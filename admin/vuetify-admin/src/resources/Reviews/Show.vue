<template>
  <va-show>
    <va-simple-show>
      <va-enum-field
        source="status"
        chip
        :color="v => $statusColor(v)"
      ></va-enum-field>
      <va-rating-field source="rating"></va-rating-field>
      <va-text-field source="body"></va-text-field>
      <va-text-field source="author"></va-text-field>
      <va-date-field source="publication_date" format="long"></va-date-field>
    </va-simple-show>
  </va-show>
</template>
