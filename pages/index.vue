<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-row>
        <v-spacer/><v-btn @click="showFiltersDialog()" text>Show Filters</v-btn>
      </v-row>
      </v-card-title>
      <v-row>
        <v-col cols="12">
            <v-data-table :headers="headers" :items="products.payload.products"  class="elevation-1"></v-data-table>
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
          { text: 'Sell Price', value: 'sell_price' }
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
