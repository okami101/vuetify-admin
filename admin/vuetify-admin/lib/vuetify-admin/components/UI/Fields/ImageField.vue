<template>
  <va-file-field v-bind="$props" v-slot="{ file, title }">
    <img
      :src="getFileProp(file, preview || src) || file"
      :alt="title"
      :title="title"
    />
  </va-file-field>
</template>

<script>
import Field from "vuetify-admin/mixins/field";
import Files from "vuetify-admin/mixins/files";

export default {
  name: "ImageField",
  mixins: [Field, Files],
  props: {
    preview: String
  }
};
</script>

<style lang="scss" scoped>
::v-deep li {
  display: inline-flex;
}
</style>
