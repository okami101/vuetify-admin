<template>
  <va-show>
    <v-row justify="center">
      <v-col lg="4">
        <v-card>
          <v-card-text>
            <va-field source="book" v-slot="{ value }">
              <router-link
                :to="{ name: 'books_show', params: { id: value.id } }"
              >
                {{ value.title }}
              </router-link>
            </va-field>
            <va-field source="status" v-slot="{ value }">
              <v-chip :color="$statusColor(value)">
                <va-select-field source="status" enum></va-select-field>
              </v-chip>
            </va-field>
            <va-field source="quality">
              {{ item.rating >= 3 ? $t("good") : $t("bad") }}
            </va-field>
            <va-field source="rating" type="rating"></va-field>
            <va-field source="body" :options="{ multiline: true }"></va-field>
            <va-field source="author"></va-field>
            <va-field
              source="publication_date"
              type="date"
              :options="{ format: 'long' }"
            ></va-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </va-show>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
