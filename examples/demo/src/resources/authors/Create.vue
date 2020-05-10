<template>
  <va-create>
    <authors-form :title="title" :item="item"></authors-form>
  </va-create>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
