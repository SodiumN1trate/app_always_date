<template>
  <div id="profile-content">
    <div id="profile-upper">
      <div id="profile-info">
        <div class="profile-picture">
          <img src="../static/images/ProfilePicture.png" alt="ProfilePicture">
        </div>
        <div class="user">
          <div class="user-info">
            <h2>{{ user.firstname }} {{ user.lastname }}</h2>
            <p>{{ user.about_me }}</p>
          </div>
          <div class="user-data">
            <div>
              <i class="icon-location" />
              <p>Latvija, Rīga</p>
            </div>
            <div>
              <i class="icon-birthday" />
              <p>17.03.2003</p>
            </div>
            <div>
              <i class="icon-star" />
              <p>2.5/10</p>
            </div>
            <div>
              <i class="icon-book" />
              <p>55/100</p>
            </div>
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
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  layout: 'NavigationLayout',
  auth: true,
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

.user-data {
  display: flex;
  gap: 20px;
  width: 100%;
}

.user-data > div {
  display: flex;
  justify-content: center;
  height: 65%;
  gap: 5px;
  font-family: Alata;
  color: $color-grey-3;
}

.user-data > div > i {
  font-size: 20px;
  height: 20px;
}

.user-data > div > p {
  text-align: center;
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
  padding: 1%;
  margin-inline: auto;
  font-family: Alata;
  color: #6F6F6F
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
