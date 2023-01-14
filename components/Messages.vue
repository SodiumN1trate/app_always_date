<template>
  <div id="message-container">
    <div v-if="message.date_title" class="date">
      <div />
      <p>{{ message.date }}</p>
      <div />
    </div>
    <div v-if="message.is_auth_user" class="auth-user-message-outer">
      <div class="message auth-user-message">
        <p>{{ message.message }}</p>
      </div>
      <div class="time auth-time">
        <p>{{ message.time }}</p>
      </div>
    </div>
    <div v-else class="user-message-outer">
      <div class="message user-message">
        <p>{{ message.message }}</p>
      </div>
      <div class="time user-time">
        <p>{{ message.time }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersMessages',
  props: ['message']
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

#message-container {
  width: 100%;
  margin-bottom: 20px;
}

.auth-user-message-outer {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: flex-end
}

.user-message-outer {
  display: flex;
  justify-content: start;
  flex-direction: column;
}

.date {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-inline: auto;
  width: 100%;
}

.date > p {
  color: $color-grey-4;
  margin-bottom: 3px;
}

.date > div {
  border: solid 1px $color-grey-2;
  width: inherit;
}

.message {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 16px;
  width: fit-content;
  min-width: 100px;
  max-width: 250px;
  font-family: NotoSans;
}

.message > p {
  margin: 0;
}

.auth-user-message {
  background-color: pink;
  border-bottom-right-radius: 3px;
  color: white;
  float: right;
}

.user-message {
  background-color: grey;
  border-bottom-left-radius: 3px;
  color: white;
  float: left;
}

.time {
  font-size: 12px;
  color: $color-grey-4;
}

.auth-time {
  float: right;
}

.user-time {
  float: left;
}
</style>
