const fs = require("fs"); //文件模块
const querySql = require("../../db/index"); //数据库配置
const { fsMkdir, fsWriteFile, fsWriteInPosition } = require("../../utils/fs");

/**
 * 获取表格模板
 * @param {*} data
 */
const getTableTemple = async (data, { page, limit, list, total }, name) => {
  let columns = `{ title: "序号",dataIndex: "idx", scopedSlots: { customRender: "idx" }, width: 60},`;
  data.forEach(item => {
    columns += `
          {
            title: "${item.name}",
            dataIndex: "${item.field}"
          },
        `;
  });

  let temple = `
<template>
<div>
  <!-- 查询条件 -->
  <a-form-model style="margin-bottom:10px;" layout="inline" :model="table.select">
    <a-form-model-item>
      <a-input v-model="table.select.username" placeholder="username"></a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary">查询</a-button>
    </a-form-model-item>
    <a-form-model-item>
      <a-button @click="addForm" >新增</a-button>
    </a-form-model-item>
  </a-form-model>

  <!-- 表格 -->
  <a-table
    size="middle"
    bordered
    rowKey="id"
    :rowSelection = "{ selectedRowKeys: table.selectedRowKeys, onChange: onSelectChange }"
    :columns="table.columns"
    :dataSource="table.data"
    :pagination="table.pagination"
    @change="tableChange"
  >
     <template
     slot="idx"
     slot-scope = "text,record,index" >{{table.pagination.current * table.pagination.pageSize - table.pagination.pageSize + index + 1 }}</template>


    <template slot="tool" slot-scope="text,record,index">
      <a-button size="small" type="waring" @click="edit(record)">编辑</a-button>
      <a-button size="small" type="danger" @click="del(record.id,index)">删除</a-button>
    </template>
  </a-table>

  <!-- 表单 -->
  
  <my-drawer-vue
  title="表单"
  :width="400"
  :loading="loading.form"
  :visible="pop.form"
  :onOk="submit"
  @onClose="formClose"
>
  <template slot="contentInfo">
    <table-form ref="tableForm" :btnLoading="btnLoading" />
  </template>
</my-drawer-vue>

</div>
</template>

<script>
//组件
import myDrawerVue from "~/components/common/myDrawer.vue";
 import tableForm from "./components/_form";

//接口
import main from "~/api/${name}";
export default {
    components: {
        myDrawerVue,
        tableForm
    },
    computed: {
        //用户id
        unionid() {
            return this.$store.state.auth.userInfo.unionid;
        }
    },
    data() {
    return {
        pop: {
        form: false
        },
        loading: {
        table: false,
        form: false
        },
        table: {
        select: {
            username: undefined
        },
        selectedRowKeys: [],
        selectedRows: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
            showTotal: total => '共有 ${total} 条数据',
            showLessItems: true,
            showQuickJumper: true,
            showSizeChanger: true, //是否可以改变 pageSize
            pageSizeOptions: ["10", "20", "30", "40"]
        },
        //表头,
        columns: [
            ${columns}
            {
            title: "操作",
            scopedSlots: { customRender: "tool" }
            }
        ],
        //数据
        data: []
        }
    };
    },
    methods: {
    //获取数据
    getTableData() {
        //用户列表
           main
             .list({
               ${page}: this.table.pagination.current,
               ${limit}: this.table.pagination.pageSize
             })
             .then(res => {
                  this.table.data = res.${list};
                  this.table.pagination.total = res.${total};
             })
             .catch(err => {
               this.$message.error(err);
             });
    },
    //页码改变触发
    tableChange({ current, pageSize }) {
        this.table.pagination.current = current;
        this.table.pagination.pageSize = pageSize;
        this.getTableData();
    },
    //重载表格
    reloadTable() {
       if (type) {
           this.table.pagination.current = 1;
       }
       //   this.table.pagination.pageSize = pageSize;
       this.getTableData();
    },
     //获取表格选中的数据
     onSelectChange(selectedRowKeys, rows) {
         // console.log("selectedRowKeys changed: ", selectedRowKeys);
         this.table.selectedRowKeys = selectedRowKeys;
         this.table.selectedRows = rows;
     },
    //编辑数据
    edit(row) {
        // console.log(row);
        this.pop.form = true;
        this.$nextTick(() => {
        this.$refs.tableForm.formType = 2;
        this.$refs.tableForm.clearForm();
        this.$refs.tableForm.setForm(row);
        });
    },
        //新增表单
        addForm() {
        this.pop.form = true;
        this.$nextTick(() => {
            this.$refs.tableForm.formType = 1;
            this.$refs.tableForm.clearForm();
        });
        },
    //#表单相关操作--------
    //删除数据
    del(id, idx) {
        this.$confirm({
            title: "确认删除吗",
            cancelText: "取消",
            okText: "确定",
            okType: "danger",
            centered: true,
            onOk: () => {
                main
                    .del({
                        id,
                        actionUnionid: this.unionid, //用户id
                        actiontime: this.$moment().format("YYYY-MM-DD HH:mm:ss") //操作时间
                    })
                    .then(res => {
                        this.$message.success("删除成功");
                        this.reloadTable(false);
                    })
                    .catch(err => {
                        // console.log("接收到的东西--=-=-=-==", err);
                        this.$message.error(err);
                    });
            }
        });
    },
    //提交表单
    submit() {
        this.$refs.tableForm.onSubmit();
    },
    //关闭表单弹窗
    formClose() {
        this.pop.form = false;
    },
    //按钮加载与不加载
    btnLoading(type) {
        this.loading.form = type;
        if(type===false){
            this.formClose();//关闭表单
            this.reloadTable();//重载表格
        }
    }
    },
    created() {
    //this.getTableData(); //获取列表
    }
};
</script>

<style lang="scss" scoped>
.resize-table-th {
position: relative;
}
.table-draggable-handle {
/* width: 10px !important; */
height: 100% !important;
left: auto !important;
right: -5px;
cursor: col-resize;
touch-action: none;
border: none;
}
</style>
`;

  return temple;
};

/**
 * 获取表单模板
 * @param {*} data 传入的参数
 */
const getFormTemple = async (data, name) => {
  //type(1 输入框,2 下拉框,3 时间选择)
  let formItem = ""; //表单项html
  let formRules = ""; //表单验证规则
  let formData = ""; //表单对象
  let formSettings = ""; //表单设置

  data.forEach(item => {
    let optionItem = "";
    if (item.type === 1) {
      //输入框
      optionItem = `<a-input v-model="form.${item.field}" placeholder="请输入${item.name}"></a-input>`;
    } else if (item.type === 2) {
      //下拉框
      formSettings += `
               ${item.field}:[
                   {n:'选项1',v:1},
                   {n:'选项2',v:2},
                   {n:'选项3',v:3},
               ],
            `;
      optionItem = `
            <a-select v-model="form.${item.field}"   >
                <a-select-option
                v-for="item in setting.${item.field}"
                :key="item.v"
                placeholder="请选择${item.name}"
                >{{item.n}}</a-select-option>
            </a-select>
            `;
    }

    //表单的html
    formItem += `
        <a-form-model-item label="${item.name}" prop="${item.field}">
           ${optionItem}
        </a-form-model-item>
        `;

    //表单的对象
    formData += `
          ${item.field}:undefined,
        `;

    //表单的验证规则
    formRules += `
        ${item.field}: [
            {
              required: true,
              message: "请输入${item.name}",
              trigger: "blur"
            }
          ],
        `;
  });

  let temple = `
    <template>
  <div>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      ${formItem}
      <!-- <a-form-model-item :wrapper-col="{ span: 8, offset: 8 }">
        <a-button type="primary" @click="onSubmit">保存</a-button>
      </a-form-model-item>-->
    </a-form-model>
  </div>
</template>
<script>
//组件


//接口
import main from "~/api/${name}";

export default {
  props: {
    btnLoading:Function,//按钮加载与不加载
  },
  data() {
    return {
      //表单类型(1是新增 , 2是修改)
      formType: 1,
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      dateFormat: "YYYY-MM-DD HH:mm:ss", //日期默认格式
      setting: {
        ${formSettings}
      },
      form: {
        id: undefined,
        ${formData}
      },
      rules: {
        ${formRules}
      }
    };
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    setForm(data) {
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = data[key];
        }
      }
    },
    clearForm() {
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = "";
        }
      }
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
           this.btnLoading(true);


          if (this.formType === 1) {
            //新增
            
            main.add(this.form).then(res=>{
                this.btnLoading(false);

            }).catch(err=>{
                this.$message.error(err);
            })



            
          } else if (this.formType === 2) {
            //修改
             setTimeout(()=>{
                this.btnLoading(false);
            },2000)
          }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
    `;

  return temple;
};

//创建文件
const createFiles = async (name, formTemple, tableTemple) => {
  await fsMkdir(`pages/index/${name}`);
  await fsMkdir(`pages/index/${name}/components`);
  await fsWriteFile(`pages/index/${name}/components/_form.vue`, formTemple);
  await fsWriteFile(`pages/index/${name}/index.vue`, tableTemple);
  return true;
};

//创建api
const writeApi = async (name, data) => {
  try {
    let apiUrl = `,${name}: {
            list:baseUrl+ '/${data.list.url}', //列表
            add: baseUrl+'/${data.add.url}', //添加
            del: baseUrl+'/${data.del.url}', //删除
            edit: baseUrl+'/${data.edit.url}', //删除
        }`;
    fsWriteInPosition("api/apiUrl/index.js", apiUrl);
  } catch (e) {
    throw new Error(e);
  }
};

//创建左侧菜单
const writeMenu = async ({ name, title, icon }) => {
  try {
    let menu = `
        ,{
            key: "${name}",
            title: "${title}",
            icon: '${icon}',
            meta: {
                title: "${title}",
                // affix: true,
            }
        }
        `;
    fsWriteInPosition("store/layout.js", menu);
  } catch (e) {
    throw new Error(e);
  }
};

//创建api文件
const createApiJs = async (name, data) => {
  let apiJs = `
    const request = require('~/utils/request.js');
    const Api = require('~/api/apiUrl/');

    //用户列表
    const list = query => {
        return request({
            url: Api.${name}.list,
            method: '${data.list.method}',
            ${data.list.method === "get" ? "params" : "data"}: query
        });
    };

    const add = query => {
        return request({
            url: Api.${name}.add,
            method: '${data.add.method}',
            ${data.add.method === "get" ? "params" : "data"}: query
        });
    };

    const edit = query => {
        return request({
            url: Api.${name}.edit,
            method: '${data.edit.method}',
            ${data.edit.method === "get" ? "params" : "data"}: query
        });
    };

    const del = query => {
        return request({
            url: Api.${name}.del,
            method: '${data.del.method}',
            ${data.del.method === "get" ? "params" : "data"}: query
        });
    };

    export default {
        list,
        add,
        edit,
        del
    }
    `;
  await fsWriteFile(`api/${name}.js`, apiJs);
  return true;
};

const main = async (req, res, next) => {
  let formData = req.body;

  //获取表格模板
  let tableTemple = await getTableTemple(
    formData.data,
    formData.table,
    formData.setting.name
  );
  //获取表单模板
  let formTemple = await getFormTemple(formData.data, formData.setting.name);

  //创建文件
  await createFiles(formData.setting.name, formTemple, tableTemple);

  await writeApi(formData.setting.name, formData.api); //写入api接口
  await createApiJs(formData.setting.name, formData.api); //创建接口文件
  await writeMenu(formData.setting); //创建接口文件

  // // console.log(formData);

  res.json({ code: 200, message: "success" });
};

module.exports = main;
