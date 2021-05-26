<template>
  <div class="contain">
    <el-tabs v-model="activeName">
      <el-tab-pane label="报修设备名称管理" name="first">
        <el-button
          size="small"
          style="margin-bottom: 15px"
          type="primary"
          @click="addDl"
          >+添加大类</el-button
        >
        <el-table
          :header-cell-style="{ 'text-align': 'center' }"
          size="small"
          :data="tableData_left"
          style="width: 100%"
          row-key="id"
          border
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="name" label="报修分类" class-name="cell">
            <template slot-scope="scope">
              <div class="cells">
                <span
                  :class="{
                    rad: scope.row.zmenu == 1,
                    rad1: scope.row.zmenu == 2,
                    rad2: scope.row.zmenu == 3,
                  }"
                ></span>
                <el-input
                  size="mini"
                  :style="{
                    width:
                      scope.row.zmenu == 1
                        ? '400px'
                        : scope.row.zmenu == 2
                        ? '385px'
                        : scope.row.zmenu == 3
                        ? '370px'
                        : '0',
                  }"
                  v-model="scope.row.name"
                  @blur="changeOwner(scope.row)"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="owner" label="大类负责人" width="400">
            <template slot-scope="scope">
              <div>
                <span v-show="scope.row.zmenu != 1">
                  {{ scope.row.owner }}</span
                >
                <el-select
                  style="width: 380px"
                  filterable
                  multiple
                  :multiple-limit="2"
                  size="mini"
                  v-show="scope.row.zmenu == 1"
                  @change="changeOwner(scope.row)"
                  v-model="scope.row.ownerId"
                >
                  <el-option
                    v-for="item in personOpt"
                    :key="item.unionid"
                    :label="item.name"
                    :value="item.unionid"
                  >
                  </el-option>
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="right" width="180">
            <template slot-scope="scope">
              <div class="btnContain">
                <el-button
                  v-show="scope.row.zmenu == 1"
                  size="mini"
                  @click="addZl(scope.row)"
                  >创建子类</el-button
                >
                <el-button
                  v-show="scope.row.zmenu == 2"
                  size="mini"
                  @click="addWp(scope.row)"
                  >创建物品</el-button
                >
                <el-button size="mini" type="danger" @click="delBxFl(scope.row)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="配件管理" name="second">
        <el-button
          size="small"
          style="margin-bottom: 15px"
          type="primary"
          @click="addPj"
          >+添加</el-button
        >
        <el-table
          :header-cell-style="{ 'text-align': 'center' }"
          size="small"
          :data="tableData_center"
          style="width: 40%"
          border
        >
          <el-table-column prop="name" label="配件管理">
            <template slot-scope="scope">
              <el-input
                size="mini"
                v-model="scope.row.name"
                @blur="changePj(scope.row)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="dw" label="单位" width="100">
            <template slot-scope="scope">
              <el-input
                size="mini"
                v-model="scope.row.dw"
                @blur="changePj(scope.row)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="delPj(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="报修地点管理" name="third">
        <el-button
          size="small"
          style="margin-bottom: 15px"
          type="primary"
          @click="addAddress"
          >+添加</el-button
        >
        <el-table
          :header-cell-style="{ 'text-align': 'center' }"
          size="small"
          :data="tableData_right"
          style="width: 30%"
          border
        >
          <el-table-column prop="address" label="报修地点">
            <template slot-scope="scope">
              <el-input
                size="mini"
                v-model="scope.row.address"
                @blur="changeAddress(scope.row)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="mini"
                @click="delAddress(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      :close-on-click-modal="false"
      :title="title"
      :visible.sync="showCj"
      width="30%"
    >
      <el-form label-width="80px">
        <el-form-item :label="title.slice(2, 4) + '名称:'">
          <el-input size="small" v-model="name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="showCj = false">取 消</el-button>
        <el-button type="primary" @click="submitCj">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import main from "~/api/baoxiuCs";
export default {
  computed: {
    //学校id
    schoolId() {
      return this.$store.state.auth.schoolId;
    },
  },
  data() {
    return {
      activeName: "first",
      title: "",
      name: "",
      rowData: {},
      showCj: false,
      tableData_left: [],
      tableData_center: [],
      tableData_right: [],
      personOpt: [],
      personId: "",
    };
  },
  methods: {
    //!删除地址
    delAddress(row) {
      this.$confirm({
        title: "确定删除吗?",
        cancelText: "取消",
        okText: "删除",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .delRepairAddr({ id: row.id })
            .then((res) => {
              this.$message.success("删除成功");
              this.getTable();
            })
            .catch((err) => {
              this.$message.error(err);
            });
        },
      });
    },
    //!删除配件
    delPj(row) {
      this.$confirm({
        title: "确定删除吗?",
        cancelText: "取消",
        okText: "删除",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .delRepairPjqd({ id: row.id })
            .then((res) => {
              this.$message.success("删除成功");
              this.getTable();
            })
            .catch((err) => {
              this.$message.error(err);
            });
        },
      });
    },
    //!删除报修物品分类
    delBxFl(row) {
      this.$confirm({
        title: "确定删除吗?",
        cancelText: "取消",
        okText: "删除",
        okType: "danger",
        centered: true,
        onOk: () => {
          main
            .delRepairCanshu({ id: row.id })
            .then((res) => {
              this.$message.success("删除成功");
              this.getTable();
            })
            .catch((err) => {
              this.$message.error(err);
            });
        },
      });
    },
    //!编辑配件
    changePj(row) {
      let val = {
        schoolId: this.schoolId,
        setRepapjs: [
          {
            dw: row.dw,
            id: row.id,
            name: row.name,
          },
        ],
      };
      main
        .saveRepairCanshu(val)
        .then((res) => {
          this.getTable();
        })
        .catch((err) => {});
    },
    //!编辑地址
    changeAddress(row) {
      let val = {
        schoolId: this.schoolId,
        setAddrs: [
          {
            address: row.address,
            id: row.id,
          },
        ],
      };
      main
        .saveRepairCanshu(val)
        .then((res) => {
          this.getTable();
        })
        .catch((err) => {});
    },
    //!获取钉钉用户列表
    findPerson() {
      let val = {
        pagesize: 10000,
        pagenum: 1,
        schoolId: this.schoolId,
        type: 1,
      };
      main
        .selectDdUsers(val)
        .then((res) => {
          this.personOpt = res.data.list;
        })
        .catch((err) => {});
    },
    //!更改大类负责人
    changeOwner(row) {
      console.log(row);
      let val = {
        schoolId: this.schoolId,
        setRepcates: [
          {
            children: [],
            name: row.name,
            ownerId: row.ownerId ? row.ownerId.join(",") : "",
            id: row.id,
          },
        ],
      };
      main
        .saveRepairCanshu(val)
        .then((res) => {
          this.getTable();
          this.showCj = false;
        })
        .catch((err) => {
          this.$message.error("该报修大类名字已存在！");
          this.getTable();
        });
    },
    //!提交创建子类或物品
    submitCj() {
      let val = {
        schoolId: this.schoolId,
        setRepcates: [
          {
            children: [],
            name: this.name,
            owner: "",
            ownerId: "",
            parentId: this.rowData.id,
          },
        ],
      };
      main
        .saveRepairCanshu(val)
        .then((res) => {
          this.$message.success("创建成功!");
          this.getTable();
          this.showCj = false;
        })
        .catch((err) => {
          this.showCj = false;
          this.$message.error("该报修名字已存在！");
        });
    },
    //!创建子类
    addZl(row) {
      this.name = "";
      this.rowData = row;
      this.showCj = true;
      this.title = "创建子类";
      console.log(row);
    },
    //!创建配件
    addPj() {
      this.tableData_center.push({});
    },
    //!创建地址
    addAddress() {
      this.tableData_right.push({});
    },
    //!创建物品
    addWp(row) {
      this.name = "";
      this.rowData = row;
      this.showCj = true;
      this.title = "创建物品";
      console.log(row);
    },
    //!创建大类
    addDl() {
      this.name = "";
      this.rowData = { id: undefined };
      this.showCj = true;
      this.title = "创建大类";
    },
    //!获取表格数据
    getTable() {
      main
        .findCs({})
        .then((res) => {
          console.log(res);
          this.tableData_left = res.data.setRepcates.map((item) => {
            if (item.ownerId) {
              item.ownerId = item.ownerId.split(",");
            }
            return item;
          });
          this.tableData_center = res.data.setRepapjs;
          this.tableData_right = res.data.setAddrs;
        })
        .catch((err) => {});
    },
  },
  created() {
    this.getTable();
    this.findPerson();
  },
};
</script>

<style scoped>
.contain {
  width: 100%;
  height: 100%;
}
.left {
  width: 100%;
}
.center {
  width: 100%;
}
.right {
  width: 100%;
}
.cell {
  font-size: 25px;
}
.rad {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #0064ff;
  border-radius: 50%;
  margin-right: 10px;
}
.rad1 {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #00bac8;
  border-radius: 50%;
  margin-right: 10px;
}
.rad2 {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #00c801;
  border-radius: 50%;
  margin-right: 10px;
}
/deep/.cell {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.cells {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.btnContain {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>