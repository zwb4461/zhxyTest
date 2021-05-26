const request = require('../utils/request.js');
const Api = require('./apiUrl');

//获取国家
const country = query => {
    return request({
        url: Api.data.country,
        method: 'get',
        params: query
    });
};




export default {
    country
}