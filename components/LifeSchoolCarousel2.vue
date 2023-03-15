<template>
  <div id="carousel">
    <span class="icon-arrow-down" style="transform: rotate(90deg)" @click="scroll($event, false)"></span>
    <div
      ref="slider"
      id="slider"
      @wheel="scroll"
    >
      <div class="article" v-for="(preview, index) in previews" :key="index">
        <div class="article-number">{{ preview.number }}</div>
        <div class="article-description">
          <h6>{{ preview.title }}</h6>
          <div class="article-details">
            <div>
              <span class="icon-circle-clock"></span>
              <span>{{ preview.reading_time }} min</span>
            </div>
            <div>
              <span class="icon-lock"></span>
              <span>{{ preview.created_at }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span ref="arrowRight" class="icon-arrow-down" style="transform: rotate(-90deg)" @click="scroll($event, true)"></span>
  </div>
</template>

<script>
export default {
  name: 'LifeSchoolCarousel',
  props: ['previews', 'index'],
  data () {
    return {
      pos: {
        startX: 0,
        scrollLeft: 0,
        scrolledTo: null
      },
      isDown: false,
      counter: 0,
      currentPage: null
    }
  },
  updated () {
    this.hideArrowRight()
    if (this.index && this.index > this.counter) {
      this.scroll(this.$refs.slider, true)
    }
  },
  methods: {
    scroll (e, key) {
      if (
        (this.counter >= this.previews.length - 1 && (key || e.deltaY > 0)) ||
        (this.counter <= 0 && !key)
        // (this.$refs.slider.style.pointerEvents !== 'none' ||
        // this.$refs.slider.style.userSelect !== 'none')
      ) {
        return 0
      }
      if (e.deltaY > 0 || key) {
        this.$refs.slider.scrollLeft += this.$refs.slider.getBoundingClientRect().width
        this.counter += 1
      } else {
        this.$refs.slider.scrollLeft -= this.$refs.slider.getBoundingClientRect().width
        this.counter -= 1
      }
      this.hideArrowRight()
      this.$emit('change', this.counter)
    },
    hideArrowRight () {
      if (this.counter === this.previews.length - 1) {
        this.$refs.arrowRight.style.display = 'none'
      } else {
        this.$refs.arrowRight.style.display = 'initial'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

::-webkit-scrollbar,
*::-webkit-scrollbar {
  display: none;
}

body {
  background-color: $color-white-1;
}

#carousel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  white-space: nowrap;
  transform: scale(1.1);
  user-select: none;
  cursor: pointer;
  gap: 30px;
}

#slider {
  width: 400px;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  display: flex;
  flex-wrap: nowrap;
  -webkit-overflow-scrolling: touch;
  will-change: transform;
  scrollbar-width: none;
  scroll-behavior: smooth;
  user-select: none;
  pointer-events: none;
}

.icon-arrow-down {
  font-size: 32px;
  color: black;
}

.article {
  flex: 0 0 auto;
  display: inline-block;
  background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,239,239,1) 70%, rgba(255,239,239,1) 100%);;
  width: 400px;
  height: 70px;
  position: relative;
  border: 2px solid #FFD3D3;
  padding: 0;
  scroll-snap-align: center;
}

.article-number {
  font-size: 50px;
  margin: 0;
  padding: 0;
  font-family: Alata;
  color: #FFEFEF;
}

.article-description {
  position: absolute;
  top: 0px;
  left: 70px;
  color: #FFBCBC;
}

.article-details {
  display: flex;
  gap: 10px;
}

.article-details > div {
  display: flex;
  align-items: center;
  gap: 3px;
}

@media only screen and (max-width: 1000px) {
  .article-number {
    text-align: left;
  }
}

</style>
