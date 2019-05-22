<template>
  <div class="container loginPosition ">
    <div class="row justify-content-between">
      <div class="col-sm-4">
        <h2 class="textcolour marginTop">Bienvenido a Dr.gou</h2>
        <br>
        <h5 class="textcolour">Somos una organizacion sin animo de lucro creada para ayudarte.</h5>
        <button v-if="!register" type="button" class="btn btn-outline-primary marginBot buttonColorWhite" v-on:click="registerButton()">Inicia sesion</button>
        <button v-if="register" type="button" class="btn btn-outline-primary marginBot buttonColorWhite" v-on:click="registerButton()">Registrate</button>
      </div>

      <div class="col-sm-4 backgroundWhite" v-if="register">
        <form>
          <fieldset>
            <div class="form-group marginTop">
              <label for="exampleInputEmail1">Nombre de usuario</label>
              <input v-model="loginUser"  @keyup.enter="login" type="user" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nombre de usuario">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Contraseña</label>
              <input v-model="loginPassword"  @keyup.enter="login" type="password" class="form-control" id="exampleInputPassword1" placeholder="Contraseña">
            </div>
            <button  @click="login" type="button" class="btn btn-outline-primary marginBot">Iniciar sesion</button>
          </fieldset>
        </form>
      </div>

      <div class="col-sm-4 backgroundWhite" v-if="!register">
        <form>
          <fieldset>
            <div class="form-group marginTop">
              <label for="exampleInputEmail1">Correo electronico</label>
              <input v-model="registerEmail" @keyup.enter="signUp" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
              <small id="emailHelp" class="form-text text-muted" >No comparetiremos tu correo con nadie.</small>
            </div>
            <div class="form-group marginTop">
              <label for="exampleInputEmail1">Nombre de usuario</label>
              <input v-model="registerUserName" @keyup.enter="signUp" type="text" class="form-control" placeholder="Nombre usuario">
              <small id="emailHelp"  class="form-text text-muted">No comparetiremos tu correo con nadie.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Introduce tu contraseña</label>
              <input v-model="registerPassword" @keyup.enter="signUp" type="password" class="form-control"  placeholder="Password">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Vuelve a introducir tu contraseña</label>
              <input v-model="registerPassword2" @keyup.enter="signUp" type="password" class="form-control"   placeholder="Password">
            </div>
            <button @keyup.enter="signUp" @click="signUp" type="button" class="btn btn-outline-primary marginBot">Registrar</button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "login",
  data: function() {
    return {
      registeredUsers: [],
      register: false,
      registerEmail: "",
      registerPassword: "",
      registerPassword2: "",
      registerUserName: "",
      coincidencesName: 0,
      coincidencesEmail: 0,
      loginUser: "",
      loginPassword: ""
    };
  },
  methods: {
    signUp: function() {
      if(this.registerUserName!='' && this.registerPassword!= '' && this.registerEmail!=''){
      this.coincidencesName = 0;
      this.coincidencesEmail = 0;
      if (this.registerPassword == this.registerPassword2) {
        for (let i = 0; i < this.registeredUsers.length; i++) {
          if (this.registerUserName == this.registeredUsers[i].username) {
            this.coincidencesName++;
            i = this.registeredUsers.length - 1;
          }
          if (this.registerEmail == this.registeredUsers[i].email) {
            this.coincidencesEmail++;
            i = this.registeredUsers.length - 1;
          }
        }
        if (this.coincidencesName > 0) {
          this.$notify({
            group: "foo",
            title: "Este usuario ya existe.",
            type: "error",
            position: "top left"
          });
        } else if (this.coincidencesEmail > 0) {
          this.$notify({
            group: "foo",
            title: "Este email ya existe.",
            type: "error",
            position: "top left"
          });
        } else {
          firebase.database().ref("users/" + this.registerUserName).set({
            username: this.registerUserName,
            email: this.registerEmail,
            password: this.registerPassword,
            userType: "user",
            userId: ""
          })
          .then(() => {
            this.registerSuccess(), (this.register = true);
          });
        }
      } else {
        this.$notify({
          group: "foo",
          title: "Las contraseñas no coinciden.",
          type: "error",
          position: "top left"
        });
      }
      }else{
        this.$notify({
          group: "foo",
          title: "Registro invalido.",
          type: "error",
          position: "top left"
        });
      }
    },
    removeUserId() {
      for (let i = 0; i < this.registeredUsers.length; i++) {
        let id = localStorage.getItem("userId");
        if (id == this.registeredUsers[i].userId) {
          let path = "users/" + this.registeredUsers[i].username;
          firebase.database().ref(path).set({
            username: this.registeredUsers[i].username,
            email: this.registeredUsers[i].email,
            password: this.registeredUsers[i].password,
            userType: "user",
            userId: ""
          });
        }
      }
      localStorage.removeItem("userId");
    },

    loadUsers(users) {
      this.registeredUsers = [];
      for (let key in users) {
        this.registeredUsers.push({
          username: users[key].username,
          email: users[key].email,
          password: users[key].password,
          userType: users[key].userType,
          userId: users[key].userId
        });
      }
    },

    login: function() {
      let redirect = false;
      
        for (let i = 0; i < this.registeredUsers.length; i++) {
          if (
            this.loginUser == this.registeredUsers[i].username &&
            this.loginPassword == this.registeredUsers[i].password
          ) {
            this.iduniq = function() {
              return Math.random().toString(36).substr(2, 27);
            };
            let path = "users/" + this.loginUser;
            let userId = "" + this.iduniq() + this.iduniq() + this.iduniq();
            localStorage.setItem("userId", userId);
            firebase.database().ref(path).set({
                username: this.registeredUsers[i].username,
                email: this.registeredUsers[i].email,
                password: this.registeredUsers[i].password,
                userType: this.registeredUsers[i].userType,
                userId: userId
              });
            redirect = true;
            i = this.registeredUsers.length - 1;
          }
        }
      
      if (redirect) {
        this.$router.push("Home");
      } else {
        this.$notify({
          group: "foo",
          title: "Nombre o contraseña incorrectos",
          type: "error",
          position: "top left"
        });
      }
    },

    registerButton: function() {
      if (this.register == true) {
        this.register = false;
      } else {
        this.register = true;
      }
    },

    registerSuccess: function() {
      this.$notify({
        group: "foo",
        title: "Te has registrado con exito.",
        type: "success",
        position: "top left"
      });
    }
  },
  created() {
    window.addEventListener("onunload", this.removeUserId);
  },
  mounted() {
    firebase.database().ref("users/").on("value", snapshots => this.loadUsers(snapshots.val()));
  }
};
</script>