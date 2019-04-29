import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'


Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
  ]
})

const openRoutes=['login'];

router.beforeEach((to, from, next) => {
  firebase.database().ref('users/').on('value', snapshots => this.loadUsers(snapshots.val()))
  let id =localStorage.getItem('userId')

  if(){

  }
  
})

export default router