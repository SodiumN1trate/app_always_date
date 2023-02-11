<template>
  <div style="position:relative;" :tabindex="tabindex" @blur="dropdownDisplay = false">
    <div
      class="input-dropdown"
      :class="{ 'input-color-pink': checkColorPink(color), 'input-color-grey': checkColorGrey(color)}"
      @click="toggleDropdown"
    >
      <span>{{ content }}</span>
      <i class="icon-arrow-down" />
    </div>
    <div
      v-show="dropdownDisplay"
      :id="placeholder"
      ref="dropdownRef"
      class="dropdown"
      :class="{ 'dropdown-color-pink': checkColorPink(color), 'dropdown-color-grey': checkColorGrey(color) }"
    >
      <div ref="dropdownContent" class="dropdown-content" :class="{ 'dropdown-content-color-pink': checkColorPink(color), 'dropdown-content-color-grey': checkColorGrey(color) }">
        <div
          v-for="option in options"
          ref="parameters"
          :key="option"
          style="min-height: 40px;"
          class="dropdown-parameters"
          :class="{ 'dropdown-parameters-color-pink': checkColorPink(color), 'dropdown-parameters-color-grey': checkColorGrey(color) }"
        >
          <p class="parameters" @click="selectOption(option)">
            {{ option }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectInput',
  props: ['options', 'placeholder', 'tabindex', 'color'],
  data () {
    return {
      dropdownDisplay: true,
      content: this.placeholder
    }
  },
  mounted () {
    this.$refs.dropdownRef.style.height = this.setSize((this.$refs.parameters.length <= 3 ? this.$refs.parameters.length : 4))
    this.dropdownDisplay = false
  },
  methods: {
    checkColorPink (color) {
      return color === 'pink'
    },
    checkColorGrey (color) {
      return color === 'grey'
    },
    toggleDropdown () {
      this.dropdownDisplay = !this.dropdownDisplay
    },
    selectOption (option) {
      this.content = option
      this.dropdownDisplay = false
      this.$emit('input', this.content)
    },
    setSize (amountOfLoops) {
      let optionLength = 0
      for (let i = 0; i < amountOfLoops; i++) {
        if (this.$refs.parameters[i].clientHeight === 0) {
          optionLength = optionLength + 38.6
        }
        optionLength = optionLength + this.$refs.parameters[i].clientHeight
      }
      return optionLength + 2 + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

.input-color-pink {
  border: solid 1px $color-pink-3;
  color: $color-pink-3;
}

.input-color-grey {
  border: solid 1px $color-grey-4;
  color: $color-black-2;
}

.input-dropdown {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  height: 40px;
  padding: 2%;
  margin-left: 4%;
  font-size: 20px;
  width: 92.5%;
  cursor: pointer;
  user-select: none;
  line-height: 1 !important;
}

.input-dropdown > span {
  text-align: center;
}

.input-dropdown:focus {
  outline: solid 1px $color-pink-3;
  background-repeat: no-repeat;
}

.dropdown-color-grey {
  border: 1px solid $color-grey-4;
}
.dropdown-color-pink {
  border: 1px solid $color-pink-3;
}
.dropdown {
  margin-top: 10px;
  margin-left: 4%;
  width: 92.5%;
  position: absolute;
  border-radius: 9px;
  z-index: 1;
  .dropdown-content-color-grey {
    scrollbar-color: $color-black-2 rgba(0, 0, 0, 0);
    background-color: $color-white-2;
  }
  .dropdown-content-color-pink {
    scrollbar-color: $color-pink-4 rgba(0, 0, 0, 0);
    background-color: $color-white-1;
  }
  .dropdown-content {
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-track: 3px;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    .dropdown-parameters-color-grey {
      color: $color-grey-4;
    }
    .dropdown-parameters-color-pink {
      color: $color-pink-3;
    }
    border-radius: 7px;
    .dropdown-parameters {
      cursor: pointer;
      user-select: none;
      margin-top: 0;
      .parameters {
        padding: 2%;
        margin-bottom: 0rem;
        width: 60%;
      }
    }
    .dropdown-parameters-color-grey:hover {
      background-image: linear-gradient(to right, $color-grey-4 70%, rgba(0,0,0,0) 95%);
    }
    .dropdown-parameters-color-pink:hover {
      background-image: linear-gradient(to right, $color-pink-3 70%, rgba(0,0,0,0) 95%);
    }
    .dropdown-parameters:hover {
      animation: paragraph-hover 0.2s;
      color: white;
    }
    .dropdown-parameters:first-child {
      border-top-left-radius: 7px;
    }
    .dropdown-parameters:last-child {
      border-bottom-left-radius: 7px;
    }
  }

  .dropdown-content::-webkit-scrollbar {
    width: 5px;
  }

  .dropdown-content::-webkit-scrollbar-track {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .dropdown-content-color-grey::-webkit-scrollbar-thumb {
    background: $color-black-2;
  }
  .dropdown-content-color-pink::-webkit-scrollbar-thumb {
    background: $color-pink-4;
  }
  .dropdown-content::-webkit-scrollbar-thumb {
    border-radius: 5px;
  }
  /* Handle on hover */
  .dropdown-content-color-grey::-webkit-scrollbar-thumb:hover {
    background: $color-grey-4;
  }
  .dropdown-content-color-pink::-webkit-scrollbar-thumb:hover {
    background: $color-pink-3;
  }
}

.dropdown-color-grey:after {
  background-image: url("static/svg/DropdownArrow.svg");
  filter: saturate(0%);
}
.dropdown-color-pink:after {
  background-image: url("static/svg/DropdownArrow.svg");
}

.dropdown:after {
  content: "";
  image-rendering: high-quality;
  width: 29px;
  height: 8px;
  background-repeat: no-repeat;
  position: absolute;
  top: -8px;
  right: -3px;
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
