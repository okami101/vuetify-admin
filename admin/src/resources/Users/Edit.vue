<template>
  <va-edit>
    <users-form :id="id" :item="item"></users-form>
  </va-edit>
</template>

<script>
import UsersForm from "./Form";

export default {
  props: ["id", "item"],
  components: {
    UsersForm
  }
};
</script>
