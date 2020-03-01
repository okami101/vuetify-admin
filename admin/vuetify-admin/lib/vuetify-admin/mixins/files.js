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
      deleted: null
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
    hasFiles() {
      if (!this.value) {
        return false;
      }
      return this.isMultiple
        ? this.deleted.length === this.value.length
        : this.deleted !== this.value.id;
    },
    activeFiles() {
      this.value
        .map(f => f.id)
        .filter(value => -1 !== this.deleted.indexOf(value));
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
      if (this.isMultiple) {
        this.deleted = [...(this.deleted || []), id];
      } else {
        this.deleted = id;
      }

      this.updateForm({
        source: this.model || this.source,
        value: this.deleted
      });
    }
  }
};
