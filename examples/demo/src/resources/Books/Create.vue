<template>
  <va-create>
    <books-form :title="title" :item="item"></books-form>
  </va-create>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
