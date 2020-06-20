<template>
  <v-dialog v-model="filtersDialog.visible" persistent max-width="800">
    <v-card>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Filter by Product ID</v-expansion-panel-header>
          <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Product Description or Department</v-expansion-panel-header>
          <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Selling Price or Cost Expense</v-expansion-panel-header>
          <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>When Last Sold</v-expansion-panel-header>
          <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Miscellaneous</v-expansion-panel-header>
          <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-card-actions>
        <v-btn color="default" text class="action-button mt-2" @click="saveFilters()">Apply</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          style="float: right;"
          class="action-button mt-2"
          @click="clearFilters()"
        >Clear</v-btn>
        <v-btn
          color="error"
          text
          style="float: right;"
          class="action-button mt-2"
          @click="closeFilters()"
        >Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import { mapActions, mapGetters } from "vuex";
import _ from "lodash";

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data: () => {
    return {
      panels: [
        "Filter by ID",
        "Prices and Costs",
        "Filter by Last Sold Date",
        "Product or Department",
        "Miscellaneous Filters"
      ],
      filters: null
    };
  },
  computed: {
    filtersDialog() {
      let dialog = this.$store.state.products.filtersDialog;
      this.filters = _.cloneDeep(dialog.filters);
      return dialog;
    }
  },
  methods: {
    saveFilters() {
      this.saveFilters(this.filters);
    },
    closeFilters() {
      this.hideFiltersDialog();
    },
    ...mapActions({
      saveFilters: "products/saveFilters",
      clearFilters: "products/clearFilters",
      hideFiltersDialog: "products/hideFiltersDialog",
      showFiltersDialog: "products/showFiltersDialog"
    })
  }
  // middleware: "authenticate"
};
</script>

<style scoped>
.action-button {
  /* width: 100%; */
  /* height: 50px; */
}
</style>