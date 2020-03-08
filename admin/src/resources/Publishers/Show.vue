<template>
  <va-show>
    <va-simple-show>
      <va-field source="logo">
        <va-image-field
          source="logo"
          src="thumbnails.large"
          preview="thumbnails.medium"
        ></va-image-field>
      </va-field>
      <va-field source="name"></va-field>
      <va-field
        source="type"
        type="select"
        :options="{ enum: true }"
      ></va-field>
      <va-field source="founder"></va-field>
      <va-field source="description" :options="{ multiline: true }"></va-field>
      <va-field source="headquarter"></va-field>
      <va-field source="url" type="url"></va-field>
      <va-field source="email" type="email"></va-field>
      <va-field source="active" type="boolean"></va-field>
      <va-field source="address" :label="$t('address')" v-slot="{ value }">
        {{ value.street }}, {{ value.postcode }} {{ value.city }}
      </va-field>
      <va-field
        source="opening_date"
        type="date"
        :options="{ format: 'long' }"
      ></va-field>
      <va-field source="books_count" type="number" v-can="['admin']"></va-field>
      <va-field source="local">
        <va-image-field
          source="local"
          src="thumbnails.large"
          preview="thumbnails.medium"
        ></va-image-field>
      </va-field>
    </va-simple-show>
  </va-show>
</template>
