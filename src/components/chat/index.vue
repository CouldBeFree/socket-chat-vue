<template>
  <v-app>
    <div class="wrap">
      <drawer class="drawer" @selected="onUserSelect" />
      <messages-holder
        :selectedUser="selectedUser"
        class="message"
      />
    </div>
  </v-app>
</template>

<script>
import drawer from "./drawer";
import messagesHolder from "./messages-holder"

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
    onUserSelect(user) {
      this.selectedUser = user.name
    }
  },
  mounted() {
    this.$socket.emit("user", this.user);
  },
  computed: {
    user() {
      return this.$store.getters.user
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
