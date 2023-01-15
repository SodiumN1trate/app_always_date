<template>
  <div class="date-box">
    <label class="date" :class="{ 'date-focus-pink': isDateFocus && checkColorPink(color), 'date-focus-grey': isDateFocus && checkColorGrey(color), 'input-date-color-pink': checkColorPink(color), 'input-date-color-grey': checkColorGrey(color) }">
      <input
        v-model="content"
        class="date-select"
        :class="{ 'date-select-color-pink': checkColorPink(color), 'date-select-color-grey': checkColorGrey(color) }"
        type="date"
        required
        @input="$emit('input', content)"
        @click="isDateFocus = !isDateFocus"
        @click.stop="changeDateBorder"
      >
<!--      <img class="input-date-calendar-svg" src="../static/svg/date.svg" alt="Date">-->
    </label>
  </div>
</template>

<script>
export default {
  name: 'SelectDate',
  props: ['date', 'color'],
  data () {
    return {
      content: this.date,
      isDateFocus: false
    }
  },
  beforeMount () {
    this.content = this.date
    console.log(this.content)
  },
  methods: {
    changeDateBorder () {
      this.isDateFocus && this.$nextTick(() => {
        document.addEventListener('click', this.hide)
      })
    },
    hide () {
      this.isDateFocus = false
      document.removeEventListener('click', this.hide)
    },
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

.date-box {
  width: 50%;
}

.input-date-color-pink {
  border: solid 1px $color-pink-3;
}

.input-date-color-grey {
  border: solid 1px $color-grey-4;
}

.date {
  border-radius: 8px;
  width: 195px;
  height: 40px;
  padding: 2px;
  margin-bottom: 0rem;
}

.date-select-color-pink {
  color: $color-pink-3;
}

.date-select-color-grey {
  color: $color-black-2;
  filter: saturate(0%);
}

.date-select {
  border: 0px none transparent;
  font-size: 20px;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  outline: 0;
  position: relative;
  width: 100%;
  padding-left: 6px;
  background: url("static/svg/date.svg") no-repeat 160px 7px;
}

.date-select[type="date"]::-webkit-calendar-picker-indicator {
  background: transparent;
  bottom: 0;
  color: transparent;
  cursor: pointer;
  height: auto;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: auto;
}

.date-select:focus {
  outline: none;
}

.input-date-calendar-svg {
  margin-bottom: 6px;
  margin-right: 5px;
}

.date-focus-pink {
  outline: solid 1px $color-pink-3;
}

.date-focus-grey {
  outline: solid 1px $color-grey-4;
}

</style>
