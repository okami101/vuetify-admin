<template>
  <va-show>
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
        <va-field source="publisher_id">
          <va-reference-field
            source="publisher_id"
            reference="publishers"
            link="show"
            property="name"
            v-slot="{ item, to }"
          >
            <va-chip-field color="orange" :to="to">
              {{ item.name }}
            </va-chip-field>
          </va-reference-field>
        </va-field>
        <va-field source="title"></va-field>
        <va-field source="category">
          <va-chip-field>
            <va-select-field source="category" enum></va-select-field>
          </va-chip-field>
        </va-field>
        <va-field
          source="description"
          :options="{ multiline: true }"
        ></va-field>
        <va-field source="formats">
          <va-array-field source="formats">
            <va-single-field-list v-slot="{ item }">
              <va-chip-field color="yellow">
                <va-select-field
                  source="formats"
                  :item="item"
                  enum
                ></va-select-field>
              </va-chip-field>
            </va-single-field-list>
          </va-array-field>
        </va-field>
        <va-field source="tags">
          <va-array-field source="tags">
            <va-single-field-list v-slot="{ item }">
              <va-chip-field>
                {{ item }}
              </va-chip-field>
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
        <va-field source="review_ids">
          <va-reference-field
            source="review_ids"
            multiple
            reference="reviews"
            link="show"
            property="author"
            v-slot="{ link }"
          >
            <va-single-field-list v-slot="{ item }">
              <va-chip-field
                color="green"
                :to="{ name: link, params: { id: item.id } }"
              >
                {{ item.author }}
              </va-chip-field>
            </va-single-field-list>
          </va-reference-field>
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
