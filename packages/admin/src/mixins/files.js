import Field from "./field";
import get from "lodash/get";

/**
 * Common props for all file upload inputs.
 */
export default {
  inject: {
    formState: { default: undefined },
  },
  mixins: [Field],
  props: {
    /**
     * Source property of file object, link through original file.
     */
    src: {
      type: String,
      default: "url",
    },
    /**
     * Title attribute of file object, used for title and alt attributes.
     */
    title: {
      type: String,
      default: "name",
    },
    /**
     * Filename property of file object, shown as anchor text for files.
     */
    fileName: {
      type: String,
      default: "file_name",
    },
    /**
     * Target value for anchor, default to external.
     */
    target: {
      type: String,
      default: "_blank",
    },
    /**
     * Mainly use for VaFileInput, allow files or image to be removed.
     */
    clearable: Boolean,
    /**
     * Name of property sent to API which contains ids of file to delete.
     */
    model: {
      type: String,
      default() {
        return `${this.source}_delete`;
      },
    },
    /**
     * Attribute where taking the id value for identify files to delete.
     */
    itemValue: {
      type: String,
      default: "id",
    },
  },
  data() {
    return {
      deleted: [],
    };
  },
  computed: {
    isMultiple() {
      return this.value instanceof Array;
    },
    isObject() {
      return this.value instanceof Object;
    },
    activeFiles() {
      /**
       * Only used on edit form
       */
      if (!this.value || (this.formState && !this.formState.edit)) {
        return [];
      }

      let value = this.isMultiple ? this.value : [this.value];
      return value.filter((f) => -1 === this.deleted.indexOf(f.id));
    },
  },
  methods: {
    getFileProp(file, prop) {
      return get(file, prop);
    },
    clear(id) {
      this.deleted = [...(this.deleted || []), id];

      if (this.formState) {
        this.formState.update({
          source: this.model || this.source,
          value: this.isMultiple ? this.deleted : this.deleted[0],
        });
      }
    },
  },
};
