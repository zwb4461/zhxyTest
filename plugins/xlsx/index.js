import Vue from "vue";
import XLSX from "xlsx";

const formatJson = (filterVal, jsonData) => {
  return jsonData.map(v => filterVal.map(j => v[j]));
};

/**
 * 导出表格数据
 * @param {*} tHeader 表头
 * @param {*} filterVal 对于字段名
 * @param {*} list 数据list
 * @param {*} title 导出名称
 */
const exportExcel = (tHeader, filterVal, list, title) => {
  require.ensure([], () => {
    const { export_json_to_excel } = require("./Export2Excel");
    // const tHeader = ["订单ID", "订单编号", "是否支付", "订单价格", "是否发货"]; //生成Excel表格的头部标题栏
    // const filterVal = ["order_id", "order_number", "order_pay", "order_price", "is_send"]; //生成Excel表格的内容栏（根据自己的数据内容属性填写）
    // const list = this.tableData.goods; //需要导出Excel的数据
    const data = formatJson(filterVal, list);
    export_json_to_excel(tHeader, data, title); //这里可以定义你的Excel表的默认名称
  });
};

/**
 * 导入Excel文件
 * @param {*} file 导入的文件
 * @param {*} changeHeard  装换为英文的表头 格式 {c:'中文',e:'English'}
 */
const importExcel = (file, changeHeard) => {
  return new Promise(function(resolve, reject) {
    var rABS = false; //是否将文件读取为二进制字符串
    var f = file;
    var reader = new FileReader();
    //if (!FileReader.prototype.readAsBinaryString) {
    FileReader.prototype.readAsBinaryString = function(f) {
      var binary = "";
      var rABS = false; //是否将文件读取为二进制字符串
      var pt = this;
      var wb; //读取完成的数据
      var outdata;
      var reader = new FileReader();
      reader.onload = function(e) {
        var bytes = new Uint8Array(reader.result);
        var length = bytes.byteLength;
        for (var i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        var XLSX = require("xlsx");
        if (rABS) {
          wb = XLSX.read(btoa(fixdata(binary)), {
            //手动转化
            type: "base64"
          });
        } else {
          wb = XLSX.read(binary, {
            type: "binary"
          });
        }

        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西

        // console.log('-------获取的数据----------------', outdata);
        let aa = JSON.stringify(outdata);
        //let cc = aa.replace(/姓名/g, 'name');

        changeHeard.forEach(item => {
          let reg = new RegExp(item.c, "g");
          aa = aa.replace(reg, item.e);
        });

        let allList = JSON.parse(aa);

        resolve({
          real: outdata,
          change: allList
        });
      };
      reader.readAsArrayBuffer(f);
    };
    if (rABS) {
      reader.readAsArrayBuffer(f);
    } else {
      reader.readAsBinaryString(f);
    }
  });
};

//导出Excel
Vue.prototype.$exportExcel = exportExcel;

//导入Excel
Vue.prototype.$importExcel = importExcel;
