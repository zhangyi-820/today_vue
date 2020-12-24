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
              <el-input v-model="ruleForm.userId" placeholder="请输入用户名">
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
      <el-dialog
        title="注册"
        :append-to-body="true"
        :visible.sync="userAdd"
        :before-close="handleClose"
        width="40%"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
          size="small"
          label-width="80px"
        >
          <el-form-item>
            <el-upload
              class="upload-demo"
              ref="upload"
              action="/api/users/upload-user-avatar"
              :data="{ userId: ruleForm.userId }"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="用户昵称" prop="userName">
            <el-input v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="用户账号" prop="userName">
            <el-input v-model="ruleForm.userId"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password">
            <el-input v-model="repeatPassword" type="password"></el-input>
          </el-form-item>
          <el-button @click="cancel()" size="medium">取 消</el-button>
          <el-button @click="register()" type="primary" size="medium"
            >注册</el-button
          >
          <span slot="footer" class="dialog-footer"> </span>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        userId: "",
        userName: "",
        password: "",
        userAvatarUrl: "" //头像的URL
      },
      repeatPassword: "",
      userAdd: false,
      rules: {
        userName: [
          { required: true, message: "请输入用户名" },
          { min: 1, max: 15, message: "最长15个字符" }
        ],
        password: [
          { required: true, message: "请输入密码" },
          { min: 1, max: 32, message: "最长32个字符" }
        ]
      },
      token: "",
      fileList: []
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
        password: "",
        repeatPassword: ""
      };
    },
    //处理关闭窗口
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.emptyUserData();
        })
        .catch(_ => {});
    },
    //注册函数
    register() {
      if (
        this.ruleForm.userId == null ||
        this.ruleForm.password == null ||
        this.repeatPassword == null
      ) {
        this.$message.error("请输入");
        return;
      }
      if (this.repeatPassword != this.ruleForm.password) {
        this.$message.error("密码不一致，请再次确认");
        return;
      }
      // this.ruleForm.password = md5(this.ruleForm.password);
      let postData = JSON.stringify(this.ruleForm);
      this.axios({
        method: "post",
        url: "/api/users",
        data: postData,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          console.log("tag");
          if (response.data.content == false) {
            this.$message.error("账号已存在");
            return;
          }
          if (response.data.content != null) {
            this.$message({
              message: "注册成功",
              type: "success"
            });
            this.$refs.upload.submit();
            this.emptyUserData();
          } else {
            this.$message.error("注册失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.user = {
        userId: null,
        password: null
      };
    },
    //清空注册数据
    emptyUserData() {
      this.userAdd = false;
      this.ruleForm = {
        userId: null, //用户id
        password: null,
        repeatPassword: null
      };
    },
    cancel() {
      this.emptyUserData();
    },
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
