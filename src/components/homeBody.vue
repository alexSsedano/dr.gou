<template>
    <div class="homeBody">
        <div class="row justify-content-center">
            <div style=" padding-right: 0px!important" class="col-sm-11">
                <input  v-model="msg" type="text" class="form-control"   placeholder="¿ Que esta ocurriendo ?">
            </div>
            <div style="padding-left: 0px!important; " class="col-sm-1">
                <button style="width: 100%" @click="addPost" type="button" class="btn btn-primary">Post</button>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-sm-11">
                
            </div>
        </div>
        
    </div>
</template>
<script>
    import {user} from '../helper/auth.js'
    import firebase from 'firebase'
    export default {   
        name: "homeBody",
        data: function () {
            return {
                foro:[], 
                userName: '',
                msg: ''
            }
        },
        methods:{
            addPost:function(){
                let today  = new Date();
                firebase.database().ref('post/').push({
                    date: today.toLocaleDateString("es-ES"),
                    userName: this.userName,
                    msg: this.msg

                });
            },
            loadForo(msgs){
                this.registeredUsers = []
                for(let key in msgs){
                    this.registeredUsers.push({
                        username: users[key].userName,
                        date: users[key].date,
                        msg: users[key].msg,
                        
                        
                    })
                }
               
            }
        },
        mounted(){
            this.userName =  user()
             firebase.database().ref('post/').on('value', snapshots => this.loadForo(snapshots.val()))
        }
    }
</script>