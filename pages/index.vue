<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-row>
          <v-spacer/>
            <v-btn @click="showColumnsDialog()" text>Choose Columns</v-btn>
            <v-btn @click="showFiltersDialog()" text>Filter Products</v-btn>
        </v-row>
      </v-card-title>
      <v-row>
        <v-col cols="12">
            <v-data-table :headers="columns.selectedColumns" :items="products.payload.products">
              <template v-slot:item.description=" { item }">
                {{item.description | capitalizeEachWord}}
              </template>
              <template v-slot:item.department=" { item }">
                {{item.department | capitalizeEachWord}}
              </template>
              <template v-slot:item.shelf_life_days=" { item }">
                {{item.shelf_life_days }} days
              </template>
              <template v-slot:item.sell_price=" { item }">
                ${{item.sell_price | moneyPrecision}}
              </template>
              <template v-slot:item.cost_expense=" { item }">
                ${{item.cost_expense | moneyPrecision}}
              </template>
              <template v-slot:item.last_sold=" { item }">
                {{ $moment(item.last_sold).format('M/D/YYYY')}}
              </template>
              <template v-slot:item.unit=" { item }">
                <span v-if="item.unit && item.unit.toLowerCase() === 'each'">{{item.unit | capitalizeEachWord}}</span>
                <span v-else>{{item.unit}}</span>
              </template>
            </v-data-table>
        </v-col>
      </v-row>
    </v-card>
    <FiltersDialog />
    <ColumnsDialog />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FiltersDialog from "~/components/FiltersDialog.vue";
import ColumnsDialog from "~/components/ColumnsDialog.vue";
import _ from "lodash";
export default {
  components: {
    FiltersDialog,
    ColumnsDialog
  },
  data: () => {
    return {
      headers: [
          { text: 'ID', value: 'product_id' },
          { text: 'Description', value: 'description' },
          { text: 'Department', value: 'department' },
          { text: 'Sell Price', value: 'sell_price' },
          { text: 'Cost Expense', value: 'cost_expense' },
          { text: 'Last Sold', value: 'last_sold' },
          { text: 'Shelf Life', value: 'shelf_life_days' },
          { text: 'xFor', value: 'qty_sold_in' },
          { text: 'Sold By', value: 'unit' }
        ],
       headersSelected: [

       ]
       // model it to headersselected
       // items it to headers
    };
  },
  computed: {
    products () {
      return this.$store.state.products.products;
    },
    filters () {
      return this.$store.state.products.filtersDialog.filters;
    },
    columns () {
      return this.$store.state.products.columnsDialog;
    }
  },
  watch: {
    products: {
      deep: true,
      handler(object) {
        if (object.error) {
           this.showSnackBar({
          text: object.error,
          color: 'error'
        })
        }
      }
    }
  },
  methods: {
    columnsContainsField (fieldName) {
        return _.includes(this.columns.selectedColumns, fieldName);
    },
    ...mapActions({
      showFiltersDialog: "products/showFiltersDialog",
      showColumnsDialog: "products/showColumnsDialog",
      getProducts: "products/getProducts",
      showSnackBar: "notifications/showSnackBar"
    })
  },
  mounted() {
    this.getProducts(this.filters);
  }
};
</script>
