<template>
  <div class="homeBody">
    <div class="row justify-content-center">
      <div style=" padding-right: 0px!important" class="col-sm-11">
        <input v-model="msg" type="text" class="form-control" placeholder="¿ Que esta ocurriendo ?">
      </div>
      <div style="padding-left: 0px!important; " class="col-sm-1">
        <button style="width: 100%" @click="addPost" type="button" class="btn btn-primary">Post</button>
      </div>
    </div>

    <div style="margin-top: 16px" class="row justify-content-center">
      <div class="col-sm-11">
        <div v-for="msg in this.foro" v-bind:key="msg.id" class="row justify-content-center">
          <div class="col-sm-11">
            <div class="card border-secondary mb-3">
              <div class="card-header">
                <div class="row justify-content-between">
                  <div class="col-sm-2">
                    <p>{{msg.username}}</p>
                  </div>
                  <div class="col-sm-2">
                    <p style="text-align:center">{{msg.date}}</p>
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
import {user} from '../helper/auth.js'
import {loadForoFun} from '../helper/auth.js'

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
      firebase
        .database()
        .ref("post/")
        .push({
          date:
            today.toLocaleDateString("es-ES") +
            " " +
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds(),
          userName: this.userName,
          msg: this.msg
        });
      this.msg = "";
    },
    loadUsers: function(users) {
      this.registeredUsers = [];
      for (let key in users) {
        this.registeredUsers.push({
          userType: users[key].userType,
          userId: users[key].userId,
          username: users[key].username
        });
      }
    },
    
  },
  mounted() {
    this.userName = user()
    this.foro = loadForoFun()
    console.log(loadForoFun())
    
  }
};
</script>