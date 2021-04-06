<template>
  <v-app>
    <h1>{{msg}}</h1>
  </v-app>
</template>

<script>
export default {
  name: "Chat",
  data() {
    return {
      msg: ''
    }
  },
  mounted() {
    console.log(this.$socket)
    this.$socket.emit("user", this.user);
    this.sockets.subscribe('test', (data) => {
      this.msg = data.message;
    });
    /*this.sockets.listener.subscribe("user-connected", (data) => {
      console.log(data);
      this.$socket.emit("users");
    });
    this.$socket.emit("users");
    this.sockets.listener.subscribe("users", (data) => {
      console.log("users", data);
    });*/
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    customEmit: function () {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
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

</style>
