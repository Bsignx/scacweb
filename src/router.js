import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      meta: {
        icon: 'home', title: 'Home'
      },
      component: () => import(/* webpackChunkName: "home" */ './pages/home/Home')
    },
    {
      path: '/cronograma',
      name: 'cronograma',
      meta: {
        icon: 'calendar-alt', title: 'Cronograma'
      },
      component: () => import(/* webpackChunkName: "cronograma" */ './pages/cronograma/Cronograma')

    },
    {
      path: '/cadastros',
      name: 'cadastros',
      meta: {
        icon: 'user-md', title: 'Cadastros'
      },
      component: () => import(/* webpackChunkName: "profissionais" */ './pages/cadastros/Cadastros')

    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Login'
      },
      component: () => import(/* webpackChunkName: "login" */ './pages/login/Login')
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - SCAC`
  if (!window.uid && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }

})
export default router
