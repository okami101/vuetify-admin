<template>
  <div>
    <v-card>
      <v-card-title>
        <v-row class="align-center">
          <v-col sm="auto">
            <h1 class="display-1">{{ getTitle }}</h1>
          </v-col>
          <v-col class="d-flex">
            <v-spacer></v-spacer>
            <slot name="actions"></slot>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
    </v-card>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ActionPage",
  props: {
    title: [String, Function]
  },
  computed: {
    ...mapState({
      resource: state => state.api.resource
    }),
    getTitle() {
      return typeof this.title === "function"
        ? this.title(this.resource)
        : this.title || this.$route.meta.title;
    }
  }
};
</script>
