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
          :model="item.model"
          :name="item.source"
          :label="item.label"
          filterable
          hide-details
          :filled="false"
          small-chips
          :value="value[item.model || item.source]"
        >
          <component
            :is="`va-${item.type}-input`"
            :source="item.source"
            :model="item.model"
            :label="item.label"
            filterable
            v-bind="item.options"
            :value="value[item.model || item.source]"
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
      this.filter = {
        ...this.value,
        [source]: value
      };
      this.debounceInput();
    });
  },
  beforeDestroy() {
    EventBus.$off("filter");
  },
  methods: {
    remove(filter) {
      let value = { ...this.value };
      delete value[filter.source];

      this.$emit("remove", filter);
      this.$emit("input", value);
    },
    debounceInput: debounce(function() {
      this.$emit("input", this.filter);
    }, 200)
  }
};
</script>
