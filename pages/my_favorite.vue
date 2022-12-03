<template>
  <div>
    <div class="box">
      <h2>Mani favorīti</h2>
      <div id="user-list-container">
        <div v-for="(user) in favorites" :key="user.id" class="leaderboard-user">
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
</template>

<script>
export default {
  name: 'MyFavorite',
  layout: 'NavigationLayout',
  data () {
    return {
      favorites: [
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
