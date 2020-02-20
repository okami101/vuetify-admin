<template>
  <v-btn v-if="currentResource" text @click.stop="onDelete" :color="color">
    <v-icon small class="mr-2">
      {{ icon }}
    </v-icon>
    {{ $t("va.actions.delete") }}
  </v-btn>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  name: "DeleteButton",
  props: {
    item: Object,
    icon: {
      type: String,
      default: "mdi-trash-can"
    },
    color: {
      type: String,
      default: "red"
    }
  },
  computed: {
    ...mapState({
      resourceName: state => state.api.resourceName,
      resource: state => state.api.resource
    }),
    currentResource() {
      return this.item || this.resource;
    }
  },
  methods: {
    ...mapActions({
      delete: "api/delete",
      refresh: "api/refresh"
    }),
    async onDelete() {
      if (!this.currentResource) {
        this.$emit("delete");
        return;
      }

      if (
        await this.$confirm(
          this.$t("va.confirm.delete_title", {
            resource: this.$tc(
              `resources.${this.resourceName}`,
              1
            ).toLowerCase(),
            id: this.currentResource.id
          }),
          this.$t("va.confirm.delete_message", {
            resource: this.$tc(
              `resources.${this.resourceName}`,
              1
            ).toLowerCase(),
            id: this.currentResource.id
          })
        )
      ) {
        await this.delete({ id: this.currentResource.id });

        /**
         * Redirect to list if deleting on current ressource
         */
        if (["show", "edit"].includes(this.$route.meta.action)) {
          this.$router.push(`/${this.resourceName}`);
          return;
        }

        this.refresh();
      }
    }
  }
};
</script>
