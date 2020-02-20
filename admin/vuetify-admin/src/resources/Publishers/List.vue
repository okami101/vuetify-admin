<template>
  <va-list :filters="['q', 'name', 'founder', 'headquarter']" :exporter="false">
    <template v-slot:aside="props">
      <h1>Coucou</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet id rem
        esse ad alias harum provident et tempora, ratione illum. Reiciendis
        harum possimus, tempore magnam minima repellat placeat totam quibusdam.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam vero,
        quidem veritatis voluptatem necessitatibus consectetur eum quis officiis
        aut ipsa voluptate at corrupti amet qui magnam aspernatur laboriosam
        maxime dignissimos.
      </p>
      {{ props }}
    </template>
    <template v-slot="props">
      <va-datagrid
        v-bind="props"
        :fields="['id', 'name', 'founder', 'headquarter', 'opening_date']"
        row-click="show"
      >
        <template v-slot:row-actions="{ item }">
          <va-edit-button :item="item"></va-edit-button>
          <va-delete-button :item="item"></va-delete-button>
        </template>
      </va-datagrid>
    </template>
  </va-list>
</template>
