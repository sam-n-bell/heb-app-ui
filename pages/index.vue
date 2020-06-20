<template>
  <!-- <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout> -->
  <v-container>
    <v-card>
      <!-- <v-expansion-panel>
        <v-expansion-panel v-for="panel in panels" :key="panel">
          <v-expansion-panel-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panel> -->
      <v-row>
        <v-btn @click="showFiltersDialog()" width="100%">Show Filters</v-btn>
      </v-row>
    </v-card>
    <FiltersDialog/>
  </v-container>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import { mapActions, mapGetters } from "vuex";
import FiltersDialog from "~/components/FiltersDialog.vue"
export default {
  components: {
    Logo,
    VuetifyLogo,
    FiltersDialog
  },
  data: () => {
    return {
    };
  },
  computed: {
  },
  methods: {
    ...mapActions({
        showFiltersDialog: "products/showFiltersDialog",
    })
  }
  // middleware: "authenticate"
}
</script>
