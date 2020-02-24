<template>
  <v-btn
    v-if="can(this.resource, 'delete')"
    text
    @click.stop="onDelete"
    :color="color"
  >
    <v-icon small class="mr-2">
      {{ icon }}
    </v-icon>
    {{ $t("va.actions.delete") }}
  </v-btn>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DeleteButton",
  props: {
    item: Object,
    resource: {
      type: String,
      required: true
    },
    redirect: Boolean,
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
    })
  },
  methods: {
    ...mapActions({
      delete: "api/delete",
      refresh: "api/refresh"
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
            resource: this.$tc(`resources.${this.resource}`, 1).toLowerCase(),
            id: this.item.id
          }),
          this.$t("va.confirm.delete_message", {
            resource: this.$tc(`resources.${this.resource}`, 1).toLowerCase(),
            id: this.item.id
          })
        )
      ) {
        await this.delete({
          resource: this.resource,
          params: { id: this.item.id }
        });

        if (this.redirect) {
          this.$router.push(`/${this.resource}`);
          return;
        }

        this.refresh(this.resource);
      }
    }
  }
};
</script>
