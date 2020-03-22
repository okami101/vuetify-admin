<template>
  <portal to="aside">
    <slot v-bind="$props"></slot>
  </portal>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "AsideContent",
  created() {
    if (this.$slots.default) {
      this.openAside();
    }
  },
  methods: {
    ...mapMutations({
      openAside: "aside/open",
    }),
  },
};
</script>
