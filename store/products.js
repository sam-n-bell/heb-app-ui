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
    }
})

const getters = {

}

const actions = {
    async getProducts({commit}, params) {
        commit("getProducts");
        try {
            let query = '?'
            if (params.product_id) {
                query += `id=${params.product_id}&`
            } else {

            }
            let products = await this.$axios.get(`${constants.apiUrls.product}${query}`);
            console.log(products);
            commit("getProductsSuccess", products);
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
    async clearFilters({commit}) {
        try {
            commit("clearFilters");
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