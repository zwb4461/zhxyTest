const getAllways = list => {
  let a = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].alwaysShow) {
      a.push(list[i]);
    }
    if (list[i].children) {
      let c = getAllways(list[i].children);
      a = [...a, ...c];
    }
  }
  return a;
};

export default function({ store, redirect, route }) {
  //页面tab留存
  let AllwaysList = getAllways(store.state.layout.menuList);
  if (AllwaysList.length > 0) {
    for (let i = 0; i < AllwaysList.length; i++) {
      store.dispatch("tagsView/addView", {
        ...{
          name: AllwaysList[i].key,
          path: `/${AllwaysList[i].key}`,
          fullPath: `/${AllwaysList[i].key}`
        },
        ...AllwaysList[i]
      });
    }
  }

  // // console.log('页面进入--------',AllwaysList[0]);
  route.power = { power: ["add", "edit", "del"] };
  //重定向页面
  if (route.fullPath === "/") {
    if (AllwaysList.length > 0) {
      let { key } = AllwaysList[0];
      return redirect(`/${key}`);
    }
  }
}
