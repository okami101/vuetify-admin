<template>
  <va-create>
    <reviews-form :title="title" :item="item"></reviews-form>
  </va-create>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
