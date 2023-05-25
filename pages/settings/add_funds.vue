<template>
  <div class="funds-container">
    <form class="payment" @submit.prevent="addFunds()">
      <div class="funds-title">
        <span class="icon-circle-money"/>
        <h2>Maciņa papildināšāna</h2>
      </div>
      <div class="funds-input">
        <p>Cik daudz?</p>
        <InputField v-model="fundsAmount" />
      </div>
      <button type="submit" class="funds-submit">Papildināt</button>
    </form>
    <div style="width: 50%;">
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.</p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'SettingsLayout',
  data () {
    return {
      fundsAmount: 0
    }
  },
  methods: {
    addFunds () {
      console.log(this.fundsAmount)
    }
  }
}
</script>

<style lang="scss" scoped>
@use '../../assets/sass/abstract/index' as *;

.funds-container {
  display: flex;
  width: 100%;
  padding: 32px;
  gap: 40px;
}

.funds-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.funds-title > h2 {
  margin: 0;
  color: $color-pink-1;
}

.payment {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
}

.icon-circle-money {
  color: $color-pink-1;
  font-size: 32px;
  width: fit-content;
  height: fit-content;
}

.funds-input {
  width: 100%;
}

.funds-input > p {
  margin: 0;
}

.funds-submit {
  align-self: start;
  background-color: #FFD2D2;
  border: solid 2px #FFD2D2;
  border-radius: 12px;
  color: white;
  transition: 0.2s;
  padding: 10px;
}

.funds-submit:hover {
  background-color: #FFC3C3;
  border: solid 2px #FFC3C3;
  box-shadow: 0px 4px 11px #FFD2D2;
}
</style>
