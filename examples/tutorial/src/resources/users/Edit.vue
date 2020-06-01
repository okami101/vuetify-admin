<template>
  <va-edit-layout>
    <users-form :id="id" :title="title" :item="item"></users-form>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
