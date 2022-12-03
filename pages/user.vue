<template>
  <div id="user-content">
    <div id="profile-upper">
      <div id="profile-info">
        <div class="profile-picture">
          <img src="../static/images/ProfilePicture.png" alt="ProfilePicture">
        </div>
        <div class="user">
          <div class="user-info">
            <h2>Markuss Lācis</h2>
            <p>Astrofizikas un indžinierzinātņu lauku datu interpretētājs.</p>
          </div>
          <UserData location="Latvia, Rīga" date="17.03.2003" star="9.9/10" exp="55/100" />
        </div>
        <div id="user-interactions">
          <div style="display: flex">
            <button class="send-message-buttom">
              Nosūtīt ziņu 12.00
              <i class="icon-circle-money" />
            </button>
            <MoreOptions @show-popup="showReportPopup" />
          </div>
        </div>
      </div>
    </div>
    <div id="profile-info-content">
      <div id="about-me">
        <h3>Par mani</h3>
        <p>
          Es meklēju sev brūti kas būtu gatava ar mani pabadīt visu atlikušo dzīvi. Man patīk gara auguma, dominējošas sievietes. Droši sazinaties ja ir interese atrast dzīves biedru 😍 💍
        </p>
      </div>
      <div v-show="cards.length !== 0" id="interests">
        <h3>Intereses</h3>
        <Carousel :cards="cards" />
      </div>
    </div>
    <div id="user-photos">
      <h3>Bildes</h3>
      <UserPhotos />
    </div>
    <ReportUser v-show="showPopup" @close-modal="showPopup = false" />
  </div>
</template>

<script>
export default {
  name: 'UserPage',
  layout: 'NavigationLayout',
  data () {
    return {
      showPopup: false,
      cards: [
        {
          id: 1,
          name: 1,
          position: 1,
          photo: 'ItPhoto.png',
          text: 'Programmēšanas arhitektūras'
        },
        {
          id: 2,
          name: 2,
          position: 2,
          photo: 'travels.png',
          text: 'Ceļojumi'
        },
        {
          id: 3,
          name: 3,
          position: 3,
          photo: 'science.png',
          text: 'Zinātne'
        },
        {
          id: 4,
          name: 4,
          position: 4,
          photo: 'emotions.png',
          text: 'Emocijas'
        },
        {
          id: 5,
          name: 5,
          position: 5,
          photo: 'cars.png',
          text: 'Mašīnas'
        },
        {
          id: 6,
          name: 6,
          position: 6,
          photo: 'cars.png',
          text: 'Mašīnas'
        },
        {
          id: 7,
          name: 7,
          position: 7,
          photo: 'cars.png',
          text: 'Mašīnas'
        }
      ]
    }
  },
  methods: {
    showReportPopup () {
      this.showPopup = true
    }
  }
}
</script>

<style lang="scss">
@use 'assets/sass/abstract' as *;

body {
  background-color: $color-white-1;
}

#user-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: calc(100% - 50px);
  margin-left: 50px;
  margin-top: 250px;
}

#profile-upper {
  display: flex;
  flex-direction: column;
}

#profile-info {
  display: flex;
  justify-content: center;
  gap: 2%;
  background-color: $color-white-2;
  border-top: solid 1px $color-grey-3;
  border-bottom: solid 1px $color-grey-3;
  width: 100%;
  height: 120px;
}

.profile-picture > img {
  height: 200px;
  border: solid 6px $color-white-2;
  border-radius: 100%;
  filter: drop-shadow(0px 15px 35px rgba(0, 0, 0, 0.1));
  margin-top: -100px;
  user-select: none;
}

.user {
  display: flex;
  flex-direction: column;
  margin-top: 3px;
}

.user-info {
  height: 80%;
  font-family: Alata;
}

.user-info > h2 {
  color: $color-black-1
}

.user-info > p {
  color: $color-black-2
}

#profile-info-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

#user-interactions {
  font-family: NotoSans;
  margin-top: 0.5%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: right;
}

.send-message-buttom {
  display: flex;
  align-items: center;
  gap: 5px;
  color: $color-white-2;
  background-color: $color-pink-4;
  border-radius: 30px;
  padding: 7px;
  border: none;
}

.send-message-buttom > i {
  font-size: 22px;
}

.userSettings-enter-active,
.userSettings-leave-active {
  transition: opacity .2s ease;
}

.userSettings-enter,
.userSettings-leave-to {
  opacity: 0;
}

#about-me {
  background-color: $color-white-2;
  box-shadow: 0px 4px 17px rgba(0, 0, 0, 0.03);
  border: solid 1px $color-grey-0;
  border-radius: 13px;
  width: 40%;
  padding: 1%;
  margin-inline: auto;
  color: #6F6F6F
}
#about-me > h3 {
  font-family: Alata;
}

#about-me > p {
  font-family: NotoSans;
}

#interests {
  background-color: $color-white-2;
  box-shadow: 0px 4px 17px rgba(0, 0, 0, 0.03);
  border: solid 1px $color-grey-0;
  border-radius: 13px;
  width: 40%;
  margin-inline: auto;
  font-family: Alata;
  color: #6F6F6F;
}

#interests > h3 {
  padding: 2%;
}

#user-photos {
  background-color: $color-white-2;
  box-shadow: 0px 4px 17px rgba(0, 0, 0, 0.03);
  border: solid 1px $color-grey-0;
  border-radius: 13px;
  width: 40%;
  padding: 1%;
  margin-inline: auto;
  font-family: Alata;
  color: #6F6F6F
}
</style>
