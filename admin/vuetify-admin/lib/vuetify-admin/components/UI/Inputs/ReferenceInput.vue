<template>
  <div>
    <slot :items="items"></slot>
  </div>
</template>

<script>
import Field from "vuetify-admin/mixins/field";
import Search from "vuetify-admin/mixins/search";
import { mapActions } from "vuex";

export default {
  name: "ReferenceInput",
  mixins: [Field, Search],
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
  watch: {
    value: {
      handler() {
        this.loadData();
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

      this.items = data;
    },
    loadChoices(search) {
      this.search(search, this.reference, this.getFields);
    }
  }
};
</script>
