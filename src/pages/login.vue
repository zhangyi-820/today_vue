<template>
  <div>
    <div class="mainBody">
      <el-card class="loginCard">
        <div slot="header" class="clearfix">
          <span> 用户登录 </span>
        </div>
        <table style="margin: 0 auto; border-spacing: 22px">
          <tr>
            <td>用户名</td>
            <td>
              <el-input v-model="ruleForm.userName" placeholder="请输入用户名">
              </el-input>
            </td>
          </tr>
          <tr>
            <td>密码</td>
            <td>
              <el-input
                type="password"
                v-model="ruleForm.password"
                placeholder="请输入密码"
                @keydown.enter.native="doLogin"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <tr>
                <el-button class="login-button" type="primary" @click="login"
                  >登录</el-button
                >
              </tr>
              <tr>
                <el-button
                  class="login-button"
                  type="primary"
                  @click="userAdd = true"
                  >注册</el-button
                >
              </tr>
            </td>
          </tr>
        </table>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名" },
          { min: 1, max: 15, message: "最长15个字符" }
        ],
        password: [
          { required: true, message: "请输入密码" },
          { min: 1, max: 32, message: "最长32个字符" }
        ]
      }
    };
  },
  methods: {
    //登录函数
    login() {
      console.log("登录");
      if (this.username === null || this.password === null) {
        return;
      }
      // this.user.password = md5(this.user.password);
      let postData = JSON.stringify(this.ruleForm);
      console.log(this.ruleForm);
      this.axios({
        method: "post",
        url: "/api/login",
        data: postData,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (response.data.code == 404) {
            this.$message.error("密码错误或账号不存在");
            return;
          }
          if (response.data.code == 0) {
            this.$cookies.set("token", response.data.content.token);
            this.$cookies.set("userId", response.data.content.userId);
            this.$router.push("/home");
          } else {
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.ruleForm = {
        userId: "",
        password: ""
      };
    },
    //处理关闭窗口

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>

<style>
.mainBody {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}

.loginCard {
  width: 500px;
  height: 400px;
}

.login-button {
  width: 320px;
  margin-top: 8px;
}

.clearfix {
  display: flex;
  justify-content: center;
  font-size: 26px;
  font-weight: 700;
  color: dodgerblue;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.dialog-footer {
  justify-content: center;
  display: flex;
}
</style>
