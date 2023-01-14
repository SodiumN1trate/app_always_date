<template>
  <div>
    <div class="box">
      <h2>Mani favorīti</h2>
      <div id="user-list-container">
        <div v-for="(user) in favorites" :key="user.id" class="leaderboard-user">
          <Leaderboard :prop-user="user" :show-top="false" />
        </div>
        <div v-if="favorites.length === 0">
          <h2 style="text-align: center">Jūs vēl nevienu nenovērtējāt :(</h2>
        </div>
      </div>
      <div class="load-more-content">
        <div class="load-more">
          <i class="icon-load" />
          <p>Lādē vēl</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyFavorite',
  layout: 'NavigationLayout',
  data () {
    return {
      favorites: [],
      currentPage: null,
      lastPage: null,
      debounce: true
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight && this.lastPage !== this.currentPage && this.debounce) {
        this.nextPage()
      }
    })
    this.$axios.get('/rated_match_user').then((response) => {
      if (response.data.data.length >= 20) {
        this.currentPage = response.data.current_page
        this.lastPage = response.data.last_page
      }
      this.favorites = response.data.data
    })
  },
  methods: {
    async nextPage () {
      this.debounce = false
      const nextPage = this.currentPage + 1
      await this.$axios.get('/rated_match_user?page=' + nextPage).then((response) => {
        this.currentPage = response.data.current_page
        this.favorites = this.favorites.concat(response.data.data)
        window.scrollTo({
          top: document.body.scrollHeight - 1000,
          behavior: 'smooth'
        })
        setTimeout(() => {
          this.debounce = true
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

body {
  background-image: linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, #F7F5F5 15.65%, #FFF5F5 100%);
}

.box {
  width: 60%;
  margin-top: 175px;
  margin-inline: auto;
  background-color: #FBFDFF;
  border: solid 1px $color-grey-0;
  border-radius: 13px;
  padding: 1%;
  font-family: Alata;
  color: $color-black-1;
}

#user-list-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 10px;
  padding: 2.5%;
  margin-top: initial;
}

.leaderboard-user {
  width: 100%;
  display: flex;
  gap: 10px;
  background-color: $color-white-2;
  margin-inline: auto;
  padding: 1%;
  box-shadow: 0px 4px 17px rgba(0, 0, 0, 0.03);
  border: solid 1px $color-grey-0;
  border-radius: 13px;
}

.load-more-content {
  display: flex;
  justify-content: center;
  margin: auto;
}

.load-more {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 10%;
  color: $color-black-1;
  cursor: pointer;
}

.load-more > i {
  margin: auto;
}

.load-more > p {
  margin: auto;
}

.load-more> i::before {
  animation: back-to-start 1s;
}

.load-more:hover > i::before {
  animation: rotating 1s linear infinite;
}

@keyframes back-to-start {
  from {
    transform: rotate(720deg)
  }
  to {
    transform: rotate(0deg);
  }
}

@keyframes rotating {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
@media only screen and (max-width: 780px) {
  .box {
    width: 90%;
  }
}

@media only screen and (max-width: 480px) {
  #user-list-container {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  .box {
    width: 97%;
  }
  .box > h2 {
    margin-left: 10px;
  }
}
</style>
