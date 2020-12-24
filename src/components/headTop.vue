<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-avatar icon="el-icon-user-solid"></el-avatar>
  </div>
</template>

<script>
export default {
  name: "headTop",
  data() {
    return {
      baseImgPath
    };
  },
  created() {
    console.log("tets");
  },
  methods: {}
};
</script>

<style>
/* @import '../style/mixin'; */
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avator {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 37px;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
