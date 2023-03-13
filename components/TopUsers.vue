<template>
  <div v-if="users.length > 0" class="pedestals">
    <div v-if="users[1]" class="pedestal-container">
      <img class="pedestal" src="../static/svg/SecondPlacePedestal.svg">
      <div class="pedestal-user-data">
        <img :src="users[1].avatar" @click="toProfile(users[1].id)">
        <div>
          <p class="user-name" @click="toProfile(users[1].id)">{{ users[1].firstname }} {{ users[1].age }}</p>
          <h3>{{ users[1].rating }}</h3>
          <p class="rating-count">{{ users[1].rate_count }} vērtējumi</p>
        </div>
      </div>
    </div>
    <div v-if="users[0]" class="pedestal-container" style="margin-top: -45px">
      <img class="pedestal first-place-pedestal" src="../static/svg/FirstPlacePedestal.svg">
      <div class="pedestal-user-data first-place-pedestal-user">
        <img :src="users[0].avatar">
        <div>
          <p class="user-name" @click="toProfile(users[0].id)">{{ users[0].firstname }} {{ users[0].age }}</p>
          <h3>{{ users[0].rating }}</h3>
          <p class="rating-count">{{ users[0].rate_count }} vērtējumi</p>
        </div>
      </div>
    </div>
    <div v-if="users[2]" class="pedestal-container">
      <img class="pedestal" src="../static/svg/ThirdPlacePedestal.svg">
      <div class="pedestal-user-data">
        <img :src="users[2].avatar" @click="toProfile(users[2].id)">
        <div>
          <p class="user-name" @click="toProfile(users[2].id)">{{ users[2].firstname }} {{ users[2].age }}</p>
          <h3>{{ users[2].rating }}</h3>
          <p class="rating-count">{{ users[2].rate_count }} vērtējumi</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopUsers',
  props: ['users'],
  methods: {
    toProfile (id) {
      this.$router.push('/users/' + id)
    }
  }
}
</script>

<style scoped>
body {
  text-align: center !important;
}

.pedestals {
  display: flex;
  justify-content: center;
  gap: 15px;
  user-select: none;
  transition: 0.5s;
}

.pedestal-container {
  position: relative;
  filter: drop-shadow(0px 4.4px 110px rgba(200, 200, 200, 0.3));
}

.pedestal {
  position: relative;
}

.first-place-pedestal {
  width: 175px;
  height: 310px;
}

.pedestal-user-data {
  position: absolute;
  top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: NotoSans;
  color: white;
}

.pedestal-user-data > h6, h5, h4, h3, h2, p {
  line-height: 0.8 !important;
  margin-bottom: 10px;
}

.rating-count {
  font-size: 12px;
}

.user-name {
  font-size: 19px;
  cursor: pointer;
}

.pedestal-user-data > div {
  text-align: center;
  margin-top: 15px;
}

.pedestal-user-data > img {
  object-fit: cover;
  width: 140px;
  height: 140px;
  border-radius: 100%;
  cursor: pointer;
  flex-shrink: 0;
}

.first-place-pedestal-user > img {
  width: 155px;
  height: 155px;
}

.first-place-pedestal-user > div > .user-name {
  font-size: 22px;
}

@media only screen and (max-width: 1300px) {
  .pedestals {
    transform: scale(0.95);
  }
}

@media only screen and (max-width: 1200px) {
  .pedestals {
    transform: scale(0.9);
  }
}

@media only screen and (max-width: 1100px) {
  .pedestals {
    transform: scale(0.85);
  }
}

@media only screen and (max-width: 1000px) {
  .pedestals {
    transform: scale(0.8);
  }
}

@media only screen and (max-width: 500px) {
  .pedestals {
    transform: scale(0.65);
  }
}
</style>
