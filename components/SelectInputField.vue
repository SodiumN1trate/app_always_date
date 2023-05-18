<template>
  <div style="position:relative;" :tabindex="tabindex" @blur="dropdownDisplay = false">
    <div
      class="input-dropdown"
      @click="toggleDropdown()"
    >
      <span>{{ content }}</span>
      <span ref="arrow" class="icon-arrow-down" :style="{ transform: dropdownDisplay ? 'rotate(180deg)' : 'rotate(0deg)' }"/>
    </div>
    <div
      v-show="dropdownDisplay"
      ref="dropdownRef"
      class="dropdown"
    >
      <div ref="dropdownContent" class="dropdown-content">
        <div
          v-for="(option, index) in options"
          ref="parameters"
          :key="index"
          style="min-height: 40px;"
          class="dropdown-parameters"
        >
          <p class="parameters" @click="selectOption(option)">
            {{ option.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectInput',
  props: ['placeholder', 'tabindex', 'options'],
  data () {
    return {
      dropdownDisplay: false,
      content: this.placeholder
    }
  },
  mounted () {
    if (this.placeholder.name) {
      this.selectOption(this.placeholder)
    }
  },
  updated () {
    if (this.$refs.parameters === undefined) { return 0 }

    this.$refs.dropdownRef.style.height = this.setSize((this.$refs.parameters.length <= 3 ? this.$refs.parameters.length : 4))
  },
  methods: {
    toggleDropdown () {
      this.dropdownDisplay = !this.dropdownDisplay
      if (this.dropdownDisplay) {
        this.$refs.arrow.style.animation = 'rotate 1s ease'
      } else {
        this.$refs.arrow.style.animation = 'rotate 1s ease'
      }
    },
    selectOption (option) {
      this.content = option.name
      this.dropdownDisplay = false
      this.$emit('input', option.id)
    },
    setSize (amountOfLoops) {
      let optionLength = 0
      for (let i = 0; i < amountOfLoops; i++) {
        if (this.$refs.parameters[i].clientHeight === 0) {
          optionLength = optionLength + 38.6
        }
        optionLength = optionLength + this.$refs.parameters[i].clientHeight + 1
      }
      return optionLength + 'px'
    }
  }
}
</script>

<style scoped>
.input-dropdown {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: 11px;
  cursor: pointer;
  user-select: none;
  line-height: 1 !important;
  border: 1px solid #BDBDBD;
  width: 93%;
}

.input-dropdown > span {
  text-align: center;
}

.input-dropdown:focus {
  outline: solid 5px #FFB4B4FF;
  background-repeat: no-repeat;
}

.input-dropdown > span:first-child {
  font-family: NotoSans;
  color: #6F6F6F;
}

.dropdown {
  margin-top: 2px;
  background-color: white;
  width: 93%;
  margin-left: 4%;
  position: absolute;
  border-radius: 9px;
  z-index: 1;
  border: 1px solid #979797;
}

.dropdown-content {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  border-radius: 7px;
  overflow-y: scroll;
  scrollbar-width: thin;
}

.dropdown-content::-webkit-scrollbar {
  width: 3px;
}

.dropdown-content::-webkit-scrollbar-track {
  background: transparent;
}

.dropdown-content::-webkit-scrollbar-thumb {
  background: #FFB4B4FF;
}

.dropdown-content::-webkit-scrollbar-thumb:hover {
  background: #D19191;
}

.dropdown-parameters {
  cursor: pointer;
  user-select: none;
  margin-top: 0;
  display: flex;
  align-items: center;
}

.parameters {
  padding: 2%;
  margin: 0;
  width: 100%;
  font-family: NotoSans;
}

.dropdown-parameters:hover {
  animation: paragraph-hover 0.2s;
  color: white;
  background-image: linear-gradient(to right, #FFB4B4FF 70%, rgba(0,0,0,0) 95%);
}

.dropdown-parameters:first-child {
  border-top-left-radius: 7px;
}

.dropdown-parameters:last-child {
  border-bottom-left-radius: 7px;
}

.dropdown-content::-webkit-scrollbar {
  width: 5px;
}

.dropdown-content::-webkit-scrollbar-track {
  margin-top: 5px;
  margin-bottom: 5px;
}

.dropdown-content::-webkit-scrollbar-thumb {
  border-radius: 5px;
}

.minimal-height {
  height: 160px !important;
}

@keyframes paragraph-hover {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
