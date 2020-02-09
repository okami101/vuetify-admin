<template>
  <v-row>
    <v-col sm="auto">
      <v-list dense>
        <v-list-item v-for="field in fields" :key="field.value">
          <v-list-item-content>
            <v-list-item-title>
              {{ field.text }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <slot
              :name="field.value"
              v-bind="{ item: resource, value: resource[field.value] }"
            >
              {{ resource[field.value] }}
            </slot>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "SimpleShowLayout",
  props: {
    fields: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      resource: this.$route.meta.model
    };
  }
};
</script>
