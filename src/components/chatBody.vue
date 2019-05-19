<template >
  <div class="chatBody">
    <div class="anti">
      <div class="w-100 h-100">
        <div class="row w-100 antim h-100">
          <div class="col-sm-2 h-100 cg" style="overflow-y: scroll; ">
            <button type="button " style="margin-top:10px; " @click="changeAdd" class="btn btn-primary btn w-100">Añadir chat</button>
            <div v-if="this.add">
              <input v-model="newChatText" type="text" class="w-100" style="margin-top:10px;">
            </div>
            <div v-for="msg in this.chat" v-bind:key="msg.id" class="row" style="padding-top: 15px">
              <div class="col-sm-12">
                <div class="card border-primary mb-3" @click="conversacion(msg)">
                  <div class="card-header">{{msg.user1}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class=" col-sm-10" style="height: 100%">
          <div class="col-sm-12 " style="overflow-y: scroll; height: 90%">
            <div v-for="msg in this.chatShow" v-bind:key="msg.id" class="row"  style="padding-top: 15px ; height: 100%">
              <div class="col-sm-12">
                <div class="card border-primary mb-3">
                  <div class="card-header">{{msg.msg}}</div>
                </div>
              </div>
            </div>
            </div>
            <div class="row" >
              <div class="col-sm-9" >
                <input v-model="msg" type="text" class="form-control" placeholder="¿ Que esta ocurriendo ?">
              </div>
              <div class="col-sm-3">
                <button style="width: 100%"  type="button" class="btn btn-primary">Publicar</button>
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
  name: "chatBody",
  data: function() {
    return {
      add: false,
      newChatText: "",
      chat: [],
      username: "",
      chatShow: [],
      msg: ''
    };
  },
  methods: {
    changeAdd: function() {
      if (this.add) {
        if (this.newChatText != "") {
          let id =
            Math.random()
              .toString(36)
              .substr(2, 27) +
            Math.random()
              .toString(36)
              .substr(2, 27) +
            Math.random()
              .toString(36)
              .substr(2, 27);
          firebase
            .database()
            .ref("newChat/" + id)
            .set({
              id: id,
              newChat: this.newChatText,
              userName: this.username
            });
        }
        this.add = false;
      } else {
        this.add = true;
      }
    },
    loadUser: function(users) {
      for (let key in users) {
        if (users[key].userId == localStorage.getItem("userId")) {
          this.username = users[key].username;
        }
      }
    },
    conversacion: function(x) {
      this.chatShow = [];
      for (let keo in x.mensages) {
        this.chatShow.push({
          msg: x.mensages[keo].msg,
          user: x.mensages[keo].user
        });
      }
    },
    loadChat: function(x) {
      this.chat = [];
      let arr = [];
      let mensage = [];

      for (let key in x) {
        if (x[key].user1 == this.username || x[key].user2 == this.username) {
          mensage = [];
          for (let keo in x[key].msg) {
            mensage.push({
              msg: x[key].msg[keo].msg,
              user: x[key].msg[keo].user
            });
          }
        }
        if (x[key].user1 == this.username || x[key].user2 == this.username) {
          if (x[key].user1 == this.userName) {
            arr.push({
              user1: x[key].user2,
              mensages: mensage
            });
          } else {
            arr.push({
              user1: x[key].user1,
              mensages: mensage
            });
          }
        }
      }
      this.chat = arr;
    }
  },
  mounted() {
    firebase
      .database()
      .ref("users/")
      .on("value", snapshot => this.loadUser(snapshot.val()));
    firebase
      .database()
      .ref("chat/")
      .on("value", snapshot => this.loadChat(snapshot.val()));
  }
};
</script>
<style>
.anti {
  height: 86vh;
  background-color: white;
}
.antim {
  margin: 0%;
}
.cg {
  background-image: linear-gradient(rgb(87, 87, 87), rgb(87, 87, 87));
}
</style>
