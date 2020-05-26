<template>
  <div>
    <!-- @slot All content form with all inner fields. Item will be injected for each fields. -->
    <slot></slot>
  </div>
</template>

<script>
/**
 * Show component injector which facilitates resource display by using VA component fields.
 * Inject item for each VA field.
 */
export default {
  provide() {
    return {
      showState: this.showState,
    };
  },
  props: {
    /**
     * Explicit item resource object where all properties must be injected into VA fields.
     */
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showState: {
        item: this.item,
      },
    };
  },
  watch: {
    item(val) {
      this.showState.item = val;
    },
  },
};
</script>
