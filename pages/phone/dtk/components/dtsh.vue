<template>
  <div class="contain">
    <div v-if="isList">
      <el-card
        class="item_contain"
        v-for="(item, index) in tableData"
        :key="index"
      >
        <div class="one_contain">
          <div class="one">
            <div class="one_span"></div>
            <div class="one_span" style="width: 50%">
              <span>{{ item.date }}({{ item.weekName }})</span>
              <span>{{ item.className }} {{ item.stanza }}</span>
            </div>
            <div class="one_span">
              <div
                class="status"
                style="background-color: #ff7100"
                v-if="item.status == 0"
              >
                申请中
              </div>
              <div
                class="status"
                style="background-color: #1890ff"
                v-else-if="item.status == 1"
              >
                待审核
              </div>
              <div
                class="status"
                style="background-color: #28a600"
                v-else-if="item.status == 2"
              >
                审核通过
              </div>
              <div
                class="status"
                style="background-color: #28a600"
                v-else-if="item.status == 4"
              >
                自动通过
              </div>
            </div>
          </div>
          <div class="two">
            <div class="two_span">
              <span>{{ item.oldxkname }}</span>
              <span style="font-size: 18px; color: #0064ff">{{
                item.oldTeaname
              }}</span>
            </div>
            <div class="two_span" style="width: 20%">
              <img v-if="item.type == 0" src="../../../../assets/img/dk.png" />
              <img v-else src="../../../../assets/img/tk.png" />
            </div>
            <div class="two_span">
              <span v-show="item.teaname">{{ item.xkname }}</span>
              <span style="font-size: 18px; color: #0064ff">{{
                item.teaname
              }}</span>
            </div>
          </div>
          <!-- v-show="item.status == 0 || item.status == 1 || item.status == 3" -->
          <div class="bottomEdit">
            <div class="bottomEditLeft" @click="toEdit(item)">
              <span style="color: #0064ff">审核</span>
            </div>
            <div class="line"></div>
            <div class="bottomEditLeft" @click.stop="del(item)">
              <span style="color: #f00b0b">删除</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <!--  -->
    <div v-else>
      <van-tabs v-model="form.type">
        <van-tab title="代课">
          <van-cell-group>
            <div
              style="
                text-align: center;
                color: #000000;
                font-size: 17px;
                padding: 5px 0;
              "
            >
              <span>2020/2021学年 第二学期</span>
            </div>
            <div class="moni"></div>
            <div class="font-bold">
              <span style="margin-left: 15px; font-size: 17px">代课日期:</span>
            </div>
            <div class="inp_contain">
              <div class="inp_contain_inner" style="height: 48px">
                <van-cell :value="form.date" />
              </div>
            </div>
            <div class="moni"></div>
            <div class="font-bold">
              <span style="margin-left: 15px; font-size: 17px">代课班级:</span>
            </div>
            <div class="inp_contain">
              <div class="inp_contain_inner">
                <van-field readonly clickable :value="form.className" />
              </div>
            </div>
            <div class="moni"></div>
            <div class="font-bold">
              <span style="margin-left: 15px; font-size: 17px">代课课次:</span>
            </div>
            <div class="inp_contain">
              <div class="inp_contain_inner">
                <van-field
                  readonly
                  clickable
                  :value="form.stanza"
                  placeholder="选择代课课次"
                />
              </div>
            </div>
            <div class="moni"></div>
            <div class="font-bold">
              <span style="margin-left: 15px; font-size: 17px">代课学科:</span>
            </div>
            <div class="inp_contain">
              <div class="inp_contain_inner">
                <van-field
                  readonly
                  clickable
                  :value="form.xkname"
                  placeholder="选择代课学科"
                />
              </div>
            </div>
            <div class="moni"></div>
            <div class="font-bold">
              <span style="margin-left: 15px; font-size: 17px">原授课人:</span>
            </div>
            <div class="inp_contain">
              <div class="inp_contain_inner">
                <van-field readonly clickable :value="form.oldTeaname" />
              </div>
            </div>
            <div class="moni"></div>
            <div class="font-bold">
              <span style="margin-left: 15px; font-size: 17px">现授课人:</span>
            </div>
            <div class="inp_contain">
              <div class="inp_contain_inner">
                <van-field readonly clickable :value="form.teaname" />
              </div>
            </div>
            <!-- <div class="inp_contain">
              <div class="inp_contain_inner">
                <el-select
                  disabled
                  filterable
                  v-model="form.teaname"
                  placeholder="请选择"
                  @focus="getOpt()"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in XskrOpt"
                    :key="item.teacherUnionid"
                    :label="item.teacherName"
                    :value="item.teacherUnionid"
                  >
                  </el-option>
                </el-select>
              </div>
            </div> -->
            <div class="moni"></div>
            <div class="font-bold">
              <span style="margin-left: 15px; font-size: 17px">授课要求:</span>
            </div>
            <div class="inp_contain">
              <div class="inp_contain_inner">
                <van-field v-model="form.must" placeholder="授课要求" />
              </div>
            </div>
            <div class="moni"></div>
            <div class="font-bold">
              <span style="margin-left: 15px; font-size: 17px">代课原因:</span>
            </div>
            <div class="inp_contain">
              <div class="inp_contain_inner">
                <van-field v-model="form.reason" placeholder="代课原因" />
              </div>
            </div>
            <div class="moni"></div>
          </van-cell-group>
          <div class="topBtn" v-if="form.type == 0">
            <van-button
              type="info"
              style="width: 90%; margin-left: 10px"
              @click="cancel"
              >取消</van-button
            >
            <van-button
              type="primary"
              style="width: 90%; margin-left: 10px"
              @click="pz"
              v-if="form.status != 2 || form.status != 4"
              >审核通过</van-button
            >
          </div>
        </van-tab>
        <van-tab title="调课">
          <van-cell-group>
            <div
              style="
                text-align: center;
                color: #000000;
                font-size: 17px;
                padding: 5px 0;
              "
            >
              <span>2020/2021学年 第二学期</span>
            </div>
            <div class="moni"></div>
            <div class="font-bold">
              <span style="margin-left: 15px; font-size: 17px">调课日期:</span>
            </div>
            <div class="inp_contain">
              <div class="inp_contain_inner" style="height: 48px">
                <van-cell :value="form.date" />
              </div>
            </div>
            <div class="moni"></div>
            <div class="font-bold">
              <span style="margin-left: 15px; font-size: 17px">调课班级:</span>
            </div>
            <div class="inp_contain">
              <div class="inp_contain_inner">
                <van-field
                  readonly
                  clickable
                  :value="form.className"
                  placeholder="选择调课班级"
                />
              </div>
            </div>

            <div class="moni"></div>
            <div class="font-bold">
              <span style="margin-left: 15px; font-size: 17px">调课课次:</span>
            </div>
            <div class="inp_contain">
              <div class="inp_contain_inner">
                <van-field
                  readonly
                  clickable
                  :value="form.stanza"
                  placeholder="选择调课课次"
                />
              </div>
            </div>
            <div class="moni"></div>
            <div class="font-bold">
              <span style="margin-left: 15px; font-size: 17px">调课学科:</span>
            </div>
            <div class="inp_contain">
              <div class="inp_contain_inner">
                <van-field
                  readonly
                  clickable
                  :value="form.xkname"
                  placeholder="选择调课学科"
                />
              </div>
            </div>
            <div class="moni"></div>
            <div class="font-bold">
              <span style="margin-left: 15px; font-size: 17px">原授课人:</span>
            </div>
            <div class="inp_contain">
              <div class="inp_contain_inner">
                <van-field readonly clickable :value="form.oldTeaname" />
              </div>
            </div>
            <div class="moni"></div>
            <div class="font-bold">
              <span style="margin-left: 15px; font-size: 17px">现授课人:</span>
            </div>
            <div class="inp_contain">
              <div class="inp_contain_inner">
                <van-field readonly clickable :value="form.teaname" />
              </div>
            </div>
            <div class="moni"></div>
            <div class="font-bold">
              <span style="margin-left: 15px; font-size: 17px">互调日期:</span>
            </div>
            <div class="inp_contain">
              <div class="inp_contain_inner" style="height: 48px">
                <van-cell :value="form.olddate" />
              </div>
            </div>
            <div class="moni"></div>
            <div class="font-bold">
              <span style="margin-left: 15px; font-size: 17px">互调年级:</span>
            </div>
            <div class="inp_contain">
              <div class="inp_contain_inner">
                <van-field
                  readonly
                  clickable
                  :value="form.oldclassName"
                  placeholder="选择学期年级"
                />
              </div>
            </div>

            <div class="moni"></div>
            <div class="font-bold">
              <span style="margin-left: 15px; font-size: 17px">互调课次:</span>
            </div>
            <div class="inp_contain">
              <div class="inp_contain_inner">
                <van-field
                  readonly
                  clickable
                  :value="form.oldStanza"
                  placeholder="选择互调课次"
                />
              </div>
            </div>
            <div class="moni"></div>
            <div class="font-bold">
              <span style="margin-left: 15px; font-size: 17px">互调学科:</span>
            </div>
            <div class="inp_contain">
              <div class="inp_contain_inner">
                <van-field
                  readonly
                  clickable
                  :value="form.oldxkname"
                  placeholder="选择互调学科"
                />
              </div>
            </div>
            <div class="moni"></div>
            <div class="font-bold">
              <span style="margin-left: 15px; font-size: 17px">调课原因:</span>
            </div>
            <div class="inp_contain">
              <div class="inp_contain_inner">
                <van-field v-model="form.reason" placeholder="调课原因" />
              </div>
            </div>
            <div class="moni"></div>
          </van-cell-group>

          <div class="topBtn" v-if="form.type == 1">
            <van-button
              type="info"
              style="width: 90%; margin-left: 10px"
              @click="cancel"
              >取消</van-button
            >
            <van-button
              type="primary"
              style="width: 90%; margin-left: 10px"
              @click="pz"
              v-if="form.status != 2 || form.status != 4"
              >审核通过</van-button
            >
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import main from "~/api/dtk";
import main2 from "~/api/baoxiuCs";
import { Toast } from "vant";
export default {
  data() {
    return {
      tableData: [],
      isList: true,
      form: {},
    };
  },
  methods: {
    pz() {
      this.form.status = 2;
      main
        .edit(this.form)
        .then((res) => {
          Toast.success("已批准");
          this.getXq();
          this.cancel();
        })
        .catch((err) => {});
    },
    cancel() {
      this.isList = true;
      this.form = {};
    },
    getOpt() {
      let val = {
        type: 5,
        isdk: this.form.type == 1 ? 1 : "",
      };
      main
        .selectTakeStanza(val)
        .then((res) => {
          this.XskrOpt = res.data;
        })
        .catch((err) => {});
    },
    toEdit(item) {
      //  (item.status == 0 || item.status == 1 || item.status == 3) &&item.id

      if (true) {
        this.isList = false;
        main.selectTakeTranById({ id: item.id }).then((res) => {
          this.form = res.data;
        });
        // this.$store.commit("auth/setEditContent", item);
        this.$store.commit("auth/setBxActiveOne", 2);
      } else {
        console.log("当前状态不能修改:", item.status);
        this.isList = true;
        return;
      }
      console.log(item);
      //   this.form = item;
      //   this.$store.commit("auth/setEditContent", item);
      this.$store.commit("auth/setBxActiveOne", 2);
    },
    del(item) {
      if (
        (item.status == 0 || item.status == 1 || item.status == 3) &&
        item.id
      ) {
      } else {
        return;
      }
      this.$confirm({
        title: "确认删除吗",
        cancelText: "取消",
        okText: "确定",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .del({ id: item.id })
            .then((res) => {
              this.$message.success("删除成功!");
              this.getXq();
            })
            .catch((err) => {
              Message({
                message: err,
                type: "error",
                customClass: "mzindex",
              });
            });
        },
      });
    },
    //!获取当前学期
    getXq() {
      main2
        .seeMobileScore({ schoolId: this.schoolId })
        .then((res) => {
          this.cjlbId = res.data.id;
          this.getData();
        })
        .catch((err) => {});
    },
    getData() {
      let val = {
        // isowner: 1,
        cjlbId: this.cjlbId,
        pageSize: 100,
        pageNum: 1,
      };
      main
        .find(val)
        .then((res) => {
          this.tableData = res.data.list;
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getXq();
    this.getOpt();
  },
};
</script>

<style scoped>
.contain {
  padding: 0 15px 15px 15px;
}
.item_contain {
  height: 180px;
  width: 100%;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}
.one_contain {
  width: 100%;
  height: 70px;
  padding: 10px;
}
.one {
  width: 100%;
  height: 100%;
  border: 2px solid #bbbbbb;
  background-color: #ececec;
  border-radius: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
/deep/.el-card__body {
  padding: 0;
}
.one_span {
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.status {
  width: 70px;
  height: 30px;
  border-radius: 20px;
  color: #ffffff;
  text-align: center;
  line-height: 30px;
}
.two {
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.two_span {
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.bottomEdit {
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 0.5px solid #bbbbbb;
}
.bottomEditLeft {
  width: 50%;
  text-align: center;
  font-size: 14px;
}
.line {
  height: 90%;
  border-left: 1px solid #bbbbbb;
  width: 1px;
}

.topBtn {
  width: 100%;
  padding: 15px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  bottom: 0;
  background-color: #ffffff;
}

.inp_contain {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inp_contain_inner {
  width: 100%;
  margin: 10px;
  border: 1px solid #e4e4e4;
  border-radius: 3px;
}
.moni {
  background-color: #ebedf0;
  width: 100%;
  height: 20px;
}
.font-bold {
  font-weight: bold;
  padding-top: 10px;
}
/deep/.el-card.is-always-shadow,
/deep/.el-card.is-hover-shadow:focus,
/deep/.el-card.is-hover-shadow:hover {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 30%);
}
</style>