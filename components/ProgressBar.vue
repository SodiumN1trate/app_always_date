<template>
  <div class="container">
    <div class="bar">
      <div class="bar-progress" :style="{'width': (progress*100) / 5 + '%'}"></div>
    </div>
    <small>{{progress}}/5</small>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: ['progress']
}
</script>

<style scoped>
.bar {
  width: 100%;
  height: 12px;
  background-color: #ececec;
  border-radius: 7px;
}

.bar-progress {
  height: 12px;
  border-radius: 7px;
  background-color: #fa9b9b;
}
</style>
