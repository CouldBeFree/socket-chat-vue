<template>
  <div class="register">
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
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
          ></v-text-field>
          <v-checkbox
            v-model="isPsychologist"
            label="I am psychologist"
          ></v-checkbox>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="submit"
          >
            Register
          </v-btn>
          <p class="mt-4">If you already have account <router-link to="/login">Login</router-link></p>
        </v-form>
      </v-col>
      <v-col sm="4" cols="12" />
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      isPsychologist: false,
      valid: false,
      nickname: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      password: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required'
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
.register {
    margin-top: 25vh;
}
</style>
