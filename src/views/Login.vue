<template>
  <v-container>
    <div class="login">
      <v-row>
        <v-col sm="4" cols="12" />
        <v-col sm="4" cols="12">
          <v-form v-model="valid" ref="form">
            <v-text-field
              v-model="userData.email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="userData.password"
              :rules="passwordRules"
              label="Password"
              type="password"
              required
            ></v-text-field>
            <v-btn
              :disabled="!valid"
              :loading="loading"
              color="success"
              class="mr-4"
              @click="submit"
            >
              Login
            </v-btn>
            <p class="mt-4">If you don't have account <router-link to="/register">Register</router-link></p>
          </v-form>
          <v-alert
            v-if="error"
            dark
            type="warning"
          >
            {{message}}
          </v-alert>
        </v-col>
        <v-col sm="4" cols="12" />
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      valid: false,
      userData: {
        password: '',
        email: '',
      },
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ]
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    success() {
      return this.$store.getters.success
    },
    error() {
      return this.$store.getters.error
    },
    message() {
      return this.$store.getters.message
    }
  },
  methods: {
    ...mapActions(['loginUser']),
    ...mapMutations(['setSuccess', 'setError']),
    submit() {
      this.loginUser(this.userData)
        .finally(() => {
          if (this.success) this.$router.push('/')
        })
    },
    clearData() {
      this.setSuccess(false)
      this.setError(false)
    }
  },
  mounted() {
    this.clearData()
  },
  destroyed() {
    this.clearData()
  }
}
</script>

<style scoped>
.login {
    margin-top: 25vh;
}
</style>
