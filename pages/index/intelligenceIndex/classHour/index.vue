<template>
  <div>
    <a-row :gutter="8">
      <a-col :span="4">
        <a-button type="primary">班级选择</a-button>
        <a-tree :treeData="treeData" checkable @check="onCheck"></a-tree>
      </a-col>
      <a-col :span="20">
        <a-select
          mode="multiple"
          size="default"
          placeholder="选择上课天数"
          style="width: 200px"
          @change="selWeek"
        >
          <a-select-option v-for="(item,index) in week" :key="index+1">{{ item }}</a-select-option>
        </a-select>
        <span>上午</span>
        <a-select size="default" placeholder style="width: 80px" @change="selMorning">
          <a-select-option v-for="(item,index) in morning" :key="index">{{ item }}</a-select-option>
        </a-select>
        <span>下午</span>
        <a-select size="default" placeholder style="width: 80px" @change="selAfternoon">
          <a-select-option v-for="(item,index) in afternoon" :key="index">{{ item }}</a-select-option>
        </a-select>
        <span>晚上</span>
        <a-select size="default" placeholder style="width: 80px" @change="selNight">
          <a-select-option v-for="(item,index) in night" :key="index">{{ item }}</a-select-option>
        </a-select>

        <a-button type="primary" @click="confirmNum">生成节数</a-button>
        <a-button type="primary" @click="publicTime">公共时段</a-button>
        <a-button type="primary" @click="preserve">保存设置</a-button>
        <!-- -------------------------------------------------start表格---------------------------------------------------------------------------- -->
        <el-table
          :data="table"
          border
          style="width: 1231px"
          :row-style="{height:'60px'}"
          @cell-click="clickRow"
          :cell-style="tableCellStyle"
        >
          <el-table-column prop="stanz" label="节数/课期" width="180">
            <template slot-scope="scope">
              <el-input
                v-show="scope.row.show"
                size="small"
                v-model="scope.row.stanz"
                placeholder="请输入节数/课期"
                @blur="yincang(scope.row)"
              ></el-input>

              <span v-show="!scope.row.show">{{scope.row.stanz}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="monday" v-if="showWeek.monday" label="星期一" width="150">
            <template slot-scope="scope">
              <el-input
                v-show="scope.row.show"
                size="small"
                v-model="scope.row.monday"
                placeholder="请输入课程"
                @blur="yincang(scope.row)"
              ></el-input>
              <span v-show="!scope.row.show">{{scope.row.monday}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="tuesday" v-if="showWeek.tuesday" label="星期二" width="150">
            <template slot-scope="scope">
              <el-input
                v-show="scope.row.show"
                size="small"
                v-model="scope.row.tuesday"
                placeholder="请输入课程"
                @blur="yincang(scope.row)"
              ></el-input>
              <span v-show="!scope.row.show">{{scope.row.tuesday}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="wednesday" v-if="showWeek.wednesday" label="星期三" width="150">
            <template slot-scope="scope">
              <el-input
                v-show="scope.row.show"
                size="small"
                v-model="scope.row.wednesday"
                placeholder="请输入课程"
                @blur="yincang(scope.row)"
              ></el-input>
              <span v-show="!scope.row.show">{{scope.row.wednesday}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="thursday" v-if="showWeek.thursday" label="星期四" width="150">
            <template slot-scope="scope">
              <el-input
                v-show="scope.row.show"
                size="small"
                v-model="scope.row.thursday"
                placeholder="请输入课程"
                @blur="yincang(scope.row)"
              ></el-input>
              <span v-show="!scope.row.show">{{scope.row.thursday}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="friday" v-if="showWeek.friday" label="星期五" width="150">
            <template slot-scope="scope">
              <el-input
                v-show="scope.row.show"
                size="small"
                v-model="scope.row.friday"
                placeholder="请输入课程"
                @blur="yincang(scope.row)"
              ></el-input>
              <span v-show="!scope.row.show">{{scope.row.friday}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="saturday" v-if="showWeek.saturday" label="星期六" width="150">
            <template slot-scope="scope">
              <el-input
                v-show="scope.row.show"
                size="small"
                v-model="scope.row.saturday"
                placeholder="请输入课程"
                @blur="yincang(scope.row)"
              ></el-input>
              <span v-show="!scope.row.show">{{scope.row.saturday}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sunday" v-if="showWeek.sunday" label="星期日" width="150">
            <template slot-scope="scope">
              <el-input
                v-show="scope.row.show"
                size="small"
                v-model="scope.row.sunday"
                placeholder="请输入课程"
                @blur="yincang(scope.row)"
              ></el-input>
              <span v-show="!scope.row.show">{{scope.row.sunday}}</span>
            </template>
          </el-table-column>
        </el-table>

        <!-- -------------------------------------------------end表格---------------------------------------------------------------------------- -->
      </a-col>
    </a-row>
    <el-dialog title="提示" :visible.sync="visible" width="30%">
      <span slot="title">
        <span>添加公共时段</span>
      </span>
      <el-select v-model="addPublic1" placeholder="请选择" style="margin-bottom:20px">
        <el-option v-for="(item,index) in options" :key="index" :label="item" :value="item"></el-option>
      </el-select>
      <el-input v-model="addPublic2" placeholder="请输入公共课名称"></el-input>
      <span slot="footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="addPublic">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import http from "@/api/intelligenceIndex";
import main from "@/api/courseManagement";

export default {
  //classweekId:当前排课类别id
  props: ["classweekId"],
  data() {
    return {
      classId: undefined,
      stanzaList: [],
      row: "",
      column: "",
      clazz: undefined, //要设置的班级
      addPublic1: undefined,
      addPublic2: undefined,
      totalNum: undefined,
      options: [],
      visible: false,
      showWeek: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      treeData: [],
      week: [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日",
      ],
      morning: ["0节", "1节", "2节", "3节", "4节", "5节"],
      afternoon: ["0节", "1节", "2节", "3节", "4节", "5节"],
      night: ["0节", "1节", "2节", "3节", "4节", "5节"],
      morningNum: 0,
      afternoonNum: 0,
      nightNum: 0,
      table: [],
    };
  },

  methods: {
    tableCellStyle(row, rowIndex, column) {
      //   if (this.row && this.columnName) {
      //   }
      //   if (this.row === row.row && this.column === row.column) {
      //     return "background-color:#ff3232;";
      //   } else {
      //     return "background-color:#fff;";
      //   }
    },

    // “sort”: 1,
    // “stanz”: “第一节”,
    // “time”: “8:00~8:45”,
    // “type”: 0,
    // “weekName”: “礼拜一”
    // }
    //保存设置
    preserve() {
      this.stanzaList = [];
      let week = ["一", "二", "三", "四", "五", "六", "日"];
      let weeks = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ];

      console.log("当前的table:", this.table);
      this.table.map((item) => {
        for (let i = 1; i < 8; i++) {
          this.stanzaList.push({
            subjectName: item[weeks[i - 1]],
            sort: item.sort,
            stanz: item.stanz,
            time: "",
            type: item.type,
            weekName: "礼拜" + week[i - 1],
            position: item.position,
          });
        }
      });
      console.log("stanzaList", this.stanzaList);
      //调接口
      let classHour = {
        classweekId: this.classweekId,
        clazz: this.clazz,
        stanzaList: this.stanzaList,
      };
      main
        .setClassHour(classHour)
        .then((res) => {
          this.$message.success("课时设置成功");
        })
        .catch((err) => {
          this.$message.error("保存失败", err);
        });
    },
    addPublic() {
      console.log("在第几行插入:", this.addPublic1);
      //   console.log("table", this.table);
      let i = 0;
      let num = 0;
      if (this.addPublic1 == "于第1节课之前添加") {
        this.table.unshift({
          stanz: "",
          monday: this.addPublic2,
          tuesday: this.addPublic2,
          wednesday: this.addPublic2,
          thursday: this.addPublic2,
          friday: this.addPublic2,
          saturday: this.addPublic2,
          sunday: this.addPublic2,
          type: 1,
          position: 0,
          show: false,
        });
      }
      this.table.map((item) => {
        i++;
        if (this.addPublic1 == "于第1节课之前添加") {
        } else if (this.addPublic1[2] === item.stanz[1]) {
          num = i;
          //   console.log("插入下标", num);
          this.table.splice(num, 0, {
            stanz: "",
            monday: this.addPublic2,
            tuesday: this.addPublic2,
            wednesday: this.addPublic2,
            thursday: this.addPublic2,
            friday: this.addPublic2,
            saturday: this.addPublic2,
            sunday: this.addPublic2,
            position: num,
            type: 1,
            show: false,
          });
        }
        // console.log("表格内第几节", item.stanz[1]);
      });
      num = 0;
      this.visible = false;
      this.$message.success("公共时段插入成功");
    },

    //公共时段
    publicTime() {
      this.visible = true;
    },
    //隐藏input
    yincang(row) {
      //   console.log(row);
      row.show = false;
    },
    //点击单元格
    clickRow(row, column, cell, event) {
      console.log("点击1", column);
      row.show = true;
      this.row = row;
      this.column = column;
    },
    //生成节数
    confirmNum() {
      this.table = [];
      this.options = [];
      this.totalNum = this.morningNum + this.afternoonNum + this.nightNum;
      for (let i = 1; i < this.totalNum + 1; i++) {
        this.table.push({
          stanz: "第" + i + "节",
          monday: "",
          tuesday: "",
          wednesday: "",
          thursday: "",
          friday: "",
          saturday: "",
          sunday: "",
          sort: i,
          type: 0,
          show: false,
        });

        this.options.push("于第" + i + "节课之后添加");
      }
      if (this.table) {
        this.options.unshift("于第1节课之前添加");
      }
    },
    selMorning(val) {
      this.morningNum = val;
    },
    selAfternoon(val) {
      this.afternoonNum = val;
    },
    selNight(val) {
      this.nightNum = val;
    },
    selWeek(val) {
      this.showWeek = {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      };
      val.map((item) => {
        if (item == 1) {
          this.showWeek.monday = true;
        } else if (item == 2) {
          this.showWeek.tuesday = true;
        } else if (item == 3) {
          this.showWeek.wednesday = true;
        } else if (item == 4) {
          this.showWeek.thursday = true;
        } else if (item == 5) {
          this.showWeek.friday = true;
        } else if (item == 6) {
          this.showWeek.saturday = true;
        } else if (item == 7) {
          this.showWeek.sunday = true;
        }
      });
    },
    //设置班级的id
    onCheck(checkedKeys, info) {
      this.clazz = checkedKeys.join(",");

      let len = checkedKeys.length;

      if (checkedKeys.length) {
        this.classId = checkedKeys[len - 1].toString();
      }
      main
        .seeClassHour1({ classId: this.classId, id: this.classweekId })
        .then((res) => {
          console.log("res", res);
          this.table = res.data.classTeaLs;
          console.log("table", this.table);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    getTree() {
      http.dep({ isYao: 1 }).then((res) => {
        let tree = this.$deptTree(res.data, {});
        this.treeData = tree;
      });
    },
  },
  created() {
    this.getTree();
  },
};
</script>

<style>
.el-table td,
.el-table th {
  text-align: center;
}
</style>