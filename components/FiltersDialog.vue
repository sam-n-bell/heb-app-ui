<template>
  <v-dialog v-model="filtersDialog.visible" persistent max-width="800">
    <v-card>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Filter by Product ID</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="3">
                <v-subheader>Product ID</v-subheader>
              </v-col>
              <v-col cols="9">
                <v-text-field v-model="filters.productId" label="Product IDs are Numeric"></v-text-field>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Product Description or Department</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="3">
                <v-subheader>Description of Product</v-subheader>
              </v-col>
              <v-col cols="9">
                <v-text-field v-model="filters.description" label="Onion"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-subheader>Department</v-subheader>
              </v-col>
              <v-col cols="9">
                <v-select
                  v-model="filters.department"
                  :items="departments.payload"
                  item-text="name"
                  clearable
                  label="Department"
                >
                  <template slot="item" slot-scope="{ item }">{{ item.name | capitalize}}</template>
                </v-select>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Selling Price or Cost Expense</v-expansion-panel-header>
          <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>When Last Sold</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="6">
                <v-switch v-model="soldRange" label="Search by Range"></v-switch>
              </v-col>
            </v-row>
            <v-row v-if="soldRange">
              <v-col cols="6">
                <v-menu
                  v-model="fromDateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formattedFromDate"
                      label="From Date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="filters.fromDate" @input="fromDateMenu = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-menu
                  v-model="toDateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formattedToDate"
                      label="To Date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="filters.toDate" @input="toDateMenu = false"></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col cols="6">
                <v-menu
                  v-model="soldOnDateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formattedSoldOnDate"
                      label="Last Sold Date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="filters.soldOn" @input="soldOnDateMenu = false"></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
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
    <pre>{{filters}}</pre>
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
      filters: null,
      soldRange: true,
      lifeRange: true,
      fromDateMenu: false,
      toDateMenu: false,
      soldOnDateMenu: false
    };
  },
  computed: {
    formattedFromDate() {
      return this.formatDate(this.filters.fromDate);
    },
    formattedToDate() {
      return this.formatDate(this.filters.toDate);
    },
    formattedSoldOnDate() {
      return this.formatDate(this.filters.soldOn);
    },
    filtersDialog() {
      let dialog = this.$store.state.products.filtersDialog;
      this.filters = _.cloneDeep(dialog.filters);
      return dialog;
    },
    departments() {
      return this.$store.state.departments.departments;
    }
  },
  watch: {
    soldRange (value) {
      if (value) {
        this.filters.soldOn = null
        this.soldOnDateMenu = false
      } else {
        this.filters.fromDate = null
        this.filters.toDate = null
        this.fromDateMenu = false
        this.toDateMenu = false
      }
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
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
</style>