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
    }
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
    }
  },
  methods: {
    getFileProp(file, prop) {
      return get(file, prop);
    }
  }
};
