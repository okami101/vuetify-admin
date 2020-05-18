<template>
  <v-footer>
    <v-container fluid>
      <v-row align="center" no-gutters>
        <v-col
          v-for="(item, i) in menu"
          :key="i"
          class="text-center mb-sm-0 mb-5"
          cols="auto"
        >
          <a
            :href="item.href"
            :to="item.link"
            class="px-3 grey--text text--darken-3"
            :target="item.href ? '_blank' : '_self'"
            v-text="item.text"
          />
        </v-col>

        <v-spacer class="hidden-sm-and-down" />

        <v-col cols="12" md="auto">
          <div class="font-weight-light pt-6 pt-md-0 text-center">
            <!-- @slot Default slot for short right side informations. -->
            <slot></slot>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
/**
 * Default customizable admin VFooter with possibility of corporate related links and infos.
 * @displayName VaFooter
 */
export default {
  props: {
    /**
     * Corporate related links.
     */
    menu: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
a {
  font-size: 0.825rem;
  font-weight: 500;
  text-decoration: none;
  text-transform: uppercase;
}
</style>
