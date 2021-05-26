<template>
  <div>
    <a-card title="人员权限" class="dep">
      <div slot="extra">
        <a-button
          :disabled="checkedKeys.length === 0"
          size="small"
          icon="check"
          type="primary"
          @click="onSubmit"
          >保存</a-button
        >
      </div>
      <div class="card-box">
        <a-tree
          v-model="checkedKeys"
          checkable
          defaultExpandAll
          checkStrictly
          :treeData="powerTree"
          @select="onSelectPower"
        ></a-tree>
      </div>
    </a-card>
  </div>
</template>

<script>
//接口
import DD from "~/api/dingding";

export default {
  props: {
    reload: Function,
  },
  data() {
    return {
      //选中的数据
      checkedKeys: [],
      //提交的表单数据
      form: {
        id: undefined,
        jurisdiction: "",
      },
      powerTree: [
        {
          title: "新生管理",
          key: "m-1",
          children: [
            {
              title: "新生报到",
              key: "m-1-1",
              children: [
                // {
                //   title: "新生类别(功能)",
                //   key: "p-1-t",
                //   children: [
                //     { title: "添加", key: "p-1-t-add" },
                //     { title: "修改", key: "p-1-t-edit" },
                //     { title: "删除", key: "p-1-t-del" },
                //   ],
                // },
                // {
                //   title: "计划新生",
                //   key: "p-1-l",
                //   children: [
                //     { title: "添加", key: "p-1-l-add" },
                //     { title: "修改", key: "p-1-l-edit" },
                //     { title: "删除", key: "p-1-l-del" },
                //     { title: "上传", key: "p-1-l-upload" },
                //   ],
                // },
                {
                  title: "报名新生",
                  key: "p-1-r",
                  children: [
                    { title: "添加", key: "p-1-r-add" },
                    { title: "修改", key: "p-1-r-edit" },
                    { title: "删除", key: "p-1-r-del" },
                  ],
                },
                // {
                //   title: "表单设置",
                //   key: "p-1-f",
                //   children: [
                //     { title: "添加", key: "p-1-f-add" },
                //     { title: "修改", key: "p-1-f-edit" },
                //     { title: "删除", key: "p-1-f-del" },
                //   ],
                // },
                {
                  title: "审核评定设置",
                  key: "p-1-s",
                  children: [
                    // { title: "添加", key: "p-1-f-add" },
                    // { title: "修改", key: "p-1-f-edit" },
                    // { title: "删除", key: "p-1-f-del" }
                  ],
                },
                {
                  title: "资料审核",
                  key: "p-1-h",
                  children: [
                    // { title: "添加", key: "p-1-f-add" },
                    // { title: "修改", key: "p-1-f-edit" },
                    // { title: "删除", key: "p-1-f-del" }
                  ],
                },
                {
                  title: "新生评定",
                  key: "p-1-x",
                  children: [
                    // { title: "添加", key: "p-1-f-add" },
                    // { title: "修改", key: "p-1-f-edit" },
                    // { title: "删除", key: "p-1-f-del" }
                  ],
                },

                {
                  title: "关闭报名（功能）",
                  key: "p-1-close",
                  children: [
                    // { title: "添加", key: "p-1-f-add" },
                    // { title: "修改", key: "p-1-f-edit" },
                    // { title: "删除", key: "p-1-f-del" }
                  ],
                },
              ],
            },
            {
              title: "智能分班",
              key: "m-1-2",
              children: [],
            },
          ],
        },
        {
          title: "学籍管理",
          key: "m-4",
        },
        {
          title: "系统管理",
          key: "m-2",
          children: [
            // {
            //   title: "学校信息",
            //   key: "m-2-1",
            //   children: []
            // },
            {
              title: "组织架构",
              key: "m-2-2",
              children: [],
            },
            // {
            //   title: "类别管理",
            //   key: "m-2-3",
            //   children: []
            // },
            {
              title: "短信通道",
              key: "m-2-4",
              children: [],
            },
            {
              title: "基本设置",
              key: "m-2-5",
              children: [],
            },
          ],
        },
        {
          title: "日志管理",
          key: "m-3",
          children: [
            {
              title: "登录日志",
              key: "m-3-1",
              children: [],
            },
            {
              title: "操作日志",
              key: "m-3-2",
              children: [],
            },
          ],
        },
      ],
    };
  },
  watch: {
    checkedKeys(nv) {
      // console.log(nv);
    },
  },
  methods: {
    onSelectPower(selectedKeys, info) {
      // console.log("selectedKeys------", selectedKeys);
      // console.log("info------", info);
    },
    //清空数据
    clearForm() {
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = undefined;
        }
      }
      this.checkedKeys = [];
    },
    //赋值表单数据
    setForm(data) {
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = data[key];
        }
      }
      if (data.jurisdiction) {
        this.checkedKeys = data.jurisdiction.split(",");
      }
    },
    //添加权限
    onSubmit() {
      let formData = { ...this.form };
      //   // console.log(this.checkedKeys);
      formData.jurisdiction = this.checkedKeys.checked.join(",");

      DD.userPower(formData)
        .then((res) => {
          this.$message.success("该人员权限保存成功");
          this.reload();
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.card-box {
  height: 80vh;
  overflow-y: auto;
}
</style>
