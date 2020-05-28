<template>
  <va-edit-layout :title="title">
    <va-form-guesser
      :id="id"
      :resource="resource"
      :item="item"
    ></va-form-guesser>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "resource", "item"],
};
</script>
