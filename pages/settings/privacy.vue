<template>
  <form class="settings-sections" @submit.prevent="updateUser()">
    <div class="settings-sections-basic-info">
      <button class="setting-cancel-button">Atsaukt</button>
      <button class="setting-save-button">Saglabāt</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'SettingsPage',
  layout: 'SettingsLayout',
  data () {
    return {
      previewImage: null,
      dropZoneColor: null,
      displayDropZone: true,
      mobileUpload: true,
      userNavBarData: {
        avatar: this.$auth.state.user.data.avatar,
        firstname: this.$auth.state.user.data.firstname,
        lastname: this.$auth.state.user.data.lastname
      },
      userData: {
        avatar: null,
        firstname: this.$auth.state.user.data.firstname,
        lastname: this.$auth.state.user.data.lastname,
        language: this.$auth.state.user.data.language,
        birthday: this.$auth.state.user.data.birthday,
        gender: this.$auth.state.user.data.gender ? { id: 1, name: 'Vīrietis' } : { id: 0, name: 'Sieviete' },
        about_me: this.$auth.state.user.data.about_me
      },
      infoModal: {
        showModal: false,
        title: '',
        description: ''
      },
      ImageCrop: {
        showModal: false,
        image: null
      }
    }
  },
  computed: {
    computedGender: {
      get () {
        return this.userData.gender
      },
      set (value) {
        this.userData.gender = value.toString()
      }
    }
  },
  methods: {
    uploadImage (e) {
      const fileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
      const image = (e.target.localName === 'input') ? e.target.files[0] : e.dataTransfer.files[0]
      if (image.size > 4000 * 1024) {
        this.infoModal.title = 'kļūda'
        this.infoModal.description = 'Faila izmērs ir pārāk liels - faila izmērs nevar pārsniegt 15MB!'
        this.infoModal.showModal = true
        return
      } else if (!fileTypes.includes(image.type)) {
        this.infoModal.title = 'kļūda'
        this.infoModal.description = 'Norādītais fails nav bildes formātā!'
        this.infoModal.showModal = true
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = (e) => {
        this.userData.avatar = image
        this.previewImage = e.target.result
        this.ImageCrop.image = e.target.result
        this.displayDropZone = false
        this.mobileUpload = false
        this.ImageCrop.showModal = true
        this.dropZoneColor = '#575757'
      }
    },
    async updateUser () {
      const fd = new FormData()
      for (const [key, value] of Object.entries(this.userData)) {
        if (this.userData[key]) {
          fd.append(key, value)
        }
      }
      await this.$axios.post('/users/' + this.$auth.state.user.data.id + '?_method=PUT', fd).then((res) => {
        this.$auth.setUser(res.data.data)
        this.$auth.fetchUser()
        setTimeout(() => {
          this.$router.push('/profile')
        }, 1000)
      }).catch((e) => {
        for (const error in e.response.data.errors) {
          this.$store.commit('setPopup', {
            text: e.response.data.errors[error][0],
            type: 'danger',
            seconds: 5
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
@use '../../assets/sass/abstract/index' as *;
</style>
