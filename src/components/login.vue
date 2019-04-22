<template>

    <div class="container loginPosition">
        
        <div class="row justify-content-between ">
            <div class="col-4">
                <h2 class="textcolour marginTop">Bienvenido a Dr.gou</h2>
                <br>
                <h5 class="textcolour">Somos una organizacion sin animo de lucro creada para ayudarte.</h5>
                <button type="button" class="  btn btn-outline-primary marginBot buttonColorWhite" v-on:click="registerButton()">Registrate</button>
            </div>
             
            <div class="col-4  backgroundWhite " v-if="register">
                <form>
                    <fieldset>
                        <div class="form-group marginTop ">
                            <label for="exampleInputEmail1">Correo electronico</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                            <small id="emailHelp" class="form-text text-muted">No comparetiremos tu correo con nadie.</small>
                        </div>
                        <div class="form-group ">
                            <label for="exampleInputPassword1">Contraseña</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                        </div>
                        <button type="button" class="btn btn-outline-primary marginBot">Login</button>
                    </fieldset>
                
                </form>
            </div>
             
           
            <div class="col-4  backgroundWhite " v-if="!register">
                <form>
                    <fieldset>
                        <div class="form-group marginTop ">
                            <label for="exampleInputEmail1">Correo electronico</label>
                            <input v-model="registerEmail" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                            <small id="emailHelp" class="form-text text-muted">No comparetiremos tu correo con nadie.</small>
                        </div>
                        <div class="form-group marginTop ">
                            <label for="exampleInputEmail1">Nombre de usuario</label>
                            <input v-model="registerUserName" type="text" class="form-control"   placeholder="Nombre usuario">
                            <small id="emailHelp" class="form-text text-muted">No comparetiremos tu correo con nadie.</small>
                        </div>
                        <div class="form-group ">
                            <label for="exampleInputPassword1">Introduce tu contraseña</label>
                            <input v-model="registerPassword" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                        </div>
                        <div class="form-group ">
                            <label for="exampleInputPassword1">Vuelve a introducir tu contraseña</label>
                            <input v-model="registerPassword2" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                        </div>
                        <button @click="signUp" type="button" class="btn btn-outline-primary marginBot">Register</button>
                    </fieldset>
                
                </form>
            </div>
          
        </div>   
    </div>
</template>

<script>
    import firebase from 'firebase'

    export default {
        
        name: "login",
        data: function () {
            return {
                
                registeredUsers:[],
                register: false,
                registerEmail: '',
                registerPassword: '',
                registerPassword2: '',
                registerUserName: '',
                coincidencesName:0,
                coincidencesEmail:0,
                
            }
        },
        methods:{

            signUp:function(){
                this.coincidences = 0;
                if(this.registerPassword == this.registerPassword2){
                    firebase.database().ref('users/').on('value', snapshots => this.loadUsers(snapshots.val()))
                        //    console.log(this.registeredUsers.length)
                        for(let i=0; i< this.registeredUsers.length; i++){
                            console.log(this.registerEmail);
                            console.log(this.registeredUsers[i].email);
                            if(this.registerUserName == this.registeredUsers[i].username){
                                this.coincidencesName ++;  
                                i = this.registeredUsers.length
                            }
                            if(this.registerEmail == this.registeredUsers[i].email){
                                this.coincidencesEmail ++;  
                                i = this.registeredUsers.length
                            }
                        }
                        if(this.coincidencesName > 0){
                            this.$notify({
                                group: 'foo',
                                title: 'Este usuario ya existe',
                                type: 'error',
                                position: 'top left'
                            });
                        }else if(this.coincidencesEmail > 0){
                        }else{
                            firebase.database().ref('users/' + this.registerUserName).set({
                                username: this.registerUserName,
                                email: this.registerEmail,
                                password : this.registerPassword,
                                userType: 'user'
                            }).then(() => {
                                this.registerSuccess(),
                                this.register = true
                            }); 
                        } 
                    
                }else{
                    this.$notify({
                        group: 'foo',
                        title: 'Las contraseñas no coinciden',
                        type: 'error',
                        position: 'top left'
                    });
                }
            },
            loadUsers(users){
                this.registeredUsers = []
                for(let key in users){
                   
                    this.registeredUsers.push({
                        username: users[key].username,
                        email: users[key].email,
                        password: users[key].password,
                        userType: users[key].userType
                    })
                }
                console.log(this.registeredUsers)
               
            },

            registerButton: function(){
                if(this.register == true){
                    this.register = false
                   
                }else{
                    this.register = true
                }            
            },
            registerSuccess: function(){
                this.$notify({
                    group: 'foo',
                    title: 'Te has registrado con exito',
                    type: 'success',
                    position: 'top left'
                });
            },
           
            

        },
      }
</script>