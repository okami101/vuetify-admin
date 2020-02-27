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
        <va-field source="publisher_id">
          <va-reference-field
            source="publisher_id"
            reference="publishers"
            link="show"
            property="name"
          >
          </va-reference-field>
        </va-field>
        <va-field source="title"></va-field>
        <va-field source="category">
          <va-chip-field>
            <va-enum-field source="category"></va-enum-field>
          </va-chip-field>
        </va-field>
        <va-field source="description"></va-field>
        <va-field source="author"></va-field>
        <va-field source="author">
          <va-array-field source="formats" v-slot="{ items }">
            <va-single-field-list :items="items" v-slot="{ item }">
              <va-chip-field color="yellow">
                <va-enum-field source="formats" :item="item"></va-enum-field>
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
      </template>
      <template v-slot:summary>
        <va-rich-text-field source="summary"></va-rich-text-field>
      </template>
    </va-tabbed-show>
  </va-show>
</template>
