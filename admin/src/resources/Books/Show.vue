<template>
  <va-show>
    <v-row justify="center">
      <v-col lg="8">
        <va-tabbed-show
          :tabs="[
            { id: 'attributes', icon: 'mdi-eye' },
            { id: 'summary', icon: 'mdi-text' }
          ]"
        >
          <template v-slot:attributes>
            <v-row>
              <v-col>
                <va-field source="isbn"></va-field>
                <va-field source="cover">
                  <va-image-field
                    source="cover"
                    src="thumbnails.medium"
                  ></va-image-field>
                </va-field>
                <va-field source="publisher" v-slot="{ value }">
                  <v-chip
                    color="orange"
                    :to="{
                      name: 'publishers_show',
                      params: { id: value.id }
                    }"
                  >
                    {{ value.name }}
                  </v-chip>
                </va-field>
                <va-field source="title"></va-field>
                <va-field source="category">
                  <v-chip>
                    <va-select-field source="category" enum></va-select-field>
                  </v-chip>
                </va-field>
              </v-col>
              <v-col>
                <va-field source="formats" v-slot="{ value }">
                  <v-chip-group>
                    <v-chip color="yellow" v-for="(item, i) in value" :key="i">
                      <va-select-field
                        source="formats"
                        :item="item"
                        enum
                      ></va-select-field>
                    </v-chip>
                  </v-chip-group>
                </va-field>
                <va-field source="tags" v-slot="{ value }">
                  <v-chip-group>
                    <v-chip v-for="(item, i) in value" :key="i">
                      {{ item }}
                    </v-chip>
                  </v-chip-group>
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
                <va-field source="authors" v-slot="{ value }">
                  <v-chip-group>
                    <v-chip
                      color="primary"
                      v-for="(item, i) in value"
                      :key="i"
                      :to="{ name: 'authors_show', params: { id: item.id } }"
                    >
                      {{ item.name }}
                    </v-chip>
                  </v-chip-group>
                </va-field>
              </v-col>
            </v-row>
            <va-field
              source="description"
              :options="{ multiline: true }"
            ></va-field>
            <va-field source="reviews" v-slot="{ value }">
              <v-chip-group column>
                <v-chip
                  color="green"
                  v-for="(item, i) in value"
                  :key="i"
                  :to="{ name: 'reviews_show', params: { id: item.id } }"
                >
                  {{ item.author }}
                </v-chip>
              </v-chip-group>
            </va-field>
          </template>
          <template v-slot:summary>
            <va-rich-text-field source="summary"></va-rich-text-field>
            <va-field source="extract">
              <va-file-field source="extract"></va-file-field>
            </va-field>
          </template>
        </va-tabbed-show>
      </v-col>
    </v-row>
  </va-show>
</template>

<script>
export default {
  props: ["item"]
};
</script>
