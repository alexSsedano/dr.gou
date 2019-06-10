import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-socket.io'
import Notifications from 'vue-notification'

import('./css/style.css')

Vue.use(Notifications)
Vue.config.productionTip = false;

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
  //connection: window.location.hostname,
}));


  // Initialize Firebase
  
  const config = {
    apiKey: "AIzaSyB9PZmQ2n97iUVplqWdEjjUzrktEVhWJgA",
    authDomain: "dr-gou.firebaseapp.com",
    databaseURL: "https://dr-gou.firebaseio.com",
    projectId: "dr-gou",
    storageBucket: "dr-gou.appspot.com",
    messagingSenderId: "679764000533"
  };
  firebase.initializeApp(config);

 


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
