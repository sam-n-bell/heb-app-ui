import constants from "../assets/constants"

const state = () => ({
    units: {
        payload: [],
        error: null,
        loading: false
    }
})

const getters = {

}

const actions = {
    async getUnits({commit}) {
        commit("getUnits")
        try {
            let units = await this.$axios.get(`${constants.apiUrls.units}`);
            commit("getUnitsSuccess", units.data);
        } catch (error) {
            if (error.response && error.response.data.message) {
                commit("getUnitsFailure", error.response.data.message)
            } else {
                commit("getUnitsFailure", error.message)
            }
        }
    }
}

const mutations = {
    getUnits(state) {
        state.units.loading = true;
        state.units.error = null;
        state.units.payload = [];
    },
    getUnitsSuccess(state, payload) {
        state.units.loading = false;
        state.units.error = null;
        state.units.payload = payload;
    },
    getUnitsFailure(state, error) {
        state.units.loading = false;
        state.units.error = error;
        state.units.payload = [];
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};