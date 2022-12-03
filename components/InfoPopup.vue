<template>
  <div id="info-content" @mouseover="isHover = true" @mouseleave="isHover = false">
    <span ref="warning" class="icon-circle-warning" />
    <transition name="info-popup">
      <div v-show="isHover" ref="popup" class="vote-hover">
        <p>{{ info }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'InfoPopup',
  props: ['info', 'size', 'color'],
  data () {
    return {
      isHover: false
    }
  },
  mounted () {
    this.$refs.warning.style.fontSize = this.size + 'px'
    this.$refs.warning.style.color = this.color
    this.$refs.popup.style.marginTop = this.size + 'px'
  }
}
</script>

<style lang="scss">
@use 'assets/sass/abstract' as *;

#info-content {
  position: relative;
  display: flex;
  flex-direction: column;
}

.vote-hover {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  padding: 5px;
  background-color: $color-white-2;
  border: solid 1px $color-grey-0;
  border-radius: 5px;
}

.info-popup-enter-active,
.info-popup-leave-active {
  transition: opacity .2s ease;
}

.info-popup-enter,
.info-popup-leave-to {
  opacity: 0;
}

.vote-hover > p {
  color: $color-black-2;
  margin-bottom: 0;
}
</style>
