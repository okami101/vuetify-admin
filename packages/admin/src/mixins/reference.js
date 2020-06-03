import Chip from "./chip";

/**
 * For all field components that support resource reference, as `VaReferenceField` or `VaReferenceArrayField`.
 */
export default {
  mixins: [Chip],
  props: {
    /**
     * Name of resource to link into.
     */
    reference: {
      type: String,
      required: true,
    },
    /**
     * Default CRUD page to link.
     * @values show, edit
     */
    action: {
      type: String,
      validator: (v) => ["show", "edit"].includes(v),
      default: "show",
    },
    /**
     * Property used for stringify inner targeted resource.
     * Use a function for further stringify customization.
     * If nothing set, use the global label property resource by default.
     */
    itemText: [String, Array, Function],
    /**
     * Attribute where taking the id value for link building.
     */
    itemValue: {
      type: String,
      default: "id",
    },
  },
};
