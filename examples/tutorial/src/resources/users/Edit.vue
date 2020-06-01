<template>
  <va-edit-layout :title="title">
    <users-form :id="id" :item="item"></users-form>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
