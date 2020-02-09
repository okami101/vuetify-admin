<template>
  <h1 class="display-1">{{ getTitle }}</h1>
</template>

<script>
export default {
  name: "Title",
  props: {
    title: [String, Function]
  },
  data() {
    return {
      resource: this.$route.meta.model
    };
  },
  computed: {
    getTitle() {
      return this.resource ? this.title(this.resource) : this.title;
    }
  },
  created() {
    this.$route.meta.title = this.getTitle;
    document.title = this.getTitle;
  }
};
</script>
