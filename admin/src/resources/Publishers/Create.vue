<template>
  <va-create>
    <publishers-form :item="item"></publishers-form>
  </va-create>
</template>

<script>
import PublishersForm from "./Form";

export default {
  props: ["item"],
  components: {
    PublishersForm,
  },
};
</script>
