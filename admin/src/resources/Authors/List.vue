<template>
  <va-list :fields="['id', 'name']" :filters="['q', 'name']" v-slot="{ items }">
    <v-card>
      <v-card-text>
        <va-single-field-list :items="items" v-slot="{ item }">
          <va-chip-field
            color="green"
            :to="{ name: 'authors_show', params: { id: item.id } }"
          >
            {{ item.name }}
          </va-chip-field>
        </va-single-field-list>
      </v-card-text>
    </v-card>
  </va-list>
</template>
