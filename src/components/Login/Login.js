import md5 from 'js-md5'

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
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    if (response.data.code == 404) {
                        this.$message.error("密码错误或账号不存在");
                        return;
                    }
                    if (response.data.code == 0) {
                        this.token = response.data.content.token;
                        this.$message(response.data.content.token);
                        // this.$router.push('/personInfo')
                    } else {

                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            this.ruleForm = {
                userId: "",
                password: "",
                repeatPassword: "",
            }
        },
        //处理关闭窗口
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    done();
                    this.emptyUserData();
                })
                .catch((_) => {});
        },
        //注册函数
        register() {



            if (this.ruleForm.userId == null || this.ruleForm.password == null ||
                this.repeatPassword == null) {
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
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    console.log("tag");
                    if (response.data.content == false) {
                        this.$message.error("账号已存在");
                        return;
                    }
                    if (response.data.content != null) {
                        this.$message({
                            message: "注册成功",
                            type: "success",
                        });
                        this.$refs.upload.submit();
                        this.emptyUserData();
                    } else {
                        this.$message.error("注册失败");
                    }
                })
                .catch((error) => {
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
                repeatPassword: null,
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
    },
};