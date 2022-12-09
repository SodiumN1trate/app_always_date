<template>
  <div id="profile-content">
    <div id="profile-upper">
      <div id="profile-info">
        <div class="profile-picture">
          <img :src="user.avatar" alt="ProfilePicture"> <!-- ../static/images/ProfilePicture.png -->
        </div>
        <div class="user">
          <div class="user-info">
            <h2>{{ user.firstname }} {{ user.lastname }}</h2>
            <p>{{ user.about_me }}</p>
          </div>
          <userData location="Latvija, Rīga" :date="user.birthday" :star="user.rating" :exp="user.read_school_exp"/>
        </div>
      </div>
    </div>
    <div id="profile-info-content">
      <div id="about-me">
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
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  layout: 'NavigationLayout',
  data () {
    return {
      user: this.$auth.$state.user.data,
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
  }
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

body {
  background-color: $color-white-1;
}

#profile-content {
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
  height: fit-content;
  padding-bottom: 10px;
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
  gap: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
  height: fit-content;
  font-family: Alata;
}

.user-info > h2 {
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
  #about-me, #interests, #user-photos {
    width: 70%;
  }
}

@media only screen and (max-width: 880px) {
  #profile-content {
    margin-left: 0;
    width: 100%;
  }
  #about-me, #interests, #user-photos {
    width: 90%;
  }
}

@media only screen and (max-width: 670px) {
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
}

@media only screen and (max-width: 600px) {
  #about-me, #interests, #user-photos {
    width: 98%;
    padding: 10px;
  }
}
</style>
