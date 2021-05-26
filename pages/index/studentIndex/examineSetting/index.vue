<template>
  <div>
    <a-form-model
      class="formClass"
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-model-item
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 18 }"
            label="审核时间"
            prop="checkdatefrom"
          >
            <a-range-picker
              style="width:100%;"
              v-model="setting.val.checkTime"
              :showTime="{ format: 'HH:mm' }"
              format="YYYY-MM-DD HH:mm"
              :placeholder="['审核开始时间', '审核结束时间']"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-form-model-item label="审核人">
        <a-avatar
          class="userItem"
          size="large"
          icon="plus"
          @click="showPopCheck"
        />

        <div
          v-for="(item, index) in setting.val.checkUser.val"
          :key="index"
          class="userItem"
        >
          <a-avatar
            v-if="!item.avatar"
            size="large"
            style="backgroundColor:#2983f7"
            >{{ item.name | lastName }}</a-avatar
          >
          <a-avatar v-else size="large" :src="item.avatar" />
          <div class="itemName">{{ item.name }}</div>
          <div class="close">
            <div class="item">
              <a-icon
                class="icon"
                type="close"
                @click="delItem(setting.val.checkUser.val, index)"
              />
            </div>
          </div>
        </div>
      </a-form-model-item>
      <a-form-model-item label="评定设置">
        <a-switch
          v-model="form.isopen"
          checkedChildren="开启"
          unCheckedChildren="关闭"
        />
      </a-form-model-item>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-model-item
            label="评定模式"
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 18 }"
            prop="delivery"
          >
            <a-select v-model="form.scoringtype">
              <a-select-option :key="0">等第评定</a-select-option>
              <a-select-option :key="1">分项评定</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="7">
          <a-form-model-item :wrapperCol="{ span: 24 }" prop="evaluatedatefrom">
            <a-range-picker
              style="width:100%;"
              v-model="setting.val.examineTime"
              :showTime="{ format: 'HH:mm' }"
              format="YYYY-MM-DD HH:mm"
              :placeholder="['评定开始时间', '评定结束时间']"
            />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row v-if="form.scoringtype === 1" :gutter="16">
        <a-col :span="12">
          <a-form-model-item :wrapperCol="{ span: 18, offset: 6 }">
            <a-row class="textCenter" :gutter="[24, 8]">
              <a-col :span="setting.val.modeItem.length > 1 ? 11 : 12"
                >分项名称</a-col
              >
              <!-- <a-col :span="setting.val.modeItem.length>1?7:8">最低分</a-col> -->
              <a-col :span="setting.val.modeItem.length > 1 ? 10 : 12"
                >最高分</a-col
              >
            </a-row>

            <a-row
              class="textCenter"
              v-for="(item, index) in setting.val.modeItem"
              :key="index"
              :gutter="[24, 8]"
            >
              <a-col :span="setting.val.modeItem.length > 1 ? 11 : 12">
                <a-input v-model="item.item"></a-input>
              </a-col>
              <!-- <a-col :span="setting.val.modeItem.length>1?7:8">
                <a-input-number style="width:100%;" v-model="item.min"></a-input-number>
              </a-col>-->
              <a-col :span="setting.val.modeItem.length > 1 ? 10 : 12">
                <a-input-number
                  style="width:100%;"
                  v-model="item.rank"
                ></a-input-number>
              </a-col>
              <a-col v-if="setting.val.modeItem.length > 1" :span="3">
                <a-button
                  type="danger"
                  size="small"
                  shape="circle"
                  icon="minus"
                  @click="delModeItem(index)"
                />
              </a-col>
            </a-row>
            <a-row :gutter="[24, 8]">
              <a-col :span="setting.val.modeItem.length > 1 ? 21 : 24">
                <a-button @click="addModeItem" type="dashed" block>
                  <a-icon type="plus-circle" />添加
                </a-button>
              </a-col>
            </a-row>
          </a-form-model-item>
        </a-col>
        <a-col :span="7">
          <a-form-model-item :wrapperCol="{ span: 24 }">
            <a-row class="textCenter" :gutter="[24, 8]">
              <a-col :span="24">对应分值</a-col>
            </a-row>
            <a-row>
              <a-col :span="2">A</a-col>
              <a-col :span="22">
                <a-slider v-model="setting.val.A.val" :marks="aMarks" range />
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="2">B</a-col>
              <a-col :span="22">
                <a-slider
                  v-model="setting.val.B.val"
                  :marks="bMarks"
                  @change="Bchange"
                  range
                />
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="2">C</a-col>
              <a-col :span="22">
                <a-slider
                  v-model="setting.val.C.val"
                  :marks="cMarks"
                  @change="Cchange"
                  range
                />
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="2">D</a-col>
              <a-col :span="22">
                <a-slider
                  v-model="setting.val.D.val"
                  :marks="dMarks"
                  @change="Dchange"
                  range
                />
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="2">E</a-col>
              <a-col :span="22">
                <a-slider
                  v-model="setting.val.E.val"
                  :marks="eMarks"
                  @change="Echange"
                  range
                />
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="2">F</a-col>
              <a-col :span="22">
                <a-slider
                  v-model="setting.val.F.val"
                  :marks="fMarks"
                  @change="Fchange"
                  range
                />
              </a-col>
            </a-row>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-form-model-item label="评定人">
        <div class="userItem">
          <a-avatar size="large" icon="plus" @click="showPopExamine" />
        </div>
        <div
          v-for="(item, index) in setting.val.examineUser.val"
          :key="index"
          class="userItem"
        >
          <a-avatar
            v-if="!item.avatar"
            size="large"
            style="backgroundColor:#2983f7"
            >{{ item.name | lastName }}</a-avatar
          >
          <a-avatar v-else size="large" :src="item.avatar" />
          <div class="itemName">{{ item.name }}</div>
          <div class="close">
            <div class="item">
              <a-icon
                class="icon"
                type="close"
                @click="delItem(setting.val.examineUser.val, index)"
              />
            </div>
          </div>
        </div>
      </a-form-model-item>
      <!-- v-if="activing" -->
      <a-form-model-item
        v-if="activing"
        style="text-align:right;"
        :wrapperCol="{ span: 3 }"
      >
        <a-button type="primary" @click="onSubmit">保存设置</a-button>
      </a-form-model-item>
    </a-form-model>

    <!-- 选择审核人员 -->
    <a-modal v-model="pop.checkUser" title="选择人员" width="1050px">
      <choose-people ref="checkUser" @getPeople="getCheckUser" />
      <template slot="footer">
        <a-button key="back">取消</a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading.choosePeople"
          :disabled="setting.val.checkUser.pending.length === 0"
          @click="okCheckUser"
        >
          <template v-if="setting.val.checkUser.pending.length > 0"
            >（{{ setting.val.checkUser.pending.length }}）</template
          >确定
        </a-button>
      </template>
    </a-modal>
    <!-- 选择评定人员 -->
    <a-modal v-model="pop.examineUser" title="选择人员" width="1050px">
      <choose-people ref="examineUser" @getPeople="getExamineUser" />
      <template slot="footer">
        <a-button key="back">取消</a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading.examineUser"
          :disabled="setting.val.examineUser.pending.length === 0"
          @click="okExamineUser"
        >
          <template v-if="setting.val.examineUser.pending.length > 0"
            >（{{ setting.val.examineUser.pending.length }}）</template
          >确定
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
//组件
import choosePeople from "./components/choose-people.vue";

//接口
import main from "~/api/examineSetting";
//钉钉用户
import DD from "~/api/dingding";

export default {
  components: {
    choosePeople
  },
  props: {
    activing: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      formType: 1,
      labelCol: { span: 3 },
      wrapperCol: { span: 14 },
      other: "",
      loading: {
        choosePeople: false,
        examineUser: false
      },
      pop: {
        checkUser: false,
        examineUser: false
      },
      setting: {
        val: {
          checkTime: [],
          examineTime: [],
          checkUser: {
            val: [], //审核人员
            pending: [] //
          },
          examineUser: {
            val: [], //评分人员
            pending: [] //
          },
          modeItem: [{ id: "", item: "", rank: 0, enrollId: "" }],
          A: {
            val: [90, 100],
            max: 100,
            min: 90
          },
          B: {
            val: [80, 89],
            max: 89,
            min: 80
          },
          C: {
            val: [70, 79],
            max: 79,
            min: 70
          },
          D: {
            val: [50, 69],
            max: 69,
            min: 0
          },
          E: {
            val: [30, 49],
            max: 69,
            min: 0
          },
          F: {
            val: [0, 29],
            max: 69,
            min: 0
          }
        }
      },
      form: {
        checkdatefrom: "", //审核开始时间
        checkdateto: "", //审核结束时间
        isopen: true, //是否开启评分
        scoringtype: 0, //评定模式
        evaluatedatefrom: "", //评分开始时间
        evaluatedateto: "" //评分结束时间
      },
      scorings: [
        { id: "", enrollId: "", grade: "A", highest: 0, minimum: 0 },
        { id: "", enrollId: "", grade: "B", highest: 0, minimum: 0 },
        { id: "", enrollId: "", grade: "C", highest: 0, minimum: 0 },
        { id: "", enrollId: "", grade: "D", highest: 0, minimum: 0 },
        { id: "", enrollId: "", grade: "E", highest: 0, minimum: 0 },
        { id: "", enrollId: "", grade: "F", highest: 0, minimum: 0 }
      ],
      rules: {
        checkdatefrom: [
          { required: true, message: "请选择时间", trigger: "blur" }
        ],
        region: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change"
          }
        ],
        date1: [
          { required: true, message: "Please pick a date", trigger: "change" }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "Please select at least one activity type",
            trigger: "change"
          }
        ],
        resource: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please input activity form",
            trigger: "blur"
          }
        ]
      }
    };
  },
  filters: {
    lastName(value) {
      let list = value.split("");
      let length = list.length;
      return list[length - 2] + list[length - 1];
    }
  },
  watch: {
    "setting.val.checkTime"(nv) {
      if (nv.length > 0) {
        this.form.checkdatefrom = this.$moment(nv[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.form.checkdateto = this.$moment(nv[1]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        this.form.checkdatefrom = "";
        this.form.checkdateto = "";
      }
    },
    "setting.val.examineTime"(nv) {
      if (nv.length > 0) {
        this.form.evaluatedatefrom = this.$moment(nv[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        this.form.evaluatedateto = this.$moment(nv[1]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        this.form.evaluatedatefrom = "";
        this.form.evaluatedateto = "";
      }
    },
    "setting.val.A.val"(nv) {
      this.setting.val.B.val = this.getMaxMin(this.setting.val.B.val, nv[0]);
    },
    "setting.val.B.val"(nv) {
      this.setting.val.C.val = this.getMaxMin(this.setting.val.C.val, nv[0]);
    },
    "setting.val.C.val"(nv) {
      this.setting.val.D.val = this.getMaxMin(this.setting.val.D.val, nv[0]);
    },
    "setting.val.D.val"(nv) {
      this.setting.val.E.val = this.getMaxMin(this.setting.val.E.val, nv[0]);
    },
    "setting.val.E.val"(nv) {
      this.setting.val.F.val = this.getMaxMin(
        this.setting.val.F.val,
        nv[0],
        false
      );
    }
  },
  computed: {
    aMarks() {
      return this.getMarks(this.setting.val.A.val);
    },
    bMarks() {
      return this.getMarks(this.setting.val.B.val);
    },
    cMarks() {
      return this.getMarks(this.setting.val.C.val);
    },
    dMarks() {
      return this.getMarks(this.setting.val.D.val);
    },
    eMarks() {
      return this.getMarks(this.setting.val.E.val);
    },
    fMarks() {
      return this.getMarks(this.setting.val.F.val);
    },
    unionid() {
      return this.$store.state.auth.userInfo.unionid;
    },
    enrollId() {
      return this.$store.state.auth.enrollId;
    },
    //学校id
    schoolId: {
      get() {
        return this.$store.state.auth.schoolId;
      },
      set() {}
    }
  },
  methods: {
    getMarks(list) {
      let marks = {};
      marks[list[0] + ""] = list[0];
      marks[list[1] + ""] = list[1];
      return marks;
    },
    getMaxMin(list, val, type = true) {
      let max = val - 1;
      let step = list[1] - list[0];
      //   // console.log(step);
      // this.setting.val.D.val[0] = 0;
      if (type) return [max - step, max];
      return [0, max];
    },
    //添加分项item
    addModeItem() {
      this.setting.val.modeItem.push({
        id: "",
        item: "",
        rank: 0,
        enrollId: ""
      });
    },
    delModeItem(idx) {
      this.setting.val.modeItem.splice(idx, 1);
    },

    Bchange(val) {
      this.setting.val.A.val = [val[1] + 1, 100];
    },
    Cchange(val) {
      if (val[1] < this.setting.val.B.val[1]) {
        this.setting.val.B.val = [val[1] + 1, this.setting.val.B.val[1]];
      } else {
        this.setting.val.C.val[1] = this.setting.val.B.val[0];
      }
    },
    Dchange(val) {
      if (val[1] < this.setting.val.C.val[1]) {
        this.setting.val.C.val = [val[1] + 1, this.setting.val.C.val[1]];
      } else {
        this.setting.val.D.val[1] = this.setting.val.C.val[0];
      }
    },
    Echange(val) {
      if (val[1] < this.setting.val.D.val[1]) {
        this.setting.val.D.val = [val[1] + 1, this.setting.val.D.val[1]];
      } else {
        this.setting.val.E.val[1] = this.setting.val.D.val[0];
      }
    },
    Fchange(val) {
      if (val[1] < this.setting.val.E.val[1]) {
        this.setting.val.E.val = [val[1] + 1, this.setting.val.E.val[1]];
      } else {
        this.setting.val.F.val[1] = this.setting.val.E.val[0];
      }
    },
    delItem(list, idx) {
      list.splice(idx, 1);
    },
    //#显示审核人员弹窗##################################
    //显示审核人员弹窗
    showPopCheck() {
      this.pop.checkUser = true;
      this.$nextTick(() => {
        this.setting.val.checkUser.pending = [
          ...this.setting.val.checkUser.val
        ];
        this.$refs["checkUser"].setSelect(this.setting.val.checkUser.val);
      });
    },
    //获取评定人员
    getCheckUser(data) {
      // // console.log("获取的数据", data);
      this.setting.val.checkUser.pending = data;
    },
    //选择人员完毕
    okCheckUser() {
      this.setting.val.checkUser.pending.forEach(item => {
        let list = this.setting.val.checkUser.val.find(i => i.id === item.id);
        if (!list) {
          this.setting.val.checkUser.val.push(item);
        }
      });
      this.pop.checkUser = false;
    },
    //#评定人员##################################
    //显示评定人员弹窗
    showPopExamine() {
      this.pop.examineUser = true;
      this.$nextTick(() => {
        this.setting.val.examineUser.pending = [
          ...this.setting.val.examineUser.val
        ];
        this.$refs["examineUser"].setSelect(this.setting.val.examineUser.val);
      });
    },
    //获取评定人员
    getExamineUser(data) {
      // // console.log("获取的数据", data);
      this.setting.val.examineUser.pending = data;
    },
    //选择评定人员完毕
    okExamineUser() {
      this.setting.val.examineUser.pending.forEach(item => {
        let list = this.setting.val.examineUser.val.find(i => i.id === item.id);
        if (!list) {
          this.setting.val.examineUser.val.push(item);
        }
      });
      this.pop.examineUser = false;
    },
    //获取详情
    async getInfo() {
      //获取钉钉用户
      //   let user = await DD.user();
      //获取表单数据
      let { data } = await main.list({ enrollId: this.enrollId });
      let { enroll, enrollItems, userItems, userChecks, scorings } = data;
      if (enroll) {
        // let checkUser = await main.ddUser({ ids: [410, 411], user: user.data });
        // let examineUser = await main.ddUser({
        //   ids: [413, 414, 415],
        //   user: user.data
        // });

        for (const key in this.form) {
          if (this.form.hasOwnProperty(key)) {
            if (key === "isopen") {
              this.form.isopen = enroll.isopen === 1 ? true : false;
            } else {
              this.form[key] = enroll[key];
            }
          }
        }
        if (this.form.checkdatefrom) {
          this.setting.val.checkTime = [
            this.$moment(this.form.checkdatefrom),
            this.$moment(this.form.checkdateto)
          ];
        }

        if (this.form.evaluatedatefrom) {
          this.setting.val.examineTime = [
            this.$moment(this.form.evaluatedatefrom),
            this.$moment(this.form.evaluatedateto)
          ];
        }

        // // console.log("单项数组是-------", enrollItems);
        this.setting.val.modeItem = enrollItems;
        this.setting.val.checkUser.val = userChecks;
        this.setting.val.checkUser.pending = userChecks;
        this.setting.val.examineUser.val = userItems;
        this.setting.val.examineUser.pending = userItems;
        // // console.log("分数项是------", scorings);
        if (scorings.length > 0) {
          if (scorings.findIndex(j => j.grade == "E") == -1) {
            this.scorings = [
              ...scorings,
              ...[
                { id: "", enrollId: "", grade: "E", highest: 0, minimum: 0 },
                { id: "", enrollId: "", grade: "F", highest: 0, minimum: 0 }
              ]
            ];
          }
          for (let item of scorings) {
            this.setting.val[item.grade].val = [item.minimum, item.highest];
          }
        }
        this.formType = 2;
      } else {
        this.formType = 1;
      }
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          //   alert("submit!");
          let checkIds = this.setting.val.checkUser.val.map(item => item.id);

          let enroll = { ...this.form };
          enroll.id = this.enrollId; //类别id
          enroll.schoolId = this.schoolId; //学校id
          enroll.isopen = enroll.isopen ? 1 : 0;

          let scorings = this.scorings.map(item => {
            let obj = { ...item };
            obj.highest = this.setting.val[obj.grade].val[1];
            obj.minimum = this.setting.val[obj.grade].val[0];
            obj.enrollId = this.enrollId;
            delete obj.id;
            return obj;
          });

          let itemIds = this.setting.val.examineUser.val.map(item => item.id);

          let itemList = this.setting.val.modeItem.map(item => {
            let obj = { ...item };
            obj.enrollId = this.enrollId;
            return obj;
          });

          let formData = {
            checkIds,
            enroll,
            itemIds,
            itemList,
            scorings
          };

          // // console.log("获得的表单为--------", formData);

          main
            .add(formData)
            .then(res => {
              this.$message.success("保存成功");
            })
            .catch(err => {
              this.$message.error(err);
            });
          //   if (this.formType === 1) {
          //   } else if (this.formType === 2) {
          //     main
          //       .edit(formData)
          //       .then(res => {
          //         this.$message.success("保存成功");
          //       })
          //       .catch(err => {
          //         this.$message.error(err);
          //       });
          //   } else {
          //     this.$message.error("未知的提交方式");
          //   }
        } else {
          // // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  },
  created() {
    // // console.log("-----------");
  }
};
</script>
<style lang="scss" scoped>
.formClass {
  width: 1200px;
  //   overflow-x: auto;
}
.textCenter {
  text-align: center;
}
.userItem {
  position: relative;
  display: inline-block;
  margin-right: 12px;
  .itemName {
    width: 60px;
    font-size: 14px;
    text-align: center;
    position: absolute;
    // border: 1px solid black;
    left: -10px;
    bottom: -32px;
  }
  .close {
    position: absolute;
    right: -6px;
    top: -2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #cccccc;
    .item {
      position: relative;
      .icon {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 14px;
        height: 14px;
        color: white;
      }
    }
  }
}
</style>
