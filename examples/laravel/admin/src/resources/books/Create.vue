<template>
  <va-create-layout>
    <books-form :title="title" :item="item"></books-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
