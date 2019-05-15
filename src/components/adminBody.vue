<template >
  <div class="chatBody">
    <div class="anti">
      <div class="w-100 h-100">
        <div class="row w-100 h-100">
          <div class="col-sm-3 h-100 " style="overflow-y: scroll;padding-top: 10px">
              <div v-for="msg in this.chat" v-bind:key="msg.id" class="row mar justify-content-center w-100">

                <div class="card border-primary mb-3 w-100"   >
                    <div class="card-header">{{msg.username}}</div>
                    <div class="card-body">
                        <p class="card-text">{{msg.msg}}</p>
                    </div>
                </div>
                  
              
                
              </div>
           
          </div>
          <div class="col-sm-7"></div>
          <div class="col-sm-2 h-100 cg bl w-100" >
            
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
          username: x[key].userName,
          msg: x[key].newChat
        });
      }
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

.cg {
  background-image: linear-gradient(rgb(237, 241, 245), rgb(237, 241, 245));
}
.mar{
    margin-left: 10px !important;

}


</style>
