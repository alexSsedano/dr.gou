<template >
  <div class="chatBody anti">
      
        <div class="row mar h-100">
          <div class="col-sm-2 h-100 cg" style="overflow-y: scroll; ">
              <div v-for="msg in this.chat" v-bind:key="msg.id" class="row" style="padding-top: 15px">
                    <div class="col-sm-12">
                        <div class="card border-primary mb-3 ">
                            <div class="card-header">{{msg.username}}</div>
                            <div class="card-body">
                                <p class="card-text">{{msg.msg}}</p>
                            </div>
                        </div>
                    </div>
                
            </div>
        </div>
        <div class="col-sm-8"></div>
        <div class="col-sm-2 h-100 cg" style="overflow-y: scroll; ">
          <div class="row">
                  <div class="btn-group w-100" style="padding: 15px">
                    <button type="button" class="btn btn-primary dropdown-toggle " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     {{ this.drop}}
                    </button>
                    <div class="dropdown-menu w-100">
                      <a class="dropdown-item" @click="filoterUsers('todos')">Todos</a>
                      <a class="dropdown-item" @click="filoterUsers('admin')">Administradores</a>
                      <a class="dropdown-item" @click="filoterUsers('user')">Usuarios</a>
                    </div>
                  </div>
                  
                </div>
              <div v-for="user in this.usersFiltered" v-bind:key="user.id" class="row" style="padding-top: 15px">
                    <div class="col-sm-12">
                        <div class="card border-primary mb-3 ">
                            <div class="card-header">{{user.username}}</div>
                        </div>
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
      userT: '',
      drop: ''
    };
  },
  methods: {
    filoterUsers: function(user){
      this.drop = user
      this.usersFiltered = []
      if(user == 'todos'){
        this.usersFiltered = this.users
      }else{
        for(let i = 0; i<= this.users.length; i++){
          if(this.users[i].userTipe == user){
            this.usersFiltered.push(this.users[i])
          }
        }
      }
      

      
    },
    loadChat: function(x) {
      for (let key in x) {
        this.chat.push({
          id: Math.random().toString(36).substr(2, 27),
          username: x[key].userName,
          msg: x[key].newChat
        });
      }
    },
    loadUsers: function(x) {
      for (let key in x) {
        this.users.push({
          id: Math.random().toString(36).substr(2, 27),
          username: x[key].username,
          email: x[key].email,
          userTipe: x[key].userType
        });
      }
    }
  },
  mounted() {
    firebase.database().ref("newChat/").on("value", snapshot => this.loadChat(snapshot.val()));
    firebase.database().ref("users/").on("value", snapshot => this.loadUsers(snapshot.val()));
    this.filoterUsers('todos')
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
.mar{
    margin: 0px !important;

}


</style>
