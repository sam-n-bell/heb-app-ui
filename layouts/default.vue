<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" />
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
        <v-list-item @click="logout()">
          <v-list-item-action>
            <v-icon light>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>H-E-B Interview Challenge Application, by Sam Bell</span>
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
  methods: {
    logoutEvent() {
      console.log("let me out");
    },
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
