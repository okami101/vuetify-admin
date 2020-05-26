<template>
  <div class="d-none">
    <portal to="aside-title">{{ title }}</portal>
    <portal to="aside-content">
      <!-- @slot Main content of the aside. -->
      <slot v-bind="$props"></slot>
    </portal>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

/**
 * Component to use for showing information on aside from any components.
 * Use Portal Vue plugin internally for integrate within VaAside.
 * @displayName AsideLayout
 */
export default {
  props: {
    /**
     * Title of aside.
     */
    title: String,
    /**
     * State of aside, opened or closed.
     * @model
     */
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
      /**
       * Send value update, called after each aside open/close state change.
       */
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
