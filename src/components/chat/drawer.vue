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
        <p>Users online {{onlineUsers.length}}</p>
        <p>User name {{user.name}}</p>
        <p>User type{{user.userType}} </p>
        <v-list-item-group
          mandatory
          color="yellow"
          v-model="selectedItem"
        >
          <v-list-item
          v-for="(item, index) in users"
          :key="item._id"
          link
          class="mb-3"
          :class="{ 'mt-4': index === 0 }"
        >
          <v-list-item-icon>
            <v-list-item-avatar>
              <img :src="`https://randomuser.me/api/portraits/women/${index + 1}.jpg`">
            </v-list-item-avatar>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title :class="{
              'unread-message': (item.name === messageFrom && item.name !== users[selectedItem].name),
              'online': isOnline(item)}">
              {{ item.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  name: "drawer",
  props: {
    onlineUsers: {
      type: Array,
      default: () => []
    },
    messageFrom: {
      type: String
    },
    users: {
      type: Array,
      default: () => []
    },
    loading: Boolean
  },
  data() {
    return {
      selectedItem: 0
    }
  },
  watch: {
    selectedItem(val) {
      const user = this.users[val]
      this.$emit('selected', user)
      if (user.name === this.messageFrom) {
        this.$emit('update:messageFrom', null)
      }
    },
    messageFrom(val) {
      if (val === this.users[this.selectedItem].name) {
        this.$emit('update:messageFrom', null)
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    isOnline(user) {
      return this.onlineUsers.filter(onlineUsr => onlineUsr.name === user.name).length
    }
  }
}
</script>

<style scoped>
.online {
  color: green;
}

.unread-message {
  color: red;
}
</style>
