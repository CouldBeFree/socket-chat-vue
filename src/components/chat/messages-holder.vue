<template>
  <v-container class="message-holder">
    <div>
      <ul>
        <li
          v-for="(item, index) in value"
          :key="index"
        >{{item.message}}
        </li>
      </ul>
    </div>
    <div>
      <p v-if="typing">{{typing}}</p>
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
  props: {
    value: {
      type: Array,
      default: () => []
    },
    user: {
      type: Object,
      default: () => {}
    },
    selectedUser: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      messagesLocal: [],
      message: '',
      typing: null
    }
  },
  methods: {
    onEnter() {
      this.$emit('input', {
        from: this.user.name,
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
      if(msg.from === this.selectedUser) this.messagesLocal.push(msg)
    },
    userTyping(name) {
      if (name === this.selectedUser) {
        this.typing = `user ${name} is typing message`
        setTimeout(() => {
          this.typing = null
        }, 3000)
      }
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
