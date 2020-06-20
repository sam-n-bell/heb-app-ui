import constants from "../assets/constants"
import Cookie from "js-cookie"
import jsonwebtoken from "jsonwebtoken"

const state = () => ({
    loginLoading: false,
    loginError: null,
    jwt: null,
    user: null
})

const getters = {

    isAuthenticated: state => {
        const authToken = Cookie.get(constants.authCookieName)
        return !!authToken
    }

}

const actions = {

    async login({commit}, credentials) {
        commit("login")
        try {
            let jwt = await this.$axios.post(constants.urls.login, credentials)
            commit("loginSuccess")
            commit("saveJWT", jwt.data)
        } catch (error) {
            console.log(error)
            console.log(error.response)
            if (error.response && error.response.data.message) {
                commit("loginFailure", error.response.data.message)
            } else {
                commit("loginFailure", error.message)
            }
        }
    }
}

const mutations = {

    login(state) {
        state.loginLoading = true;
        state.loginError = null;
        state.user = null;
        state.jwt = null;
    },
    loginSuccess(state) {
        state.loginLoading = false;
        state.loginError = null;
    },
    saveJWT(state, jwt) {
        Cookie.set(constants.authCookieName, jwt);
        state.jwt = jwt
        let decoded = jsonwebtoken.decode(jwt)
        console.log(decoded)
        state.user = decoded.identity.first_name;
    },
    loginFailure(state, error) {
        console.log(`setting error to ${error}`);
        Cookie.remove(constants.authCookieName);
        state.loginLoading = false;
        state.loginError = error;
        state.user = null;
        state.jwt = null;
    },
    logout(state) {
        Cookie.remove(constants.authCookieName);
        state.loginLoading = false;
        state.loginError = null;
        state.user = null;
        state.jwt = null;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};