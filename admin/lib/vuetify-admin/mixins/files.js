import EventBus from "vuetify-admin/utils/eventBus";
import get from "lodash/get";

export default {
  inject: {
    formName: { default: undefined }
  },
  props: {
    src: {
      type: String,
      default: "url"
    },
    title: {
      type: String,
      default: "name"
    },
    fileName: {
      type: String,
      default: "file_name"
    },
    target: {
      type: String,
      default: "_blank"
    },
    link: {
      type: Boolean,
      default: true
    },
    clearable: Boolean,
    model: {
      type: String,
      default() {
        return `${this.source}_delete`;
      }
    }
  },
  data() {
    return {
      deleted: []
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
      if (!this.value) {
        return [];
      }

      let value = this.isMultiple ? this.value : [this.value];
      return value.filter(f => -1 === this.deleted.indexOf(f.id));
    }
  },
  methods: {
    getFileProp(file, prop) {
      return get(file, prop);
    },
    clear(id) {
      this.deleted = [...(this.deleted || []), id];

      if (this.formName) {
        EventBus.$emit("update-model", {
          name: this.formName,
          source: this.model || this.source,
          value: this.isMultiple ? this.deleted : this.deleted[0]
        });
      }
    }
  }
};
