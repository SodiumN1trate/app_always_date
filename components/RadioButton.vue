<template>
  <div class="input-field" @click="selected = !selected" ref="select">
    {{ name }}
  </div>
</template>

<script>
export default {
  props: ['name', 'selectColor'],
  data () {
    return {
      selected: false
    }
  },
  watch: {
    selected (value) {
      if (value) {
        this.$refs.select.style.borderColor = this.selectColor
      } else {
        this.$refs.select.style.borderColor = '#BDBDBDFF'
      }
    }
  },
  methods: {
    select () {
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
  font-family: NotoSans;
  border-radius: 13px;
  width: 100%;
  transition: 0.2s all;
}
</style>
