import Button from "./button";

/**
 * For buttons that support redirect.
 * Button will autohide if no create action available unless `disableRedirect` prop is active.
 * @displayName MixinRedirectButton
 */
export default {
  mixins: [Button],
  props: {
    /**
     * Disable default redirect behavior for compatible buttons
     * Force button to be shown, prevent hiding it according to default behavior if no action exist.
     */
    disableRedirect: Boolean,
  },
  methods: {
    canShow(action) {
      return this.disableRedirect || this.hasAction(action);
    },
    getRoute(action, params) {
      if (!this.disableRedirect && this.hasAction(action)) {
        return {
          name: `${this.resource}_${action}`,
          ...params,
        };
      }
      return null;
    },
  },
};
