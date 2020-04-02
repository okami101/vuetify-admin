import { mapActions } from "vuex";
import Choices from "vue-relay-admin/mixins/choices";

export default {
  mixins: [Choices],
  props: {
    filter: {
      type: Object,
      default: () => {},
    },
    reference: String,
    fields: {
      type: Array,
      default: () => [],
    },
    sortBy: {
      type: Array,
      default: () => [],
    },
    sortDesc: {
      type: Array,
      default: () => [],
    },
    include: {
      type: Array,
      default: () => [],
    },
    itemsPerPage: {
      type: Number,
      default: 15,
    },
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
  methods: {
    ...mapActions({
      getList: "api/getList",
      getMany: "api/getMany",
    }),
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
            [this.reference]: this.fields.length
              ? this.fields
              : [this.optionText],
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
      if (!this.reference || !ids || !ids.length) {
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
