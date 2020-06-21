import constants from "../assets/constants"

const state = () => ({
    departments: {
        payload: [],
        error: null,
        loading: false
    }
})

const getters = {

}

const actions = {
    async getDepartments({commit}) {
        commit("getDepartments")
        try {
            let departments = await this.$axios.get(`${constants.apiUrls.departments}`);
            commit("getDepartmentsSuccess", departments.data);
        } catch (error) {
            if (error.response && error.response.data.message) {
                commit("getDepartmentsFailure", error.response.data.message)
            } else {
                commit("getDepartmentsFailure", error.message)
            }
        }
    }
}

const mutations = {
    getDepartments(state) {
        state.departments.loading = true;
        state.departments.error = null;
        state.departments.payload = [];
    },
    getDepartmentsSuccess(state, payload) {
        state.departments.loading = false;
        state.departments.error = null;
        state.departments.payload = payload;
    },
    getDepartmentsFailure(state, error) {
        state.departments.loading = false;
        state.departments.error = error;
        state.departments.payload = [];
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};