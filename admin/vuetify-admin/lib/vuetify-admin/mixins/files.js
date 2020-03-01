import get from "lodash/get";

export default {
  props: {
    src: String,
    title: String,
    target: {
      type: String,
      default: "_blank"
    }
  },
  computed: {
    isMultiple() {
      return this.value instanceof Array;
    },
    isObject() {
      return this.value instanceof Object;
    }
  },
  methods: {
    getFileProp(file, prop) {
      return get(file, prop);
    }
  }
};
