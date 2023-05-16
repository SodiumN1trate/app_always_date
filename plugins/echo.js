import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')
export default (_, inject) => {
  const echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.PUSHER_KEY, // .env
    disableStats: true,
    cluster: 'eu',
    enable_client_messages: true,
    encrypted: false,
    authEndpoint: process.env.API_ADDRESS + '/broadcasting/auth',
    enabledTransports: ['ws', 'wss'],
    auth: {
      headers: {
        Accept: 'application/json',
        Authorization: localStorage.getItem('auth._token.local')
      }
    }
  })

  inject('echo', echo)
}
