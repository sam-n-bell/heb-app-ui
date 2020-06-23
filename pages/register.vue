<template>
  <v-container>
    <v-card>
      <v-row class="mx-8">
        <v-col :cols="12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field 
            v-model="firstName"
             label="First Name" 
             :rules="firstNameRules" 
                           counter
              maxlength="20"
             required></v-text-field>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-bind="attrs"
                  v-on="on"
                  v-model="email"
                  label="Email"
                  :rules="emailRules"
                  required
                ></v-text-field>
              </template>
              <span>Only Used for Login</span>
            </v-tooltip>
            <v-text-field
              v-model="password"
              label="Password"
              :rules="passwordRules"
              counter
              maxlength="30"
              required
            ></v-text-field>
            <v-text-field
              v-model="passwordConfirmation"
              label="Password Confirmation"
              :rules="[(password === passwordConfirmation) || 'Must match the password above']"
              counter
              maxlength="30"
              required
            ></v-text-field>
            <v-row class="mt-5">
              <v-btn
                @click="registerEvent()"
                :loading="registerLoading"
                color="primary"
              >Register</v-btn>
              <v-spacer />
              <v-btn text color="secondary" @click="pushToLogin()">I have an account</v-btn>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
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
      firstName: "",
      firstNameRules: [
        v => !!v || "First name required",
        v => (v && v.trim().length > 0) || "Enter a valid name"
      ],
      passwordConfirmation: "",
      passwordRules: [v => !!v || "Password is required",
                      v => (!!v && v.trim().length >= 1) || "Must be more than 7 characters"],
      valid: true
    };
  },
  computed: {
    registerLoading() {
      return this.$store.state.authentication.registerLoading;
    },
    passwordsMatchRule() {
      return (
        this.password === this.passwordConfirmation || "Passwords must match"
      );
    },
    registerError () {
        return this.$store.state.authentication.registerError;
    },
  },
  methods: {
    registerEvent() {
      if (this.$refs.form.validate()) {
        this.register({
          email: this.email,
          first_name: this.firstName,
          password: this.password
        });
      }
    },
    pushToLogin() {
      this.$router.push(constants.uiUrls.login);
    },
    ...mapActions({
      register: "authentication/register",
      showSnackBar: "notifications/showSnackBar"
    })
  },
  mounted() {},
  watch: {
      registerError (val) {
          if (val) {
              this.showSnackBar({
                  text: val,
                  color: 'error'
              });
          }
      }
  }
};
</script>