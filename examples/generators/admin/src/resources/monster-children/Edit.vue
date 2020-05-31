<template>
  <va-edit-layout>
    <monster-children-form
      :id="id"
      :title="title"
      :item="item"
    ></monster-children-form>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
