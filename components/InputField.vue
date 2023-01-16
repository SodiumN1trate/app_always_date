<template>
  <input
    v-model="text"
    class="input-field"
    :class="{ 'input-field-color-pink': checkColorPink(color), 'input-field-color-grey': checkColorGrey(color)}"
    :type="type"
    @input="$emit('input', text)"
    :placeholder="placeholder"
    required
  >
</template>

<script>
export default {
  name: 'InputField',
  props: ['type', 'placeholder', 'color'],
  data () {
    return {
      text: ''
    }
  },
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

.input-field-color-pink {
  border: solid 1px $color-pink-3;
  color: $color-pink-3;
  background-color: $color-white-1;
}

.input-field-color-pink::placeholder {
  color: $color-pink-3;
}

.input-field-color-pink:focus {
  outline: solid 1px $color-pink-3;
}

.input-field-color-grey {
  border: solid 1px $color-grey-4;
  color: $color-black-2;
  background-color: $color-white-2;
}

.input-field-color-grey::placeholder {
  color: $color-grey-4;
}

.input-field-color-grey:focus {
  outline: solid 1px $color-grey-4;
}

.input-field {
  font-family: NotoSans;
  border-radius: 8px;
  height: 40px;
  padding: 15px;
  width: 93%;
}

.input-field::placeholder {
  font-size: 20px;
}
</style>
