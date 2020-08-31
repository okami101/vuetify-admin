<template>
  <va-form :id="id" :item="item">
    <v-row justify="center">
      <v-col sm="4">
        <v-card>
          <v-card-text>
            <va-select-input
              source="userId"
              reference="users"
            ></va-select-input>
            <va-text-input source="title"></va-text-input>
            <va-text-input source="body" multiline></va-text-input>
            <va-save-button></va-save-button>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </va-form>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
