<template>
  <v-app>
    <div class="text-center ma-2">
      <v-snackbar
        v-model="snackbar"
      >
        <p>{{ onlineUser }} is online now</p>
        <template v-slot:action="{ attrs }">
          <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
    <div class="wrap">
      <drawer
        :users="users"
        :loading="loading"
        :messageFrom.sync="from"
        class="drawer"
        :onlineUsers="onlineUsers"
        @selected="onUserSelect"
      />
      <messages-holder
        :user="user"
        :selectedUser="selectedUser"
        :loading="loading"
        v-model="messages"
        class="message"
      />
    </div>
  </v-app>
</template>

<script>
import drawer from "./drawer";
import messagesHolder from "./messages-holder"
import { mapActions, mapMutations } from 'vuex'
import moment from 'moment'

export default {
  name: "Chat",
  data() {
    return {
      selectedUser: null,
      from: null,
      onlineUsers: [],
      timeout: 3000,
      onlineUser: null,
      snackbar: false
    }
  },
  components: {
    drawer,
    messagesHolder
  },
  methods: {
    ...mapActions(['getMessages']),
    ...mapMutations(['setMessage']),
    onUserSelect(user) {
      this.selectedUser = user
      this.getMessages(user.name)
        .finally(() => {
          console.log(this.messages)
        })
    },
    getUsers() {
      this.$store.dispatch('getUsers')
        .finally(() => this.selectedUser = this.users[0])
    }
  },
  mounted() {
    this.$socket.emit("user", this.user);
    this.getUsers();
  },
  sockets: {
    messageResponse(msg) {
      this.from = msg.from
      this.setMessage(msg);
    },
    onlineUsers(users) {
      console.info('users online', users)
      this.onlineUsers = users
    },
    userOnline(usr) {
      if (this.user.name !== usr.name) {
        this.onlineUser = usr.name
        this.snackbar = true
      }
      console.info('user', usr)
      this.onlineUsers.push(usr)
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    users() {
      return this.$store.getters.users
    },
    messages: {
      get() {
        return this.$store.getters.messages
      },
      set(val) {
        if (this.selectedUser) val.to = this.selectedUser.name
        val.time = moment().toDate()
        this.$socket.emit('message', val)
        this.setMessage(val)
      }
    },
    loading() {
      return this.$store.getters.loading
    }
  }
}
</script>

<style scoped>
.wrap {
  display: flex;
  justify-content: space-between;
}

.drawer {
  flex-basis: 256px;
}

.message {
  flex: 1;
}
</style>
