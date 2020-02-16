<template>
  <v-tabs v-model="currentTab" grow>
    <v-tab v-for="tab in tabs" :key="tab.id" :href="`#tab-${tab.id}`">
      <v-icon v-if="tab.icon" small class="mr-2">{{ tab.icon }}</v-icon>
      {{ tab.text || $t(`attributes.${tab.id}`) }}
    </v-tab>

    <v-tab-item
      v-for="tab in tabs"
      :key="tab.id"
      :value="`tab-${tab.id}`"
      class="pt-6"
    >
      <slot :name="tab.id"></slot>
    </v-tab-item>
  </v-tabs>
</template>

<script>
export default {
  name: "TabbedShow",
  props: {
    tabs: Array
  },
  data() {
    return {
      currentTab: this.$route.hash.substring(1)
    };
  },
  watch: {
    currentTab(val) {
      if (val) {
        const hash = `#${val}`;

        if (this.$route.hash !== hash) {
          this.$router.replace({ hash: `#${val}` });
        }
      }
    }
  }
};
</script>
