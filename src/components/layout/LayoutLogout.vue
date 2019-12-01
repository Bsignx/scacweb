<template>
  <button class="btn btn-logout" @click="logout()">
    <i class="fas fa-sign-out-alt"></i>
    Sair
  </button>
</template>

<script>
export default {
  methods:{
    async logout () {
      this.$root.$emit('Spinner::show')
      await this.$firebase.auth().signOut()
      this.$router.push({ name: 'login'})
      this.$root.$emit('Spinner::hide')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";
.btn-logout{
  width: 100%;
  color: white;
  &:houver{
     color: $SELECTED;
  }
}
</style>

