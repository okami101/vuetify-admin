<template>
  <va-edit v-slot="{ item }">
    <publishers-form :item="item"></publishers-form>
  </va-edit>
</template>

<script>
import PublishersForm from "./Form";

export default {
  components: {
    PublishersForm
  }
};
</script>
