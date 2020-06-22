<template>
  <v-card>
    <v-row class="mx-8">
      <v-col :cols="12">
        <v-card-title class="justify-center">Discovery Login</v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>
          <v-text-field 
            v-model="password" 
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="Password" 
            :type="showPassword ? 'text' : 'password'"         
            :rules="passwordRules" 
            @click:append="showPassword = !showPassword" 
            required></v-text-field>
          <v-btn @click="loginEvent()" class="full-width" :loading="loginLoading">Let me in</v-btn>
          <v-divider/>
          <p  @click="pushToRegister()" class="text-center mt-3"><a>Don't have an account?</a></p>
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>
 
<script>
import { mapActions, mapGetters } from "vuex";
import constants from "../assets/constants";
import _ from "lodash";

export default {
  components: {},
  layout: "login-register",
  data: () => {
    return {
      email: "",
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "Provide a valid email"
      ],
      password: "",
      passwordRules: [v => !!v || "Password is required"],
      valid: true,
      showPassword: false
    };
  },
  computed: {
    loginLoading() {
      return this.$store.state.authentication.loginLoading;
    },
    loginError () {
      return this.$store.state.authentication.loginError;
    },
    jwt () {
      return this.$store.state.authentication.jwt;
    },
    user () {
      return this.$store.state.authentication.user;
    },
    authenticated () {
      return !!this.jwt || !!this.user
    },
    ...mapGetters({
      isAuthenticated: "authentication/isAuthenticated"
    })
  },
  methods: {
    loginEvent() {
      if (this.$refs.form.validate()) {
        this.login({ email: this.email, password: this.password });
      } 
    },
    pushToRegister() {
      this.$router.push(constants.uiUrls.register);
    },
    ...mapActions({
      login: "authentication/login",
      showSnackBar: "notifications/showSnackBar"
    })
  },
  mounted() {
    if (this.isAuthenticated) {
      this.$router.push(constants.uiUrls.home);
    }
  },
  watch: {
    authenticated (value) {
      if (value) {
        this.$router.push(constants.uiUrls.home);
      }
    },
    loginError (value) {
      if (value) {
        this.showSnackBar({
          text: value,
          color: 'error'
        })
      }
    }
  }
};
</script>

<style scoped>
.full-width {
    width: 100%
}
</style>