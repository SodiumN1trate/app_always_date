<template>
  <div id="navigation" :class="{'navigation-blur': sidebarOpenState}">
    <transition name="slide-fade">
      <div v-show="sidebarOpenState" class="vertical">
        <div v-for="(button, index) in buttons" :key="index" v-can-permission="button.permission" v-can-role="button.role">
          <NuxtLink :to="button.link" >
            <div @mouseover="onButtonHover" @mouseleave="leaveButtonHover" @click="onButtonClick">
              <i :class="`icon-${button.icon}`" />
              <span>{{ button.title }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </transition>
    <div class="horizontal">
      <span class="icon-statistic menu" @click="sidebarOpenState = !sidebarOpenState"></span>
      <div id="logo-block">
        <img src="@/static/images/AlwaysDateLogo.png" id="logo">
      </div>
      <div class="navbar-button">
        <nuxt-link to="/profile" class="wallet-block">
          <span style="font-size: 15px; color: #FD9A9A">{{user.firstname}}</span>
          <span class="icon-circle-money" style="font-size: 16px; font-weight: bold; color: #FD9A9A"></span>
          <span style="font-size: 15px; color: #FD9A9A">{{user.wallet}}</span>
        </nuxt-link>
        <button @click="logout()" class="logout-button">
          <span class="icon-logout" ></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      user: this.$auth.$state.user.data,
      sidebarOpenState: true,
      width: 0,
      buttons: [
        {
          title: 'Mani favorīti',
          icon: 'heart',
          link: '/my_favorite'
        },
        {
          title: 'Profils',
          icon: 'profile',
          link: '/profile'
        },
        {
          title: 'Vēstules',
          icon: 'message',
          link: '/chat'
        },
        {
          title: 'Tops',
          icon: 'statistic',
          link: '/leaderboard'
        },
        {
          title: 'Cilvēki tuvumā',
          icon: 'globe',
          link: '/leaderboard'
        },
        {
          title: 'Mana profile apmeklētāji',
          icon: 'eye',
          link: '/my_favorite'
        },
        {
          title: 'Dzīves skola',
          icon: 'book',
          link: '/life_school',
          permission: 'view.life_school'
        },
        {
          title: 'Vērtēšanas',
          icon: 'newspaper',
          link: '/match'
        },
        {
          title: 'Mans reitings',
          icon: 'flame',
          link: '/profile'
        },
        {
          title: 'Iestatījumi',
          icon: 'dots',
          link: '/settings'
        },
        {
          title: 'Administrācija',
          icon: 'edit',
          link: '/admin/users/list',
          role: 'Administrators'
        }
      ]
    }
  },
  mounted () {
    this.width = window.innerWidth
    this.sidebarOpenState = this.width >= 900
    window.addEventListener('resize', this.resize)
  },
  methods: {
    onButtonHover (event) {
      if (this.width < 900) { return 0 }
      if (event.target.tagName === 'I') {
        event.target.parentNode.classList.add('button-open')
        event.target.parentNode.classList.remove('button-close')
      }
    },
    leaveButtonHover (event) {
      if (this.width < 900) { return 0 }
      event.target.parentNode.classList.remove('button-open')
      event.target.classList.add('button-close')
    },
    resize (event) {
      this.width = event.target.innerWidth
      this.sidebarOpenState = this.width >= 900
    },
    onButtonClick () {
      this.sidebarOpenState = this.width > 900
    },
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>

<style lang="scss" scoped>

a:link {
  text-decoration: none;
}

#logo-block {
  display: flex;
  align-content: center;
  align-items: center;
}

#logo {
  padding: 0;
  margin: 0;
  height: 50px;
}

#navigation {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 10;
}

.horizontal {
  position: absolute;
  background-image: linear-gradient(to right, #F1F6FF, #FFF8F9);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100vw;
  left: 0;
  top: 0;
  right: 0;
  z-index: 10;
  padding-left: 50px;
}

.vertical {
    position: absolute;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 9px;
    gap: 20px;
    width: 50px;
    height: 100vh;
    background-image: linear-gradient(#EFF6FF, #FEF8F9);
    left: 0;
    top: 0;
    i {
      font-size: 32px;
      color: #BDBDBD;
    }
    div {
      display: flex;
      align-items: center;
      gap: 24px;
      color: #959595;
      margin: unset;
      padding: unset;
      cursor: pointer;
    }
    div > span {
      display: none;
    }
}

.vertical-opened {
  position: absolute;
  display: none;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 9px;
  gap: 20px;
  width: 250px;
  height: 100vh;
  background-image: linear-gradient(#EFF6FF, #FEF8F9);
  left: 0;
  top: 0;
  i {
    font-size: 32px;
    color: #BDBDBD;
  }
  div {
    display: flex;
    align-items: center;
    gap: 24px;
    color: #959595;
    margin: unset;
    padding: unset;
    cursor: pointer;
  }
}

.button-open {
  border-left: 3px solid #F99F9E;
  color: #F99F9E;
  align-self: flex-start;
  border-radius: 0px 3px 3px 0px;
  box-shadow: 0px 3px 7px 0px rgba(105,105,105,0.26);
  transition: .3s;
}

.button-open > span {
  color: #F99F9E;
  width: 240px;
  display: initial !important;
}

.button-open > i {
  color: #F99F9E;
  margin-left: 5px;
  display: initial !important;
}

.button-close {
  border: none;
  color: #C1C1C1;
  box-shadow: none;

  align-self: flex-start;
  border-radius: 0px 3px 3px 0px;
  transition: .3s;
}

.button-close > span {
  color: #C1C1C1;
  display: none !important;
}

.button-close > i {
  margin-left: 0;
  color: #C1C1C1;
}

.button-open:hover {
  padding: 10px;

  margin-left: -8px;
  background-color: #FEFBFF;
  width: 240px;
}

.menu {
  display: none;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

@media only screen and (max-width: 900px) {
  .vertical {
    width: 250px;
    div > span {
      display: initial !important;
      color: #BDBDBD;
    }
  }
  .navigation-blur {
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .horizontal {
    padding: 0;
    position: relative;
  }

  #logo-block {
    justify-content: center;
    height: 50px;
    width: 100%;
  }

  .menu {
    display: initial;
    position: absolute;
    font-size: 32px;
    transform: rotate(90deg);
    color: #BDBDBD;
    top: 10px;
    left: 10px;
    cursor: pointer;
  }
  .button-open {
    border-left: unset;
    color: #C1C1C1;
    align-self: flex-start;
    border-radius: unset;
    box-shadow: unset;
  }

  .button-open > span {
    color: #C1C1C1;
    width: 250px;
    display: initial !important;
  }
  .button-open > i {
    color: #C1C1C1;
    margin-left: 0;
    display: initial !important;
  }

  .button-close {
    border: none;
    color: #C1C1C1;
    box-shadow: none;

    align-self: flex-start;
  }

  .button-close > span {
    color: #C1C1C1;
    display: none !important;
  }

  .button-close > i {
    margin-left: 0;
    color: #C1C1C1;
  }

  .button-open:hover {
    padding: 0;

    margin-left: 0;
    background-color: unset;
    width: 250px;
  }
}
.navbar-button{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.wallet-block{
  display: flex;
  text-align: center;
  align-items: center;
  vertical-align: middle;
  width: fit-content;
  height: fit-content;
  gap: 10px;
  padding: 5px 10px;
  border: 2.5px solid #FD9A9A;
  border-radius: 22px;
  color: #FD9A9A;
  font-family: Alata;
  font-size: 16px;
}

.logout-button{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 2.5px solid #FD9A9A;
  padding: 2px;
  width: 32px;
  height: 32px;
  border-radius: 22px;
  margin-right: 50px;
}

.logout-button > span{
  font-size: 16px;
  font-weight: bold;
  color: #FD9A9A;
}
</style>
