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
        <date-pick
          v-model="form.birthday"
          :input-attributes="{class: 'date-picker', readonly: true}"
          next-month-caption="Nākošais mēnesis"
          prev-month-caption="Iepriekšējais mēneis"
          :displayFormat="'YYYY-MM-DD'"
          :weekdays="['P', 'O', 'T', 'C', 'P', 'S', 'Sv']"
          :months="['Janvāris', 'Februāris', 'Marts', 'Aprīlis','Maijs', 'Jūnijs', 'Jūlijs', 'Augusts','Septembris', 'Oktobris', 'Novembris', 'Decembris']"
        />
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
import DatePick from 'vue-date-pick'
import 'vue-date-pick/dist/vueDatePick.css'

export default {
  layout: 'NavigationLayout',
  components: { DatePick },
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
  mounted () {
    this.$axios.get('/users/' + this.$route.params.id).then((response) => {
      const data = response.data.data
      this.form.firstname = data.firstname
      this.form.lastname = data.lastname
      this.form.email = data.email
      this.form.gender = data.gender
      this.form.birthday = data.birthday || `${(new Date()).getFullYear()}-${(new Date()).getMonth()}-${(new Date()).getDate()}`
    })
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
  border: solid 1px $color-grey-4;
  color: $color-black-2;
  background-color: $color-white-2;
  font-family: NotoSans;
  border-radius: 8px;
  height: 40px;
  font-size: 16px;
  padding: 15px 10px 15px 15px !important;
}

.date-picker::placeholder {
  color: $color-grey-4;
}

.date-picker:focus {
  outline: solid 1px $color-grey-4;
}
</style>
