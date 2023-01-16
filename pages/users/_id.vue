<template>
  <div id="user-content">
    <div id="profile-upper">
      <div id="profile-info">
        <div class="profile-picture">
          <img :src="user.avatar" alt="ProfilePicture">
        </div>
        <div class="user">
          <div class="user-info">
            <div>
              <h2>{{ user.firstname }} {{ user.lastname }}</h2>
              <button @click="openChat(user.id)" class="send-message-buttom">
                Nosūtīt ziņu 12.00
                <i class="icon-circle-money" />
              </button>
            </div>
            <p>{{ user.about_me }}</p>
          </div>
          <userData location="Latvija, Rīga" :date="user.birthday" :star="user.rating" :exp="user.read_school_exp"/>
        </div>
        <div id="user-interactions">
          <div style="display: flex">
            <MoreOptions @show-popup="showReportPopup" />
          </div>
        </div>
      </div>
    </div>
    <div id="profile-info-content">
      <div v-show="user.about_me" id="about-me">
        <h3>Par mani</h3>
        <p>{{ user.about_me }}</p>
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
      user: [],
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
  mounted () {
    this.getUser(parseInt(this.$route.params.id))
  },
  methods: {
    async getUser (userId) {
      if (userId === this.$auth.$state.user.data.id) {
        await this.$router.push('/profile')
      }
      await this.$axios.get('/users/' + userId).then((res) => {
        this.user = res.data.data
      }).catch((e) => {
        return this.$nuxt.error({ statusCode: 404, message: 'Ups, Jūs tikāt neeksistējošā saitē!' })
      })
    },
    async openChat (userId) {
      await this.$axios.post('/chat_room', { user2_id: userId }).then((res) => {
        console.log('REDIRECT')
        this.$router.push('/chat?chatRoom=' + res.data.data.id)
      }).catch((e) => {
        console.log(e)
      })
    },
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
  position: relative;
  display: flex;
  justify-content: center;
  gap: 2%;
  background-color: $color-white-2;
  border-top: solid 1px $color-grey-3;
  border-bottom: solid 1px $color-grey-3;
  width: 100%;
  height: fit-content;
  padding-bottom: 10px;
}

.profile-picture > img {
  object-fit: cover;
  height: 200px;
  width: 200px;
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
  display: flex;
  flex-direction: column;
  height: fit-content;
  font-family: Alata;
}

.user-info > div {
  display: flex;
  gap: 20px;
  align-items: center;
}

.user-info > div > h2 {
  margin: 0;
  color: $color-black-1;
}

.user-info > p {
  margin: 0;
  max-width: 500px;
  color: $color-black-2;
}

#profile-info-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

#user-interactions {
  position: absolute;
  top: 10px;
  right: 10px;
  font-family: NotoSans;
  margin-top: 0.5%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: right;
  height: fit-content;
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
  white-space: nowrap;
  height: fit-content;
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
  padding: 20px;
  margin-inline: auto;
  font-family: Alata;
  color: #6F6F6F;
  transition: 0.2s;
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
  transition: 0.2s;
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
  padding: 20px;
  margin-inline: auto;
  font-family: Alata;
  color: #6F6F6F;
  transition: 0.2s;
}

@media only screen and (max-width: 1200px) {
  .user-info > div {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  #about-me, #interests, #user-photos {
    width: 70%;
  }
}

@media only screen and (max-width: 880px) {
  .user-info > div {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  #user-content {
    margin-left: 0;
    width: 100%;
  }
  #about-me, #interests, #user-photos {
    width: 90%;
  }
}

@media only screen and (max-width: 670px) {
  .user-info > div {
    align-items: center;
  }
  #profile-info {
    flex-direction: column;
    align-items: center;
  }
  .user-info {
    align-items: center;
  }
  .user-info > p {
    text-align: center;
  }
  .user-info > p {
    padding-left: 20px;
    padding-right: 20px;
  }
}

@media only screen and (max-width: 600px) {
  #about-me, #interests, #user-photos {
    width: 98%;
    padding: 10px;
  }
}
</style>
