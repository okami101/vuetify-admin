<template>
  <va-create-layout :title="title">
    <users-form :item="item"></users-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
