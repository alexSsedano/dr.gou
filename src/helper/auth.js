
import firebase from 'firebase'
var registeredUsers = [];


export function auth() {
    let id = localStorage.getItem('userId')
    if (id) {
        let a = firebase.database().ref('users/');
        a.once('value').then(function (snapshot) {
            registeredUsers = []
            for (let key in snapshot.val()) {
                registeredUsers.push({
                    userType: snapshot.val()[key].userType,
                    userId: snapshot.val()[key].userId,
                    username: snapshot.val()[key].username
                })
            }
            for (let i = 0; i <= registeredUsers.length; i++) {
                if (id == registeredUsers[i].userId) {
                    return registeredUsers[i].userType
                }
            }
        })
    }
}


export function user(){
    let id =localStorage.getItem('userId')
    if(id){
        firebase.database().ref('users/').on('value', snapshots => loadUsers(snapshots.val()))   
        for(let i=0; i <= registeredUsers.length; i++){ 
            if( id ==  registeredUsers[i].userId){
                return registeredUsers[i].username; 
            }   
        }
        return "no"
    }
}

function loadUsers(users){
    registeredUsers = []
    for(let key in users){
        registeredUsers.push({
            userType: users[key].userType,
            userId: users[key].userId,
            username: users[key].username 
        })
    }
}


export function ward(ruta) {
    for (let i = 0; i < this.registeredUsers.length; i++) {
        this.iduniq = function () {
            return Math.random().toString(36).substr(2, 27);
        };
        let path = "users/" + this.loginUser
        let userId = '' + this.iduniq() + this.iduniq() + this.iduniq()
        localStorage.setItem("userId", userId);
        firebase.database().ref(path).set({
            username: this.registeredUsers[i].username,
            email: this.registeredUsers[i].email,
            password: this.registeredUsers[i].password,
            userType: 'user',
            userId: userId

        });
        i = this.registeredUsers.length - 1
        this.$router.push(ruta)
    }
}
