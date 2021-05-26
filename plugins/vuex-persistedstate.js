import createPersistedState from 'vuex-persistedstate';
import * as Cookies from "js-cookie";

let cookieStorage = {
    getItem: function(key) {
        return Cookies.getJSON(key);
        // return sessionStorage.getItem(key);
    },
    setItem: function(key, value) {
        return Cookies.set(key, value, { expires: 3, secure: false });
        // return sessionStorage.setItem(key, value);

    },
    removeItem: function(key) {
        return Cookies.remove(key);
    }
};

export default ({ store }) => {
    window.onNuxtReady(() => {
        createPersistedState({
            storage: window.sessionStorage
            // storage: {
            //     getItem: key => Cookies.get(key),
            //     setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),
            //     removeItem: key => Cookies.remove(key)
            // }
        })(store);
    })
};