<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn v-if="translatable" :icon="icon" text :color="color" v-on="on">
        <v-icon small>mdi-translate</v-icon>
        <span v-if="!icon" class="ml-2">
          {{ $t("va.actions.locale") }} :
          {{
            $admin.locales.translations[
              $store.state[resource].locale || $i18n.locale
            ]
          }}
        </span>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(label, code) in $admin.locales.translations"
        :key="code"
        @click="$store.dispatch(`${resource}/changeLocale`, code)"
      >
        <v-list-item-title>{{ label }}</v-list-item-title>
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
    }
  }
};
</script>
