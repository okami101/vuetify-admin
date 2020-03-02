<template>
  <v-row>
    <v-col sm="auto" v-for="(item, index) in filters" :key="index">
      <div class="d-flex align-center">
        <v-btn
          small
          text
          icon
          class="mr-2"
          v-if="!item.alwaysOn"
          @click="remove(item)"
        >
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
        <slot
          :source="item.source"
          :name="item.source"
          :label="item.label"
          filter
          hide-details
          :filled="false"
          small-chips
          :value="filter[item.source]"
        >
          <component
            :is="`va-${item.type}-input`"
            :source="item.source"
            :label="item.label"
            filter
            v-bind="item.options"
            :value="filter[item.source]"
            hide-details
            :filled="false"
            small-chips
          >
          </component>
        </slot>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import debounce from "lodash/debounce";
import EventBus from "vuetify-admin/utils/eventBus";

export default {
  name: "FormFilter",
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    filters: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      filter: {}
    };
  },
  mounted() {
    EventBus.$on("filter", ({ source, value }) => {
      this.filter[source] = value;
      this.onSearch();
    });
  },
  beforeDestroy() {
    EventBus.$off("filter");
  },
  watch: {
    value: {
      handler(val) {
        this.filter = { ...(val || {}) };
      },
      immediate: true
    }
  },
  methods: {
    remove(filter) {
      delete this.filter[filter.source];
      this.$emit("remove", filter);
      this.$emit("input", { ...this.filter });
    },
    onSearch: debounce(function() {
      this.$emit("input", { ...this.filter });
    }, 200)
  }
};
</script>
