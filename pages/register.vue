<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" xl="5" lg="5" sm="12" xs="12">
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
                  required
                ></v-text-field>
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
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="passwordRules"
                  counter
                  @click:append="showPassword = !showPassword"
                  maxlength="30"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="passwordConfirmation"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="Password Confirmation"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="[(password === passwordConfirmation) || 'Must match the password above']"
                  counter
                  @click:append="showPassword = !showPassword"
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
      </v-col>
    </v-row>
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
      passwordRules: [
        v => !!v || "Password is required",
        v => (!!v && v.trim().length >= 1) || "Must be more than 7 characters"
      ],
      valid: true,
      showPassword: false
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
    registerError() {
      return this.$store.state.authentication.registerError;
    }
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
    registerError(val) {
      if (val) {
        this.showSnackBar({
          text: val,
          color: "error"
        });
      }
    }
  }
};
</script>