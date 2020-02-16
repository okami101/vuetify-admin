<template>
  <v-list dense v-if="resource">
    <v-list-item v-for="field in fields" :key="field.source" class="px-0">
      <v-list-item-content>
        <v-list-item-title>
          {{ field.text || $t(`attributes.${field.source}`) }}
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
  computed: {
    ...mapState({
      resource: state => state.api.resource
    })
  }
};
</script>
