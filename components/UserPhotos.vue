<template>
  <div class="photo-album">
    <div v-for="photo in 10" :key="photo" class="album">
      <img class="photo" src="../static/images/Photo.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPhotos'
}
</script>

<style scoped>

.photo-album {
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 10px;
  user-select: none;
}

.album {
  width: 100%;
}

.photo {
  width: 100%;
}
</style>
