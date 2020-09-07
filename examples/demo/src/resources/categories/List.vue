<template>
  <base-material-card :icon="resource.icon" :title="title">
    <va-treeview open-all dense draggable></va-treeview>
  </base-material-card>
</template>

<script>
export default {
  props: ["resource", "title"],
};
</script>
