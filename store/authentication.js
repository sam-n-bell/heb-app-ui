import constants from "../assets/constants"
import Cookie from "js-cookie"
import jsonwebtoken from "jsonwebtoken"

const state = () => ({
    loginLoading: false,
    registerLoading: false,
    loginError: null,
    registerError: null,
    jwt: null,
    user: null
})

const getters = {

    isAuthenticated: state => {
        const authToken = Cookie.get(constants.authCookieName)
        return !!authToken || !!state.user
    }

}

const actions = {

    async login({commit}, credentials) {
        commit("login")
        try {
            let jwt = await this.$axios.post(constants.apiUrls.login, credentials)
            commit("loginSuccess")
            commit("saveJWT", jwt.data)
        } catch (error) {
            if (error.response && error.response.data.message) {
                commit("loginFailure", error.response.data.message)
            } else {
                commit("loginFailure", error.message)
            }
        }
    },
    async register({commit}, credentials) {
        commit("register")
        try {
            await this.$axios.post(constants.apiUrls.register, credentials)
            commit("registerSuccess")
        } catch (error) {
            if (error.response && error.response.data.message) {
                commit("registerFailure", error.response.data.message)
            } else {
                commit("registerFailure", error.message)
            }
        }
    }
}

const mutations = {
    register(state) {
        state.registerLoading = true;
        state.registerErrors = null;
    },
    registerSuccess(state) {
        state.registerLoading = false;
        state.registerErrors = null;
        this.$router.push(constants.uiUrls.login);
    },
    registerFailure(state, error) {
        state.registerLoading = false;
        state.registerErrors = error;
    },
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