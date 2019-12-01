<template>
  <form @submit.prevent="doLogin()" class="form-login">
    <div class="card col-10 col-sm-6 col-lg-4" style="width: 18rem;">
      <div class="card-nheader text-center">
        <img src="../../assets/logo.png" class="card-img-top responsive" alt="100px">
        <!--<h1 class="mb-0">SCAC</h1>-->
      </div>
      <div class="card-body">
        <div class="form-group">
          <input
          required
          type="email"
          v-model="email"
          class="form-control"
          placeholder="E-mail">
        </div>
        <div class="form-group">
          <input
          required
          type="password"
          v-model="password"
          class="form-control"
          placeholder="Senha">
        </div>
        <button class="btn btn-primary w-100" :disabled="loading">
          <template v-if='loading'>
            Entrando...
            <i class="fa fa-spinner fa-spin"></i>
          </template>
          <template v-else>
            Entrar
            <i class="fas fa-sign-in-alt"></i>
          </template>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Login',
  data: () => {
    return {
      loading: false,
      email:'bbb@gmail.com',
      password:'16052001'
    }
  },
  methods: {
    async doLogin(){
      this.loading = true

      const { email,password } = this

      try{
        const res = await this.$firebase.auth().signInWithEmailAndPassword(email, password)
        window.uid = res.user.uid
        this.$router.push({ name: 'home' })

      } catch (err){
        let message = ''

        switch (err.code) {
          case 'auth/user-not-found':
            message = 'Não foi possível localizar o usuário.'
            break
          case 'auth/wrong-password':
            message = 'Senha inválida'
            break
          default:
            message = 'Não foi possível fazer login, tente novamente'
        }

        this.$root.$emit('Notification::show', {
          message,
          type: 'danger'
        })
      }

      this.loading = false

    }



  },
  beforeRouteEnter (to, from, next) {
      next(vm => {
        if(window.uid){
          vm.$router.push({ name: 'home'})
        }
      })
    }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.form-login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  width: 30%;
  color: $featured-dark;
}

</style>

