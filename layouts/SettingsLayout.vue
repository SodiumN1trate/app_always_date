., <template>
  <div class="body-container">
    <div v-if="$nuxt.$route.name === 'profile'" class="popups-profile">
      <PopUp
        v-for="(pop, index) in $store.state.popups"
        :key="index"
        :popupType="pop.popupType"
        :popupText="pop.popupText"
        :popupShowTime="pop.popupShowTime + index / 2"
      />
    </div>
    <div v-else class="popups">
      <PopUp
        v-for="(pop, index) in $store.state.popups"
        :key="index"
        :popupType="pop.popupType"
        :popupText="pop.popupText"
        :popupShowTime="pop.popupShowTime + index / 2"
      />
    </div>
    <NavBar />
    <div id="profile-background-image"></div>
    <transition>
      <div id="settings-container">
        <div id="settings-box">
          <div class="settings-navigation">
            <div class="settings-navigation-buttons">
              <nuxt-link class="settings-navigation-button" to="/settings/">Profila iestatījumi</nuxt-link>
              <nuxt-link class="settings-navigation-button" to="/settings/add_funds">Papildināt maciņu</nuxt-link>
            </div>
          </div>
          <Nuxt />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'NavigationLayout'
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

body, html {
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: $color-pink-3 rgba(0, 0, 0, 0);
}

#profile-background-image {
  background: linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, #F7F5F5 99.99%), url("static/images/UserBackground2.png");
  background-size: cover;
  left: 0;
  top: 0;
  height: 350px;
  width: 100%;
  position: absolute;
  z-index: -2;
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

.popups-profile {
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 50px;
  right: 55px;
  gap: 10px;
  z-index: 20;
  justify-content: center;
  align-items: center;
}

.page-enter-active,
.page-leave-active,
.v-enter-active {
  transition: opacity .2s;
}

.page-enter,
.page-leave-active,
.v-enter,
.v-leave-to {
  opacity: 0;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#settings-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 200px;
  margin-bottom: 50px;
}

#settings-box {
  display: flex;
  width: 60%;
  border: solid 1px $color-grey-0;
  border-radius: 15px;
  background-color: $color-white-2;
  box-shadow: 0px 4px 44px rgba(0, 0, 0, 0.1);
}

.settings-navigation {
  display: flex;
  flex-direction: column;
  //justify-content: space-around;
  width: 30%;
  border-right: solid 2px $color-grey-0;
  padding-bottom: 220px;
  font-family: NotoSans;
  color: $color-grey-5;
}

.settings-navigation >  div > .settings-navigation-profile > h3 {
  font-family: Alata;
  color: #949494;
  width: 40%;
  font-size: 25px;
}

.settings-navigation-profile-picture {
  height: 96px;
  width: 96px;
  object-fit: cover;
}

.settings-navigation-buttons {
  padding-left: 25px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  font-family: Alata;
  font-size: 22px;
  gap: 10px;
}

.nuxt-link-exact-active {
  color: #FFAEAE !important;
  transition: .2s !important;
}

.settings-navigation-button:visited {
  color: #C6C6C6;
  transition: .2s;
}

.settings-navigation-button:hover {
  color: $color-grey-3;
  transition: .2s;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
</style>
