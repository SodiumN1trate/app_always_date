<template>
  <div class="container">
    <small>Izskatās ka neesi reģistrējies</small>
    <ProgressBar progress="1" />
  </div>
</template>

<script>

export default {
  layout: 'FlowLayout'
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
