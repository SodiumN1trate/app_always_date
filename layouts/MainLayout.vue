<template>
  <div>
    <transition>
      <Nuxt />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>

<style>
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
