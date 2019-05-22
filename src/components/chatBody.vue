<template >
  <div class="chatBody ">
    <div class="anti h-100">
      <div class="w-100 h-100">
        <div class="row w-100 antim " h>
          <div class="col-sm-2 h-100 cg" style="overflow-y: scroll; ">
            <button
              type="button "
              style="margin-top:10px; "
              @click="changeAdd"
              class="btn btn-primary btn w-100"
            >Nueva consulta</button>
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
          <div class="col-sm-10" style="height: 100%">
            <div class="col-sm-12" style="overflow-y: scroll; height: 90%" id="scroll">
              <div
                v-for="msg in this.chatShow"
                v-bind:key="msg.id"
                
                style="padding-top: 15px ;" 
              >
              <div v-if="msg.align == true" class="w-100 row justify-content-end">
                
                <div class="col-sm-10 align-self-end">
                  <div class="card border-primary mb-3">
                    <div class="card-header">{{msg.msg}}</div>
                  </div>
                </div>
              </div>
              <div v-else class="w-100 row ">
                
                <div class="col-sm-10">
                  <div class="card border-success mb-3">
                    <div class="card-header">{{msg.msg}}</div>
                  </div>
                </div>
                

              </div>
              </div>
            </div>
            <div class="row" style="padding:15px">
              <div class="col-sm-9">
                <input
                  v-model="msg"
                  type="text"
                  class="form-control"
                  placeholder="¿ Que esta ocurriendo ?"
                >
              </div>
              <div class="col-sm-3">
                <button
                  style="width: 100%"
                  @click="send()"
                  type="button"
                  class="btn btn-primary"
                >Publicar</button>
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
import JQuery from 'jquery'

export default {
  name: "chatBody",
  data: function() {
    return {
      add: false,
      newChatText: "",
      chat: [],
      id: "",
      username: "",
      chatShow: [],
      msg: ""
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
    send: function() {
      firebase
        .database()
        .ref("chat/" + this.id + "/msg")
        .push({
          user: this.username,
          msg: this.msg
        });
        this.msg = []
    },
    conversacion: function(x) {
      this.chatShow = [];
      this.id = x.id;
      for (let keo in x.mensages) {
        if(this.username == x.mensages[keo].user){
        this.chatShow.push({
          msg: x.mensages[keo].msg,
          user: x.mensages[keo].user,
          align: true

        });
      }else{
        this.chatShow.push({
          msg: x.mensages[keo].msg,
          user: x.mensages[keo].user,
          align: false

        });

      }
      }
      let $ = JQuery
      $("#scroll").animate({ scrollTop: 9999999 }, 1000);
    },
    
    loadChat: function(x) {
      this.chatShow = []
      this.chat = [];
      let arr = [];
      let mensage = [];

      for (let key in x) {
        if (x[key].user1 == this.username || x[key].user2 == this.username) {
          mensage = [];
          for (let keo in x[key].msg) {
            if (this.id == x[key].id) {
              if(this.username == x[key].msg[keo].user ){
                
              mensage.push({
                msg: x[key].msg[keo].msg,
                user: x[key].msg[keo].user,
                align: true
              });
              
              this.chatShow.push({
                msg: x[key].msg[keo].msg,
                user: x[key].msg[keo].user,
                align: true
              });
            }else{
           
              mensage.push({
                msg: x[key].msg[keo].msg,
                user: x[key].msg[keo].user,
                align: false
              });
              
              this.chatShow.push({
                msg: x[key].msg[keo].msg,
                user: x[key].msg[keo].user,
                align: false
              });

            }
            } else {
              if(this.username == x[key].msg[keo].user ){
              mensage.push({
                msg: x[key].msg[keo].msg,
                user: x[key].msg[keo].user,
                align: true
              });
              }else{
                 mensage.push({
                msg: x[key].msg[keo].msg,
                user: x[key].msg[keo].user,
                align: false
              });
              }
            }
          }
        }
        if (x[key].user1 == this.username || x[key].user2 == this.username) {
          if (x[key].user1 == this.username) {
            
            arr.push({
              user1: x[key].user2,
              id: x[key].id,
              mensages: mensage,
              
            });
          } else {
            
            arr.push({
              user1: x[key].user1,
              id: x[key].id,
              mensages: mensage,
              
            });
          }
          
        }
      }
      this.chat = arr;
 
      let $ = JQuery
      $("#scroll").animate({ scrollTop: 99999999999999 }, 1000);
    },
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
  
  background-color: white;
}
.antim {
  margin: 0%;
}
.cg {
  background-image: linear-gradient(rgb(87, 87, 87), rgb(87, 87, 87));
}
</style>
