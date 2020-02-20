<template>
  <v-card>
    <v-tabs v-model="currentTab">
      <v-tab v-for="tab in tabs" :key="tab.id" :href="`#tab-${tab.id}`">
        <v-icon v-if="tab.icon" small class="mr-2">{{ tab.icon }}</v-icon>
        {{ tab.label || $t(`tabs.${tab.id}`) }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="currentTab">
      <v-tab-item v-for="tab in tabs" :key="tab.id" :value="`tab-${tab.id}`">
        <v-card flat>
          <v-card-text>
            <slot :name="tab.id"></slot>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <slot name="footer"></slot>
  </v-card>
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
