<template>
  <va-edit-layout>
    <monsters-form :id="id" :title="title" :item="item"></monsters-form>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
