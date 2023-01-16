import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')
export default (_, inject) => {
  console.log(process.env.API_ADDRESS)
  console.log(localStorage.getItem('auth._token.local'))
  const echo = new Echo({
    broadcaster: 'pusher',
    key: 'local1', // .env
    wsHost: 'localhost',
    wsPort: 6001,
    disableStats: true,
    cluster: 'mt1',
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
