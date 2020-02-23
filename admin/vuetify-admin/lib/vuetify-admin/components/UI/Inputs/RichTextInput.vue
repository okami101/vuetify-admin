<template>
  <va-input v-bind="$props">
    <tiptap-vuetify v-model="input" :extensions="extensions" />
  </va-input>
</template>

<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from "tiptap-vuetify";
import Input from "vuetify-admin/mixins/input";

export default {
  name: "RichTextInput",
  components: { TiptapVuetify },
  mixins: [Input],
  props: {},
  data() {
    return {
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3]
            }
          }
        ],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak
      ]
    };
  }
};
</script>
