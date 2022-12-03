<template>
  <div>
    <button class="more-options-button" @click="showUserSettings = !showUserSettings">
      <span class="icon-dots" />
    </button>
    <div class="user-options-dropdown-container">
      <transition name="userSettings">
        <div v-show="showUserSettings" class="user-options-dropdown">
          <button @click="reportUser">
            <span class="icon-circle-banned" />
            <span>Iesniegt sūdzību</span>
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoreOptions',
  data () {
    return {
      showUserSettings: false
    }
  },
  methods: {
    reportUser () {
      this.$emit('show-popup')
      this.showUserSettings = false
    }
  }
}
</script>

<style lang="scss">
@use 'assets/sass/abstract' as *;

.more-options-button {
  position: relative;
  width: 38px;
  background-color: rgba(0, 0, 0, 0);
  margin-left: 20px;
  padding: 5px;
  border: solid 2px $color-grey-0;
  border-radius: 100%;
}

.more-options-button > span {
  font-size: 22px;
  vertical-align: calc(50% - 16px);
  color: $color-grey-3;
}

.user-options-dropdown-container {
  position: absolute;
  margin-top: 4px;
  transition: showSettings .5s;
}

.user-options-dropdown > button {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: -120px;
  background-color: $color-white-2;
  border: solid 1px $color-grey-0;
  color: $color-pink-4;
  border-bottom-left-radius: 13px;
  border-bottom-right-radius: 13px;
  border-top-left-radius: 13px;
  padding: 5px 5px 5px 5px;
}

.user-options-dropdown > button > span:first-child {
  font-size: 20px;
}
</style>
