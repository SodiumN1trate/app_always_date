<template>
  <div id="messages-container">
    <div v-show="showChatsNavigation" class="messages-navigation">
      <div class="messages-search">
        <input placeholder="Search...">
        <span class="icon-search" />
      </div>
      <div class="messages-user-chats">
        <div
          v-for="user in users"
          :key="user.id"
          @click="openUserChat(user)"
        >
          <UserCard :user="user" />
        </div>
      </div>
    </div>
    <div v-show="!SelectedUser && showNotSelectedUser" id="not-selected-user">
      <div>
        <h1>Lai sāktu saraksti, izvēlaties kādu no lietotājiem!</h1>
      </div>
    </div>
    <div v-show="SelectedUser || showChat" class="messages-chat">
      <div class="chat-header">
        <span v-show="showChat" class="icon-arrow-down" @click="closeUserChat()" />
        <UserCard :user="SelectedUser" />
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
          <input v-model="chatInput" placeholder="Write some message..">
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
      users: [
        {
          id: 0,
          photo: '1',
          name: 'Markuss Markuss',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          lastMessage: 'Čau, ko dari, gribēju jautāt vai tu rīt 19:00 esi aizņemts.',
          stars: '10/10',
          votes: '12345678',
          exp: '100/100'
        },
        {
          id: 1,
          photo: '11',
          name: 'Raimonda Markuss',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          lastMessage: 'Čau, ko dari, gribēju jautāt vai tu rīt 19:00 esi aizņemts.',
          stars: '9.9/10',
          votes: '12345678',
          exp: '100/100'
        },
        {
          id: 2,
          photo: '2',
          name: 'Ārvalds Markuss',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          lastMessage: 'Čau, ko dari, gribēju jautāt vai tu rīt 19:00 esi aizņemts.',
          stars: '9.4/10',
          votes: '12345678',
          exp: '100/100'
        },
        {
          id: 3,
          photo: '22',
          name: 'Krista Markuss',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          lastMessage: 'Čau, ko dari, gribēju jautāt vai tu rīt 19:00 esi aizņemts.',
          stars: '6.0/10',
          votes: '12345678',
          exp: '100/100'
        },
        {
          id: 4,
          photo: '3',
          name: 'Krišjānis Markuss',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          lastMessage: 'Čau, ko dari, gribēju jautāt vai tu rīt 19:00 esi aizņemts.',
          stars: '5.0/10',
          votes: '12345678',
          exp: '100/100'
        },
        {
          id: 5,
          photo: '33',
          name: 'Regīna Markuss',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          lastMessage: 'Čau, ko dari, gribēju jautāt vai tu rīt 19:00 esi aizņemts.',
          stars: '4.0/10',
          votes: '12345678',
          exp: '100/100'
        },
        {
          id: 6,
          photo: '4',
          name: 'Uvis Markuss',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          lastMessage: 'Čau, ko dari, gribēju jautāt vai tu rīt 19:00 esi aizņemts.',
          stars: '4.0/10',
          votes: '12345678',
          exp: '100/100'
        },
        {
          id: 7,
          photo: '44',
          name: 'Sonora Markuss',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          lastMessage: 'Čau, ko dari, gribēju jautāt vai tu rīt 19:00 esi aizņemts.',
          stars: '4.0/10',
          votes: '12345678',
          exp: '100/100'
        },
        {
          id: 8,
          photo: '5',
          name: 'Austris Markuss',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          lastMessage: 'Čau, ko dari, gribēju jautāt vai tu rīt 19:00 esi aizņemts.',
          stars: '4.0/10',
          votes: '12345678',
          exp: '100/100'
        },
        {
          id: 9,
          photo: '55',
          name: 'Sigita Markuss',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          lastMessage: 'Čau, ko dari, gribēju jautāt vai tu rīt 19:00 esi aizņemts.',
          stars: '4.0/10',
          votes: '12345678',
          exp: '100/100'
        },
        {
          id: 10,
          photo: '6',
          name: 'Tomass Markuss',
          aboutMe: 'Esmu dzīves priecīgs cilvēks, nodarbojos ar sportu un brīvaja laikā nodarbojos ar kulināriju',
          lastMessage: 'Čau, ko dari, gribēju jautāt vai tu rīt 19:00 esi aizņemts.',
          stars: '4.0/10',
          votes: '12345678',
          exp: '100/100'
        }
      ],
      SelectedUser: '',
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
    console.log(window.Echo.private('channel.3'))
    window.Echo.private('channel.3')
      .listen('MessageEvent', (e) => {
        this.messages.push(e)
        this.getMessagesDateTime()
        console.log(e)
      })
  },
  updated () {
    this.checkPageStatus()
  },
  methods: {
    checkPageStatus () {
      if (window.matchMedia('(max-width: 850px)').matches) {
        this.showNotSelectedUser = false
        if (this.SelectedUser) {
          this.showChatsNavigation = false
          this.showChat = true
        } else if (!this.SelectedUser) {
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
    async openUserChat (user) {
      this.SelectedUser = user
      await this.$axios.get('/chat_room_messages/' + '3').then((res) => {
        this.messages = res.data.data
        this.getMessagesDateTime()
      })
    },
    getMessagesDateTime () {
      for (let i = 0; i < this.messages.length; i++) {
        // this.messages[i] = this.setDateTimeToMessage(this.messages[i])
        if (!this.messages[i - 1] || (this.messages[i - 1] && this.messages[i].date !== this.messages[i - 1].date)) {
          this.messages[i].date_title = this.messages[i].date
        }
        if (this.$auth.$state.user.data.id === this.messages[i].user) {
          this.messages[i].is_auth_user = true
        }
      }
      console.log(this.messages)
      this.scrollBottom()
    },
    closeUserChat () {
      this.SelectedUser = ''
    },
    // setDateTimeToMessage (message) {
    //   const dateTime = new Date(message.created_at)
    //   message.time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    //   message.date = dateTime.toLocaleDateString()
    //   return message
    // },
    async sendMessage () {
      await this.$axios.post('/messages', {
        chat_room_id: 3,
        message: this.chatInput
      }).then((res) => {
        this.openUserChat(this.SelectedUser)
      })
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
  max-height: 700px;
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
