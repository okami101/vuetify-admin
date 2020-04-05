<template>
  <va-input v-bind="$props" class="va-rich-text-input">
    <editor
      :api-key="apiKey"
      :init="{
        language,
        height,
        menubar,
        plugins,
        toolbar,
        inline,
        file_picker_callback: elFinderBrowser,
      }"
      :value="input"
      @change="change"
      @input="update"
    ></editor>
  </va-input>
</template>

<script>
import Input from "@/mixins/input";
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "RichTextInput",
  components: { Editor },
  mixins: [Input],
  props: {
    language: {
      type: String,
      default: process.env.VUE_APP_TINYMCE_LANGUAGE,
    },
    height: {
      type: Number,
      default: 500,
    },
    menubar: Boolean,
    inline: Boolean,
    plugins: {
      type: Array,
      default: () => [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table paste code help wordcount",
      ],
    },
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
    };
  },
  methods: {
    elFinderBrowser(callback, value, meta) {
      tinymce.activeEditor.windowManager.openUrl({
        title: "File Manager",
        url: "/elfinder/tinymce5",
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
