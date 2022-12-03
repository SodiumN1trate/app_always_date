<template>
  <div class="box">
    <div id="title">
      <hr>
      <h1>ALWAYSDATE</h1>
      <hr>
    </div>
    <h2>Lorem ipsum dolor sit amet</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.

      Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
      eu fugiat nulla pariatur.

      Excepteur sint occaecat cupidatat non proident,
      sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <h2>Ut enim ad minim veniam</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua.

      Ut enim ad minim veniam, quis.
      Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </div>
</template>

<script>
export default {
  name: 'LeaderboardPage',
  layout: 'NavigationLayout'
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

body {
  background-image: linear-gradient(180deg, rgba(245, 245, 245, 0) 0%, #F7F5F5 15.65%, #FFF5F5 100%);
}

.box {
  width: 70%;
  margin-top: 100px;
  margin-inline: auto;
  height: 700px;
}

#title {
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

#title > h1 {
  margin: 0;
  padding: 0;
}

hr {
  height: 0.2px;
  padding: 0;
  margin: 0;
  background-color: #868686;
  width: 80%;
}

h2 {
  font-weight: 200;
}

@media only screen and (max-width: 900px) {
  .box {
    width: 90%;
    padding: 5%;
  }
}

</style>
