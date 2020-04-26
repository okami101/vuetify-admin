<template>
  <va-show>
    <v-row justify="center">
      <v-col lg="4">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2">
              {{ title }}
            </div>
          </template>
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
            <va-field source="quality" v-if="item">
              {{ item.rating >= 3 ? $t("good") : $t("bad") }}
            </va-field>
            <va-field source="rating" type="rating"></va-field>
            <va-field source="body"></va-field>
            <va-field source="author"></va-field>
            <va-field
              source="publication_date"
              type="date"
              format="long"
            ></va-field>
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
