<template>
  <button :disabled="loading" @click="click()" ref="button" class="register-button">
    <span v-show="!loading">Nākamais</span>
    <span v-show="loading">
      <img width="25px" height="25px" src="@/static/gifs/spinner.svg" alt="spinner">
    </span>
  </button>
</template>

<script>
export default {
  props: ['loading'],
  name: 'FlowNextButton',
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.register-button {
  background: #FF778A;
  border-radius: 11px;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  padding: 7px 15px;
  margin-top: 50px;
  width: 50%;
  height: 35px;
}

.register-button:disabled {
  background: #ff8392;
}
</style>
