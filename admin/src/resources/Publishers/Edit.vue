<template>
  <va-edit>
    <publishers-form :item="item"></publishers-form>
  </va-edit>
</template>

<script>
import PublishersForm from "./Form";

export default {
  props: {
    item: Object
  },
  components: {
    PublishersForm
  }
};
</script>
