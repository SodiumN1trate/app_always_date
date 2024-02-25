<template>
  <img src="https://aquamarineexotic.com/adminpanel/assets/images/ajax-spinner.gif">
</template>

<script>
export default {
  name: 'FacebookAuth',
  auth: false,
  async created () {
    try {
      const response = await this.$auth.loginWith('local', { params: { code: this.$route.query.code } })
      if (response.data.access_token) {
        this.$auth.strategy.token.set(response.data.access_token)
        this.$auth.strategy.token.sync()
      }
      if (response.data.data.age == null) {
        location.replace('/register')
      } else {
        location.replace('/profile')
      }
    } catch (e) {
      // location.replace('/profile')
    }
  }
}
</script>

<style scoped>
img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 100px;
  height: 100px;
}
</style>
