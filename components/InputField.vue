<template>
  <input
    v-model="text"
    class="input-field"
    :type="type"
    :placeholder="placeholder"
    :pattern="pattern"
    @input="$emit('input', text)"
    required
  >
</template>

<script>
export default {
  name: 'InputField',
  props: ['type', 'placeholder', 'pattern'],
  data () {
    return {
      text: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

.input-field {
  border: solid 2px $color-grey-4;
  color: $color-black-2;
  background-color: $color-white-2;
  font-size: 16px;
  font-family: NotoSans;
  border-radius: 8px;
  padding: 15px;
  width: 100%;
}

.input-field::placeholder {
  color: $color-grey-4;
}

.input-field:focus {
  outline: unset;
  border: solid 2px $color-grey-5;
}

.input-field::placeholder {
  font-size: 16px;
}
</style>
