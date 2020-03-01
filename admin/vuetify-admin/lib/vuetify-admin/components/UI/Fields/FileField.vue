<template>
  <div v-if="hasFiles">
    <ul v-if="isMultiple">
      <li
        v-for="(file, i) in limit ? activeFiles.slice(0, limit) : activeFiles"
        :key="i"
      >
        <span class="file-item">
          <v-btn v-if="clearable" icon @click="clear(file.id)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
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
        </span>
      </li>
    </ul>
    <span v-else-if="isObject" class="file-item">
      <v-btn v-if="clearable" icon @click="clear(value.id)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <component
        :href="getFileProp(value, src || 'src')"
        :title="getFileProp(value, title || 'title') || title"
        :target="target"
        :is="getFileTag"
      >
        <slot
          :file="value"
          :title="getFileProp(value, title || 'title') || title"
        >
          {{ title || getFileProp(value, title || "title") }}
        </slot>
      </component>
    </span>
    <span v-else class="file-item">
      <v-btn v-if="clearable" icon @click="clear(value.id)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <component :href="value" :title="title" :target="target" :is="getFileTag">
        <slot :file="value" :title="title">
          {{ title || getFileProp(value, title || "title") }}
        </slot>
      </component>
    </span>
  </div>
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
