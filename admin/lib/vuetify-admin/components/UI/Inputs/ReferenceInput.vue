<script>
import Search from "vuetify-admin/mixins/search";

export default {
  name: "ReferenceInput",
  mixins: [Search],
  props: {
    reference: {
      type: String,
      required: true
    },
    property: [String, Function]
  },
  computed: {
    getFields() {
      return this.fields.length ? this.fields : ["id", this.property];
    }
  },
  methods: {
    async fetchData(ids) {
      if (!ids || !ids.length) {
        return;
      }

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
          ids
        }
      });

      return data;
    },
    async fetchChoices(search) {
      let data = await this.search(search, this.reference, this.getFields);
      return data;
    }
  },
  render(c) {
    return this.$slots.default;
  }
};
</script>
