<template>
  <div>
    <date-pick
      v-model="date"
      :input-attributes="{class: 'date-picker', readonly: true}"
      next-month-caption="Nākošais mēnesis"
      prev-month-caption="Iepriekšējais mēneis"
      :weekdays="['P', 'O', 'T', 'C', 'P', 'S', 'Sv']"
      :months="['Janvāris', 'Februāris', 'Marts', 'Aprīlis','Maijs', 'Jūnijs', 'Jūlijs', 'Augusts','Septembris', 'Oktobris', 'Novembris', 'Decembris']"
      @input="$emit('input', date)"
    />
  </div>
</template>

<script>
import DatePick from 'vue-date-pick'
import 'vue-date-pick/dist/vueDatePick.css'
export default {
  components: { DatePick },
  props: ['value'],
  data () {
    return {
      date: this.value
    }
  }
}

</script>

<style lang="scss">
@use '../assets/sass/abstract/index' as *;

.date-picker {
  margin-left: 4%;
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
