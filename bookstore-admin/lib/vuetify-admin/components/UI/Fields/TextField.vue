<template>
  <div v-if="resource" v-html="resource[value]"></div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TextField",
  props: {
    value: String
  },
  computed: {
    ...mapState({
      resource: state => state.api.resource
    })
  }
};
</script>
