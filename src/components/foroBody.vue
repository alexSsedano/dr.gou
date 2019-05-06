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
        
        <div style="margin-top: 16px" class="row justify-content-center">
            <div class="col-sm-11">
                <div v-for="msg in this.foro" v-bind:key="msg.id" class="row justify-content-center">
                    <div class="col-sm-11">
                    <div class="card border-secondary mb-3" >
                    <div class="card-header">
                        <div class="row justify-content-between">
                            <div class="col-sm-2">
                                <p  >{{msg.username}}</p>
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
                    date: today.toLocaleDateString("es-ES")+ ' ' + today.getHours()+ ':' + today.getMinutes()+ ':' + today.getSeconds(),
                    userName: this.userName,
                    msg: this.msg

                });
                this.msg =  ''
            },
            loadForo(msgs){
                this.foro = []
                for(let key in msgs){
                    this.foro.push({
                        id: Math.random().toString(36).substr(2, 27),
                        username: msgs[key].userName,
                        date: msgs[key].date,
                        msg: msgs[key].msg,
                        
                        
                    })
                }
               
            }
        },
        mounted(){
            let id = localStorage.getItem('userId')
    if (id) {
        firebase.database().ref('users/').on('value', snapshots => loadUsers(snapshots.val()))
        for (let i = 0; i <= registeredUsers.length; i++) {
            if (id == registeredUsers[i].userId) {
                this.userName= registeredUsers[i].username;
            }
        }
        
    }
            
            
            
            firebase.database().ref('post/').on('value', snapshots => this.loadForo(snapshots.val()))

        }
    }
</script>