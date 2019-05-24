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
          <li class="nav-item active">
            <a class="nav-link" href="home">Inicio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="foro">Foro</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="chat">Chat</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="admin">Administracion</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="exit" href="#">Salir</a>
          </li>
        </ul>
      </div>
      </nav>
    </div>
    

      
      <div v-else>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary " style="margin-bottom: 0px; height: 100%">
      <a class="navbar-brand" href="home">Dr.gou</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="home">Inicio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="foro">Foro</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="chat">Chat</a>
          </li>
          
          <li class="nav-item">
            <a class="nav-link" @click="exit" href="#">Salir</a>
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