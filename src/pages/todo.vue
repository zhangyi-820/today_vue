<template>
  <div>
    <div>
      <el-col>
        <el-row v-for="todo in todoList" :key="todo">
          <el-card class="todo-card">
            <div style="margin-top:0">
              <p>{{ todo.content }}</p>
            </div>
          </el-card>
        </el-row>
      </el-col>
    </div>
    <div class="block">
      <span class="demonstration">页数较少时的效果</span>
      <el-pagination layout="prev, pager, next" :total="50"> </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userId: 0,
      token: "",
      todoList: [
        { userId: "1", content: "测试1" },
        { userId: "2", content: "测试2" },
        { userId: "3", content: "测试3" },
        { userId: "4", content: "测试4" },
        { userId: "5", content: "测试5" }
      ]
    };
  },
  // created(){
  //   this.userId=this.$cookies.get("userId");
  //   this.token=this.$cookies.get("token");
  //   this.axios({
  //       method: "post",
  //       url: "/api/todos/get-todo-by-userid/"+this.userId,
  //       data: postData,
  //       headers: {
  //         "Content-Type": "application/json",
  //         "authorization":this.userId+"_"+this.token
  //       }
  //     })
  //       .then(response => {
  //         if (response.data.code == 0) {
  //           for(todo in response.data.content){
  //             this.todoList.push(todo);
  //           }
  //         } else {
  //           this.$message.error("似乎出问题了");
  //         }
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  // },
  methods: {}
};
</script>
<style scoped>
.todo-card {
  height: 85px;
  width: 100%;
}

.block {
  height: 80px;
}
</style>
