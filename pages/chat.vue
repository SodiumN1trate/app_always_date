<template>
  <div class="chat-container" v-show="$auth.user?.data.id">
    <UserSelect @change="selectChatGroup" />
    <div class="box" v-if="chatGroup">
      <div class="messages-container">
        <div
          :class="{'date-label': !message?.user, 'user-message': message?.user && message.user === $auth.user.data.id, 'recipient-message': message?.user && message.user !== $auth.user.data.id}"
          v-for="(message, index) in messages"
          :key="index"
        >
          <div v-if="message.message" class="message">
            <span>{{ message.message }}</span>
            <span class="time">{{ message.time }}</span>
          </div>
          <span v-else-if="message.created_at">{{ message.created_at }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chat',
  layout: 'NavigationLayout',
  data () {
    return {
      messages: [],
      chatGroup: null
    }
  },
  methods: {
    async selectChatGroup (id) {
      this.chatGroup = id
      await this.$axios.get(`/chat_room_messages/${id}`).then((response) => {
        this.messages = response.data.data
      })
    }
  },
  async mounted () {
    //
  }
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

.chat-container {
  display: flex;
  gap: 10px;
  width: calc(100% - 50px);
  margin-left: 50px;
  margin-top: 100px;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 60px;
}

.box {
  width: 40%;
  background-color: #FBFDFF;
  border: solid 1px $color-grey-0;
  border-radius: 13px;
  padding: 1%;
  font-family: Alata;
  color: $color-black-1;
}

.messages-container {
  background-color: #fff8f8;
  width: 100%;
  height: 600px;
  border-radius: 11px;
  border: solid 1px $color-grey-0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 10px;
  padding: 10px 8px;
}

.user-message {
  align-self: flex-end;
  background-color: #FFBABA;
  padding: 3px 20px 5px 8px;
  border-radius: 11px 11px 0px 11px;
  max-width: 70%;
}

.recipient-message {
  align-self: flex-start;
  background-color: #dadada;
  padding: 3px 5px 5px 20px;
  border-radius: 11px 11px 11px 0px;
  max-width: 70%;
}

.date-label {
  color: $color-grey-0;
  align-self: center;
  margin-top: 20px;
}

.messages-container::-webkit-scrollbar-track, .add-comment-form > div > textarea::-webkit-scrollbar-track {
  background-color: #FBFDFF;
}

.messages-container::-webkit-scrollbar, .add-comment-form > div > textarea::-webkit-scrollbar {
  width: 5px;
}

.messages-container::-webkit-scrollbar-thumb, .add-comment-form > div > textarea::-webkit-scrollbar-thumb {
  border-radius: 10px;
  //box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #FFC5C5;
}

.message {
  display: flex;
  flex-direction: column;
}

.time {
  font-size: 11px;
}

.user-message > .message > .time {
  align-self: flex-start;
}

.recipient-message > .message > .time {
  align-self: flex-end;
}
</style>
