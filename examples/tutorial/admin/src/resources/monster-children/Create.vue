<template>
  <va-create-layout>
    <monster-children-form :title="title" :item="item"></monster-children-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
