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
        {{user.name}}
        {{user.userType}}
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
            <v-list-item-title>{{ item.name }}</v-list-item-title>
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
  data() {
    return {
      msg: '',
      selectedItem: 0
    }
  },
  watch: {
    selectedItem(val) {
      const user = this.users[val]
      this.$emit('selected', user)
    }
  },
  mounted() {
    this.$store.dispatch('getUsers')
      .finally(() => {
        this.$emit('selected', this.users[0])
      })
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    customEmit: function (data) {
      this.msg = data.message;
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    user() {
      return this.$store.getters.user
    }
  }
}
</script>

<style scoped>

</style>
