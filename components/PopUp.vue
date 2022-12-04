<template>
  <transition name="bounce">
    <div class="popup" v-show="$store.state.popUpShow" :class="'popup-' + $store.state.popupType ">
      <p>{{ $store.state.popupText }}</p>
      <span class="icon-circle-cross" @click="$store.commit('togglePopup', false)"></span>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      show: true
    }
  },
  updated () {
    setTimeout(() => {
      this.$store.commit('togglePopup', false)
    }, this.$store.state.popUpShowTime * 1000)
  }
}
</script>

<style scoped>
.popup {
  position: absolute;
  width: 450px;
  margin-left: auto;
  margin-right: auto;
  top: 60px;
  left: 0;
  right: 0;
  color: black;
  z-index: 20;
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
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
