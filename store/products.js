import constants from "../assets/constants"
import Cookie from "js-cookie"
import jsonwebtoken from "jsonwebtoken"

const state = () => ({
    products: {
        payload: [],
        error: null,
        loading: false
    },
    filtersDialog: {
        visible: false,
        filters: {
            productId: null,
            description: null,
            soldFrom: null,
            soldTo: null,
            soldOn: null,
            minLife: null,
            maxLife: null,
            exactLife: null,
            department: null,
            minPrice: null,
            maxPrice: null,
            sellUnit: null,
            minCost: null,
            maxCost: null,
            soldInCounts: null 
        }
    },
    columnsDialog: {
        visible: false,
        allColumns: [
            { text: 'Product ID', value: 'product_id' },
            { text: 'Description', value: 'description' },
            { text: 'Department', value: 'department' },
            { text: 'Sell Price', value: 'sell_price' },
            { text: 'Cost Expense', value: 'cost_expense' },
            { text: 'Last Sold', value: 'last_sold' },
            { text: 'Shelf Life', value: 'shelf_life_days' },
            { text: 'xFor', value: 'qty_sold_in' },
            { text: 'Sold By', value: 'unit' }
        ],
        selectedColumns: [
            { text: 'Product ID', value: 'product_id' },
            { text: 'Description', value: 'description' },
            { text: 'Department', value: 'department' },
            { text: 'Sell Price', value: 'sell_price' },
            { text: 'Cost Expense', value: 'cost_expense' },
            { text: 'Last Sold', value: 'last_sold' },
            { text: 'Shelf Life', value: 'shelf_life_days' }
        ]
    }
})

const getters = {

}

const actions = {
    async getProducts({commit}, params) {
        commit("getProducts");
        try {
            let query = '?'
            if (params.productId) {
                query += `id=${params.productId}&`
            } else {
                if (params.description) {
                    query += `description=${params.description}&`
                }
                if (params.soldFrom) {
                    query += `soldFrom=${params.soldFrom}&`
                }
                if (params.soldTo) {
                    query += `soldTo=${params.soldTo}&`
                }
                if (params.soldOn) {
                    query += `soldOn=${params.soldOn}&`
                }
                if (params.minLife) {
                    query += `minLife=${params.minLife}&`
                }
                if (params.maxLife) {
                    query += `maxLife=${params.maxLife}&`
                }
                if (params.exactLife) {
                    query += `exactLife=${params.exactLife}&`
                }
                if (params.department) {
                    query += `department=${params.department}&`
                }
                if (params.minPrice) {
                    query += `minPrice=${params.minPrice}&`
                }
                if (params.maxPrice) {
                    query += `maxPrice=${params.maxPrice}&`
                }
                if (params.sellUnit) {
                    query += `sellUnit=${params.sellUnit}&`
                }
                if (params.minCost) {
                    query += `minCost=${params.minCost}&`
                }
                if (params.maxCost) {
                    query += `maxCost=${params.maxCost}&`
                }
                if (params.soldInCounts) {
                    query += `soldInCounts=${params.soldInCounts}&`
                }
            }
            let products = await this.$axios.get(`${constants.apiUrls.products}${query}`);
            commit("getProductsSuccess", products.data);
        } catch (error) {
            if (error.response && error.response.data.message) {
                commit("getProductsFailure", error.response.data.message);
            } else {
                commit("getProductsFailure", error.message);
            }
        }
    },
    async showFiltersDialog({commit}) {
        try {
            commit("showFiltersDialog");
        } catch (error) {
            console.log(error);
        }
    },
    async hideFiltersDialog({commit}) {
        try {
            commit("hideFiltersDialog");
        } catch (error) {
            console.log(error)
        }
    },
    async saveFilters({commit, dispatch}, filters) {
        try {
            commit("saveFilters", filters);
            dispatch("hideFiltersDialog");
        } catch (error) {
            console.log(error);
        }
    },
    async clearFilters({commit, dispatch}) {
        try {
            commit("clearFilters");
        } catch (error) {
            console.log(error);
        }
    },
    async showColumnsDialog({commit}) {
        try {
            commit("showColumnsDialog");
        } catch (error) {
            console.log(error);
        }
    },
    async hideColumnsDialog({commit}) {
        try {
            commit("hideColumnsDialog");
        } catch (error) {
            console.log(error)
        }
    },
    async saveColumns({commit, dispatch}, columns) {
        try {
            commit("saveColumns", columns);
            dispatch("hideColumnsDialog");
        } catch (error) {
            console.log(error);
        }
    }
}

const mutations = {
    showFiltersDialog(state) {
        state.filtersDialog.visible = true;
    },
    hideFiltersDialog(state) {
        state.filtersDialog.visible = false;
    },
    saveFilters(state, filters) {
        const keys = Object.keys(filters);
        // convert empty strings and undefineds to null
        keys.forEach( (key) => {
            if (typeof filters[key] === 'string' && filters[key].toString().trim() === "") {
                filters[key] = null;
            }
            if (typeof filters[key] === 'undefined') {
                filters[key] = null;
            }
        })
        state.filtersDialog.filters = filters;
    },
    showColumnsDialog(state) {
        state.columnsDialog.visible = true;
    },
    hideColumnsDialog(state) {
        state.columnsDialog.visible = false;
    },
    saveColumns(state, columns) {
        state.columnsDialog.selectedColumns = columns;
    },
    clearFilters(state) {
        const keys = Object.keys(state.filtersDialog.filters);
        keys.forEach( (key) => {
            state.filtersDialog.filters[key] = null;
        })
    },
    getProducts(state) {
        state.products.loading = true;
        state.products.error = null;
        state.products.payload = [];
    },
    getProductsSuccess(state, payload) {
        state.products.loading = false;
        state.products.error = null;
        state.products.payload = payload;
    },
    getProductsFailure(state, error) {
        state.products.loading = false;
        state.products.error = error;
        state.products.payload = [];
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};