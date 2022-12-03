<template>
  <div id="cloud-block" ref="clouds">
    <img class="cloud" src="@/static/svg/Cloud1.svg">
    <img class="cloud" src="@/static/svg/Cloud2.svg" style="margin-left: 150px">
    <img class="cloud" src="@/static/svg/Cloud3.svg" style="margin-left: 300px">
  </div>
</template>

<style>
#cloud-block {
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  column-gap: 60px;
  top: 0;
  right: 0;
  left: 0;
  height: 130px;
  animation: move-cloud 50s linear infinite;
}
.cloud {
  margin: 10px;
  width: 150px;
}

@keyframes move-cloud {
  from {
    display: flex;
    transform: translateX(-100px);
  }
  to {
    transform: translateX(100%);
  }
}

@media only screen and (max-width: 1600px) {
  #cloud-block {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 75px;

  }
  .cloud {
    margin: 10px;
    width: 100px;
  }
}

</style>
