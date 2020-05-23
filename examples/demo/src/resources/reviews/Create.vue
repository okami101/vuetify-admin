<template>
  <va-create-layout>
    <reviews-form :title="title" :item="item"></reviews-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
