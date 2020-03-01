<template>
  <ul v-if="isMultiple">
    <li v-for="(file, i) in limit ? value.slice(0, limit) : value" :key="i">
      <component
        :href="getFileProp(file, src || 'src')"
        :title="getFileProp(file, title || 'title')"
        :target="target"
        :is="getFileTag"
      >
        <slot :file="file" :title="getFileProp(file, title || 'title')">
          {{ title || getFileProp(value, title || "title") }}
        </slot>
      </component>
    </li>
  </ul>
  <component
    v-else-if="isObject"
    :href="getFileProp(value, src || 'src')"
    :title="getFileProp(value, title || 'title') || title"
    :target="target"
    :is="getFileTag"
  >
    <slot :file="value" :title="getFileProp(value, title || 'title') || title">
      {{ title || getFileProp(value, title || "title") }}
    </slot>
  </component>
  <component
    v-else
    :href="value"
    :title="title"
    :target="target"
    :is="getFileTag"
  >
    <slot :file="value" :title="title">
      {{ title || getFileProp(value, title || "title") }}
    </slot>
  </component>
</template>

<script>
import Field from "vuetify-admin/mixins/field";
import Files from "vuetify-admin/mixins/files";

export default {
  name: "FileField",
  mixins: [Field, Files]
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin-bottom: 1rem;
  margin-right: 1rem;
}
</style>
