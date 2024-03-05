<template>
  <div class="container">
    <ProgressBar progress="4" />
    <h3>Izvēlies savu reģionu</h3>
    <div class="input-container" ref="genders">
      <SelectInputField v-model="form.region" placeholder="Izvēleis reģionu" :options="regions" :tabindex="0" />
    </div>
    <FlowNextButton @click="save()" :loading="loading" />
    <div class="popups">
      <PopUp
        v-for="(pop, index) in $store.state.popups"
        :key="index"
        :popup-type="pop.popupType"
        :popup-text="pop.popupText"
        :popup-show-time="pop.popupShowTime + index / 2"
      />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'FlowLayout',
  data () {
    return {
      form: {
        region: null
      },
      regions: [],
      loading: false
    }
  },
  async created () {
    await this.$axios.get('/regions').then((response) => {
      Object.keys(response.data).map((key) => {
        this.regions.push({
          id: key,
          name: key
        })
        return key
      })
    })
  },
  methods: {
    save () {
      this.loading = true
      setTimeout(async () => {
        await this.$axios.put('/users/' + this.$auth.state.user.data.id, this.form).then((res) => {
          this.$router.push('/flow/gender')
        }).catch((e) => {
          for (const error in e.response.data.errors) {
            this.$store.commit('setPopup', {
              text: e.response.data.errors[error][0],
              type: 'danger',
              seconds: 5
            })
          }
          this.loading = false
        })
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.input-container {
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 90%;
  margin-top: 10px;
}

.register-button {
  background: #FF778A;
  border-radius: 11px;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #FFFFFF;
  padding: 7px 15px;
  margin-top: 50px;
}

.input-field {
  padding: 2px 15px;
}
</style>
