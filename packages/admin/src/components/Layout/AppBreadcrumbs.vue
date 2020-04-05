<template>
  <v-breadcrumbs :items="items"></v-breadcrumbs>
</template>

<script>
export default {
  name: "AppBreadcrumbs",
  computed: {
    items() {
      return [
        {
          text: this.$t("va.home"),
          exact: true,
          to: "/",
        },
        ...this.$route.matched.map((route) => {
          return {
            text: route.meta ? route.meta.title : route.name,
            exact: true,
            to: route,
          };
        }),
      ];
    },
  },
};
</script>

<style>
.v-breadcrumbs {
  background-color: #fff;
}
</style>
