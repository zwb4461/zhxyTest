//   {
//     title: "毕业幼儿园",
//     dataIndex: "childhood"
//   },

//   {
//     title: "国籍",
//     dataIndex: "country"
//   },

//   {
//     title: "对应enrollId",
//     dataIndex: "enrollId"
//   },

//   {
//     title: "父亲文化程度",
//     dataIndex: "fatherdegree"
//   },

//   {
//     title: "父亲名字",
//     dataIndex: "fathername"
//   },

//   {
//     title: "父亲电话",
//     dataIndex: "fatherphone"
//   },

//   {
//     title: "父亲工作单位",
//     dataIndex: "fatherworkplace"
//   },

//   {
//     title: "学生id",
//     dataIndex: "foreigntype"
//   },

//   {
//     title: "户籍所在备注",
//     dataIndex: "homeRemark"
//   },

//   {
//     title: "家乡",
//     dataIndex: "hometown"
//   },

//   {
//     title: "产权获得日期",
//     dataIndex: "housedeadline"
//   },

//   {
//     title: "房产证",
//     dataIndex: "houseproof"
//   },

//   {
//     title: "免疫卡少几次",
//     dataIndex: "immuneless"
//   },

//   {
//     title: "母亲文化程度",
//     dataIndex: "motherdegree"
//   },

//   {
//     title: "母亲名字",
//     dataIndex: "mothername"
//   },

//   {
//     title: "母亲电话号码",
//     dataIndex: "motherphone"
//   },

//   {
//     title: "母亲工作单位",
//     dataIndex: "motherworkplace"
//   },

//   {
//     title: "民族",
//     dataIndex: "nation"
//   },

//   {
//     title: "其他联系人文化程度",
//     dataIndex: "otherdegree"
//   },

//   {
//     title: "其他联系人名字",
//     dataIndex: "othername"
//   },

//   {
//     title: "其他联系人电话号码",
//     dataIndex: "otherphone"
//   },

//   {
//     title: "其他联系人工作单位",
//     dataIndex: "otherworkplace"
//   },

//   {
//     title: "所有权人",
//     dataIndex: "owner"
//   },

//   {
//     title: "省份",
//     dataIndex: "province"
//   },

//   {
//     title: "等级",
//     dataIndex: "rank"
//   },

//   {
//     title: "对应enrollId",
//     dataIndex: "rankUnionid"
//   },

//   {
//     title: "家长备注",
//     dataIndex: "remark"
//   },

//   {
//     title: "性别",
//     dataIndex: "sex"
//   },

//   {
//     title: "特长",
//     dataIndex: "special"
//   },

//   {
//     title: "乡镇",
//     dataIndex: "street"
//   },

//   {
//     title: "学生标签",
//     dataIndex: "tag"
//   },

//   {
//     title: "使用期限",
//     dataIndex: "unmovabledeadline"
//   },

//   {
//     title: "不动产权证书",
//     dataIndex: "unmovableproof"
//   },

//   {
//     title: "村",
//     dataIndex: "village"
//   },

const common = [
  {
    title: "序号",
    dataIndex: "idx",
    scopedSlots: { customRender: "idx" },
    width: 60
  },
  {
    title: "姓名",
    dataIndex: "name",
    width: 160,
    scopedSlots: { customRender: "name" }
  },
  {
    title: "审核状态",
    dataIndex: "status",
    width: 90,
    scopedSlots: { customRender: "status" }
  },
  {
    title: "出生日期",
    dataIndex: "birthday",
    width: 100,
    scopedSlots: { customRender: "birthday" }
  },
  // {
  //   title: "证件类型",
  //   dataIndex: "idcardtype",
  //   width: 100,
  //   scopedSlots: { customRender: "idcardtype" }
  // },
  {
    title: "证件编号",
    dataIndex: "idno",
    width: 165
  },
  {
    title: "监护人",
    dataIndex: "carer",
    width: 80
  },
  {
    title: "监护人手机号",
    dataIndex: "carerphone",
    width: 120
  }
];

const heard1 = [
  {
    title: "生源类型",
    dataIndex: "sourcetype",
    width: 100,
    scopedSlots: { customRender: "sourcetype" }
  },

  {
    title: "导入状态",
    dataIndex: "state",
    scopedSlots: { customRender: "state" }
  }
];

const heard2 = [
  {
    title: "评定结果",
    dataIndex: "rankShow",
    width: 90,
    scopedSlots: { customRender: "rankShow" }
  },
  {
    title: "分项评定",
    dataIndex: "rankInfo",
    scopedSlots: { customRender: "rankInfo" }
  }
];

const tool = [
  // {
  //   title: "报名时间",
  //   dataIndex: "actiontime",
  //   width: 180
  // },
  {
    title: "现居住地",
    dataIndex: "address",
    scopedSlots: { customRender: "address" }
  },
  {
    title: "操作",
    width: 150,
    fixed: "right",
    scopedSlots: { customRender: "tool" }
  }
];

export default {
  heard1: [...common, ...heard1, ...tool],
  heard2: [...common, ...heard2, ...tool]
};
