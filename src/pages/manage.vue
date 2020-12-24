<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      router
    >
      <el-menu-item index="/mine">
        <template slot="title"><i class="el-icon-document"></i>我的</template>
      </el-menu-item>
      <el-menu-item index="/tomato">
        <template slot="title"><i class="el-icon-document"></i>番茄</template>
      </el-menu-item>
      <el-menu-item index="/todo">
        <template slot="title"><i class="el-icon-document"></i>待办</template>
      </el-menu-item>
      <el-menu-item index="/statistics">
        <template slot="title"
          ><i class="el-icon-document"></i>统计数据</template
        >
      </el-menu-item>
    </el-menu>
    <router-view class="child-view"></router-view>
    <el-divider content-position="center" style="margin-botton:0"
      >版权所有</el-divider
    >
  </div>
</template>

<script>
import headTop from "../components/headTop.vue";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    headTop
  }
};
</script>

<style>
.child-view {
  height: 520px;
}
</style>
