<template >
    <div class="chatBody" >
        <div class="anti" >
            <div class="w-100 h-100">
            <div class="row w-100 antim h-100"  >
                <div class="col-sm-2 h-100 cg" >
                    <button type="button " style="margin-top:10px; " @click="changeAdd" class="btn btn-primary btn w-100">Añadir chat</button>
                    <div v-if="this.add">
                        <input  v-model="newChatText" type="text" class="w-100" style="margin-top:10px;">
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
                newChatText: '',
            };
        },
        methods: {
            changeAdd: function(){
                if(this.add){
                    if(this.newChatText!=''){
                        console.log(this.newChatText)
                        firebase.database().ref("newChat/").push({
                            newChat: this.newChatText
                        });
                    this.newChatText = "";
                    }
                    this.add = false
                }else{
                    this.add = true
                }
            }
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
    background-image: linear-gradient(rgb(85, 85, 85), rgb(75, 75, 75));
}


</style>
