import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Foro from './views/Foro.vue'
import { auth } from './helper/auth'
import firebase from 'firebase'

var registeredUsers = [];

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
        

        let id = localStorage.getItem('userId')
        if (id) {
          let a = firebase.database().ref('users/');
          a.once('value').then(function (snapshot) {
            registeredUsers = []
            for (let key in snapshot.val()) {
              registeredUsers.push({
                userType: snapshot.val()[key].userType,
                userId: snapshot.val()[key].userId,
                username: snapshot.val()[key].username
              })
            }
            for (let i = 0; i <= registeredUsers.length; i++) {
              if (id == registeredUsers[i].userId) {
                console.log(id)
                console.log(registeredUsers[i].userType)
                if (registeredUsers[i].userType == "user" || registeredUsers[i].userType == "admin" || registeredUsers[i].userType == "superAdmin") {
                  return next();
                } else {
                  return next('/');
                }

              }
            }
          })
        }

        

      }
    },
    {
      path: '/foro',
      name: 'foro',
      component: Foro,
      beforeEnter: (to, from, next) => {
        
        let id = localStorage.getItem('userId')
        if (id) {
          let a = firebase.database().ref('users/');
          a.once('value').then(function (snapshot) {
            registeredUsers = []
            for (let key in snapshot.val()) {
              registeredUsers.push({
                userType: snapshot.val()[key].userType,
                userId: snapshot.val()[key].userId,
                username: snapshot.val()[key].username
              })
            }
            for (let i = 0; i <= registeredUsers.length; i++) {
              if (id == registeredUsers[i].userId) {
                console.log(id)
                console.log(registeredUsers[i].userType)
                if (registeredUsers[i].userType == "user" || registeredUsers[i].userType == "admin" || registeredUsers[i].userType == "superAdmin") {
                  return next();
                } else {
                  return next('/');
                }

              }
            }
          })
        }

      }
    }
  ]
})

export default router