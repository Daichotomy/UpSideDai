import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Trade from './views/Trade.vue'
import Pool from './views/Pool.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: "is-active",
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/trade',
      name: 'trade',
      component: Trade
    },
    {
      path: '/pool',
      name: 'pool',
      component: Pool
    },
  ]
})