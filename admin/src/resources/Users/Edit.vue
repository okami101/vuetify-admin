<template>
  <va-edit>
    <users-form :id="id" :title="title" :item="item"></users-form>
  </va-edit>
</template>

<script>
import UsersForm from "./Form";

export default {
  props: ["id", "title", "item"],
  components: {
    UsersForm,
  },
};
</script>
