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
      products: [

      ]
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
