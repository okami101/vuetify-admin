<template>
  <v-btn v-if="can('delete')" text @click.stop="onDelete" :color="color">
    <v-icon small class="mr-2">
      {{ icon }}
    </v-icon>
    {{ $t("va.actions.delete") }}
  </v-btn>
</template>

<script>
import { mapActions } from "vuex";
import { mapState, mapGetters } from "vuex";

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
    ...mapGetters({
      can: "api/can"
    }),
    ...mapState({
      resourceName: state => state.api.resourceName
    })
  },
  methods: {
    ...mapActions({
      delete: "api/delete",
      refresh: "api/refresh"
    }),
    async onDelete() {
      if (!this.item) {
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
            id: this.item.id
          }),
          this.$t("va.confirm.delete_message", {
            resource: this.$tc(
              `resources.${this.resourceName}`,
              1
            ).toLowerCase(),
            id: this.item.id
          })
        )
      ) {
        await this.delete({ id: this.item.id });

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
