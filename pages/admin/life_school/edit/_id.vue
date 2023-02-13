<template>
  <div id="content">
    <div id="box">
      <h1>Dzīves skolas labošana</h1>
      <form>
        <label>Nosaukums
          <InputField
            v-model="form.title"
            placeholder="Ieraksti virsrakstu"
            color="grey"
          />
        </label>
        <label>Nosaukums
          <TextEditorField
            :value="form.description"
            @input="form.description = $event"
          />
        </label>
        <label>Lasīšanas laiks
          <InputField
            v-model="form.reading_time"
            placeholder="Ieraksti virsrakstu"
            color="grey"
          />
        </label>
        <button class="setting-save-button">Saglabāt</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'NavigationLayout',
  data () {
    return {
      form: {
        title: null,
        description: null,
        reading_time: null
      }
    }
  },
  mounted () {
    this.$axios.get('/life_schools/' + this.$route.params.id).then((response) => {
      const data = response.data.data
      this.form.title = data.title
      this.form.description = data.description
      this.form.reading_time = data.reading_time
    })
  }
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

#box {
  flex-direction: column;
}
.setting-save-button {
  background-color: $color-pink-3;
  border: solid 2px $color-pink-3;
  border-radius: 6px;
  color: $color-white-2;
  transition: 0.2s;
  padding: 8px;
}
.setting-save-button:hover {
  background-color: $color-pink-4;
  border: solid 2px $color-pink-4;
}
.setting-save-button:active {
  box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.1);
}
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
