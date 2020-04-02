<template>
  <div class="d-none">
    <portal to="aside-title">{{ title }}</portal>
    <portal to="aside-content">
      <slot v-bind="$props"></slot>
    </portal>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Aside",
  props: {
    title: String,
    value: Boolean,
  },
  watch: {
    value: {
      handler(newVal) {
        if (newVal) {
          this.openAside();
          return;
        }
        this.closeAside();
      },
      immediate: true,
    },
    opened(newVal) {
      this.$emit("input", newVal);
    },
  },
  computed: {
    ...mapState({
      opened: (state) => state.aside.opened,
    }),
  },
  methods: {
    ...mapMutations({
      openAside: "aside/open",
      closeAside: "aside/close",
    }),
  },
};
</script>
