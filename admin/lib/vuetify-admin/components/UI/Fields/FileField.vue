<template>
  <ul v-if="activeFiles.length">
    <li v-for="(file, i) in activeFiles" :key="i">
      <span class="file-item">
        <v-btn v-if="clearable" icon @click="clear(file.id)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <a
          :href="getFileProp(file, src)"
          :title="getFileProp(file, title)"
          :target="target"
        >
          {{ getFileProp(file, fileName) }}
        </a>
      </span>
    </li>
  </ul>
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

.file-item {
  display: flex;
  align-items: center;
}
</style>
