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
                  <div class="col-sm-4"><p>Todos</p></div>
                  <div class="col-sm-4"><p>Administradores</p></div>
                  <div class="col-sm-4"><p>Usuarios</p></div>
                </div>
              <div v-for="user in this.users" v-bind:key="user.id" class="row" style="padding-top: 15px">
                
               
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
      users: []
    };
  },
  methods: {
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
