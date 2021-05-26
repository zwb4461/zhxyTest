export function readFile(file) {
  //把文件按照二进制读取
  return new Promise(resolve => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = ev => {
      resolve(ev.target.result);
    };
  });
}
//createUser:就是uniid
export let character = {
  //后端字段名对应
  ah: {
    //表格字段名对应
    text: "爱好",
    //后端给定类型对应
    type: "string"
  },
  cjgzsj: {
    text: "参加工作时间",
    type: "string"
  },
  cjxmjssj: {
    text: "参加基层服务项目结束年月",
    type: "string"
  },
  cjxmkssj: {
    text: "参加基层服务项目起始年月",
    type: "string"
  },
  csd: {
    text: "出生地",
    type: "string"
  },
  csdms: {
    text: "出生地文字描述",
    type: "string"
  },
  csdxzqhdm: {
    text: "出生地(行政区划代码)",
    type: "string"
  },
  csny: {
    text: "出生日期",
    type: "string"
  },
  dhhm: {
    text: "电话号码",
    type: "string"
  },
  dnzw: {
    text: "党内职务",
    type: "string"
  },
  gatwjrs: {
    text: "港澳台侨外",
    type: "string"
  },
  gjdq: {
    text: "国籍",
    type: "string"
  },
  hjgldw: {
    text: "户籍管理单位",
    type: "string"
  },
  hjszd: {
    text: "户籍所在地",
    type: "string"
  },
  hkxz: {
    text: "户口性质",
    type: "string"
  },
  hyzk: {
    text: "婚姻状况",
    type: "string"
  },
  jdzwjb: {
    text: "军队职务级别",
    type: "string"
  },
  jg: {
    text: "籍贯",
    type: "string"
  },
  jgms: {
    text: "籍贯描述",
    type: "string"
  },
  jhsyqk: {
    text: "计划生育情况",
    type: "string"
  },
  jkyscqk: {
    text: "健康与伤残情况",
    type: "string"
  },
  jtzz: {
    text: "家庭住址",
    type: "string"
  },
  jzdbs: {
    text: "军转干标识",
    type: "string"
  },
  jzgh: {
    text: "教职工号",
    type: "string"
  },
  jzglb: {
    text: "教职工类别",
    type: "string"
  },
  jzgly: {
    text: "教职工来源",
    type: "string"
  },
  jzlx: {
    text: "驾照类型",
    type: "string"
  },
  lgty: {
    text: "离岗退养标识",
    type: "string"
  },
  mz: {
    text: "民族",
    type: "string"
  },
  name: {
    text: "姓名",
    type: "string"
  },
  named: {
    text: "曾用名",
    type: "string"
  },
  pyrq: {
    text: "进本校时间聘用日期",
    type: "string"
  },
  qdhtqk: {
    text: "签订合同情况",
    type: "string"
  },
  rbsj: {
    text: "入编时间",
    type: "string"
  },
  rdsj: {
    text: "入党时间",
    type: "string"
  },
  ryzt: {
    text: "人员状态",
    type: "string"
  },
  sex: {
    text: "性别",
    type: "string"
  },
  sfcjjcxm: {
    text: "是否参加基层服务项目",
    type: "string"
  },
  sfggjs: {
    text: "是否县级及以上骨干教师",
    type: "string"
  },
  sfmfsfs: {
    text: "是否属于免费(公费)师范生",
    type: "string"
  },
  sfpx: {
    text: "是否受过特教专业培养培训",
    type: "string"
  },
  sfqrzsfby: {
    text: "是否全日制师范毕业",
    type: "string"
  },
  sftjjs: {
    text: "是否是特级教师",
    type: "string"
  },
  sfxljkjs: {
    text: "是否心理健康教育教师",
    type: "string"
  },
  sfyzs: {
    text: "是否有特殊教育从业证书",
    type: "string"
  },
  sfzb: {
    text: "是否在编",
    type: "string"
  },
  sfzjlx: {
    text: "身份证类型",
    type: "string"
  },
  shlngzjy: {
    text: "是否具备2年以上基层工作经验",
    type: "string"
  },
  ssks: {
    text: "所属科室",
    type: "string"
  },
  txdz: {
    text: "通讯地址",
    type: "string"
  },
  xgzdwzw: {
    text: "现工作单位职务",
    type: "string"
  },
  xxjsnl: {
    text: "信息技术应用能力",
    type: "string"
  },
  yddh: {
    text: "移动电话",
    type: "string"
  },
  yrxs: {
    text: "用人形式",
    type: "string"
  },
  zc: {
    text: "专长",
    type: "string"
  },
  zjhm: {
    text: "证件号码",
    type: "string"
  },
  zzmm: {
    text: "政治面貌",
    type: "string"
  }
};
