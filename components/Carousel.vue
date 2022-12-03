<template>
  <div class="container">
    <i class="icon-arrow-down left-arrow-button" @click="previous" />
    <div ref="carousel" class="carousel" @mousedown="mouseDownOnScroller" @touchstart="touchDownOnScroller">
      <div
        v-for="card in cards"
        :key="card.id"
        :ref="`card-${card.id}`"
        class="interest-card carousel-child"
      >
        <img :src="`../images/${card.photo}`">
        <p>{{ card.text }}</p>
      </div>
    </div>
    <i class="icon-arrow-down right-arrow-button" @click="next" />
  </div>
</template>

<script>

export default {
  name: 'CarouselContainer',
  props: {
    cards: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      currentCard: -1,
      offsets: [],
      mousePos: { top: 0, left: 0, x: 0, y: 0 }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.calcOffsetTable()
      this.carouselCycle()
    })
  },

  methods: {
    carouselCycle () {
      setInterval(this.next(), 10000)
    },
    calcOffsetTable () {
      let off = 0
      this.offsets = []
      for (let i = 0; i < this.$props.cards.length; i++) {
        const card = this.$refs[`card-${this.$props.cards[i].id}`][0]
        this.offsets.push(off)
        off += card.offsetWidth
      }
    },
    touchDownOnScroller (e) {
      e.preventDefault()
      this.mouseDownOnScroller(e.touches[0])
    },
    touchMoveHandler (e) {
      e.preventDefault()
      this.mouseMoveHandler(e.touches[0])
    },
    mouseDownOnScroller (client) {
      const el = this.$refs.carousel
      this.mousePos = {
        left: el.scrollLeft,
        top: el.scrollTop,
        x: client.clientX,
        y: client.clientY
      }
      el.style.cursor = 'grabbing'
      document.addEventListener('mousemove', this.mouseMoveHandler)
      document.addEventListener('touchmove', this.touchMoveHandler, { passive: false })
      document.addEventListener('mouseup', this.mouseUpHandler)
      document.addEventListener('touchend', this.mouseUpHandler, { passive: false })
    },
    mouseMoveHandler (client) {
      const dx = client.clientX - this.mousePos.x
      const dy = client.clientY - this.mousePos.y
      const el = this.$refs.carousel
      el.scrollTop = this.mousePos.top - dy
      el.scrollLeft = this.mousePos.left - dx
    },
    mouseUpHandler () {
      document.removeEventListener('mousemove', this.mouseMoveHandler)
      document.removeEventListener('touchmove', this.touchMoveHandler)
      document.removeEventListener('mouseup', this.mouseUpHandler)
      document.removeEventListener('touchend', this.mouseUpHandler)
      const el = this.$refs.carousel
      el.style.cursor = 'grab'
      this.currentCard = Math.round(el.scrollLeft / Math.floor(el.scrollWidth / this.offsets.length))
      this.$refs.carousel.scrollTo({ top: 0, left: this.offsets[this.currentCard], behavior: 'smooth' })
    },
    next () {
      this.to(++this.currentCard)
    },
    previous () {
      this.to(--this.currentCard)
    },
    to (card) {
      if (card >= this.$props.cards.length) {
        card = 0
      } else if (card < 0) {
        card = this.$props.cards.length - 1
      }
      this.$refs.carousel.scrollTo({ top: 0, left: this.offsets[card], behavior: 'smooth' })
      this.currentCard = card
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  width: 100%;
}
.carousel {
  overflow: hidden;
  justify-content: flex-start;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

.carousel-child {
  scroll-snap-align: start;
  user-select: none;
}

.carousel-child > * {
  pointer-events: none;
}

.interest-card {
  flex: 0 0 120px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px
}

.interest-card > p {
  font-size: 14px;
}

.interest-card > img {
  border-radius: 100%;
  width: 100px;
}

.icon-arrow-down {
  font-size: 32px;
  cursor: pointer;
  width: 40px;
  margin: 32px 0px;
}

.left-arrow-button::before {
  transform: rotate(90deg);
}

.right-arrow-button::before {
  transform: rotate(-90deg);
}
</style>
