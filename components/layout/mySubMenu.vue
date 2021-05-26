<template>
  <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
    <span slot="title">
      <template v-if="menuInfo.icon">
        <a-icon :type="menuInfo.icon" />
      </template>
      <span>{{ menuInfo.title }}</span>
    </span>
    <template v-for="item in menuInfo.children">
      <template v-if="!item.hide">
        <a-menu-item v-if="!item.children" :key="item.key">
          <template v-if="item.icon">
            <a-icon :type="item.icon" />
          </template>
          <span>{{ item.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.key" :menu-info="item" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script>
import { Menu } from "ant-design-vue";
export default {
  name: "SubMenu",
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style lang="scss" >
.ant-menu-vertical .ant-menu-item::after,
.ant-menu-vertical-left .ant-menu-item::after,
.ant-menu-vertical-right .ant-menu-item::after,
.ant-menu-inline .ant-menu-item::after {
  position: absolute;
  top: 50%; /*偏移*/
  right: 12px;
  width: 0px;
  height: 0px;
  border-bottom: 6px solid #298cf7;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  transform: translateY(-50%) rotate(90deg);
  -ms-transform: translateY(-50%) rotate(90deg); /* IE 9 */
  -moz-transform: translateY(-50%) rotate(90deg); /* Firefox */
  -webkit-transform: translateY(-50%) rotate(90deg); /* Safari 和 Chrome */
  -o-transform: translateY(-50%) rotate(90deg); /* Opera */
}
</style>