<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-list
      :filters="[
        'name',
        {
          source: 'books',
          type: 'autocomplete',
          attributes: {
            optionText: 'title',
            multiple: true,
            reference: 'books',
          },
        },
      ]"
      :items-per-page="8"
      :items-per-page-options="[8, 16, 32]"
      :include="['media', 'books']"
    >
      <template v-slot="{ items }">
        <v-row>
          <v-col lg="3" v-for="item in items" :key="item.id">
            <v-card
              class="my-3 fill-height"
              flat
              :to="{ name: 'authors_show', params: { id: item.id } }"
            >
              <v-img
                v-if="item.photo"
                class="white--text align-end"
                height="500px"
                :src="item.photo.thumbnails.large"
              >
              </v-img>

              <v-card-title>
                {{ item.name }}
              </v-card-title>

              <v-card-text>
                <div class="mb-3">{{ item.description }}</div>
                <div v-if="item.books.length">
                  <h3>{{ $t("authors.last_books") }}</h3>
                  <v-chip-group column>
                    <va-reference-field
                      reference="books"
                      v-for="book in item.books.slice(0, 2)"
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
      </template>
    </va-list>
  </base-material-card>
</template>

<script>
export default {
  props: ["resource", "title"],
};
</script>
