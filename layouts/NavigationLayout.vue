<template>
  <div class="body-container">
    <NavBar />
    <div id="profile-background-image"></div>
    <transition>
      <Nuxt />
    </transition>
  </div>
</template>

<script>
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
