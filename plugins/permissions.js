import axios from 'axios'
import Vue from 'vue'

const config = {
  headers: {
    Accept: 'application/json',
    Authorization: localStorage.getItem('auth._token.local')
  }
}

axios.get(process.env.API_ADDRESS + '/me', config).then((response) => {
  const perms = response.data.data.permissions.map((perm) => {
    return perm.name
  })
  localStorage.setItem('permissions', JSON.stringify(perms))

  localStorage.setItem('roles', JSON.stringify(response.data.data.roles))
})

Vue.directive('can-permission', {
  inserted: (el, binding, vnode) => {
    if (binding.value && !JSON.parse(localStorage.getItem('permissions'))
      .includes(binding.value
        .replace(/'/g, '')
        .replace(/"/g, ''))) {
      vnode.elm.style.display = 'none'
    }
  }
})

Vue.directive('can-role', {
  inserted: (el, binding, vnode) => {
    if (binding.value && !JSON.parse(localStorage.getItem('roles'))
      .includes(binding.value)) {
      vnode.elm.style.display = 'none'
    }
  }
})
