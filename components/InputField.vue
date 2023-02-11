<template>
  <input
    v-model="text"
    class="input-field"
    :type="type"
    :placeholder="placeholder"
    @input="$emit('input', text)"
    required
  >
</template>

<script>
export default {
  name: 'InputField',
  props: ['type', 'placeholder'],
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
  border: solid 1px $color-grey-4;
  color: $color-black-2;
  background-color: $color-white-2;
}

.input-field::placeholder {
  color: $color-grey-4;
}

.input-field:focus {
  outline: solid 1px $color-grey-4;
}

.input-field {
  font-family: NotoSans;
  border-radius: 8px;
  height: 40px;
  padding: 15px;
  width: 100%;
}

.input-field::placeholder {
  font-size: 20px;
}
</style>
