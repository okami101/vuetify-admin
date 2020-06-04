<template>
  <va-create-layout :title="title">
    <reviews-form :item="item"></reviews-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
