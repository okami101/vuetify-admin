<template>
  <va-input v-bind="$props" class="va-rich-text-input">
    <editor
      :init="getInit"
      :value="input"
      @change="change"
      @input="update"
    ></editor>
  </va-input>
</template>

<script>
import Input from "../../../mixins/input";
import Editor from "@tinymce/tinymce-vue";
import get from "lodash/get";

/**
 * Full Wysiwyg HTML editor by using TinyMCE 5.
 * Can be bridged to any file browser as elFinder if you use PHP on the backend.
 */
export default {
  components: { Editor },
  mixins: [Input],
  props: {
    /**
     * HTML text to be edited.
     * @model
     */
    value: {
      type: String,
      default: null,
    },
    /**
     * Initial height of editor.
     */
    height: {
      type: Number,
      default: 500,
    },
    /**
     * Activate wysiwyg menu bar.
     */
    menubar: Boolean,
    /**
     * Activate inline mode of wysiwyg.
     */
    inline: Boolean,
    /**
     * Full available plugins for editing, see TinyMCE docs.
     */
    plugins: {
      type: Array,
      default() {
        return (
          get(this.$admin.options, "tinyMCE.plugins") || [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media paste code help wordcount",
          ]
        );
      },
    },
    /**
     * Toolbar config, see TinyMCE docs.
     */
    toolbar: {
      type: String,
      default() {
        return (
          get(this.$admin.options, "tinyMCE.toolbar") ||
          "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | image media | removeformat | help"
        );
      },
    },
    /**
     * The full TinyMCE object, check official docs.
     */
    init: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    getInit() {
      let options = get(this.$admin.options, "tinyMCE") || {};

      let init = this.init || {
        language: options.language,
        height: this.height,
        menubar: this.menubar,
        plugins: this.plugins,
        toolbar: this.toolbar,
        inline: this.inline,
      };

      /**
       * Image upload.
       */
      let imageUploadUrl = options.imageUploadUrl;

      if (imageUploadUrl) {
        /**
         * Use existing http instance if present, allows better authentication and CSRF integration.
         */
        init = this.$admin.http
          ? {
              ...init,
              paste_data_images: true,
              images_upload_handler: async (blobInfo, success, failure) => {
                try {
                  let formData = new FormData();
                  formData.append("file", blobInfo.blob(), blobInfo.filename());
                  let { data } = await this.$admin.http.post(
                    imageUploadUrl,
                    formData
                  );

                  success(data.location);
                } catch (e) {
                  failure("HTTP Error: " + e.status);
                }
              },
            }
          : {
              ...init,
              images_upload_url: imageUploadUrl,
              images_upload_credentials: true,
              paste_data_images: true,
            };
      }

      /**
       * File browser config.
       */
      if (options.fileBrowserUrl) {
        init.file_picker_callback = (callback, value, meta) => {
          window.tinymce.activeEditor.windowManager.openUrl({
            title: this.$t("va.file_manager"),
            url: options.fileBrowserUrl,
            /**
             * On message will be triggered by the child window
             *
             * @param dialogApi
             * @param details
             * @see https://www.tiny.cloud/docs/ui-components/urldialog/#configurationoptions
             */
            onMessage: function (dialogApi, details) {
              if (details.mceAction === "fileSelected") {
                const file = details.data.file;

                // Make file info
                const info = file.name;

                // Provide file and text for the link dialog
                if (meta.filetype === "file") {
                  callback(file.url, { text: info, title: info });
                }

                // Provide image and alt text for the image dialog
                if (meta.filetype === "image") {
                  callback(file.url, { alt: info });
                }

                // Provide alternative source and posted for the media dialog
                if (meta.filetype === "media") {
                  callback(file.url);
                }

                dialogApi.close();
              }
            },
          });
        };
      }

      return init;
    },
  },
};
</script>

<style>
.va-rich-text-input .v-input__slot {
  display: block;
}
.va-rich-text-input .v-label {
  display: inline-block;
  margin-bottom: 0.5rem;
}
</style>
