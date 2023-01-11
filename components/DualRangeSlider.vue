<template>
  <div>
    <h6>{{ title }}</h6>
    <div id="slide-info">
      <p>{{ this.from }}</p>
      <p>{{ this.to }}</p>
    </div>
    <div class="slider">
      <input
        type="range"
        id="from"
        v-model="from"
        :min="this.min"
        :max="this.max"
        @input="onChange"
      >
      <input
        type="range"
        id="to"
        v-model="to"
        ref="slider"
        :min="this.min"
        :max="this.max"
        @input="onChange"
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'DualRangeSlider',
  props: ['min', 'max', 'title'],
  data () {
    return {
      from: this.min,
      to: this.max
    }
  },
  mounted () {
    this.onChange()
  },
  methods: {
    onChange (event) {
      this.to = parseInt(this.to)
      this.from = parseInt(this.from)
      if (!event?.target) {
        this.fill()
        return 0
      }
      if (event.target.id === 'from' && this.from >= this.to - 1) {
        this.from = this.to - 1
      }
      if (event.target.id === 'to' && this.from + 1 >= this.to) {
        this.to = this.from + 1
      }

      this.fill()
      this.$emit('input', { min: this.from, max: this.to })
    },
    fill () {
      const rangeDistance = this.max - this.min
      const fromPosition = this.from - this.min
      const toPosition = this.to - this.min
      this.$refs.slider.style.background = `linear-gradient(to right,
        #F3F3F3 0%,
        #F3F3F3 ${(fromPosition) / (rangeDistance) * 100}%,
        #FFD1D1  ${((fromPosition) / (rangeDistance)) * 100}%,
        #FFD1D1  ${(toPosition) / (rangeDistance) * 100}%,
        #F3F3F3  ${(toPosition) / (rangeDistance) * 100}%,
        #F3F3F3 100%)`
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

h6 {
  margin: 0;
  padding: 0;
  font-family: NotoSans;
}

.slider {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
}

input[type=range] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  position: absolute;
  background-color: #C6C6C6;
  pointer-events: none;
}

input[type=range]:first-child {
  height: 0;
  z-index: 1;
  margin-top: 3px;
}

input[type=range]:last-child {
  height: 6px;
  background-color: #F3F3F3;
  border-radius: 10px;
}

input[type=range]::-moz-range-thumb {
  -moz-appearance: none;
  pointer-events: all;
  width: 10px;
  height: 10px;
  background-color: #FFD1D1;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 10px;
  height: 10px;
  background-color: #FFD1D1;
  border-radius: 50%;
  cursor: pointer;
}

#slide-info {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

#slide-info > p {
  margin: 0;
  padding: 0;
}
</style>
