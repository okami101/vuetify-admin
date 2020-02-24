<template>
  <div>
    <va-aside-content>
      <slot name="aside" :resource="resource" :item="item"></slot>
    </va-aside-content>
    <div class="d-flex mb-2">
      <v-spacer></v-spacer>
      <slot name="actions">
        <va-show-button :resource="resource" :item="item"></va-show-button>
      </slot>
    </div>
    <slot :resource="resource" :item="item"></slot>
  </div>
</template>

<script>
import Page from "vuetify-admin/mixins/page";
import { mapGetters } from "vuex";

export default {
  name: "Edit",
  mixins: [Page],
  computed: {
    ...mapGetters({
      getItem: "api/item"
    }),
    item() {
      return this.getItem(this.resource);
    }
  },
  methods: {
    onDeleted() {
      this.$router.push(`/${this.resource}`);
    }
  }
};
</script>
