import isEmpty from "lodash/isEmpty";
import Choices from "./choices";
import Search from "./search";

/**
 * For all input components that support resource reference, as `VaSelectInput`, `VaRadioGroupInput` or `VaAutocompleteInput`.
 * @displayName MixinReference
 */
export default {
  mixins: [Choices, Search],
  props: {
    /**
     * Value to be selected, array if multiple.
     * @model
     */
    value: {
      type: [String, Array],
      default: null,
    },
    /**
     * Name of resource to search into.
     */
    reference: String,
    /**
     * Name of request query for searching into your API.
     */
    searchQuery: {
      type: String,
      default: "q",
    },
  },
  data() {
    return {
      loading: false,
      items: null,
    };
  },
  computed: {
    getItemText() {
      if (this.itemText !== "text") {
        return this.itemText;
      }
      if (this.reference) {
        let resource = this.$admin.getResource(this.reference);
        return resource.label || "label";
      }
      return this.itemText;
    },
    getItemValue() {
      if (this.itemValue !== "value") {
        return this.itemValue;
      }
      if (this.reference) {
        return "id";
      }
      return this.itemValue;
    },
    getFields() {
      if (!isEmpty(this.fields)) {
        return this.fields;
      }

      let resource = this.$admin.getResource(this.reference);
      return (
        resource.autocompleteFields ||
        (typeof this.getItemText === "string" ? [this.getItemText] : [])
      );
    },
  },
  methods: {
    async fetchChoices(search = null) {
      if (!this.reference || this.loading) {
        return;
      }

      this.loading = true;

      /**
       * Load paginated and sortad data list
       */
      let { data } = await this.getList({
        resource: this.reference,
        params: {
          fields: {
            [this.reference]: this.getFields,
          },
          include: this.include,
          pagination: {
            page: 1,
            perPage: this.itemsPerPage,
          },
          sort: this.sortBy.map((by, index) => {
            return { by, desc: this.sortDesc[index] };
          }),
          filter: {
            ...this.filter,
            [this.searchQuery]: search || "",
          },
        },
      });

      this.loading = false;
      return data;
    },
    async fetchCurrentChoices(ids) {
      if (!this.reference || isEmpty(ids)) {
        return;
      }

      this.loading = true;

      /**
       * Fetch related item records
       * Used for preloaded autocomplete inputs
       */
      let { data } = await this.getMany({
        resource: this.reference,
        params: {
          fields: {
            [this.reference]: this.fields,
          },
          include: this.include,
          ids,
        },
      });

      this.loading = false;
      return data;
    },
  },
};
