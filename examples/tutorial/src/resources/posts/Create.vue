<template>
  <va-create-layout :title="title">
    <posts-form :item="item"></posts-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
