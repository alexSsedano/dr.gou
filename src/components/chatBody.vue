<template >
  <div class="chatBody">
    <div class="anti">
      <div class="w-100 h-100">
        <div class="row w-100 antim h-100">
          <div class="col-sm-2 h-100 cg">
            <button
              type="button "
              style="margin-top:10px; "
              @click="changeAdd"
              class="btn btn-primary btn w-100"
            >Añadir chat</button>
            <div v-if="this.add">
              <input v-model="newChatText" type="text" class="w-100" style="margin-top:10px;">
            </div>
            <div v-for="msg in this.chat" v-bind:key="msg.id" class="row" style="padding-top: 15px">
              <div class="col-sm-12">
                <div class="card border-primary mb-3" @click="sMsg(msg)">
                  <div class="card-header">{{msg.user1}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-10"></div>
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
      chatShow: []
    };
  },
  methods: {
    changeAdd: function() {
      let name = localStorage.getItem("userName");
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
              userName: name
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
          this.userName = users[key].username;
        }
      }
    },
    showChat: function() {},
    loadChat: function(x) {
      this.chat = [];
      let arr = [];
      let mensage = [];

      for (let key in x) {
        if (x[key].user1 == this.userName || x[key].user2 == this.userName) {
          mensage = [];
          for (let keo in x[key].msg) {
            mensage.push({
              msg: x[key].msg[keo].msg,
              user: x[key].msg[keo].user
            });
          }
        }
        arr.push({
          user1: x[key].user1,
          user2: x[key].user2,
          mensages: mensage
        })
      }
      this.chat=arr;
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
