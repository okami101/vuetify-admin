import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";
import fr from "vuetify/es5/locale/fr";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  lang: {
    locales: { fr },
    current: process.env.VUE_APP_I18N_LOCALE,
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: colors.blueGrey.darken2,
        secondary: colors.red.lighten4,
        accent: colors.indigo.base,
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
  },
});

export default vuetify;
