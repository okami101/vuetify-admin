<template>
  <va-list :fields="['id', 'name']" :filters="['q', 'name']" v-slot="{ items }">
    <v-row>
      <v-col lg="3" v-for="item in items" :key="item.id">
        <v-card
          class="my-3 fill-height"
          :to="{ name: 'authors_show', params: { id: item.id } }"
        >
          <v-img
            class="white--text align-end"
            height="500px"
            :src="item.photo.thumbnails.large"
          >
          </v-img>

          <v-card-title>
            {{ item.name }}
          </v-card-title>

          <v-card-text>
            <div>{{ item.description }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </va-list>
</template>
