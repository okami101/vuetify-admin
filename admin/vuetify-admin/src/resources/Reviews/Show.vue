<template>
  <va-show>
    <va-simple-show>
      <va-field source="book_id">
        <va-reference-field
          source="book_id"
          reference="books"
          link="show"
          property="title"
        >
        </va-reference-field>
      </va-field>
      <va-field source="status">
        <va-chip-field source="status" :color="v => $statusColor(v)">
          <va-enum-field source="status"></va-enum-field>
        </va-chip-field>
      </va-field>
      <va-field source="rating" type="rating"></va-field>
      <va-field source="body"></va-field>
      <va-field source="author"></va-field>
      <va-field
        source="publication_date"
        type="date"
        :options="{ format: 'long' }"
      ></va-field>
    </va-simple-show>
  </va-show>
</template>
