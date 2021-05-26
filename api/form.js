 const request = require('~/utils/request.js');
 const Api = require('~/api/apiUrl/');


 //用户列表
 const list = query => {
     return request({
         url: Api.form.list,
         method: 'get',
         params: query
     });
 };

 const add = query => {
     return request({
         url: Api.form.add,
         method: 'post',
         data: query
     });
 };

 const edit = query => {
     return request({
         url: Api.form.edit,
         method: 'post',
         data: query
     });
 };

 const del = query => {
     return request({
         url: Api.form.del,
         method: 'post',
         data: query
     });
 };


 export default {
     list,
     add,
     edit,
     del
 }