<template>
  <div id="app">
    <base-spinner/>
    <layout-notification/>
    <div class="container-fluid" v-if="isLogged">
      <div class="row">
        <div class="col-2 navigation-sidebar">
          <h1 class="app-title">SCAC</h1>
          <layout-navigation/>
        </div>
        <div class="col">
          <router-view/>
        </div>
      </div>
    </div>
    <router-view v-else/>
  </div>
</template>

<script>
import BaseSpinner from "./components/global/BaseSpinner";
import LayoutNotification from "./components/layout/LayoutNotification";
import LayoutNavigation from "./components/layout/LayoutNavigation";

export default {
  name: "App",
  components: {
    BaseSpinner,
    LayoutNotification,
    LayoutNavigation
  },
  methods: {},
  data: () => ({
    isLogged:false
  }),
  mounted() {
    this.$firebase.auth().onAuthStateChanged(user => {
      window.uid = user ? user.uid : null;
      this.isLogged = !!user
      this.$router.push({ name: window.uid ? "home" : "login" });
      setTimeout(() => {
        this.$root.$emit("Spinner::hide");
      }, 300);
    });
  }
};
</script>



<style lang="scss">
@import "./assets/scss/variables";

#app {
  background: $featured-dark;
  color: white;
  min-height: 100vh;
}
.navigation-sidebar {
  background-color: $secundary;
}
.app-title {
  font-size: 44px;
  margin-top: 10px;
  text-align: center;
}
</style>
