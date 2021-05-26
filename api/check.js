const request = require('~/utils/request.js');
const Api = require('~/api/apiUrl/');

//等第打分
const edit = query => {
    return request({
        url: Api.check.edit,
        method: 'post',
        data: query
    });
};



export default {
    edit
}