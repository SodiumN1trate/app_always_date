<template>
  <div>
    <transition>
      <div>
        <UpperNavBar />
        <div class="main-page-content">
          <SideNavBar />
          <div>
            <Nuxt />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'NavBarLayout'
}
</script>

<style scoped>

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
.main-page-content {
  display: flex;
}
</style>
