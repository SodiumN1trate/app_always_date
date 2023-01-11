<template>
  <div id="settings-container">
    <div id="settings-box">
      <div class="settings-navigation">
        <div>
          <div class="settings-navigation-profile">
            <img class="settings-navigation-profile-picture" src="../static/images/ProfilePicture.png">
            <h3>Markuss Lācis</h3>
          </div>
        </div>
        <div class="settings-navigation-buttons">
          <button>Profila iestatījumi</button>
          <button>Drošība un Privātums</button>
          <button>Paziņojumi</button>
        </div>
      </div>
      <form class="settings-sections" @submit.prevent>
        <div class="settings-sections-basic-info">
          <div class="settings-sections-profile-picture">
            <label v-show="mobileUpload" class="upload-image mobile-upload">
              <input type="file" accept="image/*" @change="uploadImage">
            </label>
            <!--              v-show="displayDropZone"-->
            <div
              class="drop-zone"
              :style="{ borderColor: dropZoneColor}"
              @drop.prevent="uploadImage"
            >
              <img v-show="!displayDropZone" :src="previewImage" alt="imagePreview">
              <img v-show="displayDropZone" src="../static/images/ProfilePicture.png">
              <label class="upload-image">
                <span class="icon-circle-cross" />
                <input type="file" accept="image/*" @change="uploadImage">
              </label>
            </div>
          </div>
          <div class="settings-sections-basic-data">
            <div class="settings-sections-full-name">
              <div>
                <h5>Vārds</h5>
                <InputField v-model="userData.firstname" class="settings-sections-first-name" placeholder="Vārds" color="grey" />
              </div>
              <div>
                <h5>Uzvārds</h5>
                <InputField v-model="userData.lastname" class="settings-sections-last-name" placeholder="Uzvārds" color="grey" />
              </div>
            </div>
            <div>
              <div class="settings-section-gender-select">
                <h5>Dzimums</h5>
                <SelectInput v-model="userData.gender" class="settings-select-gender" placeholder="Dzimums" :options="['Vīrietis','Sieviete']" color="grey" />
              </div>
              <div>
                <h5>Dzimšanas datums</h5>
                <SelectDate v-model="userData.birthday" class="settings-sections-date" color="grey" />
              </div>
            </div>
          </div>
        </div>
        <div class="settings-section-about-user">
          <div>
            <h5>Reģions</h5>
            <SelectInput class="select-input-region" placeholder="Reģions" :options="['Rīga, centrs', 'Jelgava', 'Bauska', 'Daugavpils']" color="grey" />
          </div>
          <div>
            <h5>Par mani</h5>
            <TextareaField v-model="userData.about_me" class="text-area" placeholder="Par mani" color="grey" />
          </div>
        </div>
        <div class="settings-form-buttons">
          <button class="setting-cancel-button">Atsaukt</button>
          <button class="setting-save-button" @click="updateUser()">Saglabāt</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsPage',
  layout: 'NavigationLayout',
  data () {
    return {
      previewImage: null,
      dropZoneColor: null,
      displayDropZone: true,
      mobileUpload: true,
      user: this.$auth.state.user.data,
      userData: {
        firstname: null,
        lastname: null,
        birthday: null,
        language: null,
        gender: null,
        about_me: null
      },
      infoModal: {
        showModal: false,
        title: '',
        description: ''
      },
      ImageCrop: {
        showModal: false,
        image: null
      }
    }
  },
  mounted () {
    this.userData.firstname = this.user.firstname
    this.userData.lastname = this.user.lastname
    this.userData.birthday = this.user.birthday
    this.userData.language = this.user.language
    this.userData.gender = this.user.gender
  },
  methods: {
    uploadImage (e) {
      const fileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
      const image = (e.target.localName === 'input') ? e.target.files[0] : e.dataTransfer.files[0]
      if (image.size > 4000 * 1024) {
        this.infoModal.title = 'kļūda'
        this.infoModal.description = 'Faila izmērs ir pārāk liels - faila izmērs nevar pārsniegt 15MB!'
        this.infoModal.showModal = true
        return
      } else if (!fileTypes.includes(image.type)) {
        this.infoModal.title = 'kļūda'
        this.infoModal.description = 'Norādītais fails nav bildes formātā!'
        this.infoModal.showModal = true
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = (e) => {
        this.userData.avatar = image
        this.previewImage = e.target.result
        this.ImageCrop.image = e.target.result
        this.displayDropZone = false
        this.mobileUpload = false
        this.ImageCrop.showModal = true
        this.dropZoneColor = '#575757'
      }
    },
    updateUser () {
      console.log(this.userData)
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

#settings-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 200px;
  margin-bottom: 50px;
}

#settings-box {
  display: flex;
  width: 60%;
  border: solid 1px $color-grey-0;
  border-radius: 15px;
  background-color: $color-white-2;
  box-shadow: 0px 4px 44px rgba(0, 0, 0, 0.1);
}

.settings-navigation {
  display: flex;
  flex-direction: column;
  width: 30%;
  border-right: solid 2px $color-grey-0;
  padding-bottom: 220px;
  font-family: NotoSans;
  color: $color-grey-5;
}

.settings-navigation > div > .settings-navigation-profile {
  display: flex;
  align-items: center;
  border-bottom: solid 2px $color-grey-0;
  padding: 10px;
  gap: 10px;
}

.settings-navigation >  div > .settings-navigation-profile > img {
  border: solid 3px $color-white-2;
  box-shadow: 0px 4px 44px rgba(0, 0, 0, 0.1);
  border-radius: 100%;
}

.settings-navigation >  div > .settings-navigation-profile > h3 {
  width: 50%;
}

.settings-navigation-profile-picture {
  height: 100px;
}

.settings-navigation-buttons {
  display: flex;
  flex-direction: column;
}

.settings-navigation-buttons > button {
  width: 100%;
  padding: 10px;
  text-align: left;
  background-color: rgba(0, 0, 0, 0);
  color: $color-grey-5;
  border: none;
  border-bottom: solid 2px $color-grey-0;
  font-size: 24px;
  transition: 0.2s;
}

.settings-navigation-buttons > button:hover {
  color: $color-grey-3;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

.settings-sections {
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 20px;
}

.settings-sections-form {
  display: flex;
  flex-direction: column;
}

.settings-profile-picture {
  height: 128px;
  filter: blur(4px);
  border-radius: 100%;
}

.settings-sections-profile-picture {
  position: relative;
  display: flex;
  align-items: center;
}

.mobile-upload {
  display: none;
}

.drop-zone {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 128px;
  width: 128px;
  outline: #575757 dashed 3px;
  border-radius: 100%;
  transition: .3s;
  overflow: hidden;
}

.drop-zone > i {
  color: #626262;
}

.drop-zone > p {
  text-align: center;
}

.drop-zone > img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: 0.2s;
}

.drop-zone:hover > img {
  filter: blur(4px);
}

.drop-zone > input {
  display: none;
}

.upload-image {
  position: absolute;
  display: flex;
  font-size: 64px;
  color: white;
  border-radius: 5px;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  opacity: 0;
  transition: 1s;
  margin-bottom: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.upload-image:hover {
  opacity: 1;
}

.drop-zone > .upload-image > span {
  display: none;
  transition: 0.2s;
}

.drop-zone > .upload-image > span::before {
  transition: 0.2s;
}

.drop-zone:hover > .upload-image > span {
  display: initial;
}

.upload-image > span::before {
  transform: rotate(45deg);
}

.upload-image > input {
  display: none;
  width: 100%;
  height: 100%;
}

.image-preview {
  width: 70%;
}

.settings-sections-profile-picture > span {
  position: absolute;
  font-size: 64px;
  color: white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: plus-transition 1s;
}

@keyframes plus-transition {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.settings-sections-profile-picture > span::before {
  transform: rotate(45deg);
}

.settings-sections-basic-info {
  display: flex;
  gap: 25px;
}

.settings-sections-basic-data {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.settings-sections-basic-data > div {
  display: flex;
}

.settings-sections-first-name {
  margin-left: 4%;
}

.settings-sections-last-name {
  margin-left: 4%;
}

.settings-section-gender-select {
  width: 50%;
}

.settings-select-gender {
  width: 99.5%;
}

.settings-sections-date {
  margin-left: 5%;
}

h5 {
  color: $color-grey-5;
}

.text-area {
  width: 80%;
  max-height: 120px;
}

.settings-section-about-user {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.select-input-region {
  width: 87%;
}

.settings-form-buttons {
  display: flex;
  justify-content: right;
  gap: 15px;
}

.settings-form-buttons > button {
  width: 25%;
  height: calc(100% + 10px);
  font-family: Alata;
}

.setting-cancel-button {
  background-color: rgba(0, 0, 0, 0);
  border: solid 2px $color-grey-5;
  border-radius: 6px;
  color: $color-grey-5;
  transition: 0.2s;
}
.setting-cancel-button:hover {
  color: $color-black-1;
  border-color: $color-black-1;
}

.setting-cancel-button:active {
  box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.1);
}

.setting-save-button {
  background-color: $color-pink-3;
  border: solid 2px $color-pink-3;
  border-radius: 6px;
  color: $color-white-2;
  transition: 0.2s;
}
.setting-save-button:hover {
  background-color: $color-pink-4;
  border: solid 2px $color-pink-4;
}
.setting-save-button:active {
  box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.1);
}

@media only screen and (max-width: 1300px) {
  .settings-navigation > div > .settings-navigation-profile {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  .settings-navigation > div > .settings-navigation-profile > h3 {
    width: initial;
  }
}

@media only screen and (max-width: 1400px) {
  .settings-sections-basic-info {
    flex-direction: column;
  }
}

@media screen and (max-width: 1000px) {
  .container > form {
    width: 100%;
  }
  .mobile-upload {
    display: inline;
  }
}
</style>
