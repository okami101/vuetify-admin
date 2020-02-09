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
    resource: {
      type: Object,
      default: () => {}
    },
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
  methods: {
    ...mapActions({
      delete: "api/delete"
    }),
    async onDelete() {
      if (!this.resource.id) {
        this.$emit("delete");
        return;
      }

      let { label } = this.$route.meta;
      if (
        await this.$confirm(
          `Delete ${label.toLowerCase()} #${this.resource.id} ?`,
          `You are about deleting ${label.toLowerCase()} "${this.$route.meta.toString(
            this.resource
          )}". This operation is irreversible !`
        )
      ) {
        await this.delete({ id: this.resource.id });
        this.$emit("deleted", this.resource);
      }
    }
  }
};
</script>
