<template>
  <div class="homeBody container">
    <div class="row">
      <div class="col-sm-12">
        <div class="row justify-content-center" style="padding-top: 16px">
          <div class="col-sm-7">
            <input v-model="msg" type="text" class="form-control" placeholder="¿ Que esta ocurriendo ?">
          </div>
          <div  class="col-sm-2">
            <button style="width: 100%" @click="addPost" type="button" class="btn btn-primary">Publicar</button>
          </div>
        </div>
        <div v-for="msg in this.foro" v-bind:key="msg.id" class="row justify-content-center">
          <div style="padding-top: 16px" class="col-sm-11">
            <div class="card border-secondary mb-3" style="border-radius: 10px">
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
    }
  },
  created() {
    this.userName = localStorage.getItem("userName");
  },
  mounted() {
    var arr = [];
    firebase
      .database()
      .ref("post/")
      .on("value", function(snapshot) {
        var els = snapshot.val();
        for (let key in els) {
          arr.push({
            id: Math.random()
              .toString(36)
              .substr(2, 27),
            username: els[key].userName,
            date: els[key].date,
            msg: els[key].msg
          });
        }
        arr.reverse();
      });

    this.foro = arr;
  }
};
</script>