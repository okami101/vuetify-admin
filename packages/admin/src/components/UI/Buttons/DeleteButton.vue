<template>
  <v-tooltip bottom :disabled="!icon" v-if="hasAction('delete')">
    <template v-slot:activator="{ on }">
      <v-btn :icon="icon" text @click.stop="onDelete" :color="color" v-on="on">
        <v-icon small>mdi-trash-can</v-icon>
        <span v-if="!icon" class="ml-2">
          {{ $t("va.actions.delete") }}
        </span>
      </v-btn>
    </template>
    <span>{{ $t("va.actions.delete") }}</span>
  </v-tooltip>
</template>

<script>
import Item from "../../../mixins/item";
import { mapActions } from "vuex";

export default {
  name: "DeleteButton",
  mixins: [Item],
  props: {
    icon: Boolean,
    redirect: Boolean,
    color: {
      type: String,
      default: "red",
    },
  },
  methods: {
    ...mapActions({
      delete: "api/delete",
      refresh: "api/refresh",
    }),
    async onDelete() {
      if (!this.item) {
        /**
         * Used on bulk delete
         */
        this.$emit("delete");
        return;
      }

      if (
        await this.$confirm(
          this.$t("va.confirm.delete_title", {
            resource: this.$tc(
              `resources.${this.resource}.name`,
              1
            ).toLowerCase(),
            id: this.item.id,
          }),
          this.$t("va.confirm.delete_message", {
            resource: this.$tc(
              `resources.${this.resource}.name`,
              1
            ).toLowerCase(),
            id: this.item.id,
          })
        )
      ) {
        await this.delete({
          resource: this.resource,
          params: { id: this.item.id },
        });

        if (this.redirect) {
          this.$router.push(`/${this.resource}`);
          return;
        }

        this.refresh(this.resource);
        this.$emit("deleted");
      }
    },
  },
};
</script>
