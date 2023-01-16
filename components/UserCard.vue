<template>
  <div class="user-container">
    <div>
      <img :src="user.avatar">
    </div>
    <div class="messages-profile-data">
      <h4>{{ user.firstname + ' ' + user.lastname }}</h4>
<!--      <p>{{ users.lastMessage }}</p>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: ['user']
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

.user-container {
  display: flex;
  align-items: center;
  gap: 20px;
  font-family: Alata;
  color: $color-black-1;
}

.user-container > div > img {
  height: 80px;
  width: 80px;
  border-radius: 50%;
  box-shadow: 0px 2.43px 13px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

.messages-profile-data > h4 {
  margin: 0;
}

.messages-profile-data > p {
  margin: 0;
  font-size: 14px;
}
</style>
