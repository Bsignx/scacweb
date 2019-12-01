<template>

  <nav class="nav  flex-column justify-content-between">
   <!-- <div class="navbar navbar-dark bg-dark">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Alterna navegação">
          <span class="navbar-toggler-icon"></span>
      </button>
    </div> -->
    <div>
    <router-link
        exact
        :key="i"
        class="nav-link"
        exact-active-class="active"
        :to="{ name: router.name }"
        v-for="(router, i) in routerLinks"
      >
        <i class="fa" :class="`fa-${router.meta.icon}`"></i>
        {{ router.meta.title }}
      </router-link>

      <hr>

      <layout-new-cirurgia/>
      </div>
      <layout-logout/>

  </nav>
</template>
<script>
import LayoutLogout from './LayoutLogout'
import LayoutNewCirurgia from './LayoutNewCirurgia'
export default {
  components: {
    LayoutLogout,
    LayoutNewCirurgia
  },
  computed: {
    routerLinks (){
      return this.$router.options.routes.filter(r => r.name !== 'login')
    }
  }
}
</script>

<style lang="scss" scoped>

@import "../../assets/scss/variables";

.nav {
  margin-left: -15px;
  width: calc(100% + 30px);
  height: calc(100vh - 70px);
  .nav-link{
  color: white;
  transition: 0.4s;
  &.active{
    color:  $SELECTED;
    background: transparent;
  }
  &:hover{
    background-color: $SELECTED;
  }
}
}



</style>


