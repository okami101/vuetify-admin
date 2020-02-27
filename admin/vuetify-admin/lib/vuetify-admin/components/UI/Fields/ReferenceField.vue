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
import Field from "vuetify-admin/mixins/field";
import { mapActions } from "vuex";

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
  watch: {
    reference: {
      async handler(val) {
        let { data } = await this.getMany({
          resource: this.reference,
          params: {
            ids: [this.value]
          }
        });
        this.data = data[0];
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      getMany: "api/getMany"
    }),
    getProperty(data) {
      return typeof this.property === "string"
        ? data[this.property]
        : this.property(data);
    }
  }
};
</script>
