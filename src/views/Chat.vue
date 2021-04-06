<template>
  <v-app>
    <v-navigation-drawer
      floating
      permanent
    >
      <v-list
        dense
        rounded
      >
        <v-list-item
          v-for="(item, index) in items"
          :key="item.title"
          link
          class="mb-3"
          :class="{ 'mt-4': index === 0 }"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
            <v-list-item-avatar>
              <img :src="`https://randomuser.me/api/portraits/women/${index + 1}.jpg`">
            </v-list-item-avatar>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  name: "Chat",
  data() {
    return {
      msg: '',
      items: [
        { title: 'Home' },
        { title: 'About' },
      ]
    }
  },
  mounted() {
    console.log(this.$socket)
    this.$socket.emit("user", this.user);
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    customEmit: function (data) {
      this.msg = data.message;
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
