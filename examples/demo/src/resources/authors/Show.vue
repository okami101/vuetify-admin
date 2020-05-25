<template>
  <va-show-layout :title="title">
    <va-show :item="item">
      <v-row justify="center">
        <v-col lg="4">
          <v-card v-if="item">
            <v-img
              v-if="item.photo"
              class="white--text align-end"
              height="600px"
              :src="item.photo.thumbnails.large"
            >
            </v-img>
            <v-card-title>
              {{ item.name }}
            </v-card-title>

            <v-card-text>
              <div class="mb-3">{{ item.description }}</div>
              <div v-if="item.books.length">
                <h3>{{ $t("authors.all_books") }}</h3>
                <v-chip-group column>
                  <va-reference-field
                    reference="books"
                    v-for="book in item.books"
                    :key="book.id"
                    chip
                    :item="book"
                  >
                  </va-reference-field>
                </v-chip-group>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </va-show>
  </va-show-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
