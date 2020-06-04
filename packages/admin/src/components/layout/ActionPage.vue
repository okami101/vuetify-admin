<template>
  <div>
    <div class="d-flex align-center mb-2">
      <h1 class="display-1">
        {{ title }}
      </h1>
      <v-spacer></v-spacer>
      <!-- @slot Action buttons placeholder. -->
      <slot name="actions"></slot>
    </div>
    <!-- @slot Page content placeholder. -->
    <slot></slot>
  </div>
</template>

<script>
import Page from "../../mixins/page";

/**
 * Main CRUD action page layout used for Show, Create end Edit views components.
 */
export default {
  mixins: [Page],
};
</script>
