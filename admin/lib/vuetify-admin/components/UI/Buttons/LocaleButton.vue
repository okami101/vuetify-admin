<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn v-if="translatable" :icon="icon" text :color="color" v-on="on">
        <v-icon small>mdi-translate</v-icon>
        <span v-if="!icon" class="ml-2">
          {{ $t("va.actions.locale") }} :
          {{ $admin.locales.translations[locale] }}
        </span>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(locale, code) in $admin.locales.translations"
        :key="code"
        @click="$emit('change', code)"
      >
        <v-list-item-title>{{ locale }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import Resource from "vuetify-admin/mixins/resource";

export default {
  name: "LocaleButton",
  mixins: [Resource],
  props: {
    icon: Boolean,
    label: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "primary"
    },
    locale: {
      type: String,
      default() {
        return this.$i18n.locale;
      }
    }
  }
};
</script>
