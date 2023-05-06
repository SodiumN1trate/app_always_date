<template>
  <div class="register-container">
    <div class="register-navbar">
      <img src="../static/svg/RegistrationNavBar.svg">
    </div>
    <form class="register-form" @submit.prevent="registerUser">
      <h1 class="registration-title">
        Reģistrācija
      </h1>
      <div class="full-name">
        <div>
          <h4 class="input-title">Vārds</h4>
          <InputField v-model="userData.firstname" placeholder="Vārds" />
        </div>
        <div>
          <h4 class="input-title">Uzvārds</h4>
          <InputField v-model="userData.lastname" placeholder="Uzvārds" />
        </div>
      </div>
      <div>
        <h4 class="input-title">Dzimšanas datums</h4>
        <date-pick
          v-model="userData.birthday"
          :input-attributes="{class: 'date-picker', readonly: true}"
          next-month-caption="Nākošais mēnesis"
          prev-month-caption="Iepriekšējais mēneis"
          :displayFormat="'YYYY-MM-DD'"
          :weekdays="['P', 'O', 'T', 'C', 'P', 'S', 'Sv']"
          :months="['Janvāris', 'Februāris', 'Marts', 'Aprīlis','Maijs', 'Jūnijs', 'Jūlijs', 'Augusts','Septembris', 'Oktobris', 'Novembris', 'Decembris']"
        />
      </div>
      <div>
        <h4 class="input-title">Dzimums</h4>
        <SelectGender v-model="userData.gender" />
      </div>
      <div class="register-button-center">
        <button ref="button" class="register-button" type="submit" @blur="isButtonFocus = false">
          Reģistrēties
        </button>
        <p class="register-policy">
          Nospiežot pogu “Reģistrēties”, tu piekrīti mūsu <a class="register-policy-link-color" href="#">nosacijumiem</a>.
          Uzzini, kā mēs apstrādājam tavus datus lasot mūsu
          <a class="register-policy-link-color" href="#">Konfidencialitātes politiku</a> un <a class="register-policy-link-color" href="#">Sīkfailu politiku</a>.
        </p>
      </div>
    </form>
    <div class="popups">
      <PopUp
        v-for="(pop, index) in $store.state.popups"
        :key="index"
        :popup-type="pop.popupType"
        :popup-text="pop.popupText"
        :popup-show-time="pop.popupShowTime + index / 2"
      />
    </div>
  </div>
</template>

<script>
import DatePick from 'vue-date-pick'
import 'vue-date-pick/dist/vueDatePick.css'
export default {
  name: 'RegisterPage',
  components: { DatePick },
  data () {
    return {
      isButtonFocus: false,
      user: this.$auth.state.user.data,
      userData: {
        firstname: null,
        lastname: null,
        birthday: `${(new Date()).getFullYear()}-${(new Date()).getMonth()}-${(new Date()).getDate()}`,
        gender: null
      }
    }
  },
  mounted () {
    document.body.style.backgroundColor = '#FFF3F3'
    this.userData.firstname = this.user.firstname
    this.userData.lastname = this.user.lastname
  },
  methods: {
    async registerUser () {
      await this.$axios.put('/users/' + this.user.id, this.userData).then((res) => {
        window.location.href = '/profile?successRegistration=true'
      }).catch((e) => {
        for (const error in e.response.data.errors) {
          this.$store.commit('setPopup', {
            text: e.response.data.errors[error][0],
            type: 'danger',
            seconds: 5
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
@use 'assets/sass/abstract' as *;

.register-container {
  height: 100vh;
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

.register-navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: white;
}

.register-navbar > img {
  height: 50px;
}

body::-webkit-scrollbar {
  display: none;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 550px;
  background-color: white;
  border-radius: 22px;
  box-shadow: 0px 4.4px 20px rgba(0, 0, 0, 0.07);
  padding: 20px 20px 1px 20px;
  margin-inline: auto;
  margin-top: 100px;
  margin-bottom: 20px;
}

.registration-title {
  text-align: center;
  color: #FFC7C7;
  font-family: NotoSansDisplay;
  font-weight: 300;
}

.input-title {
  color: #AAAAAA;
  font-family: NotoSansDisplay;
  font-weight: 300;
}

.full-name {
  display: flex;
  gap: 10px;
}

.full-name-input {
  background-color: red;
}

.register-button-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .register-button {
    width: 70%;
    height: 50px;
    background-color: $color-pink-1;
    border: none;
    border-radius: 30px;
    color: $color-white-1;
    font-size: 24px;
    font-family: Alef;
    margin-inline: auto;
  }
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

.register-policy {
  text-align: center;
  font-family: NotoSansDisplay;
  color: $color-grey-4;
  margin-top: 0.8rem;
  font-size: 14px;
  font-weight: 300;
  .register-policy-link-color {
    color: $color-pink-4;
  }
}

.date-picker {
  border: solid 1px $color-grey-4;
  color: $color-black-2;
  background-color: $color-white-2;
  font-family: NotoSans;
  border-radius: 8px;
  height: 40px;
  font-size: 16px;
  padding: 15px 10px 15px 15px !important;
}

.date-picker::placeholder {
  color: $color-grey-4;
}

.date-picker:focus {
  outline: solid 1px $color-grey-4;
}
</style>
