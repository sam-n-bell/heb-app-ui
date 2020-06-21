<template>
  <v-dialog v-model="filtersDialog.visible" persistent max-width="700">
    <v-card>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Filter by Product ID</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="3">
                <v-subheader>Product ID or Description</v-subheader>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="filters.productId" label="Product ID" prefix="#" clearable type="number"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-subheader>Description of Product</v-subheader>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="filters.description" label="Onion" clearable></v-text-field>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Department or Unit/Measurement</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="3">
                <v-subheader>Department</v-subheader>
              </v-col>
              <v-col cols="4">
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
            <v-row>
              <v-col cols="3">
                <v-subheader>Sold by Unit or Measurement</v-subheader>
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="filters.sellUnit"
                  :items="units.payload"
                  item-text="name"
                  clearable
                  label="Units and Measurements"
                >
                  <template slot="item" slot-scope="{ item }">{{ item.name | capitalize}}</template>
                </v-select>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Selling Price or Cost Expense</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="3">
                <v-subheader>Min. Selling Price</v-subheader>
              </v-col>
              <v-col cols="3">
                <v-text-field label="2.50" v-model="filters.minPrice" prefix="$" clearable type="number"></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-subheader>Max. Selling Price</v-subheader>
              </v-col>
              <v-col cols="3">
                <v-text-field label="5.00" v-model="filters.maxPrice" prefix="$" clearable type="number"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-subheader>Min. Expense Cost</v-subheader>
              </v-col>
              <v-col cols="3">
                <v-text-field label="2.50" v-model="filters.minCost" prefix="$" clearable type="number"></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-subheader>Max. Expense Cost</v-subheader>
              </v-col>
              <v-col cols="3">
                <v-text-field label="5.00" v-model="filters.maxCost" prefix="$" clearable type="number"></v-text-field>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
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
                  <v-date-picker v-model="filters.soldFrom" @input="fromDateMenu = false"></v-date-picker>
                </v-menu>
                <v-btn text small @click="filters.soldFrom = null">Clear From Date</v-btn>
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
                  <v-date-picker v-model="filters.soldTo" @input="toDateMenu = false"></v-date-picker>
                </v-menu>
                <v-btn text small @click="filters.soldTo = null">Clear To Date</v-btn>
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
                <v-btn text small @click="filters.soldOn = null">Clear Date</v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Shelf Life</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="9">
                <v-switch v-model="lifeRange" label="Search Shelf Life by Range"></v-switch>
              </v-col>
            </v-row>
            <v-row v-if="lifeRange">
              <v-col cols="3">
                <v-subheader>Min. Shelf Life</v-subheader>
              </v-col>
              <v-col cols="3">
                <v-text-field label="2" v-model="filters.minLife" clearable suffix="days" type="number"></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-subheader>Max. Shelf Life</v-subheader>
              </v-col>
              <v-col cols="3">
                <v-text-field label="7" v-model="filters.maxLife" clearable suffix="days" type="number"></v-text-field>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col cols="3">
                <v-subheader>Exact Shelf Life</v-subheader>
              </v-col>
              <v-col cols="3">
                <v-text-field label="5" v-model="filters.exactLife" suffix="days" clearable type="number"></v-text-field>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-card-actions>
        <v-btn color="default" text class="action-button mt-2" @click="saveFiltersEvent()">Apply</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          style="float: right;"
          class="action-button mt-2"
          @click="clearFiltersEvent()"
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
      return this.formatDate(this.filters.soldFrom);
    },
    formattedToDate() {
      return this.formatDate(this.filters.soldTo);
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
    },
    units() {
      return this.$store.state.units.units;
    }
  },
  watch: {
    soldRange(value) {
      if (value) {
        this.filters.soldOn = null;
        this.soldOnDateMenu = false;
      } else {
        this.filters.soldFrom = null;
        this.filters.soldTo = null;
        this.fromDateMenu = false;
        this.toDateMenu = false;
      }
    },
    lifeRange(value) {
      if (value) {
        this.filters.exactLife = null;
      } else {
        this.filters.minLife = null;
        this.filters.maxLife = null;
      }
    },
    filtersDialog: {
      deep: true,
      handler(object) {
        if (JSON.stringify(object.filters) !== JSON.stringify(this.filters)) {
          this.filters = _.cloneDeep(object.filters)
        } 
      }
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    saveFiltersEvent() {
      this.saveFilters(this.filters);
    },
    clearFiltersEvent () {
      this.clearFilters()
      // written this way when filters are updated but not saved
      this.filters = _.cloneDeep(this.filtersDialog.filters);
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
};
</script>

<style scoped>
</style>