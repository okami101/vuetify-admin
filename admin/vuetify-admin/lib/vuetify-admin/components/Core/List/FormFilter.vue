<template>
  <v-row>
    <v-col sm="auto" v-for="(item, index) in filters" :key="index">
      <div class="d-flex align-center">
        <v-btn
          small
          text
          icon
          class="mr-1"
          v-if="!item.alwaysOn"
          @click="remove(item)"
        >
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
        <component
          :is="`va-${item.type || 'text'}-input`"
          filter
          v-bind="item"
          v-model="filter[item.source]"
          single-line
          hide-details
          dense
          @input="onSearch"
        ></component>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import debounce from "lodash/debounce";

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
