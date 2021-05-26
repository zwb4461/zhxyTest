<template>
  <div>
    <el-tabs v-model="gradeClass" type="card">
      <el-tab-pane label="课表分类" name="1">
        <div class="contain">
          <!-- 列表 -->
          <div
            class="gradeClass_contain_list"
            v-for="(item, index) in dtkList"
            :key="index"
            @click="toDtkClass(item)"
          >
            <div class="contain_top">
              <span style="font-size: 28px; color: #646464">{{
                item.name
              }}</span>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane
        v-for="(item, index) in tabList"
        :key="index"
        :label="item"
        :name="item"
        ><DtkDetail :dtkId="id"></DtkDetail
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
//接口
import main from "~/api/addGradeClass";
//组件
import DtkDetail from "./components";
export default {
  components: { DtkDetail },
  computed: {},
  data() {
    return {
      gradeClass: "1",
      tabList: [],
      dtkList: [],
      //是否锁定。0--未锁定，1--锁定
      locked: 0,
      //当前类别的id
      id: 0,
    };
  },
  methods: {
    //!点击分类跳转对应代调课
    toDtkClass(item) {
      this.locked = item.locked;
      this.id = item.id;
      if (!this.tabList.includes(item.name)) {
        this.tabList.push(item.name);
      }
      this.gradeClass = item.name;
      console.log(this.tabList);
    },
    //!获取排课分类列表
    getDtkList() {
      main
        .find({ schoolId: this.schoolId })
        .then((res) => {
          this.dtkList = res.data;
        })
        .catch((err) => {});
    },
    //!锁定分类
    lock() {},
  },
  created() {
    this.getDtkList();
  },
};
</script>

<style scoped>
.contain {
  padding: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.gradeClass_contain_list {
  width: 300px;
  height: 200px;
  border: 1px solid #c8c8c8;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 20px;
  margin-bottom: 30px;
  position: relative;
}
.contain_top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
}
.item_bottom_btn {
  border-top: 1px solid #e6e6e6;
  border-radius: 0 0 20px 20px;
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  background-color: #fafafa;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style> 