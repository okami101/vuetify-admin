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
        <v-text-field
          v-model="filter[item.source]"
          :label="item.text || $t(`attributes.${item.source}`)"
          :append-icon="item.icon"
          single-line
          hide-details
          dense
          filled
          @input="onSearch"
        ></v-text-field>
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
        this.filter = val;
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
      this.$emit("input", this.filter);
    }, 200)
  }
};
</script>
