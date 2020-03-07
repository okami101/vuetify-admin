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
        <v-chip source="status" :color="v => $statusColor(v)">
          <va-select-field source="status" enum></va-select-field>
        </v-chip>
      </va-field>
      <va-field source="rating" type="rating"></va-field>
      <va-field source="body" :options="{ multiline: true }"></va-field>
      <va-field source="author"></va-field>
      <va-field
        source="publication_date"
        type="date"
        :options="{ format: 'long' }"
      ></va-field>
    </va-simple-show>
  </va-show>
</template>
