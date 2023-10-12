<template>
  <div class="chat-group-box">
    <h2>Lietotāji</h2>
    <div class="users">
      <div class="user" v-for="user in users" :key="user.id" @click="changeUser(user.chat_room_id)" :class="{'active': selected === user.chat_room_id}">
        <img class="user-avatar" :src="user.avatar">
        <div>
          <span class="user-name">{{ user.firstname }} {{ user.lastname }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: [],
      selected: null
    }
  },
  async mounted () {
    await this.$axios.get('/get_users_chats').then((response) => {
      this.users = response.data.data
    })
  },
  methods: {
    changeUser (id) {
      this.$emit('change', id)
      this.selected = id
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

.chat-group-box {
  width: 325px;
  background-color: #FBFDFF;
  border: solid 1px $color-grey-0;
  border-radius: 13px;
  padding: 1%;
  font-family: Alata;
  color: $color-black-1;
}

.users {
  overflow-y: auto;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-right: 10px;
}

.users::-webkit-scrollbar-track, .add-comment-form > div > textarea::-webkit-scrollbar-track {
  background-color: #FBFDFF;
}

.users::-webkit-scrollbar, .add-comment-form > div > textarea::-webkit-scrollbar {
  width: 5px;
}

.users::-webkit-scrollbar-thumb, .add-comment-form > div > textarea::-webkit-scrollbar-thumb {
  border-radius: 10px;
  //box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #FFC5C5;
}

.user {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #e5e5e5;
  padding: 8px;
  width: 100%;
  border-radius: 11px;
  cursor: pointer;
  transition: .5s all;
}

.active {
  border: 1px solid #FFC5C5;
  box-shadow: 0px 2.50px 13.77px rgba(0, 0, 0, 0.03);
}

.user-name {
  font-size: 18px;
}

.user-avatar {
  width: 75px;
  height: 75px;
  border-radius: 50%;
}
</style>
