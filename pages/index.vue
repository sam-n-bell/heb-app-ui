<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-row>
          <v-spacer/>
            <v-btn @click="showFiltersDialog()" text>Filter Columns</v-btn>
            <v-btn @click="showFiltersDialog()" text>Show Filters</v-btn>
        </v-row>
      </v-card-title>
      <v-row>
        <v-col cols="12">
            <v-data-table :headers="headers" :items="products.payload.products">
              <template slot="item" slot-scope="props">
                  <tr>
                    <td>{{props.item.product_id}}</td>
                    <td>{{props.item.description | capitalizeEachWord}}</td>
                    <td>{{props.item.department | capitalize}}</td>
                    <td>${{props.item.sell_price | moneyPrecision}}</td>
                    <td>${{props.item.cost_expense | moneyPrecision}}</td>
                    <td>{{props.item.last_sold}}</td>
                    <td v-if="props.item.shelf_life_days > 1">{{props.item.shelf_life_days}} days</td>
                    <td v-else>{{props.item.shelf_life_days}} day</td>
                    <td>{{props.item.qty_sold_in}}</td>
                    <td>{{props.item.unit}}</td>
                  </tr>
              </template>
            </v-data-table>
        </v-col>
      </v-row>
    </v-card>
    <FiltersDialog />
  </v-container>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import { mapActions, mapGetters } from "vuex";
import FiltersDialog from "~/components/FiltersDialog.vue";
export default {
  components: {
    Logo,
    VuetifyLogo,
    FiltersDialog
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
    };
  },
  computed: {
    products () {
      return this.$store.state.products.products;
    },
    filters () {
      return this.$store.state.products.filtersDialog.filters;
    },
  },
  methods: {
    ...mapActions({
      showFiltersDialog: "products/showFiltersDialog",
      getProducts: "products/getProducts"
    })
  },
  mounted() {
    this.getProducts(this.filters);
  }
};
</script>
