<template>
  <router-link
    v-if="data"
    :to="{
      name: `${reference}_${link}`,
      params: { id: value }
    }"
  >
    <slot :item="data">
      <span v-if="property">
        {{ getProperty(data) }}
      </span>
    </slot>
  </router-link>
</template>

<script>
import EventBus from "vuetify-admin/utils/eventBus";
import Field from "vuetify-admin/mixins/field";
import { mapMutations } from "vuex";

export default {
  name: "ReferenceField",
  mixins: [Field],
  props: {
    reference: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: "edit"
    },
    property: [String, Function],
    multiple: Boolean
  },
  data() {
    return {
      data: null
    };
  },
  mounted() {
    EventBus.$on("references", ({ resource, reference, items }) => {
      if (resource === this.resource && reference === this.reference) {
        this.data = items.find(item => item.id === this.value);
      }
    });
  },
  watch: {
    reference: {
      async handler(val) {
        this.addReferenceId({
          resource: this.resource,
          reference: val,
          id: this.value
        });
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      addReferenceId: "api/addReferenceId"
    }),
    getProperty(data) {
      return typeof this.property === "string"
        ? data[this.property]
        : this.property(data);
    }
  }
};
</script>
