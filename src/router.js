import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import {auth} from './helper/auth'


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

router.beforeEach((to, from, next) => {
  
  
 
  let user = auth();
  
  if ("user" == "user") {
    return next();
  }else{
    return next('/');
  }
})

export default router