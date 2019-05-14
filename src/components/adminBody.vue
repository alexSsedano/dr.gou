<template >
  <div class="chatBody">
    <div class="anti">
      <div class="w-100 h-100">
        <div class="row w-100 antim h-100">
          <div class="col-sm-2 h-100 cg"></div>
          <div class="col-sm-8"></div>
          <div class="col-sm-2 h-100 cg">
            <ul class="nav nav-pills scrollbar-primary nav-stacked anyClass h-100 w-100">
              <div v-for="msg in this.chat" v-bind:key="msg.id" class="row justify-content-center w-100">
                <li class="nav-item w-100">
                  <a class="nav-link active w-100" href="#">{{msg.msg}}</a>
                </li>
              </div>
            </ul>
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
      chat: []
    };
  },
  methods: {
    loadChat: function(x) {
      for (let key in x) {
        this.chat.push({
          id: Math.random().toString(36).substr(2, 27),
          username: x[key].usereName,
          msg: x[key].newChat
        });
      }
      console.log(this.chat)
    }
  },
  mounted() {
    firebase.database().ref("newChat/").on("value", snapshot => this.loadChat(snapshot.val()));
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
.anyClass {
  overflow-y: scroll;
}
.scrollbar-primary::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
}
.scrollbar-primary::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #4285f4;
}
</style>
