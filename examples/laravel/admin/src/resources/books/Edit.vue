<template>
  <va-edit-layout>
    <books-form :id="id" :title="title" :item="item"></books-form>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
