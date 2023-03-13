<template>
  <div>
    <div class="box">
      <div style="position: relative; user-select: none">
        <img class="triangle" src="../static/svg/TopTriangle.svg" alt="pedestal">
        <TopUsers class="pedestal-users" :users="top3" />
      </div>
      <div class="top-users">
        <div>
          <div id="user-list-container">
            <div v-for="(user, index) in topUsers" :key="index" class="leaderboard-user">
              <Leaderboard :prop-user="user" :show-top="false" />
            </div>
            <div v-if="top3.length === 0">
              <h2 style="text-align: center">Vēl neviens lietotajs nav novērtējis nevienu lietotāju :(</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeaderboardPage',
  layout: 'NavigationLayout',
  data () {
    return {
      top3: [],
      topUsers: [],
      currentPage: null,
      lastPage: null,
      debounce: true,
      isUsersNotExist: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollEvent)
  },
  beforeMount () {
    this.$axios.get('/leaderboard').then((response) => {
      this.currentPage = response.data.meta.current_page
      this.lastPage = response.data.meta.last_page
      this.topUsers = response.data.data
      this.top3 = this.topUsers.slice(0, 3)
      this.topUsers.splice(0, 3)
    })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollEvent)
  },
  methods: {
    scrollEvent () {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight && this.lastPage !== this.currentPage && this.debounce) {
        this.nextPage()
      }
    },
    async nextPage () {
      this.debounce = false
      const nextPage = this.currentPage + 1
      await this.$axios.get('/leaderboard?page=' + nextPage).then((response) => {
        this.currentPage = response.data.meta.current_page
        this.topUsers = this.topUsers.concat(response.data.data)
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

.box {
  width: 60%;
  margin-top: 200px;
  margin-inline: auto;
}

.triangle {
  position: relative;
  width: 100%;
  margin-top: 30px;
  transform: scale(1.0001, 1.03);
}

.pedestal-users {
  position: absolute;
  top: -40px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.top-users {
  width: 100%;
  background-color: #FBFDFF;
  border-radius: 0 0 13px 13px;
  font-family: Alata;
  padding: 1%;
  color: $color-black-1;
}

#user-list-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 10px;
  padding: 2.5%;
  margin-top: 50px;
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

@media only screen and (max-width: 1600px) {
  .top-users > div {
    margin-top: 100px;
  }
}

@media only screen and (max-width: 1200px) {
  .top-users > div {
    margin-top: 100px;
  }
}

@media only screen and (max-width: 920px) {
  .top-users > div {
    margin-top: 80px;
  }
  .pedestal-users {
    top: -70px;
  }
  .triangle {
    transform: scale(1.0001, 1.03);
  }
  .box {
    width: 90%;
  }
}

@media only screen and (max-width: 585px) {
  #user-list-container {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  .triangle {
    transform: scale(1.0001, 1.03);
  }
  .box {
    width: 95%;
  }
}
</style>
