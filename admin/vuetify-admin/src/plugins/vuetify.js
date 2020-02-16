import Vue from "vue";
import Vuetify from "vuetify/lib";
import fr from "vuetify/es5/locale/fr";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { fr },
    current: process.env.VUE_APP_I18N_LOCALE
  },
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#4CB050",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      }
    }
  }
});
