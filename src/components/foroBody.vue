<template>
  <div class="homeBody container">
    <div class="row">
      <div class="col-sm-12">
        <div class="row justify-content-center" style="padding-top: 16px">
          <div class="col-sm-7">
             <textarea class="form-control" v-model="msg"   placeholder="¿ Que esta ocurriendo ?" id="exampleTextarea" rows="1"></textarea>
          </div>
          <div  class="col-sm-2">
            <button style="width: 100%" @click="addPost" type="button" class="btn btn-primary">Publicar</button>
          </div>
        </div>
        <div v-for="msg in this.foro" v-bind:key="msg.id" class="row justify-content-center">
          <div style="padding-top: 16px" class="col-sm-11">
            <div class="card border-secondary mb-3" >
              <div class="card-header">
                <div class="row justify-content-between">
                  <div class="col-sm-2">
                    <p>{{msg.username}}</p>
                  </div>
                  <div class="col-sm-2">
                    <p style="text-align:center">{{msg.date}}</p>
                  </div>
                  <div class="col-sm-2">
                    <i class="fas fa-times"></i>
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
</template>
<script>
import firebase from "firebase";

export default {
  name: "homeBody",
  data: function() {
    return {
      foro: [],
      userName: "",
      msg: "",
      registeredUsers: []
    };
  },
  methods: {
    addPost: function() {
      let today = new Date();
      firebase.database().ref("post/").push({
          date: today.toLocaleDateString("es-ES") + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
          userName: this.userName,
          msg: this.msg,
          id :Math.random().toString(36).substr(2, 27) +Math.random().toString(36).substr(2, 27) +Math.random().toString(36).substr(2, 27)

        });
      this.msg = "";
    },
    loadUser: function(users){
      for (let key in users) {
        if(users[key].userId == localStorage.getItem("userId")){
          this.userName = users[key].username
        }
      }

    },

    loadForo: function(users) {
      this.foro= []
      for (let key in users) {

        this.foro.push({
          date: users[key].date,
          msg: users[key].msg,
          username: users[key].userName
          
        });
      }
      this.foro = this.foro.reverse()
    }
  },
  mounted() {
    firebase.database().ref("post/").on("value", snapshot => this.loadForo(snapshot.val()))
    firebase.database().ref("users/").on("value", snapshot => this.loadUser(snapshot.val()))    
  }
};
</script>