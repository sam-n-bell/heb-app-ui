import constants from "../assets/constants.js"
import Cookie from "js-cookie"

export default function (context) {
    if (!context.store.getters["authentication/isAuthenticated"]) {
        const jwt = Cookie.get(constants.authCookieName);
        if (jwt) {
            context.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
            context.store.commit("authentication/saveJWT", jwt);
        } else {
            context.redirect("/login")
        }
    } else {
        const jwt = Cookie.get(constants.authCookieName);
        if (jwt) {
            context.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
            context.store.commit("authentication/saveJWT", jwt);
        } else {
            context.redirect("/login")
        }
    }
}