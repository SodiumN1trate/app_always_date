<template>
  <div class="container">
    <ProgressBar progress="2" />
    <h3>Izvēlies savu dzimumu</h3>
    <div class="input-container" ref="genders">
      <div v-for="(gender, index) in genders" :key="index" class="radio-button" @click="select($event, gender)">
        {{ gender.name }}
      </div>
      <InputField placeholder="Cits..." @input="select($event, { borderColor: 'purple'})" />
    </div>
    <button ref="button" class="register-button">
      Nākamais
    </button>
  </div>
</template>

<script>

export default {
  layout: 'FlowLayout',
  data () {
    return {
      selected: null,
      genders: [
        {
          id: 0,
          name: 'Vīrietis',
          borderColor: 'blue'
        },
        {
          id: 1,
          name: 'Sieviete',
          borderColor: 'pink'
        }
      ]
    }
  },
  methods: {
    select (event, gender) {
      const children = this.$refs.genders.children
      this.selected = null
      for (let i = 0; i < children.length; i++) {
        children[i].style.borderColor = '#BDBDBDFF'
        if (event.target === children[i]) {
          children[i].style.borderColor = gender.borderColor
          this.selected = gender.id
        }
        if (children[children.length - 1] === children[i] && this.selected === null) {
          children[i].style.borderColor = gender.borderColor
        }
      }
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

.radio-button {
  border: solid 2px $color-grey-4;
  color: $color-black-2;
  background-color: $color-white-2;
  font-family: NotoSans;
  border-radius: 13px;
  width: 100%;
  transition: 0.2s all;
  cursor: pointer;
  padding: 2px;
}

.input-field {
  padding: 2px 15px;
}
</style>
