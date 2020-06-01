<template>
  <va-create-layout>
    <users-form :title="title" :item="item"></users-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
