<template >
  <div class="chatBody">

    <div class="  d-none d-md-block">

      <div class="w-100 anti ">
        <div class="row w-100 antim h-100" >
          <div class="col-sm-3 h-100 cg" style="overflow-y: scroll; ">
            <div v-if="this.add">
            <button type="button " style="margin-top:10px; " @click="changeAdd" class="btn btn-primary btn w-100" >Enviar consulta</button>            
              <textarea v-model="newChatText" @keyup.enter="changeAdd" type="text" class="w-100" style="margin-top:10px;"></textarea>
            </div>
            <div v-else>
              <button type="button " style="margin-top:10px; " @click="changeAdd" class="btn btn-primary btn w-100">Nueva consulta</button>
            </div>
          <div v-if="this.userT =='superAdmin'">
            <div v-for="msg in this.chat" v-bind:key="msg.id" class="row" style="padding-top: 15px">
              <div class="col-sm-12">
                <div class="card border-primary mb-3" @click="conversacion(msg)">
                  <div class="card-header">
                    <div class="row">
                  <div class="col-sm-6">
                  <p>{{msg.user1}} </p>
                  </div>
                  <div class="col-sm-6 d-flex align-items-end flex-column">
                  <button class="btn btn-primary btn "  @click="deleteMsg(msg)"><i class="fas fa-times"></i></button>
                  </div>
                </div>
                </div>
                </div>
              </div>
            </div>
            </div>
            <div v-else>
              <div v-for="msg in this.chat" v-bind:key="msg.id" class="row" style="padding-top: 15px">
              <div class="col-sm-12">
                <div class="card border-primary mb-3" @click="conversacion(msg)">
                  <div class="card-header">
                    <div class="row">
                  <div class="col-sm-12">
                  <p>{{msg.user1}} </p>
                  </div>
                  
                </div>
                </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          <div class="col-sm-9" style="height: 100%; padding-left:0px ; padding-right:0px">
            <div v-if="this.chatShow == []">
              
            </div>
            <div v-else  style="height: 100%; ">
              <div class="col-sm-12" style="overflow-y: scroll; height: 90%" id="scroll">
                <div v-for="msg in this.chatShow" v-bind:key="msg.id" style="padding-top: 15px ;" >
                <div v-if="msg.align == true" class="w-100 row justify-content-end">
                  <div class="col-sm-11 align-self-end">
                    <div class="card border-primary mb-3">
                      <div class="card-header">
                        <div class="col">
                          <div class="col-sm-9">{{msg.msg}}</div>
                          <div class="col-sm-3  d-flex align-items-end flex-column">{{msg.date}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="w-100 row ">               
                  <div class="col-sm-11">
                    <div class="card border-success mb-3">
                      <div class="card-header">
                        <div class="col">
                          <div class="col-sm-3">{{msg.date}}</div>
                          <div class="col-sm-9 ">{{msg.msg}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            
            <div class="row" style="padding:15px; padding-right:20px; padding-left:15px">
              <div class="col-sm-9">
                <textarea v-model="msg" @keyup.enter="send()" type="text" class="form-control" placeholder="¿ Que esta ocurriendo ?" rows="1" ></textarea>
              </div>
              <div class="col-sm-3">
                <button style="width: 100%" @click="send()" type="button" class="btn btn-primary">Publicar</button>
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
import JQuery from 'jquery'

export default {
  name: "chatBody",
  data: function() {
    return {
      add: false,
      newChatText: "",
      chat: [],
      userT: "",
      id: "",
      username: "",
      chatShow: [],
      msg: ""
    };
  },
  methods: {
    changeAdd: function() {
      let today = new Date();
      if (this.add) {
        if (this.newChatText != "") {
          let id =Math.random().toString(36).substr(2, 27) +Math.random().toString(36).substr(2, 27) +Math.random().toString(36).substr(2, 27);
          firebase.database().ref("newChat/" + id).set({
            id: id,
            newChat: this.newChatText,
            userName: this.username,
            date: today.toLocaleDateString("es-ES") + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
          });
          this.$notify({
            group: "foo",
            title: "Consulta enviada",
            type: "success",
            position: "top left"
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
          this.userT = users[key].userType;
          
        }
      }
    },
    send: function() {
       let today = new Date();
      if(this.msg != ''){
      firebase.database().ref("chat/" + this.id + "/msg").push({
        user: this.username,
        msg: this.msg,
        date: today.toLocaleDateString("es-ES") + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
      });
      this.msg = []
      let $ = JQuery
      $("#scroll").animate({ scrollTop: 9999999 }, 1000);
      }
    },
    deleteMsg(x){
      if (confirm("¿ Esta seguro de que desea eliminar este chat ?")) {
      firebase.database().ref("chat/" + x.id).remove();
      this.chatShow= []
    }
    },
    conversacion: function(x) {
      this.chatShow = [];
      this.id = x.id;
      for (let keo in x.mensages) {
        if(this.username == x.mensages[keo].user){
          this.chatShow.push({
            msg: x.mensages[keo].msg,
            user: x.mensages[keo].user,
            date: x.mensages[keo].date,
            align: true
          });
        }else{
          this.chatShow.push({
            msg: x.mensages[keo].msg,
            user: x.mensages[keo].user,
            date: x.mensages[keo].date,
            align: false
          });
        }
      }
      
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
                date: x[key].msg[keo].date,
                align: true
              });
              
              this.chatShow.push({
                msg: x[key].msg[keo].msg,
                user: x[key].msg[keo].user,
                date: x[key].msg[keo].date,
                align: true
              });
            }else{
           
              mensage.push({
                msg: x[key].msg[keo].msg,
                user: x[key].msg[keo].user,
                date: x[key].msg[keo].date,
                align: false
              });
              
              this.chatShow.push({
                msg: x[key].msg[keo].msg,
                user: x[key].msg[keo].user,
                date: x[key].msg[keo].date,
                align: false
              });

            }
            } else {
              if(this.username == x[key].msg[keo].user ){
              mensage.push({
                msg: x[key].msg[keo].msg,
                user: x[key].msg[keo].user,
                date: x[key].msg[keo].date,
                align: true
              });
              }else{
                 mensage.push({
                msg: x[key].msg[keo].msg,
                user: x[key].msg[keo].user,
                date: x[key].msg[keo].date,
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
