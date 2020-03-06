import { mapMutations } from "vuex";
import get from "lodash/get";

export default {
  props: {
    src: String,
    title: String,
    target: {
      type: String,
      default: "_blank"
    },
    limit: Number,
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
    getFileTag() {
      return this.link ? "a" : "span";
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
    ...mapMutations({
      updateForm: "form/update"
    }),
    getFileProp(file, prop) {
      return get(file, prop);
    },
    clear(id) {
      this.deleted = [...(this.deleted || []), id];

      this.updateForm({
        source: this.model || this.source,
        value: this.isMultiple ? this.deleted : this.deleted[0]
      });
    }
  }
};
