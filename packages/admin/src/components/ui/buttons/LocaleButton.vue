<template>
  <v-menu offset-y v-if="$admin.translations">
    <template v-slot:activator="{ on }">
      <v-btn
        v-if="translatable"
        :icon="icon"
        text
        :color="color || 'primary'"
        v-on="on"
      >
        <v-icon small>mdi-translate</v-icon>
        <span v-if="!icon" class="ml-2">
          {{ $t("va.actions.locale") }} :
          {{ $admin.translations[$store.state[resource].locale] }}
        </span>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(label, code) in $admin.translations"
        :key="code"
        @click="changeLocale(code)"
      >
        <v-list-item-title>{{ label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import Resource from "../../../mixins/resource";
import Button from "../../../mixins/button";

/**
 * Locale button which allows resource translation.
 * Will list all configured supported languages as dropdown menu.
 * Change current locale on current resource store for contextualized fetching or saving on backend API.
 */
export default {
  mixins: [Resource, Button],
  methods: {
    changeLocale(code) {
      this.$store.dispatch(`${this.resource}/changeLocale`, code);
    },
  },
};
</script>
