<template>
  <va-show v-slot="{ item }">
    <va-tabbed-show
      :tabs="[
        { id: 'attributes', icon: 'mdi-eye' },
        { id: 'summary', icon: 'mdi-text' }
      ]"
    >
      <template v-slot:attributes>
        <va-field source="isbn"></va-field>
        <va-field source="cover">
          <va-image-field
            source="cover"
            src="thumbnails.large"
            preview="thumbnails.medium"
          ></va-image-field>
        </va-field>
        <va-field source="publisher">
          <v-chip
            color="orange"
            :to="{ name: 'publishers_show', params: { id: item.publisher.id } }"
          >
            {{ item.publisher.name }}
          </v-chip>
        </va-field>
        <va-field source="title"></va-field>
        <va-field source="category">
          <v-chip>
            <va-select-field source="category" enum></va-select-field>
          </v-chip>
        </va-field>
        <va-field
          source="description"
          :options="{ multiline: true }"
        ></va-field>
        <va-field source="formats">
          <va-array-field source="formats" v-slot="{ items }">
            <va-single-field-list :items="items" v-slot="{ item }" text>
              <v-chip color="yellow">
                <va-select-field
                  source="formats"
                  :item="item"
                  enum
                ></va-select-field>
              </v-chip>
            </va-single-field-list>
          </va-array-field>
        </va-field>
        <va-field source="tags">
          <va-array-field source="tags" v-slot="{ items }">
            <va-single-field-list :items="items" v-slot="{ item }">
              <v-chip>
                {{ item }}
              </v-chip>
            </va-single-field-list>
          </va-array-field>
        </va-field>
        <va-field
          source="price"
          type="number"
          :options="{ format: 'currency' }"
        ></va-field>
        <va-field source="commentable" type="boolean"></va-field>
        <va-field
          source="publication_date"
          type="date"
          :options="{ format: 'long' }"
        ></va-field>
        <va-field source="authors">
          <va-single-field-list :items="item.authors" v-slot="{ item }">
            <v-chip
              color="primary"
              :to="{ name: link, params: { id: item.id } }"
            >
              {{ item.name }}
            </v-chip>
          </va-single-field-list>
        </va-field>
        <va-field source="reviews">
          <va-single-field-list :items="item.reviews" v-slot="{ item }">
            <v-chip color="green" :to="{ name: link, params: { id: item.id } }">
              {{ item.author }}
            </v-chip>
          </va-single-field-list>
        </va-field>
      </template>
      <template v-slot:summary>
        <va-rich-text-field source="summary"></va-rich-text-field>
        <va-field source="extract">
          <va-file-field source="extract"></va-file-field>
        </va-field>
      </template>
    </va-tabbed-show>
  </va-show>
</template>
