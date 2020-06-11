<template>
  <v-breadcrumbs :items="items"></v-breadcrumbs>
</template>

<script>
/**
 * Default admin component for breadcrumbs, will generate automatically hierarchical links from current route.
 * Support hierarchical CRUD structure.
 */
export default {
  computed: {
    items() {
      return this.$route.matched.map((route) => {
        return {
          text: route.meta ? route.meta.title : route.name,
          exact: true,
          to: route.path === "" ? "/" : route,
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
