<template>
  <va-edit-layout :title="title">
    <reviews-form :id="id" :item="item"></reviews-form>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
