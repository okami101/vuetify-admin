<template>
  <div>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <slot name="actions"></slot>
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
    </v-card>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

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
        : this.title;
    }
  },
  watch: {
    title: {
      handler() {
        this.setTitle(this.getTitle);
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      setTitle: "api/setTitle"
    })
  }
};
</script>
