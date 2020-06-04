<template>
  <va-create-layout :title="title">
    <books-form :item="item"></books-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
