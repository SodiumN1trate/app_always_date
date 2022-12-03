<template>
  <div class="user-container">
    <div>
      <img :src="`../images/${user.photo}.png`">
    </div>
    <div class="messages-profile-data">
      <h4>{{ user.name }}</h4>
      <p>{{ user.lastMessage }}</p>
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
  width: 80px;
  border-radius: 100%;
  box-shadow: 0px 2.43px 13px rgba(0, 0, 0, 0.1);
}

.messages-profile-data > h4 {
  margin: 0;
}

.messages-profile-data > p {
  margin: 0;
  font-size: 14px;
}
</style>
