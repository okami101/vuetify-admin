<template>
  <va-create-layout :title="title">
    <va-form-guesser :resource="resource" :item="item"></va-form-guesser>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "resource", "item"],
};
</script>
