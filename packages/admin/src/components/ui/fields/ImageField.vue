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
                    @click="clear(file[itemValue])"
                  >
                    <v-icon :class="{ 'show-btns': hover }">mdi-close</v-icon>
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

/**
 * Show list of images as gallery with preview support for thumbnails.
 */
export default {
  mixins: [Files],
  props: {
    /**
     * Constraint image to full width instead of cover.
     * Ideal for logos.
     */
    contain: Boolean,
    /**
     * Max height of image.
     */
    height: String,
    /**
     * Max column width for image gallery.
     */
    lg: [String, Number],
  },
};
</script>

<style scoped>
/deep/ .v-card .v-image__image {
  transition: opacity 0.4s ease-in-out;
}

/deep/ .v-card.on-hover .v-image__image {
  opacity: 0.2;
}

.show-btns {
  color: rgba(0, 0, 0, 1) !important;
}
</style>
