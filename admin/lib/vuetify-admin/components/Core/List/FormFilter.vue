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
        <component
          :is="`va-${item.type}-input`"
          :source="item.source"
          :model="item.model"
          :label="item.label"
          filterable
          v-bind="item.options"
          :value="value[item.source]"
          hide-details
          :filled="false"
          @input="val => update(item.source, val)"
        >
        </component>
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
  methods: {
    remove(filter) {
      let value = { ...this.value };
      delete value[filter.source];

      this.$emit("remove", filter);
      this.$emit("input", value);
    },
    update(source, value) {
      if (value === undefined) {
        return;
      }

      this.filter = {
        ...this.value,
        [source]: value
      };
      this.debounceInput();
    },
    debounceInput: debounce(function() {
      this.$emit("input", this.filter);
    }, 200)
  }
};
</script>
