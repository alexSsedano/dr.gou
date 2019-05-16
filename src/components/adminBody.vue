<template >
  <div class="chatBody anti">
    <div class="row mar h-100">
      <div class="col-sm-3 h-100 cg" style="overflow-y: scroll; ">
        <div v-for="msg in this.chat" v-bind:key="msg.id" class="row" style="padding-top: 15px">
          <div class="col-sm-12">
            <div class="card border-primary mb-3">
              <div class="card-header">{{msg.username}}</div>
              <div class="card-body">
                <p class="card-text">{{msg.msg}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="row">
          <div class="col-sm-12 ">
            <h2 class="text-center" style="padding: 15px">Seleccione un mensaje y un administrador</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <h2 class="text-center" style="padding: 15px">Mensaje</h2>
          </div>
          <div class="col-sm-6"><h2 class="text-center" style="padding: 15px">Administrador</h2></div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <h2 class="text-center" style="padding: 15px">{{this.selectedMsg}}</h2>
          </div>
          <div class="col-sm-6"><h2 class="text-center" style="padding: 15px">{{this.selectedAdmin}}</h2></div>
        </div>
      </div>
      <div class="col-sm-3 h-100 cg" style="overflow-y: scroll; ">
        <div class="row">
          <div class="btn-group w-100" style="padding: 15px">
            <button
              type="button"
              class="btn btn-primary dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >{{ this.drop}}</button>
            <div class="dropdown-menu w-100">
              <a class="dropdown-item" @click="filoterUsers('todos')">Todos</a>
              <a class="dropdown-item" @click="filoterUsers('admin')">Administradores</a>
              <a class="dropdown-item" @click="filoterUsers('user')">Usuarios</a>
            </div>
          </div>
        </div>
        <div v-for="user in this.usersFiltered" v-bind:key="user.id" class="row"  style="padding-top: 15px">
          <div class="col-sm-12 pad">
            <transition mode="out-in" name="custom-classes-transition" enter-active-class="animated slideInLeft " leave-active-class=" animated slideOutLeft">
              <div v-if="user.show" key="1" class="card border-primary mb-3" @click="clickUser(user) " style="margin:15px">
                  <div  class="card-header">{{user.username}}</div>
              </div>
              <div v-if="!user.show" key="2" class="card border-primary mb-3" style="margin:15px">
                  <div  class="card-header pad " >
                    <div class="row mar justify-content-center" style="width:100%;">
                      <div class="col-sm-4"><button type="button" class="btn btn-success " style="width:100%;" ><i class="fas fa-comment-dots"></i></button></div>
                      <div class="col-sm-4 "><button type="button" @click="adjust(user)" class="btn btn-warning " style="width:100%;" ><i class="fas fa-cog"></i></button></div>
                      <div class="col-sm-4 "><button type="button" class="btn btn-primary " style="width:100%;" ><i class="fas fa-undo-alt"></i></button></div>
                    </div>
                  </div>
                  <transition mode="out-in" name="custom-classes-transition" enter-active-class="animated zoomInDown " leave-active-class=" animated zoomOutUp">
                  <div v-if="user.adjust"   style="margin:15px">
                    <div class="row mar justify-content-center" style="width:100%;">
                      <div class="col-sm-6"><button type="button"  class="btn btn-success " style="width:100%;" ><i class="fas fa-comment-dots"></i></button></div>
                      <div class="col-sm-6 "><button type="button" class="btn btn-warning " style="width:100%;" ><i class="fas fa-cog"></i></button></div>
                     
                    </div>
                  </div>
                </transition>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "chatBody",
  data: function() {
    return {
      chat: [],
      users: [],
      usersFiltered: [],
      userT: "",
      drop: "",
      selectedMsg:'',
      selectedAdmin:'',
    };
  },
  methods: {
    filoterUsers: function(user) {
      this.drop = user;
      this.usersFiltered = [];
      if (user == "todos") {
        this.usersFiltered = this.users;
      } else {
        for (let i = 0; i <= this.users.length; i++) {
          if (this.users[i].userTipe == user) {
            this.usersFiltered.push(this.users[i]);
          }
        }
      }
    },
    adjust: function(user){
         console.log('entra')
        if(user.adjust ){
            user.adjust = false
          }else{
            user.adjust = true
          }
          
       

        },
    
    clickUser: function(user){
         
        if(user.userTipe == 'admin'){
          if(user.show){
            this.selectedAdmin = user.username
          user.show = false
          }else{
            this.selectedAdmin = user.username
            user.show = true
          }
          
        }else{

        }
    },
    loadChat: function(x) {
      for (let key in x) {
        this.chat.push({
          id: Math.random()
            .toString(36)
            .substr(2, 27),
          username: x[key].userName,
          msg: x[key].newChat
        });
      }
    },
    loadUsers: function(x) {
      for (let key in x) {
        this.users.push({
          id: Math.random()
            .toString(36)
            .substr(2, 27),
          username: x[key].username,
          email: x[key].email,
          userTipe: x[key].userType,
          show: true,
          adjust: false
        });
      }
    }
  },
  mounted() {
    firebase
      .database()
      .ref("newChat/")
      .on("value", snapshot => this.loadChat(snapshot.val()));
    firebase
      .database()
      .ref("users/")
      .on("value", snapshot => this.loadUsers(snapshot.val()));
    this.filoterUsers("todos");
  }
};
</script>
<style>
.anti {
  height: 86vh;
  background-color: white;
}

.cg {
  background-image: linear-gradient(rgb(237, 241, 245), rgb(237, 241, 245));
}
.mar {
  margin: 0px !important;
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.pad{
  padding-left: 0px !important;
  padding-right: 0px !important;
}
</style>
