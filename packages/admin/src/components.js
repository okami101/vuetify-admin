import Vue from "vue";
import Vuetify from "vuetify";

/**
 * Vuetify
 */
import {
  VApp,
  VContent,
  VSpacer,
  VContainer,
  VInput,
  VDataIterator,
  VToolbar,
  VToolbarTitle,
  VMenu,
  VBtn,
  VIcon,
  VList,
  VListGroup,
  VListItem,
  VListItemIcon,
  VListItemTitle,
  VListItemSubtitle,
  VListItemContent,
  VListItemAction,
  VDivider,
  VRow,
  VCol,
  VNavigationDrawer,
  VBreadcrumbs,
  VFooter,
  VAppBar,
  VAppBarNavIcon,
  VSnackbar,
  VSubheader,
  VDialog,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VTooltip,
  VChip,
  VHover,
  VRating,
  VSwitch,
  VTextField,
  VTextarea,
  VDatePicker,
  VRadio,
  VRadioGroup,
  VFileInput,
  VSelect,
  VForm,
  VDataTable,
  VDataFooter,
  VAutocomplete,
  VCombobox,
  VImg,
} from "vuetify/lib";

/**
 * External libs
 */
import PortalVue from "portal-vue";
import draggable from "vuedraggable";

/**
 * Register portal and draggable
 */
Vue.use(PortalVue);
Vue.component("draggable", draggable);

/**
 * Register vuetify components
 */
Vue.use(Vuetify, {
  components: {
    VApp,
    VContent,
    VSpacer,
    VContainer,
    VInput,
    VDataIterator,
    VToolbar,
    VToolbarTitle,
    VMenu,
    VBtn,
    VIcon,
    VList,
    VListGroup,
    VListItem,
    VListItemIcon,
    VListItemTitle,
    VListItemSubtitle,
    VListItemContent,
    VListItemAction,
    VDivider,
    VRow,
    VCol,
    VNavigationDrawer,
    VBreadcrumbs,
    VFooter,
    VAppBar,
    VAppBarNavIcon,
    VSnackbar,
    VSubheader,
    VDialog,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VTooltip,
    VChip,
    VHover,
    VRating,
    VSwitch,
    VTextField,
    VTextarea,
    VDatePicker,
    VRadio,
    VRadioGroup,
    VFileInput,
    VSelect,
    VForm,
    VDataTable,
    VDataFooter,
    VAutocomplete,
    VCombobox,
    VImg,
  },
});
