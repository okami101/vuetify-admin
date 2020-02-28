<template>
  <v-progress-linear
    indeterminate
    :color="loadingColor"
    v-if="loading"
  ></v-progress-linear>
  <div v-else>
    <slot v-if="multiple" :items="data" :link="`${reference}_${link}`"></slot>
    <slot
      v-else-if="data"
      :item="data"
      :to="{
        name: `${reference}_${link}`,
        params: { id: value }
      }"
    >
      <router-link
        :to="{
          name: `${reference}_${link}`,
          params: { id: value }
        }"
      >
        <span v-if="property">
          {{ getProperty(data) }}
        </span>
      </router-link>
    </slot>
  </div>
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
    loadingColor: {
      type: String,
      default: "primary"
    },
    property: [String, Function],
    syncKey: String,
    multiple: Boolean
  },
  data() {
    return {
      data: null,
      loading: true
    };
  },
  watch: {
    references: {
      async handler(val) {
        /**
         * Get data from the store via sync key
         * Used mainly for list references aggregation
         */
        if (!this.syncKey || !val[this.syncKey]) {
          return;
        }

        this.data = this.multiple
          ? val[this.syncKey].filter(r => this.value.includes(r.id))
          : val[this.syncKey].find(r => r.id === this.value);

        this.loading = false;
      },
      immediate: true
    },
    value: {
      async handler(val) {
        /**
         * Get data from the store via sync key
         * Used mainly for list references aggregation
         */
        if (this.syncKey || !val) {
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
        this.loading = false;
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
