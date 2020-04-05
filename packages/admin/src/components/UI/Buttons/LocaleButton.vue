<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn v-if="translatable" :icon="icon" text :color="color" v-on="on">
        <v-icon small>mdi-translate</v-icon>
        <span v-if="!icon" class="ml-2">
          {{ $t("va.actions.locale") }} :
          {{ $admin.locales.translations[$store.state[resource].locale] }}
        </span>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(label, code) in $admin.locales.translations"
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

export default {
  name: "LocaleButton",
  mixins: [Resource],
  props: {
    icon: Boolean,
    color: {
      type: String,
      default: "primary",
    },
  },
  created() {
    /**
     * Force to current locale
     */
    this.changeLocale(this.$i18n.locale);
  },
  methods: {
    changeLocale(code) {
      this.$store.dispatch(`${this.resource}/changeLocale`, code);
    },
  },
};
</script>
