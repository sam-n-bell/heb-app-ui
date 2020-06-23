<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" xl="5" lg="5" sm="12" xs="12">
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
                  required
                ></v-text-field>
                <v-row class="mt-5">
                  <v-btn
                    @click="loginEvent()"
                    :loading="loginLoading"
                    color="primary"
                  >Start Searching</v-btn>
                  <v-spacer />
                  <v-btn text color="secondary" @click="pushToRegister()">Register</v-btn>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
    loginError() {
      return this.$store.state.authentication.loginError;
    },
    jwt() {
      return this.$store.state.authentication.jwt;
    },
    user() {
      return this.$store.state.authentication.user;
    },
    authenticated() {
      return !!this.jwt || !!this.user;
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
    authenticated(value) {
      if (value) {
        this.$router.push(constants.uiUrls.home);
      }
    },
    loginError(value) {
      if (value) {
        this.showSnackBar({
          text: value,
          color: "error"
        });
      }
    }
  }
};
</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>