const MyBaseUrl = `${process.env.MY_BASE_URL}${process.env.NODE_PORT}/${process.env.NODE_API_BASE}`; //我的业务接口地址
const baseUrl = process.env.BASE_URL; //后端接口地址
const baseUrlDD = process.env.BASE_URL_DD; //钉钉相关接口地址

module.exports = {
  //第三方api
  // tcn: "https://api.d5.nz/api/dwz/url.php",
  tcn: "https://api.d5.nz/api/dwz/tcn.php",
  //我的api
  files: {
    //测试接口
    add: "/h-api/files/create-tableForm" //新建文件
  },
  ddUser: {
    list: "/h-api/dd-user/list" //获取钉钉user的list
  },
  //后端api
  data: {
    //下拉数据
    country: baseUrl + "/getCountry" //所有国家
  },
  freshmenReport: {
    //学生类别
    add: baseUrl + "/addEnroll", //添加学生类别
    list: baseUrl + "/selectEnroll", //学生列表
    del: baseUrl + "/deleteEnroll", //删除
    edit: baseUrl + "/updateEnroll", //修改
    find: baseUrl + "/selectByEnrollId", //查找
    close: baseUrl + "/closeSignUp" //报名关闭
  },
  dingding: {
    login: baseUrlDD, //钉钉登录
    // login: baseUrlDD + '/login', //钉钉登录
    user: baseUrl + "/dd-user/selectDdUserByCondition", //钉钉用户
    userPower: baseUrl + "/dd-user/updateJurisdiction", //钉钉用户权限分配
    findUser: baseUrl + "/dd-user/selectDdUserByUnionid", //根据unnid查询用户
    dep: baseUrl + "/dd-department/selectDepartments", //钉钉部门
    asyncDep: baseUrl + "/dd-department/addDepartment", //钉钉部门同步
    asyncUser: baseUrl + "/dd-user/synchroDdUsers" //钉钉人员同步
  },
  examineSetting: {
    add: baseUrl + "/insertRules", //修改报名配置
    list: baseUrl + "/selectRules", //查看报名设置
    edit: baseUrl + "/updateRules" //更新报名设置
  },
  formSetting: {
    add: baseUrl + "/setTablenew", //设置表单字段
    list: baseUrl + "/selectTable", //查看表单字段
    edit: baseUrl + "/updateTable", //修改表单字段
    del: baseUrl + "/deleteTableRules", //删除表单字段
    find: baseUrl + "/selectTableRules", //根据id查询表单详情
    url: baseUrl + "/shortAddress" //设置短地址
  },
  //评分
  mark: {
    dd: baseUrl + "/scoring", //等第打分
    item: baseUrl + "/submarking", //分项打分
    itemEdit: baseUrl + "/submarkingUpdate", //分项打分
    getOld: baseUrl + "/getHistyScore" //获得历史评分
  },
  //审核
  check: {
    edit: baseUrl + "/checkMaterials" //
  },
  //智能分班
  Smartplacement: {
    student: baseUrl + "/getNotFenBan", //未分班的学生
    autoSmart: baseUrl + "/automaticDispatching", //智能分班
    autoRandom: baseUrl + "/randomShift", //随机分班
    initStudent: baseUrl + "/moveFenBan", //重置学生的分班信息
    find: baseUrl + "/returnStudent", //重置学生的分班信息
    submit: baseUrl + "/manuaShift", //手动分班
    confirm: baseUrl + "/confirmFenBan", //分班确认
    updateClass: baseUrl + "/updateClass"
  },
  //##插入位置
  NoteSend: {
    list: baseUrl + "/selectSmsChannel", //列表
    add: baseUrl + "/insertSmsChannel", //添加
    del: baseUrl + "/deleteSmsChannel", //删除
    edit: baseUrl + "/updateSmsChannel", //删除
    sendAdd: baseUrl + "/sendMessageByBegin", //发送短信（报名）
    sendEdit: baseUrl + "/sendMessageByUpdate" //发送短信（修改）
  },
  school: {
    list: baseUrl + "/selectSchool", //列表
    add: baseUrl + "/insertSchool", //添加
    del: baseUrl + "/deleteSchool", //删除
    edit: baseUrl + "/updateSchool", //删除
    upload: baseUrl + "/upload", //删除
    seeRole: baseUrl + "/seeRole",
    saveRole: baseUrl + "/saveRole",
    delRole: baseUrl + "/delRole"
  },
  //报名新生
  reportStudent: {
    //h-api
    hList: "/h-api/reprot-studet/list", //处理返回数据
    //后台api
    list: baseUrl + "/selectStudentEnroll", //列表
    add: baseUrl + "/writeStudent", //添加
    addTable: baseUrl + "/importStudentErnoll", //添加
    del: baseUrl + "/deleteStudentEnroll", //删除
    edit: baseUrl + "/parentsUpdate", //修改
    find: baseUrl + "/parentsLogin" //查找
  },
  //计划新生
  planStudent: {
    list: baseUrl + "/selectStudent", //列表
    add: baseUrl + "/importStudent", //添加
    del: baseUrl + "/deleteStudent", //删除
    edit: baseUrl + "/updateStudent" //删除
  },
  //学籍管理
  studentStatus: {
    list: baseUrl + "/selectStudent", //列表
    stutus: baseUrl + "/adjustmentStudent", //学籍调整
    importThis: baseUrl + "/insertStudentXJ", //导入学籍库
    edit: baseUrl + "/updateStudentXJ", //修改
    importXjStudent: baseUrl + "/importXjStudent",
    testStudentExcel: baseUrl + "/testStudentExcel",
    updateSchool: baseUrl + "/updateSchool",
    dd_department: baseUrl + "/dd-department/getXjClass",
    selectSchool: baseUrl + "/selectSchool",
    selectParent: baseUrl + "/dd-department/selectParent"
  },
  //日志管理
  logger: {
    //登录
    login: {
      add: baseUrl + "/addloginInfo",
      list: baseUrl + "/selectloginInfo"
    },
    //计划新生
    planStudent: {
      list: baseUrl + "/selectImportLog"
    },
    //报名新生
    reportStudent: {
      list: baseUrl + "/selectStudentLog"
    }
  },
  //教师基本信息管理
  teacherInfo: {
    del: baseUrl + "/deleteTeacherInfo", //删除教师信息
    sel: baseUrl + "/getTeacher", //查看教师信息
    add: baseUrl + "/insertTeacherInfo", //添加教师信息
    edit: baseUrl + "/updateTeacherInfo", //编辑教师信息
    imp: baseUrl + "/importTeacherInfo", //上传导入表格
    pp: baseUrl + "/ppDDUser", //钉钉匹配
    ppTwo: baseUrl + "/twoDdUser", //钉钉二次匹配
    code: baseUrl + "/getCode", //根据省市区获取地区代码
    seeYw: baseUrl + "/business/see",
    saveYw: baseUrl + "/business/save",
    delYw: baseUrl + "/business/del",
    seeRy: baseUrl + "/honor/see",
    saveRy: baseUrl + "/honor/save",
    delRy: baseUrl + "/honor/del",
    seeZd: baseUrl + "/zdstudent/see",
    saveZd: baseUrl + "/zdstudent/save",
    delZd: baseUrl + "/zdstudent/del",
    seeGw: baseUrl + "/postjob/see",
    saveGw: baseUrl + "/postjob/save",
    delGw: baseUrl + "/postjob/del",
    seeJl: baseUrl + "/exchange/see",
    saveJl: baseUrl + "/exchange/save",
    delJl: baseUrl + "/exchange/del"
  },
  courseManagement: {
    setLeiBie: baseUrl + "/setLeiBie",
    deleteLeiBie: baseUrl + "/deleteLeiBie",
    setClassHour: baseUrl + "/setClassHour",
    deleteClassHour: baseUrl + "/deleteClassHour",
    setSubject: baseUrl + "/setSubject",
    deleteSubject: baseUrl + "/deleteSubject",
    setTeacher: baseUrl + "/setTeacher",
    deleteTeacher: baseUrl + "/deleteTeacher",
    seeCurriculumCount: baseUrl + "/seeCurriculumCount",
    seeSubject: baseUrl + "/seeSubject",
    seeClassHour1: baseUrl + "/seeClassHour1",
    intelligenceCourse: baseUrl + "/intelligenceCourse",
    seeClassHour: baseUrl + "/seeClassHour",
    seeOwnerHour: baseUrl + "/seeOwnerHour"
  },
  personalCenter: {
    selectEleCou: baseUrl + "/selectEleCou",
    setEleCate: baseUrl + "/setEleCate",
    selectStudent: baseUrl + "/selectStudent",
    getXjClass: baseUrl + "/dd-department/getXjClass",
    selectCategoryALL: baseUrl + "/selectCategoryALL",
    deleteEleCou: baseUrl + "/deleteEleCou",
    deleteEleCou: baseUrl + "/deleteEleCou",
    getClass: baseUrl + "/dd-department/getClass",
    insertCategory: baseUrl + "/insertCategory",
    deleteCategory: baseUrl + "/deleteCategory",
    selectStatis: baseUrl + "/selectStatis",
    setEleCate1: baseUrl + "/setEleCate1",
    selectEleCate: baseUrl + "/selectEleCate",
    selectEleSchool: baseUrl + "/selectEleSchool",
    setEleSchool: baseUrl + "/setEleSchool",
    teacherSeeCou: baseUrl + "/teacherSeeCou",
    importStatisExcel: baseUrl + "/importStatisExcel"
  },
  //学期管理
  termManage: {
    find: baseUrl + "/getSemester", //查询全部学期
    add: baseUrl + "/insertSemester", //添加全部学期
    edit: baseUrl + "/updateSemester", //编辑全部学期
    del: baseUrl + "/deleteSemester" //删除全部学期
  },
  //成绩类别
  addGradeClass: {
    add: baseUrl + "/insertScoreCategry", //添加成绩类别
    find: baseUrl + "/selectScoreCategry", //查询全部成绩类别
    del: baseUrl + "/deleteScoreCategry", //删除成绩类别
    edit: baseUrl + "/updateScoreCategry", //删除成绩类别
    loginScore: baseUrl + "/loginScore" //删除成绩类别
  },
  //成绩录入
  scoreEntry: {
    // add: baseUrl + "/insertStuScore", //添加成绩录入
    find: baseUrl + "/selectStuScore", //查询全部年级班级
    del: baseUrl + "/deleteStuScore", //删除成绩录入
    edit: baseUrl + "/updateStuScore", //编辑成绩录入
    findPy: baseUrl + "/selectComment", //查看评语库
    updateComment: baseUrl + "/updateComment", //查看评语库
    deleteComment: baseUrl + "/deleteComment", //查看评语库
    insertComment: baseUrl + "/insertComment", //查看评语库
    addEdit: baseUrl + "/saveStuScore", //新增修改成绩录入
    seeSiji: baseUrl + "/seeSiji",
    testStuScore: baseUrl + "/testStuScore"
  },
  //考试管理
  examManage: {
    find: baseUrl + "/selectExam", //查询考试
    add: baseUrl + "/insertExam", //添加考试
    del: baseUrl + "/deleteExam", //删除考试
    edit: baseUrl + "/updateExam", //编辑考试
    findXk: baseUrl + "/selectXueke", //查询所有学科
    editXk: baseUrl + "/updateKsXueke", //修改考试学科
    addXk: baseUrl + "/insertKsXueke",
    deleteKsXueke: baseUrl + "/deleteKsXueke",
    sel: baseUrl + "/selectKsXueke",
    addDd: baseUrl + "/insertScoreRankChange", //添加等第转换
    findDd: baseUrl + "/selectScoreRankChange", //查看等第转换
    findTeacher: baseUrl + "/getTeacherName", //获取所有老师
    findsjly: baseUrl + "/seeSource",
    seeCopy: baseUrl + "/seeCopySource",
    copyKs: baseUrl + "/copyKs",
    copyXueke: baseUrl + "/copyXueke",
    copyNj: baseUrl + "/copyNj",
    batchQc: baseUrl + "/batchQc",
    batchHandle: baseUrl + "/batchHandle",
    selectFinalEvaluate: baseUrl + "/selectFinalEvaluate",
    saveFinalEvaluate: baseUrl + "/saveFinalEvaluate"
  },
  jcManage: {
    add: baseUrl + "/insertPrizepunCate",
    del: baseUrl + "/delPrizepunCate",
    find: baseUrl + "/seePrizepunCate",
    seeSanjiMeui: baseUrl + "/seeSanjiMeui",
    findJc: baseUrl + "/selectMoralPrize",
    saveMoralPrize: baseUrl + "/saveMoralPrize",
    seeJcsz: baseUrl + "/seeJcsz",
    saveJcsz: baseUrl + "/saveJcsz",
    deleteMoralPrize: baseUrl + "/deleteMoralPrize"
  },
  twManage: {
    add: baseUrl + "/insertPhysicalCate",
    find: baseUrl + "/seephysicalCate",
    del: baseUrl + "/delphysicalCate",
    deleteSport: baseUrl + "/deleteSport",
    saveSport: baseUrl + "/saveSport",
    selectSport: baseUrl + "/selectSport",
    seeTwsz: baseUrl + "/seeTwsz",
    saveTwsz: baseUrl + "/saveTwsz",
    DownTwsz: baseUrl + "/DownTwsz",
    delTwsz: baseUrl + "/delTwsz"
  },
  //学科汇总
  xkhz: {
    add: baseUrl + "/insertXueke", //添加
    find: baseUrl + "/selectXueke",
    del: baseUrl + "/deleteXueke",
    edit: baseUrl + "/updateXueke"
  },
  //成绩统计
  gradeTotal: {
    ksSeeScore: baseUrl + "/ksSeeScore",
    seeScore: baseUrl + "/seeScore",
    BjSeeScore: baseUrl + "/BjSeeScore",
    ztjSeeScore: baseUrl + "/ztjSeeScore",
    cjfxSeeScore: baseUrl + "/cjfxSeeScore"
  },
  //成绩单位
  cjdw: {
    add: baseUrl + "/insertScoreUnit", //添加
    find: baseUrl + "/selectScoreUnit",
    del: baseUrl + "/deleteScoreUnit",
    edit: baseUrl + "/updateScoreUnit"
  },
  //成绩单设置
  cjdsz: {
    find: baseUrl + "/selectAchimodule", //添加
    seeDedis: baseUrl + "/seeDedis",
    saveAchimodule: baseUrl + "/saveAchimodule",
    seeAchimodule: baseUrl + "/seeAchimodule",
    finalSeeScore: baseUrl + "/finalSeeScore"
  },
  dtk: {
    find: baseUrl + "/selectTakeTran",
    add: baseUrl + "/insertTakeTran",
    del: baseUrl + "/deleteTakeTran",
    edit: baseUrl + "/updateTakeTran",
    selectTakeStanza: baseUrl + "/selectTakeStanza",
    selectSetTake: baseUrl + "/selectSetTake",
    saveSetTake: baseUrl + "/saveSetTake",
    deleteSetTake: baseUrl + "/deleteSetTake",
    seeTakeTJ: baseUrl + "/seeTakeTJ",
    selectMobileStanza: baseUrl + "/selectMobileStanza",
    seeH5All: baseUrl + "/seeH5All",
    selectTakeTranById: baseUrl + "/selectTakeTranById",
    takeHl: baseUrl + "/takeHl"
  },
  baoxiu: {
    find: baseUrl + "/repairList",
    edit: baseUrl + "/repairSave",
    del: baseUrl + "/repairDelete"
  },
  baoxiuCs: {
    findCs: baseUrl + "/selectRepairCanshu",
    saveRepairCanshu: baseUrl + "/saveRepairCanshu",
    selectDdUsers: baseUrl + "/dd-user/selectDdUsers",
    getNjBj: baseUrl + "/getNjBj",
    reflushXh: baseUrl + "/reflushXh",
    seeMobileScore: baseUrl + "/seeMobileScore",
    repairTj: baseUrl + "/repairTj",
    delRepairCanshu: baseUrl + "/delRepairCanshu",
    delRepairPjqd: baseUrl + "/delRepairPjqd",
    delRepairAddr: baseUrl + "/delRepairAddr"
  }
};
