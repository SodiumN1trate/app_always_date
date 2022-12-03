<template>
  <div id="filtration-container">
    <span @click="show = !show" class="icon-statistic"></span>
    <div v-show="show" id="filtration">
      <div id="filtration-title">
        <h5>Filtrēšana</h5>
        <InfoPopup info="Izmanto šo funkciju, lai atrastu sev piemērotu cilvēku" size="20" />
      </div>
      <div id="filtration-sliders">
        <DualRangeSlider :min="18" :max="100" title="Vecums" />
        <DualRangeSlider :min="0" :max="10" title="Reiting" />
        <DualRangeSlider :min="0" :max="100" title="Apgūtie dzīves padomi" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserFiltration',
  data () {
    return {
      show: true
    }
  }
}
</script>

<style>
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
