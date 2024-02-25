<template>
  <div class="container">
    <small>Izskatās ka neesi reģistrējies</small>
    <ProgressBar progress="1" />
    <h3>Vai Tevi sauc?</h3>
    <div class="input-container">
      <InputField placeholder="Vārds"/>
      <InputField placeholder="Uzvārds" />
    </div>
    <button ref="button" class="register-button">
      Nākamais
    </button>
  </div>
</template>

<script>

export default {
  layout: 'FlowLayout'
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.input-container {
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 90%;
  margin-top: 10px;
}

.input-field {
  height: 30px;
  font-size: 16px;
}

.input-field::placeholder {
  font-size: 16px;
}

.register-button {
  background: #FF778A;
  border-radius: 11px;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #FFFFFF;
  padding: 7px 15px;
  margin-top: 50px;
}
</style>
