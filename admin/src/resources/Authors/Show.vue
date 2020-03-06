<template>
  <va-show>
    <va-simple-show>
      <va-field source="photo">
        <va-image-field
          source="photo"
          preview="thumbnails.large"
        ></va-image-field>
      </va-field>
      <va-field source="name"></va-field>
      <va-field source="description" :options="{ multiline: true }"></va-field>
    </va-simple-show>
  </va-show>
</template>
