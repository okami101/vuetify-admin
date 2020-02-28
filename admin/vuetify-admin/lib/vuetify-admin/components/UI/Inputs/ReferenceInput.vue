<template>
  <div>
    <slot v-if="multiple" :items="dataItems" :choices="choices"></slot>
    <slot v-else :item="dataItem" :choices="choices"></slot>
  </div>
</template>

<script>
import Field from "vuetify-admin/mixins/field";
import { mapActions } from "vuex";

export default {
  name: "ReferenceInput",
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
    multiple: Boolean
  },
  data() {
    return {
      dataItems: [],
      dataItem: null,
      choices: [],
      loading: true
    };
  },
  watch: {
    value: {
      async handler() {
        await Promise.all([this.loadData(), this.loadChoices()]);

        this.loading = false;
      },
      immediate: true
    }
  },
  computed: {
    getFields() {
      return this.fields.length ? this.fields : ["id", this.property];
    }
  },
  methods: {
    ...mapActions({
      getList: "api/getList",
      getMany: "api/getMany"
    }),
    async loadData() {
      /**
       * Fetch related item records
       * Used for preloaded autocomplete inputs
       */
      let { data } = await this.getMany({
        resource: this.reference,
        params: {
          fields: {
            [this.reference]: this.getFields
          },
          include: this.include,
          ids: this.multiple ? this.value : [this.value]
        }
      });

      if (this.multiple) {
        this.dataItems = data;
      } else {
        this.dataItem = data[0];
      }
    },
    async loadChoices() {
      /**
       * Fetch choices
       * Used for select inputs with full preloaded list
       */
      let { data } = await this.getList({
        resource: this.reference,
        params: {
          fields: {
            [this.reference]: this.getFields
          },
          include: this.include
        }
      });

      this.choices = data;
    }
  }
};
</script>
