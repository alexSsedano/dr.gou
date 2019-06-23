import firebase from 'firebase'


var registeredUsers = [];


export function user() {
    
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
                  console.log(registeredUsers[i].userType)
                return registeredUsers[i].userType
              }else{
                  return false
              }
            }
          })
        } else {
          return false
        }

      
}