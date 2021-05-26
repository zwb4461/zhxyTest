import Vue from "vue";

//获取最大的父节点
const getParent = (allList, equle = "deptId") => {
  let list = [];
  allList.forEach((obj, idx) => {
    if (!obj.parent) {
      obj.title = obj.name;
      obj.key = obj.deptId;
      obj.children = getTree(1, allList, equle);
      list.push(obj);
    }
  });
  return list;
};

//获取部门的树形数据
const getTree = (pid, list, equle) => {
  //let list = this.settings.treeDdDept;
  // // console.log('进入了--------------');
  //app.tosort(list,"headerSort",true);
  let treeList = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].parent == pid) {
      list[i].title = list[i].name;
      list[i].key = list[i].deptId;
      list[i].children = getTree(list[i].deptId, list);
      // if (cc.length > 0) {
      //     list[i].children = cc;//子部门
      // } else {
      //     list[i].children = [];
      // }
      treeList.push(list[i]);
    }
  }
  return treeList;
};

Vue.prototype.$deptTree = getParent;
