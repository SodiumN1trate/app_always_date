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
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
  user-select: none;
  transition: 0.2s;
}

.album {
  width: 100%;
}

.photo {
  width: 100%;
}

@media only screen and (max-width: 1650px) {
  .photo-album {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }
}

@media only screen and (max-width: 1300px) {
  .photo-album {
    grid-template-columns: repeat(auto-fit, minmax(185px, 1fr));
  }
}

@media only screen and (max-width: 880px) {
  .photo-album {
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  }
}

@media only screen and (max-width: 700px) {
  .photo-album {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 5px;
  }
}

@media only screen and (max-width: 600px) {
  .photo-album {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 5px;
  }
}

@media only screen and (max-width: 500px) {
  .photo-album {
    grid-template-columns: repeat(auto-fit, minmax(112px, 1fr));
    gap: 5px;
  }
}
</style>
