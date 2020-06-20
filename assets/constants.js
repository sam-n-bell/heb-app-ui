let baseURL = "/search-api/"
let authCookieName = "SEARCH-AUTH-TOKEN"
let urls = Object.freeze({
    login: `${baseURL}login`,
    register: `${baseURL}register`
})


export default Object.freeze({
    urls: urls,
    authCookieName: authCookieName
})