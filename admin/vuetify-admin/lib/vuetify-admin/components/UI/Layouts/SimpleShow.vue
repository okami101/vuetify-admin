<template>
  <v-list dense v-if="resource">
    <v-list-item v-for="field in currentFields" :key="field.source">
      <v-list-item-content>
        <v-list-item-title>
          {{ field.label || $t(`attributes.${field.source}`) }}
        </v-list-item-title>
        <slot
          :name="field.source"
          v-bind="{ item: resource, value: resource[field.source] }"
        >
          {{ resource[field.source] }}
        </slot>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SimpleShow",
  props: {
    fields: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentFields: []
    };
  },
  watch: {
    fields: {
      handler(val) {
        this.currentFields = val.map(f => {
          return typeof f === "string"
            ? {
                source: f
              }
            : f;
        });
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapState({
      resource: state => state.api.resource
    })
  }
};
</script>
