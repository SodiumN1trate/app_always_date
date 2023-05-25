import axios from 'axios'

export const state = () => ({
  targetUser: null,
  popups: [],
  timeout: false
})

export const getter = {
  getToken (state) {
    return state.token
  }
}

export const mutations = {
  setTargetUser (state, user) {
    state.targetUser = user
  },
  setPopup (state, popup) {
    state.popups.push({
      popupText: popup.text,
      // popupType: success || danger
      popupType: popup.type,
      popupShowTime: popup.seconds || 2
    })
  },
  removePopup (state, index) {
    state.popups.splice(index)
  },
  setTimeout (state, status) {
    state.timeout = status
  },
  setFilter (state, filter) {
    state.filter = filter
  }
}

export const actions = {
  async authorize () {
    const data = await axios.get(process.env.API_ADDRESS + '/authorize')
    location.href = data.data.data.redirect_url
  },
  async getRandomUser (context, filter) {
    if (filter === null) {
      await this.$axios.get('/random_user').then((response) => {
        context.commit('setTargetUser', response.data.data)
        return response.data.data
      }).catch((e) => {
        alert(e)
        return 0
      })
    } else {
      try {
        const rateUser = await this.$axios.get(`/random_user?without_user=${context.state.targetUser.id}&rating[0]=${filter.rating.min}&rating[1]=${filter.rating.max}&read_school_exp[0]=${filter.schoolExp.min}&read_school_exp[1]=${filter.schoolExp.max}&age[0]=${filter.age.min}&age[1]=${filter.age.max}`).then((res) => {
          return res.data.data
        })
        context.commit('setTargetUser', rateUser)
      } catch (e) {
        context.commit('setPopup', {
          type: 'danger',
          text: 'Nav tādu lietotāju!'
        })
      }
    }
  },
  async match (context, payload) {
    // type = 1 -> like, type = 0 -> dislike
    await this.$axios.post('/matches', payload).then((response) => {
      if (response.data.data.is_match) {
        context.commit('setPopup', {
          type: 'success',
          text: 'Sakritība'
        })
      } else {
        context.dispatch('getRandomUser', payload.filter)
      }
    }).catch((e) => {
      if (e.response.status === 429) {
        context.commit('setPopup', {
          type: 'danger',
          text: 'Nevajaga steigties, Jūs esat iesaldēti!',
          time: 5
        })
        context.dispatch('timeout', 5)
      } else {
        context.commit('setPopup', {
          type: 'danger',
          text: e.response.data.message
        })
      }
    })
  },
  timeout (context, seconds) {
    document.body.style.pointerEvents = 'none'
    document.body.style.userSelect = 'none'
    setTimeout(() => {
      document.body.style.pointerEvents = 'auto'
      document.body.style.userSelect = 'auto'
    }, seconds * 1000)
  }
}
