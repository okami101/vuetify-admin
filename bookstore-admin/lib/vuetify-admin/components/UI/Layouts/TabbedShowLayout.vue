<template>
  <v-tabs v-model="currentTab" grow>
    <v-tab v-for="tab in tabs" :key="tab.value" :href="`#tab-${tab.value}`">
      <v-icon class="mr-2">{{ tab.icon }}</v-icon>
      {{ tab.text }}
    </v-tab>

    <v-tab-item
      v-for="tab in tabs"
      :key="tab.value"
      :value="`tab-${tab.value}`"
    >
      <slot :name="tab.value"></slot>
    </v-tab-item>
  </v-tabs>
</template>

<script>
export default {
  name: "TabbedShowLayout",
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
