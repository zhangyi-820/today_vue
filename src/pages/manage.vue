<template>
  <el-container class="main" direction="vertical">
    <el-header class="header">
      <head-top>hdeo </head-top>
    </el-header>
    <el-container class="side-main">
      <el-aside width="200px">
        <el-menu
          :default-active="defaultActive"
          style="min-height: 100%;"
          theme="dark"
          router
        >
          <el-menu-item index="/tomato">
            <template slot="title"
              ><i class="el-icon-document"></i>番茄</template
            >
          </el-menu-item>
          <el-menu-item index="/todo">
            <template slot="title"
              ><i class="el-icon-document"></i>待办</template
            >
          </el-menu-item>
          <el-menu-item index="/statistics">
            <template slot="title"
              ><i class="el-icon-document"></i>统计数据</template
            >
          </el-menu-item>
          <el-menu-item index="/setting">
            <template slot="title"
              ><i class="el-icon-document"></i>设置</template
            >
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main
          ><keep-alive> <router-view></router-view> </keep-alive
        ></el-main>
      </el-container>
    </el-container>
    <el-divider content-position="center">版权所有</el-divider>
    <!-- <el-footer class="footer">Footer</el-footer> -->
  </el-container>
</template>

<script>
import headTop from "../components/headTop.vue";
export default {
  data() {
    return {
      HeadTop
    };
  },
  methods: {},
  components: {
    headTop
  }
};
</script>

<style>
.el-header {
  /* background-color: #b3c0d1; */
  /* color: #333; */
  text-align: center;
  line-height: 60px;
}
.footer {
  text-align: center;
  line-height: 20px;
  margin-bottom: 0px;
  background-color: #333;
}
el-divider {
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  /* text-align: center; */
  /* line-height: 440px; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
  line-height: 200px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.main {
  height: 100%;
  padding: 0px;
  margin: 0px;
}

.side-main {
  height: 520px;
  padding: 0px;
  margin: 0px;
}
</style>
