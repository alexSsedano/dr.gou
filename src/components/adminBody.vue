<template >
  <div class="chatBody anti">
    <div class="row mar h-100">
      <div class="col-sm-3 h-100 cg" style="overflow-y: scroll; ">
        <div v-for="msg in this.chat" v-bind:key="msg.id" class="row" style="padding-top: 15px">
          <div class="col-sm-12">
            <div class="card border-primary mb-3" @click="sMsg(msg)">
              <div class="card-header">{{msg.username}}</div>
              <div class="card-body">
                <p class="card-text">{{msg.msg}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="row">
          <div class="col-sm-12">
            <h2 class="text-center" style="padding: 15px">Seleccione un mensaje y un administrador</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <h2 class="text-center" style="padding: 15px">Mensaje</h2>
          </div>
          <div class="col-sm-6">
            <h2 class="text-center" style="padding: 15px">Administrador</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <h2 class="text-center" style="padding: 15px">{{this.userN}}</h2>
          </div>
          <div class="col-sm-6">
            <h2 class="text-center" style="padding: 15px">{{this.selectedAdmin}}</h2>
          </div>
        </div>
        <div class="col-sm-12">
          <div class="col-sm-12">
            <button type="button" @click="acept()" class="btn btn-success" style="width:100%;">
              <i class="fas fa-check"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="col-sm-3 h-100 cg" style="overflow-y: scroll; ">
        <div class="row">
          <div class="btn-group w-100" style="padding: 15px">
            <button
              type="button"
              class="btn btn-primary dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >{{this.drop}}</button>
            <div class="dropdown-menu w-100">
              <a class="dropdown-item" @click="filoterUsers('todos')">Todos</a>
              <a class="dropdown-item" @click="filoterUsers('admin')">Administradores</a>
              <a class="dropdown-item" @click="filoterUsers('user')">Usuarios</a>
            </div>
          </div>
        </div>
        <div
          v-for="user in this.usersFiltered"
          v-bind:key="user.id"
          class="row"
          style="padding-top: 15px"
        >
          <div v-if="user.userType == 'user'" class="col-sm-12 pad">
            <transition
              mode="out-in"
              name="custom-classes-transition"
              enter-active-class="animated slideInLeft "
              leave-active-class=" animated slideOutLeft"
            >
              <div
                v-if="user.show"
                key="1"
                class="card border-primary mb-3"
                @click="clickUser(user) "
                style="margin:15px"
              >
                <div class="card-header">{{user.username}}</div>
              </div>
              <div v-if="!user.show" key="2" class="card border-primary mb-3" style="margin:15px">
                <div class="card-header pad">
                  <div class="row mar justify-content-center" style="width:100%;">
                    <div class="col-sm-6">
                      <button
                        type="button"
                        @click="adjust(user)"
                        class="btn btn-warning"
                        style="width:100%;"
                      >
                        <i class="fas fa-cog"></i>
                      </button>
                    </div>
                    <div class="col-sm-6">
                      <button
                        type="button"
                        @click="clickUser(user)"
                        class="btn btn-primary"
                        style="width:100%;"
                      >
                        <i class="fas fa-undo-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <transition
                  mode="out-in"
                  name="custom-classes-transition"
                  enter-active-class="animated fadeInDown "
                  leave-active-class=" animated fadeOutUp"
                >
                  <div v-if="user.adjust" style="margin-top:15px; margin-bottom:15px">
                    <div class="row mar justify-content-center" style="width:100%;">
                      <div class="col-sm-6">
                        <button
                          type="button"
                          @click="userToAdmin(user)"
                          class="btn btn-success"
                          style="width:100%;"
                        >
                          <i class="fas fa-user-shield"></i>
                        </button>
                      </div>
                      <div class="col-sm-6">
                        <button
                          type="button"
                          @click="deleteUser(user)"
                          class="btn btn-danger"
                          style="width:100%;"
                        >
                          <i class="fas fa-user-times"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </transition>
          </div>
          <div v-else class="col-sm-12 pad">
            <transition
              mode="out-in"
              name="custom-classes-transition"
              enter-active-class="animated slideInLeft "
              leave-active-class=" animated slideOutLeft"
            >
              <div
                v-if="user.show"
                key="1"
                class="card border-primary mb-3"
                @click="clickUser(user) "
                style="margin:15px"
              >
                <div class="card-header">{{user.username}}</div>
              </div>
              <div v-if="!user.show" key="2" class="card border-primary mb-3" style="margin:15px">
                <div class="card-header pad">
                  <div class="row mar justify-content-center" style="width:100%;">
                    <div class="col-sm-4">
                      <button
                        type="button"
                        @click="selctAdmin(user)"
                        class="btn btn-success"
                        style="width:100%;"
                      >
                        <i class="fas fa-comment-dots"></i>
                      </button>
                    </div>
                    <div class="col-sm-4">
                      <button
                        type="button"
                        @click="adjust(user)"
                        class="btn btn-warning"
                        style="width:100%;"
                      >
                        <i class="fas fa-cog"></i>
                      </button>
                    </div>
                    <div class="col-sm-4">
                      <button
                        type="button"
                        @click="clickUser(user)"
                        class="btn btn-primary"
                        style="width:100%;"
                      >
                        <i class="fas fa-undo-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <transition
                  mode="out-in"
                  name="custom-classes-transition"
                  enter-active-class="animated fadeInDown "
                  leave-active-class=" animated fadeOutUp"
                >
                  <div v-if="user.adjust" style="margin-top:15px; margin-bottom:15px">
                    <div class="row mar justify-content-center" style="width:100%;">
                      <div class="col-sm-6">
                        <button
                          type="button"
                          @click="adminToUser(user)"
                          class="btn btn-success"
                          style="width:100%;"
                        >
                          <i class="fas fa-user-alt"></i>
                        </button>
                      </div>
                      <div class="col-sm-6">
                        <button
                          type="button"
                          @click="deleteUser(user)"
                          class="btn btn-danger"
                          style="width:100%;"
                        >
                          <i class="fas fa-user-times"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </transition>
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
      chat: [],
      users: [],
      usersFiltered: [],
      userT: "",
      drop: "todos",
      selectedAdmin: "",
      msg: "",
      userN: "",
      id: ""
    };
  },
  methods: {
    filoterUsers: function(user) {
      this.drop = user;
      this.usersFiltered = [];
      if (user == "todos") {
        this.usersFiltered = this.users;
      } else {
        for (let i = 0; i <= this.users.length - 1; i++) {
          if (this.users[i].userType == user) {
            this.usersFiltered.push(this.users[i]);
          }
        }
      }
    },
    adjust: function(user) {
      if (user.adjust) {
        user.adjust = false;
      } else {
        user.adjust = true;
      }
    },
    adminToUser: function(user) {
      firebase
        .database()
        .ref("users/" + user.username)
        .set({
          userType: "user",
          email: user.email,
          userId: user.userId,
          username: user.username,
          password: user.password
        });
      this.filoterUsers(this.drop);
    },
    userToAdmin: function(user) {
      firebase
        .database()
        .ref("users/" + user.username)
        .set({
          userType: "admin",
          email: user.email,
          userId: user.userId,
          username: user.username,
          password: user.password
        });
      this.filoterUsers(this.drop);
    },
    selctAdmin: function(user) {
      this.selectedAdmin = user.username;
    },
    sMsg: function(user) {
      this.id = user.id;
      this.userN = user.username;
      this.msg = user.msg;
    },
    acept: function() {
      firebase
        .database()
        .ref("chat/" + this.id)
        .set({
          user1: this.userN,
          user2: this.selectedAdmin
        });
      firebase
        .database()
        .ref("chat/" + this.id + "/msg")
        .push({
          user: this.userN,
          msg: this.msg
        });
      firebase
        .database()
        .ref("users/" + this.selectedAdmin + "/chats/")
        .push({
          chat: this.id
        });
      firebase
        .database()
        .ref("users/" + this.userN + "/chats/")
        .push({
          chat: this.id
        });

      firebase
        .database()
        .ref("newChat/" + this.id)
        .remove();
      (this.id = ""),
        (this.userN = ""),
        (this.msg = ""),
        (this.selectedAdmin = "");
    },
    deleteUser: function(user) {
      firebase
        .database()
        .ref("users/" + user.username)
        .remove();
    },
    clickUser: function(user) {
      if (user.show) {
        user.show = false;
        user.adjust = false;
      } else {
        user.show = true;
      }
    },
    loadChat: function(x) {
      this.chat = [];

      for (let key in x) {
        this.chat.push({
          id: x[key].id,
          username: x[key].userName,
          msg: x[key].newChat
        });
      }
      this.chat = this.chat.reverse();
    },
    loadUsers: function(x) {
      this.users = [];
      for (let key in x) {
        this.users.push({
          id: Math.random()
            .toString(36)
            .substr(2, 27),
          username: x[key].username,
          email: x[key].email,
          userType: x[key].userType,
          password: x[key].password,
          userId: x[key].userId,
          show: true,
          adjust: false
        });
      }
      this.filoterUsers(this.drop);
    }
  },
  mounted() {
    firebase
      .database()
      .ref("newChat/")
      .on("value", snapshot => this.loadChat(snapshot.val()));
    firebase
      .database()
      .ref("users/")
      .on("value", snapshot => this.loadUsers(snapshot.val()));
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
.mar {
  margin: 0px !important;
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.pad {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
</style>
