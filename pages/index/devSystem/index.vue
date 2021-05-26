<template>
  <div>
    <a-form-model layout="inline" :model="form">
      <a-divider orientation="left">基础配置</a-divider>
      <a-form-model-item label="文件名(英文)">
        <a-input
          v-model="form.setting.name"
          placeholder="请输入文件名(英文)"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="页面名称">
        <a-input
          v-model="form.setting.title"
          placeholder="请输入页面名称"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="菜单图标">
        <a-input
          v-model="form.setting.icon"
          placeholder="请输入图标名称"
        ></a-input>
      </a-form-model-item>
      <a-divider orientation="left">表格配置</a-divider>
      <a-form-model-item label="页码字段">
        <a-input
          v-model="form.table.page"
          placeholder="请输入页码字段"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="页大小字段">
        <a-input
          v-model="form.table.limit"
          placeholder="请输入页码字段"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="返回数据字段">
        <a-input
          v-model="form.table.list"
          placeholder="请输入返回数据字段"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="返回总数字段">
        <a-input
          v-model="form.table.total"
          placeholder="请输入返回总数字段"
        ></a-input>
      </a-form-model-item>
      <a-divider orientation="left">接口配置</a-divider>
      <a-form-model-item label="列表">
        <a-input-group compact>
          <a-select v-model="form.api.list.method">
            <a-select-option value="get">get</a-select-option>
            <a-select-option value="post">post</a-select-option>
          </a-select>
          <a-input
            style="width: 50%"
            placeholder="请输入接口后缀"
            v-model="form.api.list.url"
          />
        </a-input-group>
      </a-form-model-item>
      <a-form-model-item label="新增">
        <a-input-group compact>
          <a-select v-model="form.api.add.method">
            <a-select-option value="get">get</a-select-option>
            <a-select-option value="post">post</a-select-option>
          </a-select>
          <a-input
            style="width: 50%"
            placeholder="请输入接口后缀"
            v-model="form.api.add.url"
          />
        </a-input-group>
      </a-form-model-item>
      <a-form-model-item label="修改">
        <a-input-group compact>
          <a-select v-model="form.api.edit.method">
            <a-select-option value="get">get</a-select-option>
            <a-select-option value="post">post</a-select-option>
          </a-select>
          <a-input
            style="width: 50%"
            placeholder="请输入接口后缀"
            v-model="form.api.edit.url"
          />
        </a-input-group>
      </a-form-model-item>
      <a-form-model-item label="删除">
        <a-input-group compact>
          <a-select v-model="form.api.del.method">
            <a-select-option value="get">get</a-select-option>
            <a-select-option value="post">post</a-select-option>
          </a-select>
          <a-input
            style="width: 50%"
            placeholder="请输入接口后缀"
            v-model="form.api.del.url"
          />
        </a-input-group>
      </a-form-model-item>
      <a-divider orientation="left">字段配置</a-divider>
      <template v-for="(item, idx) in form.data">
        <div :key="idx">
          <a-form-model-item label="字段名称">
            <a-input v-model="item.name" placeholder="字段中文名"></a-input>
          </a-form-model-item>
          <a-form-model-item label="字段参数名">
            <a-input v-model="item.field" placeholder="字段名"></a-input>
          </a-form-model-item>
          <a-form-model-item label="字段类型">
            <a-select
              placeholder="请选择字段类型"
              v-model="item.type"
              class="selectItem"
            >
              <a-select-option
                v-for="(i, index) in settings.type"
                :key="index"
                :value="i.v"
                >{{ i.n }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
          <a-form-model-item v-if="item.type === 2" label>
            <a-button @click="openSetting">详细配置</a-button>
          </a-form-model-item>
          <a-form-model-item>
            <template v-if="idx + 1 === form.data.length">
              <a-button
                type="primary"
                shape="circle"
                icon="plus"
                @click="addItem"
              ></a-button>
            </template>
            <template v-else>
              <a-button
                type="danger"
                shape="circle"
                icon="minus"
                @click="delItem(idx)"
              ></a-button>
            </template>
          </a-form-model-item>
        </div>
      </template>
      <a-form-model-item>
        <a-button type="primary" @click="submit">终极创建</a-button>
      </a-form-model-item>
    </a-form-model>

    <a-drawer
      title="字段配置"
      :width="360"
      @close="pop.settings = false"
      :visible="pop.settings"
      :bodyStyle="{ paddingBottom: '80px' }"
    >
      <a-form-model-item label="是否可搜索">
        <a-input></a-input>
      </a-form-model-item>

      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="pop.settings = false"
          >取消</a-button
        >
        <a-button type="primary">保存</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
//接口
import main from "~/api/files";

export default {
  head() {
    return {
      title: "页面开发",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "My  description"
        }
      ]
    };
  },
  data() {
    return {
      pop: {
        settings: false
      },
      settings: {
        index: 0,
        type: [
          { n: "输入框", v: 1 },
          { n: "下拉选择", v: 2 },
          { n: "时间选择", v: 3 }
        ]
      },
      form: {
        //基本配置
        setting: {
          name: "", //文件名称(英文)
          title: "", //页面标题
          icon: "" //页面图标
        },
        table: {
          page: "pagenum", //页数
          limit: "pagesize", //每页大小
          list: "data.list", //返回的数据字段
          total: "data.total" //返回的总数字段
        },
        //接口配置
        api: {
          list: {
            url: "", //接口地址
            method: "get" //接口类型
          },
          add: {
            url: "", //接口地址
            method: "post" //接口类型
          },
          edit: {
            url: "", //接口地址
            method: "post" //接口类型
          },
          del: {
            url: "", //接口地址
            method: "get" //接口类型
          }
        },
        //表单参数各字段的配置
        data: [
          {
            name: undefined, //字段中文名
            field: undefined, //字段名
            type: undefined, //字段类型
            //配置项
            options: {
              select: {
                filter: false, //是否可搜索
                item: [{ n: "", v: "" }] //下拉选择的item项
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    addItem() {
      this.form.data.push({
        name: undefined, //字段中文名
        field: undefined, //字段名
        type: undefined, //字段类型
        options: {} //配置项
      });
    },
    delItem(idx) {
      this.form.data.splice(idx, 1);
    },
    submit() {
      main
        .add(this.form)
        .then(res => {
          // console.log('安达市多',res);
          this.$message.success("文件以创建成功,请注意查看");
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    openSetting() {
      this.pop.settings = true;
    }
  },
  created() {
    // console.log("我执行了页面开发");
  }
};
</script>

<style lang="scss" scoped>
.selectItem {
  width: 175px;
}
</style>
