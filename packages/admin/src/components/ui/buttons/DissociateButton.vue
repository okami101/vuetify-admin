<template>
  <v-tooltip bottom :disabled="!icon">
    <template v-slot:activator="{ on }">
      <v-btn
        :icon="icon"
        text
        @click.stop="onDissociate"
        :color="color"
        v-on="on"
      >
        <v-icon small>mdi-link-off</v-icon>
        <span v-if="!icon" class="ml-2">
          {{ $t("va.actions.dissociate") }}
        </span>
      </v-btn>
    </template>
    <span>{{ $t("va.actions.dissociate") }}</span>
  </v-tooltip>
</template>

<script>
import Item from "../../../mixins/item";
import { mapActions } from "vuex";

export default {
  name: "DissociateButton",
  mixins: [Item],
  props: {
    icon: Boolean,
    source: String,
    sourceId: [Number, String],
    sourceResource: String,
    color: {
      type: String,
      default: "red",
    },
  },
  methods: {
    ...mapActions({
      update: "api/update",
      refresh: "api/refresh",
    }),
    async onDissociate() {
      if (
        await this.$admin.confirm(
          this.$t("va.confirm.dissociate_title", {
            targetResource: this.$tc(
              `resources.${this.resource}.name`,
              1
            ).toLowerCase(),
            targetId: this.item.id,
          }),
          this.$t("va.confirm.dissociate_message", {
            sourceResource: this.$tc(
              `resources.${this.sourceResource}.name`,
              1
            ).toLowerCase(),
            sourceId: this.sourceId,
            targetResource: this.$tc(
              `resources.${this.resource}.name`,
              1
            ).toLowerCase(),
            targetId: this.item.id,
          })
        )
      ) {
        await this.update({
          resource: this.resource,
          params: {
            id: this.item.id,
            data: { [`detach_${this.source}`]: this.sourceId },
          },
        });

        this.refresh(this.resource);
        this.$emit("dissociated");
      }
    },
  },
};
</script>
