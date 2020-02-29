import { mapActions } from "vuex";

export default {
  props: {
    filter: {
      type: Object,
      default: () => {}
    },
    fields: {
      type: Array,
      default: () => []
    },
    itemsPerPage: {
      type: Number,
      default: 15
    },
    sortBy: {
      type: Array,
      default: () => []
    },
    sortDesc: {
      type: Array,
      default: () => []
    },
    searchQuery: {
      type: String,
      default: "q"
    },
    include: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    ...mapActions({
      getList: "api/getList",
      getMany: "api/getMany"
    }),
    async search(search, resource, fields = []) {
      /**
       * Load paginated and sortad data list
       */
      let { data } = await this.getList({
        resource,
        params: {
          fields: {
            [resource]: fields || this.fields
          },
          include: this.include,
          pagination: {
            page: 1,
            perPage: this.itemsPerPage
          },
          sort: this.sortBy.map((by, index) => {
            return { by, desc: this.sortDesc[index] };
          }),
          filter: {
            ...this.filter,
            [this.searchQuery]: search || ""
          }
        }
      });

      return data;
    }
  }
};
