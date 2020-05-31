<template>
  <va-edit-layout :title="title">
    <va-form :id="id" :item="item" :saving.sync="saving">
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
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
  data() {
    return {
      saving: false,
    };
  },
};
</script>
