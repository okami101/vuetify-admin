<template>
  <va-list>
    <va-datagrid
      :fields="['id', 'isbn', 'title', 'author', 'publication_date']"
    >
      <template v-slot:filters>
        <va-text-input
          source="q"
          icon="mdi-magnify"
          :always-on="true"
        ></va-text-input>
        <va-text-input source="title"></va-text-input>
        <va-text-input source="author"></va-text-input>
      </template>
      <template v-slot:row-actions="{ item }">
        <va-show-button :item="item"></va-show-button>
        <va-edit-button :item="item"></va-edit-button>
        <va-delete-button :item="item"></va-delete-button>
      </template>
    </va-datagrid>
  </va-list>
</template>
