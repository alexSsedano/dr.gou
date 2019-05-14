<template >
    <div class="chatBody" >
        <div class="anti" >
            <div class="w-100 h-100">
                <div class="row w-100 antim h-100"  >
                    <div class="col-sm-2 h-100 cg" >
                        
                    </div>
                    <div class="col-sm-8"></div>
                    <div class="col-sm-2 h-100 cg" >
                        
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
               
            };
        },
        methods: {
            
       
        },
        mounted() {
    var arr = [];
    firebase
      .database()
      .ref("newChat/")
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
    }
</script>
<style>
.anti{
    height:86vh;
    background-color: white
}
.antim{
    margin: 0%
}
.cg{
    background-image: linear-gradient(rgb(87, 87, 87), rgb(87, 87, 87));
}


</style>
