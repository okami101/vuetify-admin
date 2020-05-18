<template>
  <v-row v-if="activeFiles.length">
    <v-col
      v-for="(file, i) in activeFiles"
      :key="i"
      class="d-flex child-flex"
      :lg="lg"
    >
      <v-hover v-slot:default="{ hover }" :disabled="!clearable">
        <v-card flat tile class="d-flex" :class="{ 'on-hover': hover }">
          <v-img
            :src="getFileProp(file, src)"
            :alt="title"
            :title="title"
            :contain="contain"
            :height="height"
          >
            <v-card-title class="title white--text">
              <v-row class="fill-height flex-column" justify="space-between">
                <div class="align-self-end">
                  <v-btn
                    :class="{ 'show-btns': hover }"
                    icon
                    color="transparent"
                    @click="clear(file.id)"
                  >
                    <v-icon :class="{ 'show-btns': hover }" color="transparent"
                      >mdi-close</v-icon
                    >
                  </v-btn>
                </div>
              </v-row>
            </v-card-title>
          </v-img>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
import Files from "../../../mixins/files";

export default {
  mixins: [Files],
  props: {
    contain: Boolean,
    height: String,
    lg: [String, Number],
  },
};
</script>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card.on-hover {
  opacity: 0.4;
}

.show-btns {
  color: rgba(0, 0, 0, 1) !important;
}
</style>
