<template>
  <div class="container">
    <tiptap-vuetify
      :value="value"
      :extensions="extensions"
      placeholder="Rakstīt šeit..."
      @input="input($event)"
    />
  </div>
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
} from 'tiptap-vuetify'
export default {
  components: { TiptapVuetify },
  props: ['value'],
  data: () => ({
    // declare extensions you want to use
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
      Link,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak
    ],
    // starting editor's content
    content: null
  }),
  methods: {
    input (event) {
      this.content = event
      this.$emit('input', this.content)
    }
  }
}
</script>

<style>
.tiptap-vuetify-editor__content {
  margin: 0;
  padding: 0;
  min-height: 400px;
  max-height: 400px;
  width: 100%;
}
</style>
