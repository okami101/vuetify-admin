<template>
  <va-create>
    <publishers-form :title="title" :item="item"></publishers-form>
  </va-create>
</template>

<script>
import PublishersForm from "./Form";

export default {
  props: ["title", "item"],
  components: {
    PublishersForm,
  },
};
</script>
