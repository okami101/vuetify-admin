<template>
  <va-create>
    <publishers-form :source="source"></publishers-form>
  </va-create>
</template>

<script>
import PublishersForm from "./Form";

export default {
  props: {
    source: Object
  },
  components: {
    PublishersForm
  }
};
</script>
