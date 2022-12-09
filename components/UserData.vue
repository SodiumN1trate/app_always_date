<template>
  <div class="user-data">
    <div>
      <span class="icon-location" />
      <span>{{ location }}</span>
    </div>
    <div>
      <span class="icon-birthday" />
      <span>{{ date }}</span>
    </div>
    <div>
      <span class="icon-star" />
      <span>{{ star }}</span>
    </div>
    <div>
      <span class="icon-book" />
      <span>{{ exp }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userData',
  props: ['location', 'date', 'star', 'exp']
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

.user-data {
  display: flex;
  gap: 20px;
  width: 100%;
}

.user-data > div {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  white-space: nowrap;
  justify-content: center;
  gap: 5px;
  font-family: Alata;
  color: $color-grey-3;
}

.user-data > div > span:first-child {
  font-size: 20px;
}

span {
  font-size: 16px;
}
</style>
