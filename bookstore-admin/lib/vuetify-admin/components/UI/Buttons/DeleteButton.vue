<template>
  <v-btn text @click="onDelete" :color="color">
    <v-icon small class="mr-2">
      {{ icon }}
    </v-icon>
    {{ label }}
  </v-btn>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DeleteButton",
  props: {
    resource: Object,
    icon: {
      type: String,
      default: "mdi-trash-can"
    },
    label: {
      type: String,
      default: "Delete"
    },
    color: {
      type: String,
      default: "red"
    }
  },
  computed: {
    currentResource() {
      return this.resource || this.$route.meta.model;
    }
  },
  methods: {
    ...mapActions({
      delete: "api/delete"
    }),
    async onDelete() {
      if (!this.currentResource) {
        this.$emit("delete");
        return;
      }

      let { label } = this.$route.meta;
      if (
        await this.$confirm(
          `Delete ${label.toLowerCase()} #${this.currentResource.id} ?`,
          `You are about deleting ${label.toLowerCase()} "${this.$route.meta.stringify(
            this.currentResource
          )}". This operation is irreversible !`
        )
      ) {
        await this.delete({ id: this.currentResource.id });
        this.$emit("deleted");

        /**
         * Redirect to list if deleting on current ressource
         */
        if (["show", "edit"].includes(this.$route.meta.action)) {
          this.$router.push(`/${this.$route.meta.resource}`);
        }
      }
    }
  }
};
</script>
