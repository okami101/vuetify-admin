<template>
  <v-navigation-drawer
    :value="aside"
    :clipped="$vuetify.breakpoint.lgAndUp"
    right
    app
    :width="400"
  >
    <div class="pa-4">
      <div class="d-flex align-center justify-space-between">
        <h3 class="display-1">Test</h3>
        <v-btn icon @click="closeAside()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
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
      aside: state => state.layout.aside
    })
  },
  methods: {
    ...mapMutations({
      closeAside: "layout/closeAside"
    })
  }
};
</script>
