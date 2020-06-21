import constants from "../assets/constants.js"
import Cookie from "js-cookie"

export default function (context) {
        const jwt = Cookie.get(constants.authCookieName);
        if (jwt) {
            context.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
            context.store.commit("authentication/saveJWT", jwt);
        } else {
            context.redirect("/login")
        }
}