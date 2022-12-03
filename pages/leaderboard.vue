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
            <div v-for="(user) in topUsers" :key="user.id" class="leaderboard-user">
              <Leaderboard :prop-user="user" :show-top="false" />
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
      topUsers: [
        {
          id: 0,
          photo: '1',
          name: 'Markuss',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          stars: '10/10',
          votes: '12345678',
          exp: '100/100'
        },
        {
          id: 1,
          photo: '11',
          name: 'Raimonda',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          stars: '9.9/10',
          votes: '12345678',
          exp: '100/100'
        },
        {
          id: 2,
          photo: '2',
          name: 'Ārvalds',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          stars: '9.4/10',
          votes: '12345678',
          exp: '100/100'
        },
        {
          id: 3,
          photo: '22',
          name: 'Krista',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          stars: '6.0/10',
          votes: '12345678',
          exp: '100/100'
        },
        {
          id: 4,
          photo: '3',
          name: 'Krišjānis',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          stars: '5.0/10',
          votes: '12345678',
          exp: '100/100'
        },
        {
          id: 5,
          photo: '33',
          name: 'Regīna',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          stars: '4.0/10',
          votes: '12345678',
          exp: '100/100'
        },
        {
          id: 6,
          photo: '4',
          name: 'Uvis',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          stars: '4.0/10',
          votes: '12345678',
          exp: '100/100'
        },
        {
          id: 7,
          photo: '44',
          name: 'Sonora',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          stars: '4.0/10',
          votes: '12345678',
          exp: '100/100'
        },
        {
          id: 8,
          photo: '5',
          name: 'Austris',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          stars: '4.0/10',
          votes: '12345678',
          exp: '100/100'
        },
        {
          id: 9,
          photo: '55',
          name: 'Sigita',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          stars: '4.0/10',
          votes: '12345678',
          exp: '100/100'
        },
        {
          id: 10,
          photo: '6',
          name: 'Tomass',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          stars: '4.0/10',
          votes: '12345678',
          exp: '100/100'
        }
      ]
    }
  },
  beforeMount () {
    this.topUsers.slice(0, 3).filter((user) => {
      this.top3.push(user)
      this.topUsers.shift()
      return 0
    })
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

.load-more> i::before {
  animation: back-to-start 1s;
}

.load-more:hover > i::before {
  animation: rotating 1s linear infinite;
}

.load-more > i {
  margin: auto;
}

.load-more > p {
  margin: auto;
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
