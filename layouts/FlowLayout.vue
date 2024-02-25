<template>
  <div>
    <header>
      <span class="header-title">AlwaysDate</span>
    </header>
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'FlowLayout'
}
</script>

<style scoped>
header, main {
  font-family: 'Alata';
}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100vw;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  background-color: #fff;
}

.header-title {
  font-size: 32px;
  font-weight: 600;
  color: #FF9494;
}

body {
  background-color: #F9F5F5 !important;
}

main {
  max-width: 300px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
</style>
