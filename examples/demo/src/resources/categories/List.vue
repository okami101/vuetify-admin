<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-treeview
      open-all
      dense
      editable
      :filter="{ type: 'book' }"
      :create-data="{ type: 'book' }"
    ></va-treeview>
  </base-material-card>
</template>

<script>
export default {
  props: ["resource", "title"],
};
</script>
