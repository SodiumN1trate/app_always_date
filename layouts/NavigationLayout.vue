<template>
  <div class="body-container">
    <div v-if="$nuxt.$route.name === 'profile'" class="popups-profile">
      <PopUp
        v-for="(pop, index) in $store.state.popups"
        :key="index"
        :popupType="pop.popupType"
        :popupText="pop.popupText"
        :popupShowTime="pop.popupShowTime + index / 2"
      />
    </div>
    <div v-else class="popups">
      <PopUp
        v-for="(pop, index) in $store.state.popups"
        :key="index"
        :popupType="pop.popupType"
        :popupText="pop.popupText"
        :popupShowTime="pop.popupShowTime + index / 2"
      />
    </div>
    <NavBar />
    <div id="profile-background-image"></div>
    <transition>
      <Nuxt />
    </transition>
  </div>
</template>

<script>
// import Vue from 'vue'
//
// import profileImage from '~/mixins/profile_image'
//
// Vue.mixin(profileImage)
export default {
  name: 'NavigationLayout'
}
</script>

<style lang="scss">
@use 'assets/sass/abstract' as *;

body, html {
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: $color-pink-3 rgba(0, 0, 0, 0);
}

#profile-background-image {
  background: linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, #F7F5F5 99.99%), url("static/images/UserBackground2.png");
  background-size: cover;
  left: 0;
  top: 0;
  height: 350px;
  width: 100%;
  position: absolute;
  z-index: -2;
}

.popups {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  gap: 10px;
  z-index: 20;
  justify-content: center;
  align-items: center;
}

.popups-profile {
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 50px;
  right: 55px;
  gap: 10px;
  z-index: 20;
  justify-content: center;
  align-items: center;
}

.page-enter-active,
.page-leave-active,
.v-enter-active {
  transition: opacity .7s;
}

.page-enter,
.page-leave-active,
.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
