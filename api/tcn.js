const request = require('../utils/request.js');
const Api = require('./apiUrl');

//获取短地址接口
const get = query => {
    return request({
        url: Api.tcn,
        method: 'get',
        params: query
    });
};




export default {
    get
}
// module.exports = exports['default'];

// module.exports = {
//     list,
//     add,
//     edit,
//     del,
//     find
// }