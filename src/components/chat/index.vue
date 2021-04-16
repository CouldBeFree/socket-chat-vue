<template>
  <v-app>
    <div class="wrap">
      <drawer
        :users="users"
        :loading="loading"
        class="drawer"
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
      selectedUser: null
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
      this.setMessage(msg);
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
