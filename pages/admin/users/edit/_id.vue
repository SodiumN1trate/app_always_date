<template>
  <div id="content">
    <div id="box">
      <h1>Dzīves skolas labošana</h1>
      <form>
        <label>Vārds
          <InputField
            v-model="form.firstname"
            placeholder="Ieraksti vārdu"
            color="grey"
          />
        </label>
        <label>Uzvārds
          <InputField
            v-model="form.lastname"
            placeholder="Ieraksti virsrakstu"
            color="grey"
          />
        </label>
        <label>E-pasts
          <InputField
            v-model="form.email"
            placeholder="Ieraksti e-pastu"
            color="grey"
          />
        </label>
        <label>Dzimšanas diena
          <p>{{form.birthday}}</p>
          <DateInput v-model="form.birthday" />
        </label>
        <label>Dzimums
          <SelectGender
            v-model="form.gender"
          />
        </label>
        <div>
          <button class="btn btn-primary" @click="submit()">Saglabāt</button>
          <button class="btn btn-secondary" @click="$router.push('/admin/users/list')">Atpakaļ</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'NavigationLayout',
  data () {
    return {
      form: {
        firstname: null,
        lastname: null,
        email: null,
        gender: null,
        birthday: null
      }
    }
  },
  created () {
    this.$axios.get('/users/' + this.$route.params.id).then((response) => {
      const data = response.data.data
      console.log(data)
      this.form.firstname = data.firstname
      this.form.lastname = data.lastname
      this.form.email = data.email
      this.form.gender = data.gender
      this.form.birthday = data.birthday
    })
    // console.log(this.$auth.state.user.data)
    // console.log(this.form)
  },
  methods: {
    async submit () {
      await this.$axios.put('/users/' + this.$route.params.id, this.form).then(() => {
        this.$store.commit('setPopup', {
          text: 'Lietotājs tika rediģēts!',
          type: 'success',
          seconds: 5
        })
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
@use 'assets/sass/abstract' as *;

#box {
  flex-direction: column;
}

.setting-save-button {
  background-color: $color-pink-3;
  border: solid 2px $color-pink-3;
  border-radius: 6px;
  color: $color-white-2;
  transition: 0.2s;
  padding: 8px;
}

.setting-save-button:hover {
  background-color: $color-pink-4;
  border: solid 2px $color-pink-4;
}

.setting-save-button:active {
  box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.date-picker {
  margin-left: 0 !important;
}
</style>
