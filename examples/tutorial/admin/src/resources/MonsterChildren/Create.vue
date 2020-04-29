<template>
  <va-create>
    <monster-children-form :title="title" :item="item"></monster-children-form>
  </va-create>
</template>

<script>
import MonsterChildrenForm from "./Form";

export default {
  props: ["title", "item"],
  components: {
    MonsterChildrenForm,
  },
};
</script>
