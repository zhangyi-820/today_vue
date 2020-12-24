<template>
  <div>
    <el-avatar icon="el-icon-user-solid" size="large"></el-avatar>
    <el-button>
      退出登录
    </el-button>
    <el-dropdown @command="handleCommand" menu-align="start">
      <img class="avator" />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">修改密码</el-dropdown-item>
        <el-dropdown-item command="signout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {};
</script>

<script scoped></script>
