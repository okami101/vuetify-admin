<template>
  <va-create>
    <monsters-form :title="title" :item="item"></monsters-form>
  </va-create>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
