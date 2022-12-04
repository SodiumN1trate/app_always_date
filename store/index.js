import axios from 'axios'

export const state = () => ({
  token: localStorage.getItem('token') || null,
  targetUser: null,
  popupText: null,
  popupType: null,
  popUpShow: false,
  popUpShowTime: null,
  timeout: false
})

export const getter = {
  getToken (state) {
    return state.token
  }
}

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setTargetUser (state, user) {
    state.targetUser = user
  },
  setPopup (state, popup) {
    if (state.popUpShow) {
      console.log('das')
      return 0
    }
    state.popupText = popup.text
    state.popupType = popup.type
    state.popUpShowTime = popup.second || 2
    state.popUpShow = true
  },
  togglePopup (state, status) {
    state.popUpShow = status
  },
  setTimeout (state, status) {
    state.timeout = status
  }
}

export const actions = {
  async authorize () {
    const data = await axios.get(process.env.API_ADDRESS + '/authorize')
    location.href = data.data.data.redirect_url
  },
  async getRandomUser (context) {
    await this.$axios.get('/random_user').then((response) => {
      context.commit('setTargetUser', response.data.data)
      return response.data.data
    }).catch((e) => {
      alert(e)
      return 0
    })
  },
  async match (context, payload) {
    // type = 1 -> like, type = 0 -> dislike
    await this.$axios.post('/match', payload).then((response) => {
      if (response.data.data.is_match) {
        context.commit('setPopup', {
          type: 'success',
          text: 'Sakritība'
        })
      } else {
        context.dispatch('getRandomUser')
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
    console.log('12321')
    document.body.style.pointerEvents = 'none'
    document.body.style.userSelect = 'none'
    setTimeout(() => {
      document.body.style.pointerEvents = 'auto'
      document.body.style.userSelect = 'auto'
    }, seconds * 1000)
  }
}
