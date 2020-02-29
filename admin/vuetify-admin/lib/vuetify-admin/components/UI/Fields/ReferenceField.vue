<template>
  <v-progress-linear
    indeterminate
    :color="loadingColor"
    v-if="loading"
  ></v-progress-linear>
  <div v-else>
    <slot
      v-if="multiple"
      :items="dataItems"
      :link="`${reference}_${link}`"
    ></slot>
    <slot
      v-else-if="dataItem"
      :item="dataItem"
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
          {{ getProperty(dataItem) }}
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
      dataItems: [],
      dataItem: null,
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

        if (this.multiple) {
          this.dataItems = val[this.syncKey].filter(r =>
            this.value.includes(r.id)
          );
        } else {
          this.dataItem = val[this.syncKey].find(r => r.id === this.value);
        }

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

        if (this.multiple) {
          this.dataItems = data;
        } else {
          this.dataItem = data[0];
        }

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
    },
    items() {
      return this.dataItems;
    }
  },
  methods: {
    ...mapMutations({
      addReferenceId: "api/addReferenceId"
    }),
    ...mapActions({
      getMany: "api/getMany"
    }),
    getProperty(item) {
      return typeof this.property === "string"
        ? item[this.property]
        : this.property(item);
    }
  }
};
</script>
