import Vue from "vue";
import Vuetify from "vuetify/lib";
import en from "vuetify/es5/locale/en";
import fr from "vuetify/es5/locale/fr";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { en, fr },
    current: process.env.VUE_APP_I18N_LOCALE || navigator.language.substr(0, 2),
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#4CAF50",
        secondary: "#9C27b0",
        accent: "#9C27b0",
        info: "#00CAE3",
      },
    },
  },
});
