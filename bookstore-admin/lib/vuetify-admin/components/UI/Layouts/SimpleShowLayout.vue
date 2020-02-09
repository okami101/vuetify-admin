<template>
  <v-list dense>
    <v-list-item>
      <v-list-item-content>Calories:</v-list-item-content>
      <v-list-item-content class="align-end">{{
        item.calories
      }}</v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "SimpleShowLayout"
};
</script>
