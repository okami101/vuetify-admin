<template>
  <va-list
    :resource="resource"
    :fields="[
      'id',
      { source: 'rating', type: 'rating' },
      'author',
      { source: 'publication_date', type: 'date', options: { format: 'long' } }
    ]"
    :filters="[
      'q',
      { source: 'rating', type: 'rating' },
      'author',
      { source: 'published_before', type: 'date', options: { format: 'long' } },
      { source: 'published_after', type: 'date', options: { format: 'long' } }
    ]"
  >
    <template v-slot="props">
      <va-datagrid v-bind="props" row-click="show" show-expand>
        <template v-slot:actions-item="{ resource, item }">
          <va-edit-button :resource="resource" :item="item"></va-edit-button>
          <va-delete-button
            :resource="resource"
            :item="item"
          ></va-delete-button>
        </template>
        <template v-slot:expanded-item="{ item }">
          <va-text-field :item="item" source="body"></va-text-field>
        </template>
      </va-datagrid>
    </template>
  </va-list>
</template>

<script>
export default {
  props: ["resource"]
};
</script>
