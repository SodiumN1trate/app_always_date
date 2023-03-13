<template>
  <div class="user-list-container">
    <img class="profile-image" :class="{ 'topUsers': showTop }" :src="user.avatar" @click="toProfile()">
    <div class="user-info">
      <div class="user-data">
        <h3 @click="toProfile()">{{ user.firstname }} {{ user.lastname }}</h3>
        <p>{{ user.about_me }}</p>
      </div>
      <div class="statistic">
        <div class="stars" @mouseover="isHover = true" @mouseleave="isHover = false">
          <img style="user-select: none" src="../static/svg/Star.svg">
          <p>{{ user.rating }}</p>
          <transition name="vote">
            <div v-show="isHover" ref="userVotes" class="vote-hover">
              <p>{{ `${user.rate_count} vērtējumi` }}</p>
            </div>
          </transition>
        </div>
        <div class="experience">
          <img style="user-select: none" src="../static/svg/Book.svg">
          <p>{{ user.read_school_exp }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLeaderboard',
  props: ['propUser', 'showTop'],
  data () {
    return {
      user: this.propUser,
      isHover: false
    }
  },
  mounted () {
    this.user.about_me = this.user.about_me.slice(0, 100) + '...'
  },
  methods: {
    toProfile () {
      this.$router.push('/users/' + this.user.id)
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

.user-list-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

.profile-image {
  object-fit: cover;
  border-radius:100%;
  height: 110px;
  width: 110px;
  margin-left: 5px;
  box-shadow: 0px 4px 17px rgba(0, 0, 0, 0.1);
  user-select: none;
  flex-shrink: 0;
  cursor: pointer;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-data {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
  font-family: Alata;
  color: $color-black-2;
}

.user-data > h3 {
  color: $color-black-2;
  cursor: pointer;
}

.user-data > p {
  color: $color-black-3;
}

.statistic {
  display: flex;
  gap: 15px;
}

.statistic > div {
  display: flex;
  gap: 5px;
  text-align: center;
  margin-top: -0.5%;
}

.statistic > div > img {
  height: 24px;
  margin: auto;
}

.statistic > div > p {
  margin: auto;
}

.stars {
  position: relative;
  color: #FFB500;
  cursor: help;
}

.vote-hover {
  position: absolute;
  margin-top: 30px;
  background-color: $color-white-2;
  border: solid 1px $color-grey-0;
  border-radius: 5px;
  width: 190px;
}

.vote-enter-active,
.vote-leave-active {
  transition: opacity .2s ease;
}

.vote-enter,
.vote-leave-to {
  opacity: 0;
}

.vote-hover > p {
  color: $color-black-2;
  margin-bottom: 0;
}

.experience {
  color: #8DB4FF;
}
</style>
