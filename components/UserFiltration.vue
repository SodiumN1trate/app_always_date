<template>
  <div id="filtration-container">
    <span @click="show = !show" class="icon-statistic"></span>
    <div v-show="show" id="filtration">
      <div id="filtration-title">
        <h5>Filtrēšana</h5>
        <InfoPopup info="Izmanto šo funkciju, lai atrastu sev piemērotu cilvēku" size="20" />
      </div>
      <div id="filtration-sliders">
        <DualRangeSlider v-model="form.age" :max="100" :min="18" title="Vecums" />
        <DualRangeSlider v-model="form.rating" :max="10" :min="1" title="Reiting" />
        <DualRangeSlider v-model="form.schoolExp" :max="100" :min="1" title="Apgūtie dzīves padomi" />
      </div>
      <button @click="$emit('filter-submit', form)">Filtrēt</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserFiltration',
  data () {
    return {
      show: true,
      form: {
        age: { min: 18, max: 100 },
        rating: { min: 0, max: 10 },
        schoolExp: { min: 0, max: 100 }
      }
    }
  }
}
</script>

<style scoped>
#filtration {
  margin-top: 3%;
  color: #A3A3A3;
  margin-bottom: 20px;
}

#filtration-title {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin-bottom: 5%;
}

#filtration-title > h5 {
  padding: 0;
  margin: 0;
}

#filtration-sliders {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

#filtration-container > .icon-statistic {
  display: none;
  font-size: 40px;
  cursor: pointer;
  color: #A3A3A3;
}

button {
  cursor: pointer;
  border: 2px solid #FFCBCB;
  border-radius: 6px;
  font-size: 15px;
  text-align: center;
  color: #FFBBBB;
  margin-top: 20px;
  padding: 5px 15px;
  transition: 0.2s;
}

button:hover {
  box-shadow: 0px 4px 17px rgba(0, 0, 0, 0.07);
}

@media only screen and (max-width: 1000px) {
  #filtration-container {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  #filtration-container > .icon-statistic {
    display: initial;
  }
}
</style>
