<template>
  <va-create>
    <users-form :title="title" :item="item"></users-form>
  </va-create>
</template>

<script>
import UsersForm from "./Form";

export default {
  props: ["title", "item"],
  components: {
    UsersForm,
  },
};
</script>
