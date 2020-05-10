<template>
  <va-edit>
    <reviews-form :id="id" :title="title" :item="item"></reviews-form>
  </va-edit>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
