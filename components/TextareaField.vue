<template>
  <textarea :class="{ 'textarea-color-pink': checkColorPink(color), 'textarea-color-grey': checkColorGrey(color)}" :placeholder="placeholder" />
</template>

<script>
export default {
  name: 'TextareaField',
  props: ['placeholder', 'color'],
  methods: {
    checkColorPink (color) {
      return color === 'pink'
    },
    checkColorGrey (color) {
      return color === 'grey'
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

.textarea-color-pink {
  border: solid 1px $color-pink-3;
  color: $color-pink-3;
  background-color: $color-white-1;
}

.textarea-color-grey {
  border: solid 1px $color-grey-4;
  color: $color-black-2;
  background-color: $color-white-2;
}

textarea {
  border-radius: 8px;
  padding: 2%;
  margin-left: 4%;
  height: 200px;
  resize: none;
  font-size: 20px;
  width: 92.5%;
  outline: none;
  line-height: 1.1 !important;
}
</style>
