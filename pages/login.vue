<template>
  <!-- <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>
      <v-text-field v-model="password" label="Password" :rules="passwordRules" required></v-text-field>
      <v-btn @click="loginEvent()">Let me in</v-btn>
  </v-form>-->
  <v-card>
    <v-row class="mx-8">
      <v-col :cols="12">
        <v-card-title class="justify-center">Login to Search</v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>
          <v-text-field v-model="password" label="Password" :rules="passwordRules" required></v-text-field>
          <v-btn @click="loginEvent()" class="full-width" :loading="loginLoading">Let me in {{isAuthenticated}}</v-btn>
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
      valid: true
    };
  },
  computed: {
    loginLoading() {
      return this.$store.state.authentication.loginLoading;
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
      login: "authentication/login"
    })
  },
  mounted() {
    if (this.isAuthenticated) {
      this.$router.push(constants.uiUrls.home);
    }
  },
  watch: {
    isAuthenticated(newValue, oldValue) {
      if (newValue) {
        this.$router.push(constants.uiUrls.home);
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