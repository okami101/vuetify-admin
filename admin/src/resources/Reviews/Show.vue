<template>
  <va-show v-slot="{ item }">
    <v-card>
      <v-card-text>
        <va-field source="book">
          <router-link
            :to="{ name: 'books_show', params: { id: item.book.id } }"
          >
            {{ item.book.title }}
          </router-link>
        </va-field>
        <va-field source="status">
          <v-chip :color="$statusColor(item.status)">
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
  </va-show>
</template>
