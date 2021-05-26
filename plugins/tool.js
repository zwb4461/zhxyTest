import Vue from 'vue'

const tool = {
    /**
     * 判断手机号是否正确
     * @param {String} tel 
     */
    phoneOk(tel) {
        let mobile_mode = /^1[34578]\d{9}$/;
        if (!mobile_mode.test(tel)) {
            return false;
        } else {
            return true;
        }

    }
}







Vue.prototype.$myTool = tool;