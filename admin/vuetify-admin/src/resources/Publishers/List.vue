<template>
  <va-list
    :resource="resource"
    :fields="[
      'id',
      'name',
      'founder',
      'headquarter',
      { source: 'opening_date', type: 'date', options: { format: 'long' } }
    ]"
    :filters="['q', 'name', 'founder', 'headquarter']"
  >
    <template v-slot="props">
      <va-datagrid v-bind="props" row-click="show">
        <template v-slot:actions-item="{ resource, item }">
          <va-edit-button :resource="resource" :item="item"></va-edit-button>
          <va-delete-button
            :resource="resource"
            :item="item"
          ></va-delete-button>
          <va-clone-button :resource="resource" :item="item"></va-clone-button>
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
