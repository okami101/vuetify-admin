<template>
  <va-edit-layout :title="title">
    <posts-form :id="id" :item="item"></posts-form>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
