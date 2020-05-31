<template>
  <va-create-layout :title="title">
    <va-form :item="item" :saving.sync="saving">
      <v-row justify="center">
        <v-col sm="4">
          <v-card>
            <v-card-text>
              <va-text-input source="title"></va-text-input>
              <va-text-input source="body"></va-text-input>
              <va-save-button :saving="saving"></va-save-button>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </va-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "item"],
  data() {
    return {
      saving: false,
    };
  },
};
</script>
