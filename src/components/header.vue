<template>
  <div class="headi">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="home">Dr.gou</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div v-if="this.userT == 'superAdmin'" class="collapse navbar-collapse" id="navbarColor01">
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
            <a class="nav-link" @click="exit" href="">Salir</a>
          </li>
        </ul>
      </div>
      <div v-else class="collapse navbar-collapse" id="navbarColor01">
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
            <a class="nav-link" @click="exit" href="" >Salir</a>
          </li>
        </ul>
      </div>
    </nav>
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
      localStorage.removeItem('userId');

    }
  },
  created() {
    firebase.database().ref("users/").on("value", snapshot => this.loadUser(snapshot.val()));
  }
};
</script>