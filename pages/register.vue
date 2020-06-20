<template>
    <v-container>
        <v-card>
        <v-row class="mx-8"> 
            <v-col :cols="12">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="firstName" label="First Name" :rules="firstNameRules" required></v-text-field>
                    <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>
                    <v-text-field v-model="password" label="Password" :rules="passwordRules" required></v-text-field>
                    <v-text-field v-model="passwordConfirmation" label="Password Confirmation" :rules="[(password === passwordConfirmation) || 'Must match the password above']" required></v-text-field>
                    <v-btn @click="registerEvent()" width="100%">Register</v-btn>
                    <p  @click="pushToLogin()" class="text-center mt-3"><a>Already have an account? Login</a></p>
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
               v => !!v || 'Email is required',
               v => /.+@.+\..+/.test(v) || 'Provide a valid email'
            ],
           password: "",
           firstName: "",
           firstNameRules: [
               v => !!v || 'First name required',
               v => (v && v.trim().length > 0) || 'Provide a valid first name'

           ],
           passwordConfirmation: "",
           passwordRules: [
               v => !!v || 'Password is required',
           ],
           valid: true
       }
   },
   computed: {
       registerLoading () {
           return this.$store.state.authentication.registerLoading
       },
       passwordsMatchRule() {
           return (this.password === this.passwordConfirmation) || 'Passwords must match'
       }
   },
   methods: {
       registerEvent () {
           if (this.$refs.form.validate()) {
               this.register({email: this.email, first_name: this.firstName, password: this.password})
           } 
       },
       pushToLogin() {
           this.$router.push(constants.uiUrls.login)
       },
       ...mapActions({
           register: "authentication/register"
       })
   },
   mounted () {

   },
   watch: {

   }
}
</script>