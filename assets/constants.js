let baseURL = "/discovery-api/"
let authCookieName = "DISCOVERY-AUTH-TOKEN"
let apiUrls = Object.freeze({
    login: `${baseURL}login`,
    register: `${baseURL}register`,
    products: `${baseURL}products`,
    departments: `${baseURL}departments`,
    units: `${baseURL}units`
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