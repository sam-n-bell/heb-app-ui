import Cookie from "js-cookie";
import constants from "~/assets/constants.js";

export default function(context) {

    context.$axios.onError(error => {
        const code = parseInt(error.response && error.response.status);
        if (code === 401) {
            context.redirect("/login");
        } else if (code > 401) {
            context.redirect("/error")
        }
    });

}