<template>
  <div class="home">
    <div class="row">
      <div class="col6 home-box">
        <h4>Próxima cirurgia <b>SALA 1</b></h4>
        <h1>12:00</h1>
      </div>
      <div class="col6 home-box">
        <h4>Próxima cirurgia <b>SALA 2</b></h4>
        <h1>13:00</h1>
      </div>
    </div>
  </div>
</template>

<script>



</script>

<style lang="scss" scoped>
.home{
  padding: 15px;

  .home-box {


    flex-direction: column;
    width: 50%;
    display: flex;
    height: calc(50vh - 15px);
    align-content: center;
    align-items: center;
    margin-top: 25vh;
    justify-content: center;
    border: 1px solid white;

    &:nth-child(2){
      border-left: none;
    }
  }
}
</style>
