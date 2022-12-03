<template>
  <div class="pedestals">
    <div class="pedestal-container">
      <img class="pedestal" src="../static/svg/SecondPlacePedestal.svg">
      <div class="pedestal-user-data">
        <img :src="`../images/${users[1].photo}.png`">
        <div>
          <p class="user-name">{{ `${users[1].name}, 21` }}</p>
          <h3>{{ users[1].stars }}</h3>
          <p class="rating-count">371289 vērtējumi</p>
        </div>
      </div>
    </div>
    <div class="pedestal-container">
      <img class="pedestal" style="margin-top: -45px" src="../static/svg/FirstPlacePedestal.svg">
      <div class="pedestal-user-data" style="margin-top: -46px;">
        <img style="width: 150px;" :src="`../images/${users[0].photo}.png`">
        <div>
          <p class="user-name">{{ `${users[0].name}, 25` }}</p>
          <h3>{{ users[0].stars }}</h3>
          <p class="rating-count">371289 vērtējumi</p>
        </div>
      </div>
    </div>
    <div class="pedestal-container">
      <img class="pedestal" src="../static/svg/ThirdPlacePedestal.svg">
      <div class="pedestal-user-data">
        <img :src="`../images/${users[2].photo}.png`">
        <div>
          <p class="user-name">{{ `${users[2].name}, 30` }}</p>
          <h3>{{ users[2].stars }}</h3>
          <p class="rating-count">371289 vērtējumi</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopUsers',
  props: ['users']
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
}

.pedestal-user-data > div {
  text-align: center;
  margin-top: 15px;
}

.pedestal-user-data > img {
  width: 140px;
  border-radius: 100%;
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
