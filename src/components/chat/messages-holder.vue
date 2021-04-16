<template>
  <v-container class="message-holder">
    <div>
      <ul class="message-list">
        <li
          v-for="(item, index) in value"
          :key="index">
          <p>
            <span>Name: {{item.from}}</span> <span>Time: {{ getTime(item.time) }}</span>
          </p>
          <p class="message">Message: {{item.message}}</p>
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
import moment from 'moment'

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
    getTime(time) {
      return moment(time).format("hh:mm:ss a")
    },
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

.message-list {
  list-style: none;
}

.message-list .message {
  padding-left: 10px;
}
</style>
