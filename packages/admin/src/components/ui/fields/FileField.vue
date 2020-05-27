<template>
  <ul v-if="activeFiles.length">
    <li v-for="(file, i) in activeFiles" :key="i">
      <span class="file-item">
        <v-btn v-if="clearable" icon @click="clear(file[itemValue])">
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
import Files from "../../../mixins/files";

/**
 * Show a list of file links that point to original files.
 */
export default {
  mixins: [Files],
};
</script>

<style scoped>
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
