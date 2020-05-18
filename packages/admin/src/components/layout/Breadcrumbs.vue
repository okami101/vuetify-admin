<template>
  <v-breadcrumbs :items="items"></v-breadcrumbs>
</template>

<script>
export default {
  computed: {
    items() {
      return this.$route.matched.map((route) => {
        return {
          text: route.meta ? route.meta.title : route.name,
          exact: true,
          to: route,
        };
      });
    },
  },
};
</script>

<style>
.v-breadcrumbs {
  background-color: #fff;
}
</style>
