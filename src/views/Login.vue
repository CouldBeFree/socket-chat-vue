<template>
  <div class="login">
    <v-row>
      <v-col sm="4" cols="12" />
      <v-col sm="4" cols="12">
        <v-form v-model="valid" ref="form">
          <v-text-field
            v-model="nickname"
            :rules="nameRules"
            label="First name"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="submit"
          >
            Login
          </v-btn>
          <p class="mt-4">If you don't have account <router-link to="/register">Register</router-link></p>
        </v-form>
      </v-col>
      <v-col sm="4" cols="12" />
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      valid: false,
      nickname: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ]
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate()
    }
  }
}
</script>

<style scoped>
.login {
    margin-top: 25vh;
}
</style>
