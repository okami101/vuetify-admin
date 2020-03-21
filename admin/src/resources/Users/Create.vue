<template>
  <va-create>
    <users-form :item="item"></users-form>
  </va-create>
</template>

<script>
import UsersForm from "./Form";

export default {
  props: ["item"],
  components: {
    UsersForm
  }
};
</script>
