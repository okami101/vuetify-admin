<template>
  <div>
    <div class="d-flex align-center mb-2">
      <h1 class="display-2">
        {{ title }}
      </h1>
      <v-spacer></v-spacer>
      <!-- @slot Slot for action buttons. -->
      <slot name="actions"></slot>
    </div>
    <!-- @slot Default slot for page content. -->
    <slot></slot>
  </div>
</template>

<script>
/**
 * Main CRUD action page layout used for Show, Create end Edit views components.
 * @displayName VaActionPage
 */
export default {
  props: {
    /**
     * Optional H1 title of the page shown on the left of top header
     */
    title: String,
  },
};
</script>
