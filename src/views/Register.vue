<template>
  <v-container>
    <div class="register">
      <v-row>
        <v-col sm="4" cols="12" />
        <v-col sm="4" cols="12">
          <v-form v-model="valid" ref="form">
            <v-text-field
              v-model="userData.name"
              :rules="validationRules.nameRules"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="userData.email"
              :rules="validationRules.emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="userData.password"
              :rules="validationRules.passwordRules"
              label="Password"
              type="password"
              required
            ></v-text-field>
            <v-checkbox
              v-model="userData.isPsychologist"
              label="I am psychologist"
            ></v-checkbox>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              :loading="loading"
              @click="submit"
            >
              Register
            </v-btn>
            <p class="mt-4">If you already have account <router-link to="/login">Login</router-link></p>
          </v-form>
          <v-alert
            v-if="success"
            dark
            :text="true"
            type="success"
          >You have been successfully registered. Not you can <router-link to="login">Login</router-link> to your account
          </v-alert>
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
  name: "Register",
  data() {
    return {
      valid: false,
      userData: {
        isPsychologist: false,
        name: '',
        password: '',
        email: '',
      },
      validationRules: {
        nameRules: [
          v => !!v || 'Name is required',
          v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => 6 <= v.length || 'Password must be more than 6 characters'
        ]
      }
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
    ...mapActions(['registerUser']),
    ...mapMutations(['setSuccess', 'setError']),
    submit() {
      const data = { ...this.userData }
      const { isPsychologist } = data
      data.userType = isPsychologist ? 'psychologist' : 'user'
      delete data.isPsychologist
      this.registerUser(data)
        .finally(() => {
          if (this.success) {
            this.userData.name = ''
            this.userData.password = ''
            this.userData.email = ''
            this.userData.isPsychologist = false
            this.$refs.form.resetValidation()
          }
        })
    }
  },
  destroyed() {
    this.setSuccess(false)
    this.setError(false)
  }
}
</script>

<style scoped>
.register {
    margin-top: 25vh;
}
</style>
