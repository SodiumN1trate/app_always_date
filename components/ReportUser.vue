<template>
  <div class="modal">
    <div class="popup">
      <div id="modal-title">
        <h2>Iesniegt sūdzību</h2>
      </div>
      <div id="report-form-reason">
        <h4>Sūdzības iemesls</h4>
        <SelectInput :placeholder="'Iemesls'" :options="['Viltošana', 'Draudēšana', 'Ļaunprātīga izmantošana', 'Krāpnieks']" tabindex="0" color="grey" />
      </div>
      <div id="report-form-explanation">
        <h4>Sūdzības pamatojums</h4>
        <TextareaField placeholder="Sūdzības apraksts" color="grey" />
      </div>
      <div id="report-form-buttons">
        <button class="report-cancel-button" @click="$emit('close-modal')">Atmest</button>
        <button class="report-submit-button" @click="$emit('close-modal')">Iesniegt</button>
      </div>
      <div id="report-warning">
        <span class="icon-circle-warning" />
        <p>Ļaunprātīgi veidotu, nepamatotu un nepatiesu apsūdzību iesniegšana ir pilnvērtīgs iemesls mūžīgi slēgt sūdzības iesniedzēja kontu.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoPopup'
}
</script>

<style lang="scss" scoped>
@use 'assets/sass/abstract' as *;

.modal {
  position: fixed;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.5);
  align-items: center;
}

.popup {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: $color-white-2;
  width: 600px;
  padding: 1%;
  border: solid 1px $color-grey-0;
  border-radius: 10px;
}

#modal-title {
  text-align: left;
}

#modal-title > h2 {
  font-family: Alata;
  color: $color-black-1;
}

#modal-content {
  text-align: center;
  padding: 0;
  margin: 20px 0 0;
}

#report-form-reason > h4 {
  font-family: Alata;
  color: $color-black-3;
}

#report-form-explanation > h4 {
  font-family: Alata;
  color: $color-black-3;
}

#report-form-buttons {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  font-family: Alata;
  font-size: 24px;
  padding-left: 4%;
  padding-right: 4%;
}

.report-cancel-button {
  width: 48%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0);
  border: solid 2px $color-grey-5;
  border-radius: 6px;
  color: $color-grey-5;
  transition: 0.2s;
}

.report-cancel-button:hover {
  color: $color-black-1;
  border-color: $color-black-1;
}

.report-cancel-button:active {
  box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.1);
}

.report-submit-button {
  width: 48%;
  padding: 10px;
  background-color: $color-pink-3;
  border: solid 2px $color-pink-3;
  border-radius: 6px;
  color: $color-white-2;
  transition: 0.2s;
}

.report-submit-button:hover {
  background-color: $color-pink-4;
  border: solid 2px $color-pink-4;
}

.report-submit-button:active {
  box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.1);
}

#report-warning {
  display: flex;
  align-items: center;
  gap: 10px;
  color: $color-pink-1;
}

#report-warning > span {
  font-size: 32px;
}

#report-warning > p {
  margin-bottom: 0rem;
}
</style>
