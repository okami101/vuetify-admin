<template>
  <va-create-layout>
    <publishers-form :title="title" :item="item"></publishers-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
