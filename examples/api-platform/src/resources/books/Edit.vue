<template>
  <va-edit-layout :title="title">
    <books-form :id="id" :item="item"></books-form>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
