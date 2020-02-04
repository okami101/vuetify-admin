<template>
  <v-breadcrumbs :items="items" class="mb-5"></v-breadcrumbs>
</template>

<script>
export default {
  name: "Breadcrumbs",
  computed: {
    items() {
      return [
        {
          text: "Home",
          exact: true,
          to: "/"
        },
        ...this.$route.matched.map(route => {
          return {
            text: route.meta ? route.meta.label : route.name,
            exact: true,
            to: route
          };
        })
      ];
    }
  }
};
</script>

<style>
.v-breadcrumbs {
  background-color: #fff;
}
</style>
