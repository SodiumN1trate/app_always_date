<template>
  <main>
    <div id="index-content">
      <div id="description">
        <span class="logo">AlwaysDate</span>
        <div id="title">
          <div>
            <h1>Ātrākais veids kā atrast
              savu īsto mīlestību</h1>
            <p style="color: #454545; font-size: 140%">Gatavojies ceļojumam, kas mainīs tavu skatījumu uz iepazīšanos! Mūsu platforma nav tikai par partneru meklēšanu; tas ir par jaunu pieredzi, kas izmainīs tavu dzīvi.
            </p>
            <div id="facebook-button" ref="facebook" @click="buttonClick">
              <transition name="button-text">
                <p v-show="showText">Ienāc ar Facebook</p>
              </transition>
              <transition name="button-spinner">
                <p v-show="showSpinner">
                  <img width="25px" height="25px" src="@/static/gifs/Spinner.svg" alt="spinner">
                </p>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      clicked: false,
      showText: true,
      showSpinner: false
    }
  },
  methods: {
    buttonClick () {
      if (this.clicked) { return 0 }
      this.clicked = true
      this.showText = false
      setTimeout(() => {
        this.showSpinner = true
      }, 202)
      setTimeout(() => {
        this.authorize()
      }, 2002)
      setTimeout(() => {
        this.$refs.facebookLogo.style.animation = ''
        this.clicked = false
      }, 2500)
    },
    async authorize () {
      const data = await this.$axios.get('/authorize')
      location.href = data.data.data.redirect_url
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

main {
  background-image: url('static/images/mainPageBackground.png');
  background-size: auto 100%;
  background-color: #FAF1F2;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: right;
  display: flex;
  width: 100%;
  height: 100vh;
  font-family: Alata;
  overflow-y: hidden;
  color: #454545;
}

#index-content {
  display: flex;
  vertical-align: center;
  width: 100%;
  height: 100vh;
  margin-left: 100px;
}

body::-webkit-scrollbar {
  display: none;
}

html {
  scrollbar-width: none
}

.logo {
  position: relative;
  margin: 20px;
  margin-bottom: 0px;
  font-size: 1.8rem;
  width: 310px;
}

#description {
  display: flex;
  flex-direction: column;
  align-items: start;
  vertical-align: center;
  padding-left: 3%;
  width: 100%;
  height: fit-content;
}

#title {
  display: flex;
  align-items: center;
  vertical-align: center;
  margin:0;
  height: 90vh;
}
#title > div > h1 {
  font-size: 80px;
  font-weight: normal;
}

#title > div {
  width: 55%;
}

#facebook-button {
  background-color: #FF778A;
  border-style: none;
  border-radius: 10px;
  color: #FFFFFF;
  cursor: pointer;
  padding: 15px 30px;
  display: flex;
  transition: .3s;
  max-width: 250px;
  width: 100%;
  justify-content: center;
}

#facebook-button:hover {
  scale: 1.03;
  transition: .3s;
}

#facebook-button > p{
  margin: 0px;
  padding: 0px;
  font-size: 18px;
  font-family: Alata;
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes move {
  0% {
    margin-left: unset;
  }
  50% {
    margin-left: 250px;
    transform: rotate(400deg);
  }
  100% {
    margin-left: unset;
    transform: rotate(0deg);
  }
}

.button-text-enter-active {
  transition: all 0.2s ease-out;
}
.button-text-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.button-text-enter,
.button-text-leave-to {
  //transform: translateX(20px);
  opacity: 0;
}

.button-spinner-enter-active {
  transition: all 0.5s ease-out;
  transform: translateY(0px);
}
.button-spinner-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.button-spinner-enter,
.button-spinner-leave-to {
  transform: translateY(100px);
  opacity: 0;
}

@media only screen and (max-width: 1890px) {
    main {
      background-image: url('static/images/mainPageBackground.png');
      background-size: auto 100%;
      background-color: #FAF1F2;
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-position: right;
      display: flex;
      width: 100%;
      height: 100vh;
      font-family: Alata;
      overflow-y: hidden;
  }

  #index-content {
    display: flex;
    vertical-align: center;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100vh;
  }

  #description {
    display: flex;
    flex-direction: column;
    align-items: start;
    vertical-align: center;
    width: 100%;
    height: fit-content;
  }

  #title{
    display: flex;
    align-items: center;
    vertical-align: center;
    margin:0;
    height: 90vh;
    padding-left: 2%;
  }

  #title > div > h1{
    font-size: 55px;
  }

  #title > div {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 40%;
  }
}

@media only screen and (max-width: 1300px) {
  main {
    background-image: none;
    display: flex;
    width: 100%;
    height: 100vh;
    font-family: Alata;
  }

  #index-content {
    display: flex;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100vh;
  }

  #description {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: fit-content;
    padding: 0;
    margin: 0;
  }

  .logo {
    text-align: center;
    font-size: 28px;
  }

  #title{
    align-items: start;
    text-align: center;
    margin-top: 70px;
    padding: 0;
  }

  #title > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 10px;
  }

  #title > div > h1 {
    font-size: 31px;
  }

  #title > div > p {
    font-size: 16px!important;
  }

  #facebook-button {
    background-color: #FF778A;
    border-style: none;
    border-radius: 10px;
    color: #FFFFFF;
    cursor: pointer;
    padding: 15px 20px;
    display: flex;
    //width: fit-content;
    transition: .3s;
    max-width: 250px;
    width: 100%;
    justify-content: center;
  }
}
</style>
