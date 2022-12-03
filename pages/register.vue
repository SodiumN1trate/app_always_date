<template>
  <div class="register-background">
    <div class="register-logo-container">
      <img class="register-logo" src="../static/images/RegisterLogo.png" alt="MainLogo">
    </div>
    <form class="register-form" @submit.prevent="registerUser">
      <h2>Vārds, Uzvārds</h2>
      <div class="full-name-input">
        <InputField placeholder="Vārds" color="pink" />
        <InputField placeholder="Uzvārds" color="pink" />
      </div>
      <hr class="form-lines">
      <h2>Dzimšanas datums</h2>
      <div class="date-select-input">
        <SelectDate color="pink" />
      </div>
      <hr class="form-lines">
      <h2>Valoda</h2>
      <SelectInput :placeholder="'Valoda'" :options="['Latviešu', 'Krievu', 'Angļu']" tabindex="1" color="pink" />
      <hr class="form-lines">
      <h2>Dzimums</h2>
      <SelectInput :placeholder="'Dzimums'" :options="['Sieviete', 'Vīrietis']" tabindex="0" color="pink" />
      <hr class="form-lines">
      <div class="register-button-center">
        <button ref="button" class="register-button" type="submit" @blur="isButtonFocus = false">
          Reģistrēties
        </button>
      </div>
      <p class="register-policy">
        Nospiežot pogu “Reģistrēties”, tu piekrīti mūsu <a class="register-policy-link-color" href="#">nosacijumiem</a>.
        Uzzini, kā mēs apstrādājam tavus datus lasot mūsu
        <a class="register-policy-link-color" href="#">Konfidencialitātes politiku</a> un <a class="register-policy-link-color" href="#">Sīkfailu politiku</a>.
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data () {
    return {
      isButtonFocus: false
    }
  },
  methods: {
    registerUser () {
      console.log('Register')
    }
  }
}
</script>

<style lang="scss">
@use 'assets/sass/abstract' as *;

body {
  background-image: url("static/images/RegisterPageBackground.png");
}
body::-webkit-scrollbar {
  display: none;
}
html {
  scrollbar-width: none
}

.register-logo-container {
  @include flex-center();
  .register-logo {
    height: 220px;
    user-select: none;
  }
}

.register-form {
  h2 {
    color: $color-pink-2;
    font-size: 25px;
    font-family: Alef;
  }
  width: 450px;
  background-color: $color-white-1;
  border-radius: 22px;
  box-shadow: 0px 4.4px 20px rgba(0, 0, 0, 0.07);
  padding: 20px 20px 1px 20px;
  margin: auto auto 50px;
  .full-name-input {
    @include flex-center();
    margin-left: 4%;
    margin-right: 4%;
    gap: 5px;
  }
  .form-lines {
    margin-left: 0;
    margin-right: 0;
    border: {
      top: dashed 2px $color-pink-0;
    }
  }
  .date-select-input {
    @include flex-center();
    flex-direction: column;
    margin-left: 4%;
  }
  .register-button-center {
    @include flex-center();
    .register-button {
      width: 70%;
      height: 50px;
      background-color: $color-pink-1;
      border: none;
      border-radius: 30px;
      color: $color-white-1;
      font-size: 24px;
      font-family: Alef;
    }
    .register-button:hover {
      transition: 0.3s;
      background-color: $color-pink-3;
    }
    .register-button:active {
      transition: 0.1s;
      box-shadow: 0px 4px 17px $color-pink-2;
    }
    .register-button-blur {
      transition: 0.2s;
      background-color: $color-pink-1;
    }
  }
  .register-policy {
    text-align: center;
    font-family: NotoSans;
    color: $color-grey-4;
    margin-top: 0.8rem;
    font-size: 14px;
    .register-policy-link-color {
      color: $color-pink-4;
    }
  }
}
</style>
