<template>
  <va-create>
    <publishers-form :title="title" :item="item"></publishers-form>
  </va-create>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
