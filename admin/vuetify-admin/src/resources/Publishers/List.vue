<template>
  <va-list :filters="['q', 'name', 'founder', 'headquarter']">
    <template v-slot="props">
      <va-datagrid
        v-bind="props"
        :fields="[
          'id',
          'name',
          'founder',
          'headquarter',
          { source: 'opening_date', type: 'date' }
        ]"
        row-click="show"
      >
        <template v-slot:actions-item="{ item }">
          <va-edit-button :item="item"></va-edit-button>
          <va-delete-button :item="item"></va-delete-button>
          <va-clone-button :item="item"></va-clone-button>
        </template>
      </va-datagrid>
    </template>
  </va-list>
</template>
