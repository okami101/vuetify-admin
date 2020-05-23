<template>
  <va-create-layout>
    <authors-form :title="title" :item="item"></authors-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
