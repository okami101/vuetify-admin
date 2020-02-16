<template>
  <div v-if="resource" v-html="resource[source]"></div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TextField",
  props: {
    source: String
  },
  computed: {
    ...mapState({
      resource: state => state.api.resource
    })
  }
};
</script>
