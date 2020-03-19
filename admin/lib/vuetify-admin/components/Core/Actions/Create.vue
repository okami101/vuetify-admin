<template>
  <div>
    <va-aside-content>
      <slot name="aside"></slot>
    </va-aside-content>
    <slot name="header">
      <div class="d-flex mb-2">
        <v-spacer></v-spacer>
        <va-list-button :resource="resource"></va-list-button>
        <slot name="actions"></slot>
        <va-locale-button :resource="resource"></va-locale-button>
      </div>
    </slot>
    <slot></slot>
  </div>
</template>

<script>
import Resource from "vuetify-admin/mixins/resource";
import { mapActions } from "vuex";

export default {
  name: "Create",
  mixins: [Resource],
  methods: {
    ...mapActions({
      getOne: "api/getOne"
    })
  },
  async mounted() {
    /**
     * Initialize from query
     */
    let { source } = this.$route.query;

    if (source) {
      let { data } = await this.getOne({
        resource: this.resource,
        params: {
          id: source
        }
      });

      let { id, ...item } = data;

      this.$store.commit(`${this.resource}/setItem`, item);
    }
  }
};
</script>
