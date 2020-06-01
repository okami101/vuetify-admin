<template>
  <va-create-layout>
    <posts-form :title="title" :item="item"></posts-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
