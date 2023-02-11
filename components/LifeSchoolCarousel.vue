<template>
  <div id="carousel">
    <div
      ref="slider"
      id="slider"
      @wheel="mouseScroll"
      @mousedown="mouseDown"
      @mouseup="mouseUp"
      @mouseleave="mouseUp"
      @mousemove="mouseMove"
      @scroll="onScroll"
    >
      <div class="article">
        <div class="article-number">27</div>
        <div class="article-description">
          <h5>Dzīves dilēmas</h5>
          <div class="article-details">
            <div>
              <span class="icon-circle-clock"></span>
              <span>6 min</span>
            </div>
            <div>
              <span class="icon-star"></span>
              <span>417</span>
            </div>
            <div>
              <span class="icon-lock"></span>
              <span>25.05.2022 21:54</span>
            </div>
          </div>
        </div>
      </div>
      <div class="article">
        <div class="article-number">27</div>
        <div class="article-description">
          <h5>Dzīves dilēmas</h5>
          <div class="article-details">
            <div>
              <span class="icon-circle-clock"></span>
              <span>6 min</span>
            </div>
            <div>
              <span class="icon-star"></span>
              <span>417</span>
            </div>
            <div>
              <span class="icon-lock"></span>
              <span>25.05.2022 21:54</span>
            </div>
          </div>
        </div>
      </div>
      <div class="article">
        <div class="article-number">27</div>
        <div class="article-description">
          <h5>Dzīves dilēmas</h5>
          <div class="article-details">
            <div>
              <span class="icon-circle-clock"></span>
              <span>6 min</span>
            </div>
            <div>
              <span class="icon-star"></span>
              <span>417</span>
            </div>
            <div>
              <span class="icon-lock"></span>
              <span>25.05.2022 21:54</span>
            </div>
          </div>
        </div>
      </div>
      <div class="article">
      <div class="article-number">27</div>
      <div class="article-description">
        <h5>Dzīves dilēmas</h5>
        <div class="article-details">
          <div>
            <span class="icon-circle-clock"></span>
            <span>6 min</span>
          </div>
          <div>
            <span class="icon-star"></span>
            <span>417</span>
          </div>
          <div>
            <span class="icon-lock"></span>
            <span>25.05.2022 21:54</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LifeSchoolCarousel',
  data () {
    return {
      pos: {
        startX: 0,
        scrollLeft: 0,
        scrolledTo: null
      },
      isDown: false,
      counter: 0
    }
  },
  methods: {
    mouseScroll (e) {
      if (e.deltaY > 0) {
        this.$refs.slider.scrollLeft += 300
        this.counter += 1
      } else {
        this.$refs.slider.scrollLeft -= 300
        this.counter -= 1
      }
    },
    count (e) {
      const pos = this.$refs.slider.scrollTop
      this.$refs.slider.children.forEach((element, index) => {
        const relativePos = element.offsetTop - pos + (element.offsetHeight / 2)
        if (relativePos >= 0 && relativePos < element.offsetHeight) {
          return 0
        }
      })
    },
    mouseDown (e) {
      this.isDown = true
      this.pos = {
        startX: e.pageX - this.$refs.slider.offsetLeft,
        scrollLeft: this.$refs.slider.scrollLeft
      }
      this.$refs.slider.style.scrollSnapType = 'none'
      this.$refs.slider.style.scrollBehavior = 'auto'
      this.$refs.slider.style.cursor = 'grabbing'
    },
    mouseUp () {
      this.isDown = false
      this.$refs.slider.style.scrollSnapType = 'x mandatory'
      this.$refs.slider.style.scrollBehavior = 'smooth'
      this.$refs.slider.style.cursor = 'auto'
      if (this.scrolledTo) {
        this.counter -= 1
      } else {
        this.counter += 1
      }
    },
    mouseMove (e) {
      if (!this.isDown) { return 0 }
      e.preventDefault()
      const x = e.pageX - this.$refs.slider.offsetLeft
      const walk = x - this.pos.startX
      const temp = this.$refs.slider.scrollLeft
      this.$refs.slider.scrollLeft = this.pos.scrollLeft - walk
      if (temp > this.$refs.slider.scrollLeft) {
        this.scrolledTo = true
      } else {
        this.scrolledTo = false
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
  width: 94%;
  margin-left: auto;
  margin-right: auto;
  white-space: nowrap;
  transform: scale(1.1);
  user-select: none;
  cursor: pointer;
}

#slider {
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  display: flex;
  flex-wrap: nowrap;
  -webkit-overflow-scrolling: touch;
  will-change: transform;
  scrollbar-width: none;
  scroll-behavior: smooth;
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
