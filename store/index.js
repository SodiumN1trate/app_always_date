import axios from 'axios'

export const state = () => ({
  token: localStorage.getItem('token') || null
})

export const getter = {
  getToken (state) {
    return state.token
  }
}

export const mutations = {
  setToken (state, token) {
    state.token = token
  }
}

export const actions = {
  async authorize () {
    const data = await axios.get(process.env.API_ADDRESS + '/authorize')
    location.href = data.data.data.redirect_url
  }
}
