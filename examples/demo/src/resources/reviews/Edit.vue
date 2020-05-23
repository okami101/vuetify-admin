<template>
  <va-edit-layout>
    <reviews-form :id="id" :title="title" :item="item"></reviews-form>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
