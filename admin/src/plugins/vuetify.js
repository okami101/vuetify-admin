import Vue from "vue";
import Vuetify from "vuetify/lib";
import fr from "vuetify/es5/locale/fr";
import "@/sass/overrides.sass";

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
        primary: "#4CAF50",
        secondary: "#9C27b0",
        accent: "#9C27b0",
        info: "#00CAE3",
      },
    },
  },
});

export default vuetify;
