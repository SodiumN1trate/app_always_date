<template>
  <div id="content" v-if="$store.state.targetUser">
    <div id="box">
      <div>
        <div id="photo-side">
          <div id="match-photo" :style="{backgroundImage: `url(${$store.state.targetUser.avatar})`}">

          </div>
<!--          <img id="match-photo" :src="$store.state.targetUser.avatar">-->
          <div id="buttons">
            <div class="small-button">
              <span class="icon-previous"></span>
            </div>
            <div class="large-button" @click="$store.dispatch('match', { user_2: $store.state.targetUser.id, user_1_rating: false , filter: filter})">
              <span class="icon-refuse"></span>
            </div>
            <div class="large-button" @click="$store.dispatch('match', { user_2: $store.state.targetUser.id, user_1_rating: true, filter: filter })">
              <span class="icon-heart-filled"></span>
            </div>
            <div class="small-button">
              <span class="icon-star-filled"></span>
            </div>
          </div>
        </div>
        <UserFiltration @filter-submit="filterSubmit" />
      </div>
      <div id="user-data">
        <div>
          <h1>{{ $store.state.targetUser.firstname }} {{ $store.state.targetUser.lastname }}, {{ $store.state.targetUser.age }}</h1>
          <p>Esmu enerģētiska, patīk ceļot, ēst, sportot, klausīties mūziku un runāt ar cilvēkiem 😉</p>
        </div>
        <UserData
          location="Latvia, Rīga"
          :date="$store.state.targetUser.birthday"
          :star="$store.state.targetUser.rating"
          :exp="$store.state.targetUser.read_school_exp"
        />
        <h2>Par mani</h2>
        <p>{{ $store.state.targetUser.about_me }}</p>
        <div>
          <h3>Bildes</h3>
          <UserPhotos />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeAsFavorite',
  layout: 'NavigationLayout',
  auth: true,
  data () {
    return {
      user: this.$auth.$state.user.data,
      filter: null
    }
  },
  created () {
    this.$store.dispatch('getRandomUser', this.filter)
  },
  methods: {
    filterSubmit (form) {
      try {
        this.filter = form
        this.$store.dispatch('getRandomUser', this.filter)
        this.$store.commit('setPopup', {
          type: 'success',
          text: 'Filtrs uzlikts!'
        })
      } catch (e) {
        this.$store.commit('setPopup', {
          type: 'danger',
          text: 'Nav tādu lietotāju!'
        })
        this.filter = null
      }
    }
  }
}
</script>

<style lang="scss">
@use 'assets/sass/abstract' as *;

#box {
  display: flex;
  justify-content: space-between;
  gap: 2%;
}

#box > div:first-child {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
}

#match-photo {
  width: 350px;
  height: 450px;
  background-position: center;
  background-size: 350px 450px;
}

#photo-side {
  box-shadow: 0px 2.43px 10.53px rgba(0, 0, 0, 0.06);
  border-radius: 10.53px;
}

#buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4%;
}

.large-button {
  border: 2px solid #FFE8E8;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  cursor: pointer;
}

.small-button {
  border: 2px solid #FFE8E8;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 65px;
  cursor: pointer;
}

.icon-heart-filled {
  color: #FF8888;
  font-size:  35px;
}

.icon-refuse {
  color: #FFDADA;
  font-size:  27px;
}

.icon-star-filled {
  margin-top: -3px;
  color: #FFD748;
  font-size:  30px;
}

.icon-previous{
  color: #FFDADA;
  font-size:  20px;
}

#user-data {
  width: 100%;
  color: $color-black-2;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#user-data > h1 {
   font-family: Alata;
 }

.user-data-main {
  display: flex;
  gap: 20px;
  width: 100%;
}

.user-data-main > div {
  display: flex;
  justify-content: center;
  height: 65%;
  gap: 5px;
  align-items: flex-start;
  flex-wrap: wrap;
  font-family: Alata;
  color: $color-grey-3;
}

.user-data-main > div > i {
  font-size: 20px;
  height: 20px;
}

.user-data-main > div > p {
  text-align: center;
}

@media only screen and (max-width: 1000px) {
  #match-content {
    width: 90%;
    margin-right: auto;
    margin-left: auto;
  }
  #box {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .user-data {
    justify-content: center;
  }

  .user-data-main {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
