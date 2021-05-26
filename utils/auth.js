import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getCookieServe(req) {
    let service_cookie = {};
    req && req.headers.cookie && req.headers.cookie.split(';').forEach(function(val) {
        let parts = val.split('=');
        service_cookie[parts[0].trim()] = (parts[1] || '').trim();
    });
    return service_cookie[TokenKey];
}