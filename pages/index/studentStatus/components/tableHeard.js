const common = [
  {
    title: "序号",
    dataIndex: "idx",
    scopedSlots: { customRender: "idx" },
    width: 60
  },
  {
    title: "所在班级",
    dataIndex: "className",
    width: 160
  },
  {
    title: "姓名",
    dataIndex: "name",
    width: 160,
    scopedSlots: { customRender: "name" }
  },
  {
    title: "证件类型",
    dataIndex: "idcardtype",
    width: 100,
    scopedSlots: { customRender: "idcardtype" }
  },
  {
    title: "证件编号",
    dataIndex: "idno",
    width: 165
  },
  {
    title: "现居住地",
    dataIndex: "address",
    scopedSlots: { customRender: "address" }
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
  },
  {
    title: "学籍状态",
    dataIndex: "studentStatus",
    scopedSlots: { customRender: "studentStatus" },
    width: 80
  },
  {
    title: "审核状态",
    dataIndex: "status",
    scopedSlots: { customRender: "guest_status" },
    width: 80
  }
];

const heard1 = [];

const heard2 = [
  {
    title: "评定结果",
    dataIndex: "rankShow",
    width: 150,
    scopedSlots: { customRender: "rankShow" }
  },
  {
    title: "分项评定",
    dataIndex: "rankInfo",
    scopedSlots: { customRender: "rankInfo" }
  }
];

const tool = [
  {
    title: "操作",
    width: 180,
    fixed: "right",
    scopedSlots: { customRender: "tool" }
  }
];

export default {
  heard1: [...common, ...heard1, ...tool],
  heard2: [...common, ...heard2, ...tool]
};
