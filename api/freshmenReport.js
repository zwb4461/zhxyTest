 const request = require('~/utils/request.js');
 const Api = require('~/api/apiUrl/');


 //列表
 const list = query => {
     return request({
         url: Api.freshmenReport.list,
         method: 'get',
         params: query
     });
 };

 //列表
 const find = query => {
     return request({
         url: Api.freshmenReport.find,
         method: 'get',
         params: query
     });
 };

 //添加
 const add = query => {
     return request({
         url: Api.freshmenReport.add,
         method: 'post',
         data: query
     });
 };
 //修改
 const edit = query => {
     return request({
         url: Api.freshmenReport.edit,
         method: 'get',
         params: query
     });
 };

 //删除
 const del = query => {
     return request({
         url: Api.freshmenReport.del,
         method: 'get',
         params: query
     });
 };


 //关闭报名
 const close = query => {
     return request({
         url: Api.freshmenReport.close,
         method: 'post',
         data: query
     });
 };

 export default {
     list,
     add,
     edit,
     del,
     find,
     close
 }