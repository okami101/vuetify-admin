<template>
  <div v-html="resource[value]"></div>
</template>

<script>
export default {
  name: "TextField",
  props: {
    value: String
  },
  data() {
    return {
      resource: this.$route.meta.model
    };
  }
};
</script>
