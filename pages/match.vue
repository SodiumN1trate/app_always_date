<template>
  <div id="content">
    <div id="box">
      <div>
        <div id="photo-side">
          <img src="images/match_photo.png" id="match-photo">
          <div id="buttons">
            <div class="small-button">
              <span class="icon-previous"></span>
            </div>
            <div class="large-button">
              <span class="icon-refuse"></span>
            </div>
            <div class="large-button">
              <span class="icon-heart-filled"></span>
            </div>
            <div class="small-button">
              <span class="icon-star-filled"></span>
            </div>
          </div>
        </div>
        <UserFiltration />
      </div>
      <div id="user-data">
        <div>
          <h1>Anna, 25</h1>
          <p>Esmu enerģētiska, patīk ceļot, ēst, sportot, klausīties mūziku un runāt ar cilvēkiem 😉</p>
        </div>
        <UserData location="Latvia, Rīga" date="17.03.2003" star="9.9/10" exp="55/100" />
        <h2>Par mani</h2>
        <p>Es meklēju sev vīru kas būtu gatavs ar mani pabadīt visu atlikušo dzīvi. Man patīk gara auguma, dominējoši vīrieši.😉😉Droši sazinaties ja ir interese atrast dzīves biedru 😍</p>
        <div>
          <h3>Bildes</h3>
          <UserPhotos />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeAsFavorite',
  layout: 'NavigationLayout'
}
</script>

<style lang="scss">
@use 'assets/sass/abstract' as *;

#box {
  display: flex;
  justify-content: space-between;
  gap: 2%;
}

#box > div:first-child {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
}

#match-photo {
  width: 350px;
  height: 450px;
}

#photo-side {
  box-shadow: 0px 2.43px 10.53px rgba(0, 0, 0, 0.06);
  border-radius: 10.53px;
}

#buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4%;
}

.large-button {
  border: 2px solid #FFE8E8;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
}

.small-button {
  border: 2px solid #FFE8E8;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 65px;
}

.icon-heart-filled {
  color: #FF8888;
  font-size:  35px;
}

.icon-refuse {
  color: #FFDADA;
  font-size:  27px;
}

.icon-star-filled {
  margin-top: -3px;
  color: #FFD748;
  font-size:  30px;
}

.icon-previous{
  color: #FFDADA;
  font-size:  20px;
}

#user-data {
  width: 100%;
  color: $color-black-2;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#user-data > h1 {
   font-family: Alata;
 }

.user-data-main {
  display: flex;
  gap: 20px;
  width: 100%;
}

.user-data-main > div {
  display: flex;
  justify-content: center;
  height: 65%;
  gap: 5px;
  align-items: flex-start;
  flex-wrap: wrap;
  font-family: Alata;
  color: $color-grey-3;
}

.user-data-main > div > i {
  font-size: 20px;
  height: 20px;
}

.user-data-main > div > p {
  text-align: center;
}

@media only screen and (max-width: 1000px) {
  #match-content {
    width: 90%;
    margin-right: auto;
    margin-left: auto;
  }
  #box {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .user-data {
    justify-content: center;
  }

  .user-data-main {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
