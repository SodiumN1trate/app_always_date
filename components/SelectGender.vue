<template>
  <div class="checklist">
    <div class="checkboxes">
      <label class="radio-man" :class="{ 'checked-man': displayMan }" @click="checkedBox(0)">
        <input type="radio" name="gender">
        <img src="../static/svg/Man.svg">
      </label>
      <label class="radio-woman" :class="{ 'checked-woman': displayWoman }" @click="checkedBox(1)">
        <input type="radio" name="gender">
        <img src="../static/svg/Woman.svg">
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GenderCheckbox',
  data () {
    return {
      content: '',
      displayMan: false,
      displayWoman: false,
      checked: false
    }
  },
  methods: {
    checkedBox (gender) {
      this.content = gender
      if (this.content === 0) {
        this.displayMan = true
        this.displayWoman = false
      } else {
        this.displayWoman = true
        this.displayMan = false
      }
      this.$emit('input', this.content)
    }
  }
}
</script>

<style scoped>
div {
  text-align: center;
}

.checklist {
  display: flex;
  justify-content: center;
}

.checkboxes {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.checkboxes > label {
  border: 2px solid #E8E8E8;
  width: 50px;
  height: 50px;
  margin: auto;
  padding: 3%;
  border-radius: 6px;
  box-shadow: 0 2px 2px 0 #9A9A9A33;
  resize: none;
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: 0.1s;
}

.checkboxes > label > input {
  width: 100%;
  display: none;
}

.checkboxes > label > img {
  margin: auto;
}

.checked-man {
  border-color: #099EE3  !important;
}

.radio-man:hover {
  border-color: #099EE3;
}

.checked-woman {
  border-color: #E67FB0 !important;
}

.radio-woman:hover {
  border-color: #E67FB0;
}
</style>
