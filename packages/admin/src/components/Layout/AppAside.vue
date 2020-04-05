<template>
  <v-navigation-drawer
    :value="opened"
    :clipped="$vuetify.breakpoint.lgAndUp"
    right
    app
    :width="400"
  >
    <div class="pa-4">
      <div class="d-flex align-center">
        <h3 class="display-2">
          <portal-target name="aside-title"></portal-target>
        </h3>
        <v-btn class="close" icon @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="content">
        <portal-target name="aside-content"></portal-target>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "AppAside",
  computed: {
    ...mapState({
      opened: (state) => state.aside.opened,
    }),
  },
  methods: {
    ...mapMutations({
      close: "aside/close",
    }),
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
