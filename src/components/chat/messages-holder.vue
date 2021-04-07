<template>
  <v-container class="message-holder">
    <div>
      <ul>
        <li
          v-for="(item, index) in messages"
          :key="index"
        >{{item.message}}
        </li>
      </ul>
    </div>
    <div>
      <p v-if="typing">{{typing}}</p>
      <p>to {{selectedUser}}</p>
      <v-text-field
        label="Enter yor message here"
        hide-details="auto"
        :value="message"
        @input="onInput"
        @keyup.enter="onEnter"
      ></v-text-field>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "messages-holder",
  props: ['selectedUser'],
  data() {
    return {
      messages: [],
      message: '',
      typing: null
    }
  },
  methods: {
    onEnter() {
      this.messages.push({ message: this.message })
      this.$socket.emit('message', {
        to: this.selectedUser,
        message: this.message
      })
      this.message = ''
    },
    onInput(msg) {
      this.message = msg
      this.$socket.emit('typing', this.user.name)
    }
  },
  sockets: {
    connect() {
      console.log('socket connected')
    },
    messageResponse: function (msg) {
      this.typing = null
      console.log(`from ${msg.from} selected ${this.selectedUser}`)
      if(msg.from === this.selectedUser) this.messages.push(msg)
    },
    userTyping(name) {
      if (name === this.selectedUser) {
        this.typing = `user ${name} is typing message`
        setTimeout(() => {
          this.typing = null
        }, 3000)
      }
    },
    askForUserId() {
      this.$socket.emit('typing', this.user._id)
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  }
}
</script>

<style scoped>
.message-holder {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
