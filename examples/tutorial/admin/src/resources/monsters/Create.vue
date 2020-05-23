<template>
  <va-create-layout>
    <monsters-form :title="title" :item="item"></monsters-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
