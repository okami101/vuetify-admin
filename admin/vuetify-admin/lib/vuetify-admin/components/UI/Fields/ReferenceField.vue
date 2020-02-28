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
import { mapState, mapMutations, mapActions } from "vuex";

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
    fields: {
      type: Array,
      default: () => []
    },
    include: {
      type: Array,
      default: () => []
    },
    property: [String, Function],
    syncKey: String,
    multiple: Boolean
  },
  data() {
    return {
      data: null
    };
  },
  watch: {
    value: {
      async handler(val) {
        /**
         * Get data from the store via sync key
         * Used mainly for list references aggregation
         */
        if (this.syncKey) {
          this.data = this.multiple
            ? this.references[this.syncKey].filter(r => val.includes(r.id))
            : this.references[this.syncKey].find(r => r.id === val);
          return;
        }

        /**
         * Load api data if no async key
         */
        let { data } = await this.getMany({
          resource: this.reference,
          params: {
            fields: {
              [this.reference]: this.getFields
            },
            include: this.include,
            ids: this.multiple ? val : [val]
          }
        });
        this.data = this.multiple ? data : data[0];
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
      references: state => state.api.references
    }),
    getFields() {
      return this.fields.length ? this.fields : ["id", this.property];
    }
  },
  methods: {
    ...mapMutations({
      addReferenceId: "api/addReferenceId"
    }),
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
