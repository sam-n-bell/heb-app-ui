<template>
  <v-dialog v-model="columnsDialog.visible" persistent max-width="500">
    <v-card class="m-4">
      <v-card-text>
        <v-row>
          <v-spacer />
          <v-col cols="9">
            <v-select
              v-model="selectedColumns"
              :items="columnsDialog.allColumns"
              item-text="text"
              multiple
              label="Select Columns to Show"
              return-object
            >
              <template slot="item" slot-scope="{ item }">{{ item.text | capitalizeEachWord}}</template>
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0">
                  <span>{{ item.text | capitalizeEachWord }}</span>
                </v-chip>
                <span
                  v-if="index === 1"
                  class="grey--text caption"
                >(+{{ selectedColumns.length - 1 }} others)</span>
              </template>
            </v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="default"
          text
          class="action-button mt-2"
          @click="saveColumns(selectedColumns)"
        >Apply</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          text
          style="float: right;"
          class="action-button mt-2"
          @click="hideColumnsDialog()"
        >Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import _ from "lodash";

export default {
  components: {},
  data: () => {
    return {
      selectedColumns: []
    };
  },
  computed: {
    columnsDialog() {
      return this.$store.state.products.columnsDialog;
    },
    departments() {
      return this.$store.state.departments.departments;
    },
    units() {
      return this.$store.state.units.units;
    }
  },
  watch: {
    columnsDialog: {
      deep: true,
      handler(object) {
        this.selectedColumns = _.cloneDeep(this.columnsDialog.selectedColumns);
      }
    }
  },
  methods: {
    ...mapActions({
      saveColumns: "products/saveColumns",
      hideColumnsDialog: "products/hideColumnsDialog"
    })
  }
};
</script>

<style scoped>
</style>