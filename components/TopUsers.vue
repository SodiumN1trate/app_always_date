<template>
  <div v-if="users.length > 0" class="pedestals d-flex">
    <div v-for="(user, index) in users" :key="index" class="pedestal-container" :style="{ marginTop: index === 0 ? '-45px' : '0', order: index === 0 ? 2 : index }">
      <img class="pedestal" :src="require(`@/assets/vectors/${ pedestals[index] }`)" >
      <div class="pedestal-user-data">
        <img :src="user.avatar" @click="toProfile(user.id)">
        <div>
          <p class="user-name" @click="toProfile(user.id)">{{ user.firstname }} {{ user.age }}</p>
          <h3>{{ user.rating }}</h3>
          <p class="rating-count">{{ user.rate_count }} vērtējumi</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopUsers',
  props: ['users'],
  data () {
    return {
      pedestals: [
        'FirstPlacePedestal.svg',
        'SecondPlacePedestal.svg',
        'ThirdPlacePedestal.svg'
      ]
    }
  },
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
