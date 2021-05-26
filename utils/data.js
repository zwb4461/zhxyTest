import main from "../api/data";

//下拉参数接口

// let COUNTRY;

//获取国家的配置参数
async function getCountry() {
  let { data } = await main.country();
  // console.log("获得的国家是----", data);
  let list = data.map(item => {
    return {
      text: item.zwabbreviation,
      v: item.zwabbreviation
    };
  });
  return list;
}

//港澳台侨外
export const foreigntype = [
  { v: 0, text: "否" },
  { v: 1, text: "香港同胞" },
  { v: 2, text: "香港同胞亲属" },
  { v: 3, text: "澳门同胞" },
  { v: 4, text: "澳门同胞亲属" },
  { v: 5, text: "台湾同胞" },
  { v: 6, text: "台湾同胞亲属" },
  { v: 11, text: "华侨" },
  { v: 12, text: "侨眷" },
  { v: 13, text: "归侨" },
  { v: 14, text: "归侨子女" },
  { v: 21, text: "归国留学人员" },
  { v: 31, text: "非华裔中国人" },
  { v: 41, text: "外籍华裔人" },
  { v: 51, text: "外国人" },
  { v: 99, text: "其他" }
];
export const foreigntypes = [
  { v: "0", text: "否" },
  { v: "1", text: "香港同胞" },
  { v: "2", text: "香港同胞亲属" },
  { v: "3", text: "澳门同胞" },
  { v: "4", text: "澳门同胞亲属" },
  { v: "5", text: "台湾同胞" },
  { v: "6", text: "台湾同胞亲属" },
  { v: "11", text: "华侨" },
  { v: "12", text: "侨眷" },
  { v: "13", text: "归侨" },
  { v: "14", text: "归侨子女" },
  { v: "21", text: "归国留学人员" },
  { v: "31", text: "非华裔中国人" },
  { v: "41", text: "外籍华裔人" },
  { v: "51", text: "外国人" },
  { v: "99", text: "其他" }
];

export const nation = [
  { v: "1", text: "汉族" },
  { v: "2", text: "蒙古族" },
  { v: "3", text: "回族" },
  { v: "4", text: "藏族" },
  { v: "5", text: "维吾尔族" },
  { v: "6", text: "苗族" },
  { v: "7", text: "彝族" },
  { v: "8", text: "壮族" },
  { v: "9", text: "布依族" },
  { v: "10", text: "朝鲜族" },
  { v: "11", text: "满族" },
  { v: "12", text: "侗族" },
  { v: "13", text: "瑶族" },
  { v: "14", text: "白族" },
  { v: "15", text: "土家族" },
  { v: "16", text: "哈尼族" },
  { v: "17", text: "哈萨克族" },
  { v: "18", text: "傣族" },
  { v: "19", text: "黎族" },
  { v: "20", text: "傈僳族" },
  { v: "21", text: "佤族" },
  { v: "22", text: "畲族" },
  { v: "23", text: "高山族" },
  { v: "24", text: "拉祜族" },
  { v: "25", text: "水族" },
  { v: "26", text: "东乡族" },
  { v: "27", text: "纳西族" },
  { v: "28", text: "景颇族" },
  { v: "29", text: "柯尔克孜族" },
  { v: "30", text: "土族" },
  { v: "31", text: "达斡尔族" },
  { v: "32", text: "仫佬族" },
  { v: "33", text: "羌族" },
  { v: "34", text: "布朗族" },
  { v: "35", text: "撒拉族" },
  { v: "36", text: "毛难族" },
  { v: "37", text: "仡佬族" },
  { v: "38", text: "锡伯族" },
  { v: "39", text: "阿昌族" },
  { v: "40", text: "普米族" },
  { v: "41", text: "塔吉克族" },
  { v: "42", text: "怒族" },
  { v: "43", text: "乌孜别克族" },
  { v: "44", text: "俄罗斯族" },
  { v: "45", text: "鄂温克族" },
  { v: "46", text: "崩龙族" },
  { v: "47", text: "保安族" },
  { v: "48", text: "裕固族" },
  { v: "49", text: "京族" },
  { v: "50", text: "塔塔尔族" },
  { v: "51", text: "独龙族" },
  { v: "52", text: "鄂伦春族" },
  { v: "53", text: "赫哲族" },
  { v: "54", text: "门巴族" },
  { v: "55", text: "珞巴族" },
  { v: "56", text: "基诺族" },
  { v: "57", text: "少数民族" }
];

export const country = getCountry; //获取国家
export const special = ["唱歌", "跳舞", "音乐", "绘画", "书法", "钢琴"];

export const degree = [
  { v: "1", text: "博士" },
  { v: "2", text: "硕士" },
  { v: "3", text: "本科" },
  { v: "4", text: "大专" },
  { v: "5", text: "中专和中技" },
  { v: "6", text: "技工学校" },
  { v: "7", text: "高中" },
  { v: "8", text: "初中" },
  { v: "9", text: "小学" }
];

//学籍相关参数

//户口类别
export const residenceType = [
  { text: "居民", v: 1 },
  { text: "农业", v: 2 }
];
// export const residenceType = [
//   { text: "农业户口", v: 1 },
//   { text: "非农业户口", v: 2 },
//   { text: "家庭户", v: 3 },
//   { text: "集体户", v: 4 },
//   { text: "空挂户", v: 5 }
// ];
//与学生关系
export const withStudent = [
  { text: "父亲", v: 1 },
  { text: "母亲", v: 2 },
  { text: "祖父母或外祖父母", v: 3 },
  { text: "兄弟姐妹", v: 4 },
  { text: "其他", v: 5 },
  { text: "父女", v: 6 },
  { text: "母女", v: 7 }
];
//入学方式
export const goMode = [
  { text: "就近入学", v: "1" },
  { text: "其它", v: "2" },
  { text: "施教区内", v: "3" }
];
//政治面貌
export const politicalOutlook = [
  { text: "中共党员", v: "1" },
  { text: "中共预备党员", v: "2" },
  { text: "共青团员", v: "3" },
  { text: "群众", v: "4" },
  { text: "民革", v: "5" },
  { text: "民盟", v: "6" },
  { text: "民建", v: "7" },
  { text: "民进", v: "8" },
  { text: "农工党", v: "9" },
  { text: "致公党", v: "10" },
  { text: "九三学社", v: "11" },
  { text: "台盟", v: "12" },
  { text: "无党派", v: "13" },
  { text: "农工党", v: "14" },
  { text: "其它", v: "15" },
  { text: "学生", v: "16" }
];
//党内职务
export const zhiwu = [
  { text: "党委书记", v: "1" },
  { text: "常务副书记", v: "2" },
  { text: "党委副书记", v: "3" },
  { text: "常务委员", v: "4" },
  { text: "党委委员", v: "5" },
  { text: "党委候补委员", v: "6" },
  { text: "党组书记", v: "7" },
  { text: "党组副书记", v: "8" },
  { text: "党组成员", v: "9" },
  { text: "总支书记", v: "10" },
  { text: "总支副书记", v: "11" },
  { text: "总支委员", v: "12" },
  { text: "支部书记", v: "13" },
  { text: "支部副书记", v: "14" },
  { text: "支部委员", v: "15" },
  { text: "纪委书记", v: "16" },
  { text: "纪委副书记", v: "17" },
  { text: "纪委常委", v: "18" },
  { text: "纪委委员", v: "19" },
  { text: "纪委候补委员", v: "20" },
  { text: "党小组长", v: "21" },
  { text: "其他", v: "22" }
];
//学生类别
export const studenType = [
  { text: "普通学生", v: "1" },
  { text: "随班就读学生", v: "2" }
];
//血型
export const bloodType = [
  { text: "A型", v: 1 },
  { text: "B型", v: 2 },
  { text: "AB型", v: 3 },
  { text: "O型", v: 4 },
  { text: "其它血型", v: 5 },
  { text: "未定血型", v: 6 },
  { text: "未知血型", v: 7 }
];
//健康状态
export const healthStatus = [
  { text: "健康或良好", v: 1 },
  { text: "一般或较弱", v: 2 },
  { text: "有慢性病", v: 3 },
  { text: "有生理缺陷", v: 4 },
  { text: "残疾", v: 5 }
];
//学生来源
export const studentSources = [
  { text: "正常入学", v: 1 },
  { text: "借读", v: 2 },
  { text: "其它", v: 3 }
];

//残疾类型
export const disability = [
  { text: "无残疾", v: 1 },
  { text: "视力残疾", v: 2 },
  { text: "听力残疾", v: 3 },
  { text: "言语残疾", v: 4 },
  { text: "肢体残疾", v: 5 },
  { text: "智力残疾", v: 6 },
  { text: "精神残疾", v: 7 },
  { text: "多重残疾", v: 8 },
  { text: "其它残疾", v: 9 }
];

//随班就读
export const attend = [
  { text: "非随班就读", v: 1 },
  { text: "视力残疾随班就读", v: 2 },
  { text: "听力残疾随班就读", v: 3 },
  { text: "智力残疾随班就读", v: 4 },
  { text: "其它残疾随班就读", v: 5 }
];

//是否农村留守儿童
export const isStayBehind = [
  { text: "非留守儿童", v: 1 },
  { text: "单亲留守儿童", v: 2 },
  { text: "双亲留守儿童", v: 3 }
];

//就读方式
export const studyType = [
  { text: "走读", v: 1 },
  { text: "住校", v: 2 }
];

//上下学交通方式
export const trafficType = [
  { text: "步行", v: 1 },
  { text: "自行车（含摩托车、电动自行车）", v: 2 },
  { text: "公共交通（含城市公交、农村客运，地铁）", v: 3 },
  { text: "家长自行接送", v: 4 },
  { text: "校车", v: 5 },
  { text: "其它", v: 6 }
];

//上下学交通方式
export const studentStatus = [
  { text: "转入", v: 1, type: "cyan" },
  { text: "正常", v: 2, type: "green" },
  { text: "休学", v: 3, type: "orange" },
  { text: "复学", v: 4, type: "pink" },
  { text: "删除", v: 5, type: "red" }
];

//生源类型
export const sourcetype = [
  { text: "户籍生", v: 0, type: "cyan" },
  { text: "房产生", v: 1, type: "green" },
  { text: "积分生", v: 2, type: "pink" }
];

//产权证类型
export const houseType = [
  { text: "房地产权证", v: 1 },
  { text: "不动产证", v: 2 },
  { text: "集体土地证", v: 3 },
  { text: "自建房(未办证)", v: 4 },
  { text: "国有土地使用证", v: 5 }
];

//是否民办
export const ismb = [
  { text: "是", v: 1 },
  { text: "否", v: 0 }
];

//是否有房
export const havehouse = [
  { text: "有", v: "1" },
  { text: "无", v: "0" }
];

//是否单亲
export const isdq = [
  { text: "是", v: 1 },
  { text: "否", v: 0 }
];

// 审核状态
export const shzt = [
  { text: "未审核", v: 0 },
  { text: "审核通过", v: 1 },
  { text: "审核无效", v: 2 }
];
