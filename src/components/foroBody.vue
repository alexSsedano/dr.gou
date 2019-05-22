<template>
  <div class="homeBody container">
    <div class="row">
      <div class="col-sm-12">
        <div class="row justify-content-center" style="padding-top: 16px">
          <div class="col-sm-7">
             <textarea class="form-control" v-model="msg" placeholder="¿ Que esta ocurriendo ?" id="exampleTextarea" rows="1"></textarea>
          </div>
          <div  class="col-sm-2">
            <button style="width: 100%" @click="addPost" type="button" class="btn btn-primary">Publicar</button>
          </div>
        </div>
        <div v-if=" this.userT == 'superAdmin' ">
        <div v-for="msg in this.foro" v-bind:key="msg.id" class="row d-flex justify-content-between">
          <div  style="padding-top: 16px" class="col-sm-11">
            <div class="card border-secondary mb-3" >
              <div class="card-header">
                <div class="row d-flex justify-content-between">
                  <div class="col-sm-4">
                    <p>{{msg.username}}</p>
                  </div>
                  <div class="col-sm-4">
                    <p style="text-align:center">{{msg.date}}</p>
                  </div>
                  <div  class="col-sm-4 d-flex align-items-end flex-column" >
                    <button @click="deleteMsg(msg)"><i class="fas fa-times"></i></button>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <p class="card-text">{{msg.msg}}</p>
              </div>
            </div>
          </div>
       
        </div>
        </div>
        <div v-else>
        <div v-for="msg in this.foro" v-bind:key="msg.id" class="row d-flex justify-content-between">
          <div  style="padding-top: 16px" class="col-sm-11">
            <div class="card border-secondary mb-3" >
              <div class="card-header">
                <div class="row d-flex justify-content-between">
                  <div class="col-sm-4">
                    <p>{{msg.username}}</p>
                  </div>
                  <div class="col-sm-4">
                    <p style="text-align:center">{{msg.date}}</p>
                  </div>
                  <div  class="col-sm-4 d-flex align-items-end flex-column" >
                    
                  </div>
                </div>
              </div>
              <div class="card-body">
                <p class="card-text">{{msg.msg}}</p>
              </div>
            </div>
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
  name: "homeBody",
  data: function() {
    return {
      foro: [],
      userT: "",
      userName: "",
      msg: "",
      registeredUsers: [],
      
    };
  },
  methods: {
    addPost: function() {
      if(this.msg!=''){
      let today = new Date();
      let id = Math.random().toString(36).substr(2, 27) +Math.random().toString(36).substr(2, 27) +Math.random().toString(36).substr(2, 27)
      firebase.database().ref("post/"+ id).set({
          date: today.toLocaleDateString("es-ES") + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
          userName: this.userName,
          msg: this.msg,
          id : id,
          today: today.getTime()
        });
      this.msg = "";
      }
    },
    loadUser: function(users){
      for (let key in users) {
        if(users[key].userId == localStorage.getItem("userId")){
          this.userName = users[key].username,
          this.userT = users[key].userType       
        }
      }
    },
    deleteMsg(x){
      if (confirm("¿ Esta seguro de que desea Eliminar este post ?")) {
      firebase.database().ref("post/" + x.id).remove();
    } 
      
    },
    loadForo: function(users) {
      this.foro= []
      let arr =[]
      for (let key in users) {
        arr.push({
          date: users[key].date,
          msg: users[key].msg,
          username: users[key].userName,
          id: users[key].id,
          today: users[key].today          
        });
      }     
      arr = arr.sort(function(a,b) {
        return a.today - b.today;
      });
      this.foro = arr.reverse()
    }
  },
  created() {
    firebase.database().ref("post/").on("value", snapshot => this.loadForo(snapshot.val()))
    firebase.database().ref("users/").on("value", snapshot => this.loadUser(snapshot.val()))    
  }
};
</script>