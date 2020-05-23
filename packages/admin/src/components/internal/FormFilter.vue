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
        <input-filter
          :type="item.type"
          v-bind="getAttributes(item)"
          :value="value[item.source]"
          @input="(val) => update(item.source, val)"
        >
        </input-filter>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import InputFilter from "./InputFilter";

export default {
  components: {
    InputFilter,
  },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    filters: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getAttributes(filter) {
      let { type, ...attributes } = filter;
      return attributes;
    },
    remove(filter) {
      let value = { ...this.value };
      delete value[filter.source];

      this.$emit("remove", filter);
      this.$emit("input", value);
    },
    update(source, value) {
      this.$emit("input", {
        ...this.value,
        [source]: value,
      });
    },
  },
};
</script>
