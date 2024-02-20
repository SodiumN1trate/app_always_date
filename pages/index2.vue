<template>
  <div id="index-background">
    <div id="index-content">
      <CloudBox />
      <div id="content-background">
        <div>
          <img src="@/static/images/AlwaysDateLogo.png" id="logo">
          <div id="description">
            <div id="title">
              <h1 style="color: #ACACAC">Ātrākais veids kā atrast<br><span  style="color: #FF9090">īstu mīlestību</span></h1>
            </div>
            <div ref="facebook" id="facebook-button" @click="buttonClick">
              <img src="@/static/svg/FacebookIndexLogo.svg" width="40px" ref="facebookLogo">
              <transition name="button-text">
                <p v-show="showText">Pieslēgties ar Facebook</p>
              </transition>
            </div>
          </div>
          <div id="info">
            <div class="info-message">
              <div class="info-message-header">
                <i class="icon-message"></i>
                <h2>Čats</h2>
              </div>
              <h5>Sazinies ar cilvēkiem kuri tev patīk un kuriem patīc tu</h5>
            </div>
            <div class="info-message">
              <div class="info-message-header">
                <i class="icon-book"></i>
                <h2>Dzīves skola</h2>
              </div>
              <h5>Mācies dzīves padomus kas tev palīdzēs būt laimīgākam</h5>
            </div>
            <div class="info-message">
              <div class="info-message-header">
                <i class="icon-globe"></i>
                <h2>Tuvumā</h2>
              </div>
              <h5>Iepazīsti cilvēkus kas ir tuvu tavam reģionam</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      showText: true,
      clicked: false
    }
  },
  methods: {
    buttonClick () {
      if (this.clicked) { return 0 }
      this.clicked = true
      this.$refs.facebook.style.userSelect = 'none'
      this.showText = false
      this.$refs.facebookLogo.style.animation = 'move 2.5s ease-in-out'
      setTimeout(() => {
        this.showText = true
      }, 2100)
      this.authorize()
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

<style lang="scss">
@use 'assets/sass/abstract' as *;

#content-background {
  position: relative;
  background-image: url("static/images/PixelHeartPattern.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 63%;
  height: 100%;
  z-index: 2;
  aspect-ratio: 1.107 / 1;
}

#index-content {
  background-image: url("static/images/IndexPageBackground.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
}

body::-webkit-scrollbar {
  display: none;
}

html {
  scrollbar-width: none
}

#logo {
  position: relative;
  margin: 10px;
  width: 310px;
}

#description {
  margin-left: 50px;
}

#title {
  margin-top: 180px;
}

#facebook-button {
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: #6590E7;
  max-width: 300px;
  width: 100%;
  margin-top: 30px;
  border-radius: 50px;
  color: white;
  box-shadow: 2px 5px 36px -9px rgba(101,144,231,1);
  -webkit-box-shadow: 2px 5px 36px -9px rgba(101,144,231,1);
  -moz-box-shadow: 2px 5px 36px -9px rgba(101,144,231,1);
}

#facebook-button > p {
  margin: 0;
  padding: 0;
}

#index-background {
  font-family: Alata;
}

#facebook-button > p{
  font-family: NotoSans;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

#info {
  display: flex;
  width: 700px;
  justify-content: space-between;
  gap: 30px;
  margin-top: 15%;
  color: #BDBDBD;
  margin-left: 50px;
}

#info p {
  font-size: 12px;
  color: #BDBDBD;
}

.info-message-header {
  display: flex;
  gap: 10px;
}

.info-message-header i {
  font-size: 40px;
  color: #BDBDBD;
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
  transform: translateX(20px);
  opacity: 0;
}
</style>
