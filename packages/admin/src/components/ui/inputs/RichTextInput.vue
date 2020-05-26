<template>
  <va-input v-bind="$props" class="va-rich-text-input">
    <editor
      :api-key="apiKey"
      :init="init"
      :value="input"
      @change="change"
      @input="update"
    ></editor>
  </va-input>
</template>

<script>
import Input from "../../../mixins/input";
import Editor from "@tinymce/tinymce-vue";

/**
 * Full Wysiwyg HTML editor by using TinyMCE 5.
 * Can be bridged to any file browser as elFinder if you use PHP on the backend.
 * @displayName RichTextInput
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
      default: () => [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table paste code help wordcount",
      ],
    },
    /**
     * Toolbar config, see TinyMCE docs.
     */
    toolbar: {
      type: String,
      default:
        "undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | image media | removeformat | help",
    },
  },
  data() {
    return {
      apiKey: process.env.VUE_APP_TINYMCE_API_KEY,
      language: process.env.VUE_APP_TINYMCE_LANGUAGE,
    };
  },
  computed: {
    init() {
      let init = {
        language: this.language,
        height: this.height,
        menubar: this.menubar,
        plugins: this.plugins,
        toolbar: this.toolbar,
        inline: this.inline,
      };

      let url = this.$admin.options.fileBrowserUrl;

      if (url) {
        init.file_picker_callback = (callback, value, meta) => {
          tinymce.activeEditor.windowManager.openUrl({
            title: this.$t("va.file_manager"),
            url,
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
