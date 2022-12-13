<template>
  <div class="carousel-container">
    <VueSlickCarousel
      class="vue-slick"
      v-bind="settings"
    >
      <div v-for="card in cards" :key="card.id" class="card">
        <img :src="`../images/${card.photo}`">
        <p>{{ card.text }}</p>
      </div>
      <template #prevArrow="arrowOption">
        <div class="prev-arrow"></div>
        {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
      </template>
      <template #nextArrow="arrowOption">
        <span class="next-arrow">
          {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
        </span>
      </template>
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'CarouselComponent',
  components: { VueSlickCarousel },
  props: ['cards'],
  data () {
    return {
      settings: {
        arrows: true,
        dots: true,
        infinite: true,
        swipeToSlide: true,
        slidesToShow: 5,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnDotsHover: true,
        pauseOnFocus: true,
        pauseOnHover: true
      }
    }
  },
  mounted () {
    window.addEventListener('resize', (e) => {
      console.log(e.target.innerWidth)
      if (e.target.innerWidth > 1650) {
        this.settings.slidesToShow = 5
        console.log('a')
      } else if (e.target.innerWidth > 1200) {
        this.settings.slidesToShow = 3
      } else if (e.target.innerWidth > 880) {
        this.settings.slidesToShow = 4
      } else if (e.target.innerWidth > 670) {
        this.settings.slidesToShow = 4
      } else if (e.target.innerWidth > 600) {
        this.settings.slidesToShow = 4
      } else {
        this.settings.slidesToShow = 3
      }
    })
  }
}
</script>

<style scoped>

.card {
  user-select: none;
  pointer-events: none;
  border: none;
  outline: none;
  background-color: transparent;
}

.card > img {
  object-fit: cover;
  border-radius: 50%;
  margin-inline: auto;
}

.card > p {
  margin: 0;
  text-align: center;
}

.prev-arrow, .next-arrow {
  filter: invert(42%) sepia(0%) saturate(50%) hue-rotate(87deg) brightness(119%) contrast(119%);
  width: 32px;
  height: 32px;
  transition: 0.1s;
}

.prev-arrow:active, .next-arrow:active {
  filter: invert(70%) sepia(0%) saturate(20%) hue-rotate(87deg) brightness(119%) contrast(119%);
}

.prev-arrow {
  top: 60px;
  left: -40px;
}

.next-arrow {
  top: 60px;
  right: -40px;
}

.prev-arrow::before {
  font-size: 32px;
}

.next-arrow::before {
  font-size: 32px;
}

@media only screen and (max-width: 670px) {
  .prev-arrow, .next-arrow {
    display: none;
  }
  .carousel-container {
    padding-bottom: 25px;
  }

}
</style>
