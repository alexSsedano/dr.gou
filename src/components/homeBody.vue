<template>
<div class="row justify-content-center" >
    <div class="bgColorWhite col-sm-11 " style="heigth: 100%">
        <div id="quienes_somos" class=" padingTop">
            <div class="card text-white bg-light mb-3" style="border-radius:10px;">
                <div class="card-header">Header</div>
                <div class="card-body">
                    <h4 class="card-title">Primary card title</h4>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                </div>
        </div>
    </div>
</div>

</template>
<script>
        export default {   
            name: "homeBody",
            data: function () {},
            mounted(){
            firebase.database().ref('users/').on('value', snapshots => this.loadUsers(snapshots.val()))
            let count=0;
            for(let i=0; i < this.registeredUsers.length; i++){
                
                let id = localStorage.getItem('userId')
                if( id ==  this.registeredUsers[i].userId){
                    count++
                }
            }
            if(count<=0){
                this.$router.push('login') 
            }
        }
        }
</script>