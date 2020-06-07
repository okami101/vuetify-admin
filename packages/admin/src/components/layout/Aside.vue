<template>
  <v-navigation-drawer
    :clipped="$vuetify.breakpoint.lgAndUp"
    right
    app
    disable-resize-watcher
    :width="width"
    v-model="opened"
  >
    <div class="pa-4">
      <div class="d-flex align-center">
        <h3 class="display-1">
          <portal-target name="aside-title"></portal-target>
        </h3>
        <v-btn class="close" icon @click="opened = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="content">
        <portal-target
          name="aside-content"
          @change="handleUpdate"
        ></portal-target>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
/**
 * Customizable admin aside component where you put some contextualized additional information.
 * Use the associated `VaAsideLayout` component for content integration from anywhere on any context.
 */
export default {
  props: {
    /**
     * Width of the aside
     */
    width: {
      type: Number,
      default: 400,
    },
  },
  data() {
    return {
      opened: false,
    };
  },
  methods: {
    handleUpdate(newContent) {
      this.opened = newContent;
    },
  },
};
</script>

<style scoped>
.close {
  position: absolute;
  right: 1rem;
}
.content {
  margin-top: 3rem;
}
</style>
