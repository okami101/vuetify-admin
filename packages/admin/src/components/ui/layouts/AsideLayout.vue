<template>
  <div class="d-none" v-if="title">
    <portal to="aside-title">{{ title }}</portal>
    <portal to="aside-content">
      <!-- @slot Main content of the aside. -->
      <slot v-bind="$props"></slot>
    </portal>
  </div>
</template>

<script>
/**
 * Component to use for showing information on aside from any components.
 * Use Portal Vue plugin internally for integrate within VaAside.
 */
export default {
  props: {
    /**
     * Title of aside.
     */
    title: String,
  },
};
</script>
