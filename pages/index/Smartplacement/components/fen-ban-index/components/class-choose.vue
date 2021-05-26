<template>
  <div>
    <a-row :gutter="32">
      <a-col :span="9">
        <!-- <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="onChange" /> -->
        <div class="right-border">
          <a-tree
            :multiple="false"
            checkable
            checkStrictly
            v-model="chooseClass"
            :treeData="treeData"
            @select="onSelect"
            @check="onCheck"
          ></a-tree>
        </div>
      </a-col>
      <!-- <a-col :span="15">
        <template v-for="(item, index) in this.list">
          <div v-if="item" :key="index" class="classInfo-main">
            <div class="classInfo">{{ item.name }}</div>
            <div class="close">
              <a-icon @click="delListItem(index)" type="close" />
            </div>
          </div>
        </template>
      </a-col> -->
    </a-row>
  </div>
</template>

<script>
import DD from "~/api/dingding";
import main from "~/api/Smartplacement"; //智能分班主接口
export default {
  props: {
    //获取选中的班级
    getClassList: Function,
    onSubmit: Function,
  },
  data() {
    return {
      defaultCheckedKeys: [],
      chooseClass: [],
      treeData: [],
      user: [],
      realDep: [], //原始数据的部门
      departmentId: "",
      list: [],
    };
  },
  watch: {},
  computed: {
    userList() {
      // // console.log(this.departmentId);

      return this.user.filter(
        (item) => item.departmentId.indexOf(this.departmentId) > -1
      );
    },
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
  },
  methods: {
    getDDuser(id) {
      DD.user({ depmentId: id, schoolId: this.schoolId })
        .then((res) => {
          // // console.log("钉钉人员-----", res);
          res.data.forEach((item) => {
            // item.check = false;
          });
          this.user = res.data;
        })
        .catch((err) => {});
    },
    //获取钉钉部门
    getDDdep() {
      DD.dep({ schoolId: this.schoolId })
        .then((res) => {
          // // console.log("钉钉部门--23---", res);
          let tree = this.$deptTree(res.data, {});
          // // console.log("121212121-------", tree);
          const changePower = (list) => {
            for (let i = 0; i < list.length; i++) {
              if (list[i].name.indexOf("班") > -1) {
                list[i].disabled = false;
              } else {
                list[i].disabled = true;
              }
              if (list[i].children) {
                changePower(list[i].children);
              }
            }
          };
          changePower(tree);
          this.treeData = tree;
        })
        .catch((err) => {});
    },
    getDDdepReal() {
      DD.dep({ schoolId: this.schoolId })
        .then((res) => {
          // // console.log("真正的钉钉部门--23---", res);
          this.realDep = res.data;
        })
        .catch((err) => {});
    },
    onSelect(selectedKeys, info) {
      this.departmentId = selectedKeys[0];
      // // console.log("获取的部门id是-----", this.departmentId);
    },
    onCheck({ checked }) {
      console.log(this.treeData, "this.treeData");
      console.log(this.chooseClass.checked.length, "this.chooseClass");
      console.log(checked, "this.checked");
      if (this.chooseClass.checked.length > 0) {
        this.treeData[0].children.map((item1) => {
          item1.children.map((item2) => {
            item2.children.map((item3) => {
              item3.children.map((item4) => {
                item4.children.map((item5) => {
                  console.log(item5, "item5");
                  if (item5.deptId == checked) {
                    item5.disabled = false;
                  } else {
                    item5.disabled = true;
                  }
                });
              });
            });
          });
        });
      } else {
        this.treeData[0].children.map((item1) => {
          item1.children.map((item2) => {
            item2.children.map((item3) => {
              item3.children.map((item4) => {
                item4.children.map((item5) => {
                  console.log(item5, "item5");
                  item5.disabled = false;
                });
              });
            });
          });
        });
      }
      // // console.log(checked);
      let banList = checked.map((item) => {
        return this.realDep.find(
          (j) => j.deptId == item && j.name.indexOf("班") > -1
        );
      });
      // // console.log(banList);
      this.list = banList.filter((item) => item);
      this.chooseClass = this.list.map((item) => {
        return item.deptId;
      });
      // // console.log(this.list);
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      // // console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.table.selectedRowKeys = selectedRowKeys;
      this.$emit("getPeople", selectedRows);
    },
    setSelect(data) {
      // // console.log("传过来的数据-----", data);
      this.table.selectedRowKeys = data.map((item) => {
        return item.id;
      });
    },
    delListItem(idx) {
      this.list.splice(idx, 1);
      // // console.log("this.list)---------------", this.list);
      let info = this.list.map((item) => {
        return item.deptId;
      });
      // // console.log(info);
      this.chooseClass = info;
    },
    setData(list) {
      // // console.log("-----------------------------------", list);
      //   this.chooseClass = list.map((j) => j.id);
      this.list = list.map((i) => this.realDep.find((j) => j.deptId == i.id));
    },
    getData(oldId, enrollId) {
        
      this.getClassList(this.list);
      let val = {
        oldClassId: oldId,
        classId: this.list[0].deptId,
        enrollId: enrollId,
      };
      console.log(val, "val新接口");
      main
        .updateClass(val)
        .then((res) => {
        //   this.onSubmit();
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getDDuser();
    this.getDDdep();
    this.getDDdepReal();
  },
};
</script>

<style lang="scss" scoped>
.right-border {
  height: 600px;
  overflow-y: auto;
  border-right: 1px solid gainsboro;
}
.classInfo-main {
  position: relative;
  float: left;
  margin-right: 18px;
  margin-top: 6px;
  .classInfo {
    padding: 3px;
    font-size: 13px;
    text-align: center;
    margin-right: 10px;
    min-width: 100px;
    height: 30px;
    line-height: 24px;
    background: rgb(241, 240, 240);
  }
  .close {
    line-height: 30px;
    width: 20px;
    height: 100%;
    background: rgb(241, 240, 240);
    position: absolute;
    bottom: 0px;
    right: -10px;
  }
}
/deep/ .ant-tree-title {
  color: black !important;
}
</style>
