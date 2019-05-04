import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Foro from './views/Foro.vue'
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
      component: Home,
      beforeEnter: (to, from, next) => { 
        let user = auth()
        console.log(user)
          if (user == "user" || user == "admin" || user == "superAdmin" ) {
            return next();
          }else{
            return next('/');
          }
        
      }
    },
    {
      path: '/foro',
      name: 'foro',
      component: Foro,
      beforeEnter: (to, from, next) => { 
        let user = auth()
          if (user == "user" || user == "admin" || user == "superAdmin" ) {
            return next();
          }else{
            return next('/');
          }
        
      }
    }
  ]
})

export default router