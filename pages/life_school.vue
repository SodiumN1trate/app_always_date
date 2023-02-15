<template>
  <div id="content">
    <div id="box">
      <h2>Dzīves skola</h2>
      <LifeSchoolCarousel2 :previews="lifeSchools" :index="lifeSchoolIndex" @change="changeLifeSchool"/>
      <div class="article" v-if="lifeSchool">
        <div class="text-content">
          <h2>{{ lifeSchool.title }}</h2>
        </div>
        <div class="vertical-line"></div>
        <div class="text">
          {{ lifeSchool.description }}
        </div>
      </div>
      <button @click="addLifeSchoolExp" v-if="lifeSchools.length - 1 === lifeSchoolIndex">Nakamais</button>
      <div class="comments-container">
        <h1>Komentāri</h1>
        <div class="add-comment-form">
          <h3>Pievienot komentāru</h3>
          <div>
            <textarea v-model="form.description" placeholder="Komentāra teksts"></textarea>
            <p
              :class="{ shake: form.description.length > 255 }"
            >{{ form.description.length }}/255</p>
          </div>
          <button @click="addComment">Publicēt</button>
        </div>
        <div id="comments">
          <h3>Pievienot komentāru</h3>
          <div class="comment" v-for="comment in comments" :key="comment.id">
            <div class="comment-rate">
              <span :class="{ 'icon-vote-up-fill': comment.voted, 'icon-vote-up-stroke': comment.voted === false || comment.voted === null }" @click="commentVote(comment.id, true)"></span>
              <p>{{ comment.votes }}</p>
              <span :class="{ 'icon-vote-down-fill': comment.voted === false, 'icon-vote-down-stroke': comment.voted === true || comment.voted === null  }" @click="commentVote(comment.id, false)"></span>
            </div>
            <img :src="comment.author.avatar">
            <div class="comment-data">
              <div>
                <h4>{{ comment.author.firstname }} {{ comment.author.lastname }}</h4>
                <p>{{ comment.created_at }}</p>
              </div>
              <p>{{ comment.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="popups">
      <PopUp
        v-for="(pop, index) in $store.state.popups"
        :key="index"
        :popupType="pop.popupType"
        :popupText="pop.popupText"
        :popupShowTime="pop.popupShowTime + index / 2"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'LifeSchool',
  layout: 'NavigationLayout',
  data () {
    return {
      form: {
        description: ''
      },
      lifeSchoolIndex: null,
      lifeSchool: null,
      lifeSchools: [],
      comments: []
    }
  },
  async beforeMount () {
    await this.getLifeSchools()
    this.changeLifeSchool(this.lifeSchools.length - 1)
  },
  methods: {
    async getLifeSchools () {
      await this.$axios.get('/life_schools').then((e) => {
        this.lifeSchools = e.data.data
      })
    },
    changeLifeSchool (index) {
      this.getLifeSchools()
      this.lifeSchool = this.lifeSchools[index]
      this.lifeSchoolIndex = index
      this.getLifeSchoolComments()
    },
    getLifeSchoolComments () {
      this.$axios.get(`/life_school_comments?article_id=${this.lifeSchool.id}`).then((response) => {
        this.comments = response.data.data
      })
    },
    addLifeSchoolExp () {
      this.$axios.get('/life_school_experience').then((response) => {
        this.changeLifeSchool(this.lifeSchoolIndex + 1)
        console.log('success')
      }).catch((e) => {
        this.$store.commit('setPopup', {
          text: e.response.data.message,
          type: 'danger',
          seconds: 5
        })
      })
    },
    addComment () {
      this.form.article_id = this.lifeSchool.id
      this.$axios.post('/life_school_comments', this.form).then((response) => {
        this.form.description = ''
        this.getLifeSchoolComments()
      })
    },
    commentVote (commentId, vote) {
      const data = {
        life_school_comment_id: commentId,
        rating: vote
      }
      this.$axios.post('/life_school_comments/rate', data).then((response) => {
        this.getLifeSchoolComments()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

body {
  background-color: $color-white-1;
}

#box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  overflow: hidden;
}

.vertical-line {
  height: 400px;
  border-radius: 10px;
  width: 4px;
  background-color: #FFDFDF;
}

.article {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 15px;
}

#box > button {
  background: #FFD2D2;
  box-shadow: 0px 2.43px 10.53px rgba(0, 0, 0, 0.06);
  border-radius: 10.53px;
  border: none;
  outline: none;
  color: white;
  align-self: flex-end;
  padding: 5px 20px 5px 20px;
  transition: .7s;
}

#box > button:hover {
  background: #FFB9B9;
  box-shadow: 0px 2.43px 10.53px rgba(0, 0, 0, 0.06);
  border-radius: 10.53px;
  border: none;
  outline: none;
  color: white;
  align-self: flex-end;
  padding: 5px 20px 5px 20px;
}

.text-content {
  width: 35%;
}

.text-content > h2 {
  font-family: Alata;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  color: #FFBCBC;
}

.text {
  width: 100%;
  height: 450px;
  box-shadow: 2px 4px 19px -14px rgba(89, 89, 89, 0.65);
  -webkit-box-shadow: 2px 4px 19px -14px rgba(89, 89, 89, 0.65);
  -moz-box-shadow: 2px 14px 4px -14px rgba(89, 89, 89, 0.65);
  text-wrap: normal;
  padding: 5px 15px 10px 5px;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-track: 3px;
}

.text::-webkit-scrollbar-track, .add-comment-form > div > textarea::-webkit-scrollbar-track {
  background-color: #FBFDFF;
}

.text::-webkit-scrollbar, .add-comment-form > div > textarea::-webkit-scrollbar {
  width: 10px;
}

.text::-webkit-scrollbar-thumb, .add-comment-form > div > textarea::-webkit-scrollbar-thumb {
  border-radius: 10px;
  //box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #FFC5C5;
}

.text > h1, .text > h2, .comments-container > h1  {
  font-family: Alata;
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  color: #FFB3B3;
}

.text > h2  {
  font-size: 24px;
}

.text > h2, .text > p {
  margin-left: 10px;
}

.comments-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
}

.comments-container > h1 {
  align-self: flex-start ;
}

.add-comment-form {
  display: flex;
  flex-direction: column;
  width: 60%;
  gap: 10px;
}

#comments > h3, .add-comment-form > h3 {
  margin: 0;
  padding: 0;
  color: #FFBABA;
  font-family: Alata;
}

.add-comment-form > button {
  background: #FFD2D2;
  box-shadow: 0px 2.43px 10.53px rgba(0, 0, 0, 0.06);
  border-radius: 10.53px;
  border: none;
  outline: none;
  color: white;
  align-self: flex-end;
  padding: 5px 20px 5px 20px;
}

.add-comment-form > div {
  display: flex;
  flex-direction: column;
  background: #FBFDFF;
  box-shadow: 0px 2.43px 13px rgba(0, 0, 0, 0.1);
  border-radius: 10.53px;
  width: 100%;
  height: 160px;
  gap: 5px;
}

.add-comment-form > div > p {
  margin: 0 10px 0 0;
  padding: 0;
  align-self: flex-end;
  font-weight: 400;
}

.add-comment-form > div > textarea {
  margin: 0;
  font-size: 16px;
  border: none;
  outline: none;
  resize: none;
  width: 100%;
  height: 130px;
  padding: 12px 20px;
  background: #FBFDFF;
  overflow-y: scroll;
}

.shake {
  color: #ff3e3e;
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

.comment {
  display: flex;
  align-items: flex-start;
  gap: 5px;
}

.comment > img {
  border-radius: 50%;
  width: 70px;
  height: 70px;
  object-fit: cover;
}

.comment-rate {
  width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.comment-rate > p {
  margin: 0;
  padding: 0;
}

.comment-rate > .icon-vote-up-fill,
.comment-rate > .icon-vote-up-stroke,
.comment-rate > .icon-vote-down-fill,
.comment-rate > .icon-vote-down-stroke {
  transition: 0.3s;
  font-size: 19px;
}

.comment-rate > .icon-vote-up-fill:hover, .comment-rate > .icon-vote-up-stroke:hover {
  transform: scale(1.2);
}

.comment-rate > .icon-vote-down-fill:hover, .comment-rate > .icon-vote-down -stroke:hover {
  transform: scale(0.8);
}

.comment-data {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.comment-data > div {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-family: Alata;
  align-items: flex-end;
  flex-wrap: wrap;
}

.comment-data > div > h4 {
  color: #A99494;
}

.comment-data > div > p {
  color: #DFD1D1;
  font-size: 14px;
}

.comment-data > p {
    color: #C2B1B1;
}

.comment-data > div > p, .comment-data > div > h4 {
  margin: 0;
  padding: 0;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

#comments {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 65%;
  gap: 20px;
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
  .text-content, .vertical-line {
    display: none;
  }
  .text {
    text-align: left;
  }
  .add-comment-form, #comments {
    width: 90%;
    text-align: left;
  }
}
</style>
