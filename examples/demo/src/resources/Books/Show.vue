<template>
  <va-show>
    <v-row justify="center">
      <v-col lg="8">
        <base-material-tabs-card
          :tabs="[
            { id: 'attributes', icon: 'mdi-eye' },
            { id: 'summary', icon: 'mdi-text' },
          ]"
        >
          <template v-slot:attributes>
            <v-row>
              <v-col>
                <va-field source="isbn"></va-field>
                <va-field
                  source="cover"
                  type="image"
                  src="thumbnails.large"
                ></va-field>
                <va-field
                  source="publisher"
                  type="reference"
                  reference="publishers"
                  chip
                  color="orange"
                ></va-field>
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
                  format="currency"
                ></va-field>
                <va-field source="commentable" type="boolean"></va-field>
                <va-field
                  source="publication_date"
                  type="date"
                  format="long"
                ></va-field>
                <va-field source="authors" v-slot="{ value }">
                  <v-chip-group>
                    <va-reference-field
                      reference="authors"
                      v-for="(item, i) in value"
                      :key="i"
                      color="orange"
                      chip
                      :item="item"
                    >
                    </va-reference-field>
                  </v-chip-group>
                </va-field>
              </v-col>
            </v-row>
            <va-field source="description"></va-field>
            <va-field source="reviews" v-slot="{ value }">
              <v-chip-group column>
                <va-reference-field
                  reference="reviews"
                  v-for="(item, i) in value"
                  :key="i"
                  color="green"
                  chip
                  option-text="author"
                  :item="item"
                >
                </va-reference-field>
              </v-chip-group>
            </va-field>
          </template>
          <template v-slot:summary>
            <va-rich-text-field source="summary"></va-rich-text-field>
            <va-field source="extract" type="file"></va-field>
          </template>
        </base-material-tabs-card>
      </v-col>
    </v-row>
  </va-show>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
