<template>
  <va-edit>
    <users-form :id="id" :item="item"></users-form>
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
