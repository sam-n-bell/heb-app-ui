let baseURL = "/search-api/"
let authCookieName = "SEARCH-AUTH-TOKEN"
let apiUrls = Object.freeze({
    login: `${baseURL}login`,
    register: `${baseURL}register`
})
let uiUrls = Object.freeze({
    register: '/register',
    login: '/login',
    home: '/'
})


export default Object.freeze({
    apiUrls: apiUrls,
    uiUrls: uiUrls,
    authCookieName: authCookieName
})