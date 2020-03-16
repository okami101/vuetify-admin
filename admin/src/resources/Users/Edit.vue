<template>
  <va-edit>
    <users-form :item="item"></users-form>
  </va-edit>
</template>

<script>
import UsersForm from "./Form";

export default {
  props: {
    item: Object
  },
  components: {
    UsersForm
  }
};
</script>
