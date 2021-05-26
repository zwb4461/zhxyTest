const request = require('../../utils/request.js');
const Api = require('../apiUrl');







//列表
const list = query => {
    return request({
        url: Api.logger.planStudent.list,
        method: 'get',
        params: query
    });
};




export default {
    list
}