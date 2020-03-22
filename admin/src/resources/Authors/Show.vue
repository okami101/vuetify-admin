<template>
  <va-show>
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
                <v-chip
                  v-for="book in item.books"
                  :key="book.id"
                  :to="{ name: 'books_show', params: { id: book.id } }"
                  >{{ book.title }}</v-chip
                >
              </v-chip-group>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </va-show>
</template>

<script>
export default {
  props: ["item"],
};
</script>
