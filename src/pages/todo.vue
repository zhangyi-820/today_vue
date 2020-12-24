<template class="main">
  <div>
    <el-form :inline="true" class="demo-form-inline" size="medium">
      <el-form-item label="优先级" size="mini">
        <el-select placeholder="请选择" size="small">
          <el-option label="不限" value="-1"></el-option>
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="query()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addTodoShow = true">添加</el-button>
      </el-form-item>
    </el-form>

    <!-- todo信息 -->

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="todoId" label="编号"> </el-table-column>
      <el-table-column prop="theme" label="主题"> </el-table-column>
      <el-table-column
        prop="todoType"
        label="类型"
        :formatter="typeMapping"
      ></el-table-column>
      <el-table-column prop="todoProgressRate" label="进度"> </el-table-column>
      <el-table-column
        prop="repeatType"
        label="重复类型"
        :formatter="repeatTypeMapping"
      >
      </el-table-column>
      <el-table-column prop="todoState" label="状态" :formatter="stateMapping">
      </el-table-column>
      <el-table-column
        prop="priority"
        label="优先级"
        :formatter="priorityMapping"
      >
      </el-table-column>
      <el-table-column prop="beginTime" label="开始时间">
        <template slot-scope="scope"
          ><span>{{ operateTime(scope.row.beginTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="截止时间"
        ><template slot-scope="scope"
          ><span>{{ operateTime(scope.row.endTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="totalPage">
    </el-pagination>

    <!-- 新增Todo -->
    <el-form
      ref="todo"
      :model="todo"
      label-width="70px"
      size="medium"
      :rules="rules"
    >
      <el-dialog
        title="TodoItem"
        :append-to-body="true"
        :visible.sync="addTodoShow"
        :before-close="handleClose"
      >
        <el-form-item label="待办主题">
          <el-input placeholder="请输入主题" v-model="todo.theme"></el-input>
        </el-form-item>
        <el-form-item label="待办类型">
          <el-select v-model="todo.type" placeholder="请选择">
            <el-option label="学习" value="2"></el-option>
            <el-option label="生活" value="1"></el-option>
            <el-option label="工作" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优先级">
          <el-select v-model="todo.priority" placeholder="请选择">
            <el-option label="高" value="2"></el-option>
            <el-option label="中" value="1"></el-option>
            <el-option label="低" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="截止时间">
          <el-date-picker
            v-model="todo.DDL"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="待办内容">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="todo.content"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="addTodo">添加</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-dialog>
    </el-form>

    <!-- 查看Todo  -->
    <el-form
      ref="selectedTodo"
      :model="selectedTodo"
      label-width="70px"
      size="medium"
      :rules="rules"
    >
      <el-dialog
        title="TodoItem"
        :append-to-body="true"
        :visible.sync="todoInfoShow"
      >
        <el-form-item label="待办主题">
          <el-input
            placeholder="请输入主题"
            v-model="selectedTodo.theme"
          ></el-input>
        </el-form-item>
        <el-form-item label="待办类型">
          <el-select v-model="selectedTodo.type" placeholder="请选择">
            <el-option label="学习" value="2"></el-option>
            <el-option label="生活" value="1"></el-option>
            <el-option label="工作" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优先级">
          <el-select v-model="selectedTodo.priority" placeholder="请选择">
            <el-option label="高" value="2"></el-option>
            <el-option label="中" value="1"></el-option>
            <el-option label="低" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="timeRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="待办内容">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="selectedTodo.content"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="updateTodo">修改</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todoInfoShow: false,
      queryCondition: null,
      addTodoShow: false,
      currentPage: 1,
      userId: Number,
      token: String,
      totalPage: Number,
      timeRange: [],

      selectedTodo: {
        todoId: 1,
        theme: "test1",
        scheduleId: 1,
        userId: 1,
        todoProgressRate: 100, //待办完成进程进度百分比（０％－１００％）
        repeatType: 0, //待办重复类型
        todoState: 0, //待办状态
        todoType: 1, //待办类型
        priority: 2, //待办优先级
        beginTime: Date, //开始时间
        endTime: Date, //DDL
        content: "test todo module" //待办内容
      },

      todo: {
        todoId: 0,
        theme: String,
        scheduleId: 0,
        userId: 0,
        todoProgressRate: 0, //待办完成进程进度百分比（０％－１００％）
        repeatType: 0, //待办重复类型
        todoState: 0, //待办状态
        todoType: 0, //待办类型
        priority: 0, //待办优先级
        beginTime: Date, //开始时间
        endTime: Date, //DDL
        content: String //待办内容
      },

      tableData: [],
      rules: [],
      todoStates: [
        { label: "正在进行", value: 1 },
        {
          label: "已完成",
          value: 0
        }
      ],
      priorities: [
        { label: "高", value: 2 },
        { label: "中", value: 1 },
        { label: "低", value: 0 }
      ],
      todoTypes: [
        { label: "学习", value: 2 },
        { label: "生活", value: 1 },
        { label: "工作", value: 0 }
      ],
      repeatTypes: [
        { label: "每天", value: 1 },
        { label: "一次", value: 0 }
      ]
    };
  },
  created() {
    console.log("test");
    this.userId = this.$cookies.get("userId");
    this.token = this.$cookies.get("token");
    this.getTodoByUserId();
    this.getTodoNumByUserId();
  },
  methods: {
    handleEdit(index, row) {
      this.todoInfoShow = true;
    },
    handleDelete(index, row) {},
    handleClick(row) {
      console.log(row);
    },
    addTodo() {},
    handleClose() {
      this.todo = {
        todoId: 0,
        theme: String,
        scheduleId: 0,
        userId: 0,
        todoProgressRate: 0, //待办完成进程进度百分比（０％－１００％）
        repeatType: 0, //待办重复类型
        todoState: 0, //待办状态
        todoType: 0, //待办类型
        priority: 0, //待办优先级
        beginTime: Date, //开始时间
        endTime: Date, //DDL
        content: String //待办内容
      };
      if (this.addTodoShow) {
        this.addTodoShow = false;
      }
      if (this.todoInfoShow) {
        this.todoInfoShow = false;
      }
    },
    getTodoByUserId() {
      this.axios({
        method: "get",
        url:
          "/api/todos/get-todo-by-userid/" + this.userId + "?page=0&pageSize=5",
        headers: {
          "Content-Type": "application/json",
          authorization: this.userId + "_" + this.token
        }
      })
        .then(response => {
          if (response.data.code == 0) {
            for (let i = 0; i < response.data.content.length; i++) {
              this.tableData.push(response.data.content[i]);
            }
          } else {
            this.$message.error("似乎出错了");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTodoNumByUserId() {
      console.log("get num");
      this.axios({
        method: "get",
        url: "/api/todos/get-todonum-by-userid/" + this.userId,
        headers: {
          "Content-Type": "application/json",
          authorization: this.userId + "_" + this.token
        }
      })
        .then(response => {
          if (response.data.code == 0) {
            this.totalPage = response.data.content / 5 + 1;
          } else {
            this.$message.error("似乎出错了");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateTodo() {},
    repeatTypeMapping(row, column) {
      return this.repeatTypes[row.repeatType].label;
    },
    stateMapping(row, column) {
      return this.todoStates[row.todoState].label;
    },
    priorityMapping(row, column) {
      return this.priorities[row.priority].label;
    },
    typeMapping(row, column) {
      return this.todoTypes[row.todoType].label;
    },
    operateTime(time) {
      return this.moment(time).format("YYYY-MM-DD HH:MM:SS");
    }
  }
};
</script>

<style scoped>
.main {
  height: 800px;
}
</style>
