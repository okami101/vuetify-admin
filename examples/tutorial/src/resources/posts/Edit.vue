<template>
  <va-edit-layout>
    <posts-form :id="id" :title="title" :item="item"></posts-form>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
