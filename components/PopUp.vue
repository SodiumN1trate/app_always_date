<script src="../store/index.js"></script>
<template>
  <transition name="bounce">
    <div class="popup" v-if="show" :class="'popup-' + popupType ">
      <p>{{ popupText }}</p>

      <span
        class="icon-circle-cross"
        @click="show = false">
      </span>

    </div>
  </transition>
</template>

<script>
export default {
  props: ['popupShow', 'popupType', 'popupText', 'popupShowTime', 'index'],
  data () {
    return {
      show: false
    }
  },
  mounted () {
    this.show = true
    console.log(this.popupShowTime)
    setInterval(() => {
      this.show = false
      this.$store.commit('removePopup', this.index)
    }, this.popupShowTime * 1000)
  }
}
</script>

<style scoped>
.popup {
  width: 450px;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(50, 50, 50, 0.75);
  -moz-box-shadow:    0px 0px 5px 0px rgba(50, 50, 50, 0.75);
  box-shadow:         0px 0px 5px 0px rgba(50, 50, 50, 0.75);
  padding: 10px 10px;
  border-radius: 3px;
}

p, .icon-circle-cross {
  margin: 0;
  padding: 0;
}

.popup-success {
  background-color: #A8F1C6;
  border: none;
  border-left: 5px solid #198245;
}

.popup-success > .icon-circle-cross {
  color: #198245;
}

.popup-danger {
  background-color: #F6A7A3;
  border: none;
  border-left: 5px solid #8D1310;
}

.popup-danger > .icon-circle-cross {
  color: #8D1310;
}

.icon-circle-cross {
  cursor: pointer;
  font-size: 24px;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
