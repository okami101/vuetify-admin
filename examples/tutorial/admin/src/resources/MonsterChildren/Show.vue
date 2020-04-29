<template>
  <va-show>
    <v-row justify="center">
      <v-col sm="6">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2">
              {{ title }}
            </div>
          </template>
          <v-card-text>
            <va-field
              source="monster"
              type="reference"
              reference="monsters"
              option-text="name"
            ></va-field>
            <va-field source="name" type="text"></va-field>
            <va-field source="created_at" type="date" format="long"></va-field>
            <va-field source="updated_at" type="date" format="long"></va-field>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </va-show>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
