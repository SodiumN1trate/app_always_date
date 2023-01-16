<template>
  <div id="messages-container">
    <div v-show="showChatsNavigation" class="messages-navigation">
      <div class="messages-search">
        <input placeholder="Search...">
        <span class="icon-search" />
      </div>
      <div class="messages-user-chats">
        <div
          v-for="chatRoom in chatRooms"
          :key="chatRoom.user.id"
          @click="openUserChat(chatRoom)"
        >
          <UserCard :user="chatRoom.user" />
        </div>
      </div>
    </div>
    <div v-show="!selectedChatRoom && showNotSelectedUser" id="not-selected-user">
      <div>
        <h1>Lai sāktu saraksti, izvēlaties kādu no lietotājiem!</h1>
      </div>
    </div>
    <div v-show="selectedChatRoom || showChat" class="messages-chat">
      <div class="chat-header">
        <span v-show="showChat" class="icon-arrow-down" @click="closeUserChat()" />
        <UserCard v-if="selectedChatRoom" :user="selectedChatRoom.user" />
      </div>
      <div ref="chat" class="chat">
        <Messages
          v-for="message in messages"
          :key="message.id"
          :message="message"
        />
      </div>
      <div class="messages-chat-input">
        <div>
          <input v-model="chatInput" placeholder="Write some message.." @keyup.enter="sendMessage()">
          <div>
            <span class="icon-attach" />
            <span class="icon-smile" />
          </div>
        </div>
        <span class="icon-send" @click="sendMessage()" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatPage',
  layout: 'NavigationLayout',
  data () {
    return {
      chatRooms: [],
      selectedChatRoom: '',
      messages: [],
      chatInput: '',
      showChatsNavigation: true,
      showChat: false,
      showNotSelectedUser: true
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.onResize()
    })
    window.addEventListener('resize', this.onResize)
    this.checkPageStatus()
    this.getUsers()
    if (this.$route.query.chatRoom) {
      this.$axios.get('/chat_room/' + this.$route.query.chatRoom).then((res) => {
        this.openUserChat(res.data.data)
      })
    }
  },
  updated () {
    this.checkPageStatus()
  },
  methods: {
    listenChatChannel () {
      this.$echo.private('chat.' + this.selectedChatRoom.id)
        .listen('MessageEvent', (e) => {
          this.getUserMessage(e)
        })
    },
    async getUserMessage (message) {
      await this.$axios.get('/get_message/' + message.messageId).then((res) => {
        this.messages.push(res.data.data)
        this.checkIsDateTitle()
      })
    },
    checkPageStatus () {
      if (window.matchMedia('(max-width: 850px)').matches) {
        this.showNotSelectedUser = false
        if (this.selectedChatRoom) {
          this.showChatsNavigation = false
          this.showChat = true
        } else if (!this.selectedChatRoom) {
          this.showChatsNavigation = true
          this.showChat = false
        }
      } else {
        this.showNotSelectedUser = true
        this.showChatsNavigation = true
        this.showChat = false
      }
    },
    onResize () {
      let resizeTimeout
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(() => {
          this.checkPageStatus()
        }, 100)
      })
    },
    scrollBottom () {
      this.$nextTick(() => {
        this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
      })
    },
    async getUsers () {
      await this.$axios.get('/get_users_chats').then((res) => {
        this.chatRooms = res.data.data
      })
    },
    async openUserChat (chatRoom) {
      if (this.selectedChatRoom.id || chatRoom.id === this.selectedChatRoom.id) {
        return 0
      } else if (!this.selectedChatRoom || chatRoom.user.id !== this.selectedChatRoom.user.id) {
        this.$echo.leave('chat.' + this.selectedChatRoom.id)
      }
      console.log(1)
      this.selectedChatRoom = chatRoom
      this.listenChatChannel()
      await this.$axios.get('/chat_room_messages/' + chatRoom.id).then((res) => {
        this.messages = res.data.data
        this.getMessagesDateTime()
      })
    },
    getMessagesDateTime () {
      for (let i = 0; i < this.messages.length; i++) {
        if (!this.messages[i - 1] || (this.messages[i - 1] && this.messages[i].date !== this.messages[i - 1].date)) {
          this.messages[i].date_title = this.messages[i].date
        }
        if (this.$auth.$state.user.data.id === this.messages[i].user) {
          this.messages[i].is_auth_user = true
        }
      }
      this.scrollBottom()
    },
    closeUserChat () {
      this.selectedChatRoom = ''
    },
    async sendMessage () {
      await this.$axios.post('/message', {
        chat_room_id: this.selectedChatRoom.id,
        message: this.chatInput
      })
      this.chatInput = ''
    },
    checkIsDateTitle () {
      if (!this.messages[this.messages.length - 2] || (this.messages[this.messages.length - 2] && this.messages[this.messages.length - 1].date !== this.messages[this.messages.length - 2].date)) {
        this.messages[this.messages.length - 1].date_title = this.messages[this.messages.length - 1].date
      }
      if (this.$auth.$state.user.data.id === this.messages[this.messages.length - 1].user) {
        this.messages[this.messages.length - 1].is_auth_user = true
      }
      this.scrollBottom()
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

#messages-container {
  display: flex;
  width: 70%;
  margin-inline: auto;
  margin-top: 150px;
  transition: 0.5s;
}

.messages-navigation {
  display: flex;
  flex-direction: column;
  max-width: 35%;
  min-width: 354px;
}

.messages-search-bar {
  width: 100%;
}

.messages-search {
  position: relative;
  border-bottom: solid 1px $color-grey-0;
}

.messages-search > input {
  width: 100%;
  border: none;
  outline: none;
  height: 50px;
  padding-left: 20px;
  padding-right: 50px;
  background-color: white;
  border-top-left-radius: 16px;
  border-top: solid 1px $color-grey-0;
  border-left: solid 1px $color-grey-0;
}

.messages-search > span {
  position: absolute;
  left: 90%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  cursor: pointer;
}

.messages-user-chats {
  overflow: scroll;
  scrollbar-width: none;
  height: 700px;
  background-color: white;
  border-bottom-left-radius: 16px;
}

.messages-user-chats::-webkit-scrollbar {
  background: transparent;
  width: 0px;
}

.messages-user-chats > div {
  padding: 10px 20px;
  cursor: pointer;
  user-select: none;
  border-bottom: solid 1px $color-grey-0;
}

#not-selected-user {
  background-color: #FFFBFB;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px $color-grey-0;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  width: 70%;
  min-height: 700px;
  min-width: 354px;
}

#not-selected-user > div {
  width: fit-content;
}

#not-selected-user > div > h1 {
  text-align: center;
}

.messages-chat {
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  background-color: #FFFBFB;
  border: solid 1px $color-grey-0;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}
.messages-chat > div:first-child {
  background-color: white;
  border-top-right-radius: 16px;
}

.messages-chat > div:first-child,
.messages-chat > div:nth-child(2),
{
  border-bottom: solid 1px $color-grey-0;
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
}

.chat-header > span {
  font-size: 32px;
  rotate: 90deg;
  cursor: pointer;
}

.chat {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  overflow: auto;
  max-height: 580px;
  height: 100%;
  scroll-behavior: smooth;
  //Firefox
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
  transition: all 0.5s;
}

.chat:hover {
  scrollbar-color: $color-pink-3 rgba(0, 0, 0, 0);
}

.chat::-webkit-scrollbar {
  width: 10px;
  background-color: rgba(0, 0, 0, 0);
  -webkit-transition: all 0.5s;
}

.chat::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0);
  -webkit-transition: all 0.5s;
}

.chat:hover::-webkit-scrollbar-thumb {
  background-color: $color-pink-3;
}

.chat::-webkit-scrollbar-thumb:hover {
  background-color: rgba($color-pink-3, 0.8);
}

.chat::-webkit-scrollbar-thumb:active {
  background-color: rgba($color-pink-3, 0.8);
}

.messages-chat-input {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  gap: 20px;
  align-items: center;
  background-color: white;
  border-bottom-right-radius: 16px;
}

.messages-chat-input > div {
  position: relative;
  width: 90%;
}

.messages-chat-input > div > input {
  width: 100%;
  padding: 10px;
  border-radius: 37px;
  border: solid 1px $color-grey-0;
  outline: none;
  font-size: 18px;
  padding-left: 20px;
  padding-right: 120px;
}

.messages-chat-input > div > input:focus {
  outline: solid 2px $color-grey-3;
}

.messages-chat-input > div > div {
  display: flex;
  gap: 15px;
  position: absolute;
  top: 50%;
  right: 3%;
  transform: translateY(-50%);
}

.messages-chat-input > div > div > span {
  font-size: 32px;
  color: $color-grey-5;
  cursor: pointer;
}

.messages-chat-input > span {
  font-size: 48px;
  color: $color-pink-4;
  cursor: pointer;
}

@media only screen and (max-width: 850px) {
  .messages-navigation {
    margin-inline: auto;
    border-radius: 16px;
    max-width: none;
  }
  #messages-container {
    width: 95%;
    margin-top: 80px;
  }
  .messages-search > input {
    border-top-right-radius: 16px;
  }
  .messages-user-chats {
    border-bottom-right-radius: 16px;
  }
  .messages-chat {
    flex: initial;
    margin-inline: auto;
    max-height: 85vh;
    min-height: 500px;
    border-radius: 16px;
  }
  .chat-header {
    border-top-left-radius: 16px;
  }
  .messages-chat-input {
    border-bottom-left-radius: 16px;
    padding: 5px 5px;
    gap: 10px;
  }
  .messages-chat-input > span {
    font-size: 42px;
  }
  .messages-chat-input > div > input {
    font-size: 15px;
    padding: 10px 75px 10px 10px;
  }
  .messages-chat-input > div > div > span {
    font-size: 24px;
  }
}
</style>
