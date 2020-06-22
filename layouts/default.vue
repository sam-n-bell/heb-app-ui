<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app color="primary">
      <v-toolbar-title v-text="title" class="text-xs-center text-sm-center"/>
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
       <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title align-center justify-center mx-auto">
            <span style="font-family: Arial;">HI {{first_name | uppercase}}</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
        <v-list-item @click="logout()">
          <v-list-item-action>
            <v-icon light>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app color="secondary">
        <v-col class="grey--text text--lighten-1 pt-0 text-center pb-0">
          DISCOVERY | H-E-B Interview Challenge
        </v-col>
    </v-footer>
    <SnackBar />
  </v-app>
</template>

<script>
import SnackBar from "../components/SnackBar.vue";
import { mapActions } from "vuex";

export default {
  middleware: "authenticate",
  components: {
    SnackBar
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "DISCOVERY"
    };
  },
  computed: {
    first_name () {
      return this.$store.state.authentication.user;
    }
  },
  methods: {
    ...mapActions({
      getDepartments: "departments/getDepartments",
      getUnits: "units/getUnits",
      logout: "authentication/logout"
    })
  },
  mounted() {
    this.getDepartments();
    this.getUnits();
  }
};
</script>
