<template>
  <div class="headi" style="height: 100%">
    <div v-if="this.userT == 'superAdmin'">
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary " style="margin-bottom: 0px; height: 100%">
      <a class="navbar-brand" href="home">Dr.gou</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item ">
            <router-link :to="'/Home'">
              <a class="nav-link" >Inicio</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/foro'">
              <a class="nav-link" >Foro</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/chat'">
              <a class="nav-link" >Chat</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/admin'">
              <a class="nav-link" >Administracion</a>
            </router-link>
          </li>
          <router-link :to="'#'">
              <a class="nav-link" @click="exit" >Salir</a>
            </router-link>
        </ul>
      </div>
      </nav>
    </div>
    

      
      <div v-else>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary " style="margin-bottom: 0px; ">
      <a class="navbar-brand" href="home">Dr.gou</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav ">
          <li class="nav-item ">
            <router-link :to="'/Home'">
              <a class="nav-link" >Inicio</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/foro'">
              <a class="nav-link" >Foro</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/chat'">
              <a class="nav-link" >Chat</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'#'">
              <a class="nav-link" @click="exit" >Salir</a>
            </router-link>
          </li>
        </ul>
      </div>
      </nav>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "headi",
  data: function() {
    return {
      userT: ""
    };
  },
  methods: {
    loadUser: function(users) {
      for (let key in users) {
        if (users[key].userId == localStorage.getItem("userId")) {
          this.userT = users[key].userType;
        }
      }
    },
    exit: function(){

    if (confirm("¿ Esta seguro de que desea salir ?")) {
      localStorage.removeItem('userId');
      this.$router.push("/");
    } 

      

    }
  },
  created() {
    firebase.database().ref("users/").on("value", snapshot => this.loadUser(snapshot.val()));
  }
};
</script>