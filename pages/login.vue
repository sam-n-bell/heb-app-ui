<template>
  <!-- <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>
      <v-text-field v-model="password" label="Password" :rules="passwordRules" required></v-text-field>
      <v-btn @click="loginEvent()">Let me in</v-btn>
  </v-form> -->
  <v-layout align-center justify-center wrap>
    <v-row>
        <v-col xs12 sm6 md6 lg3>
            <!-- <v-card> -->
                <!-- <v-card-title>
                    Login To Your Account
                </v-card-title> -->
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="email" label="Email" :rules="emailRules" required></v-text-field>
                    <v-text-field v-model="password" label="Password" :rules="passwordRules" required></v-text-field>
                    <v-btn @click="loginEvent()">Let me in</v-btn>
                </v-form>
            <!-- </v-card> -->
        </v-col>
      </v-row>
      {{isAuthenticated}}
  </v-layout>
</template>
 
<script>
import { mapActions, mapGetters } from "vuex";

export default {
   components: {},
   layout: "login-layout",
   data: () => {
       return {
           email: "",
           emailRules: [
               v => !!v || 'Email is required',
               v => /.+@.+\..+/.test(v) || 'Provide a valid email'
            ],
           password: "",
           passwordRules: [
               v => !!v || 'Password is required'
           ],
           valid: true
       }
   },
   computed: {
       loginLoading () {
           return this.$store.state.authentication.loginLoading
       },
       ...mapGetters({
           isAuthenticated: "authentication/isAuthenticated"
       })
   },
   methods: {
       loginEvent () {
           if (this.$refs.form.validate()) {
               console.log('im valid')
               this.login({email: this.email, password: this.password})
           } else {
               console.log('im not valid')
           }
       },
       ...mapActions({
           login: "authentication/login"
       })
   },
   mounted () {
       if (this.isAuthenticated) {
           this.$router.push("/")
       }
   },
   watch: {
    isAuthenticated (value) {
        if (value) {
            this.$router.push("/")
        }
    }
   }
}
</script>