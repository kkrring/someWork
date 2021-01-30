<template>
  <div id="wrapper">
    <!-- https://blog.csdn.net/weixin_43869192/article/details/85061248 -->
    <!-- https://juejin.cn/post/6844904056343756814 -->
    <!-- https://blog.csdn.net/weixin_43786756/article/details/112059253 -->
    <!-- https://blog.csdn.net/qq_33862644/article/details/78689577 -->
    <form id="todo">
      <Types v-bind:alltypes="alltypes" ref="todotypes"></Types>
      <input type="text" placeholder="add todos" v-model="todo" />
      <button @click.prevent="add">Add</button>
    </form>
    <div id="sign">
      <span>{{ tasks }}</span>
      <span :style="num">{{ taskNum }}</span>
      <span>{{ danwei }}</span>
      <span
        >当前有未完成任务：<span :style="num">{{ undo }}</span> 个</span
      >
      <span
        >当前有已完成任务：<span :style="num">{{ done }}</span> 个</span
      >
    </div>
    <lists
      v-bind:message="todos"
      @deleteTodo="deleteTodo($event)"
      @input="inputMsg"
      @change="changeMsg"
      @trans="trans"
    ></lists>
  </div>
</template>

<script>
import Types from "./types.vue";
import lists from "./lists.vue";
import mediator from "./../model/mediator.js";
let time = null;
export default {
  name: "center",
  components: {
    Types,
    lists,
  },
  data() {
    return {
      todo: "",
      todos: [],
      // seen: false,
      checked: "",
      tasks: "当前没有任务",
      taskNum: "",
      danwei: "",
      num: {
        color: "blue",
      },
      up: 1,
      alltypes: [],
    };
  },
  mounted: function add() {
    mediator.$on("addtime", function (deadline) {
      time = deadline;
    });
  },
  created: function () {
    this.todos = JSON.parse(localStorage.getItem("key") || "[]");
    window.localStorage.clear();
    localStorage.setItem("key", JSON.stringify(this.todos));
    if (
      JSON.parse(localStorage.getItem("key") || "[]").toLocaleString() !== ""
    ) {
      this.tasks = "当前所有任务量：";
      this.taskNum = JSON.parse(localStorage.getItem("key") || "[]")
        .toLocaleString()
        .split(",").length;
      this.danwei = " 个";
    }
    let _this = this;
    mediator.$on("select", function (val) {
      // console.log(_this.todos);
      for (let i = 0; i < _this.todos.length; i++) {
        _this.todos[i].showIt = "inherit";
        if (_this.todos[i].type[0].typeName !== val) {
          _this.todos[i].showIt = "none";
          localStorage.setItem("key", JSON.stringify(_this.todos));
        }
      }
    });
    mediator.$on("allshow", () => {
      for (let i = 0; i < _this.todos.length; i++) {
        _this.todos[i].showIt = "inherit";
        localStorage.setItem("key", JSON.stringify(_this.todos));
      }
    });
    mediator.$on("alldone", () => {
      for (let i = 0; i < _this.todos.length; i++) {
        _this.todos[i].showIt = "inherit";
        if (_this.todos[i].checked == false) {
          _this.todos[i].showIt = "none";
          localStorage.setItem("key", JSON.stringify(_this.todos));
        }
      }
    });
    mediator.$on("allundone", () => {
      for (let i = 0; i < _this.todos.length; i++) {
        _this.todos[i].showIt = "inherit";
        if (_this.todos[i].checked == true) {
          _this.todos[i].showIt = "none";
          localStorage.setItem("key", JSON.stringify(_this.todos));
        }
      }
    });
    mediator.$on("deleAll", () => {
      for (let i = 0; i < _this.todos.length; i++) {
        _this.todos[i].type = [
          { typeName: "default", typeColor: "rgb(75,75,75)" },
        ];
        localStorage.setItem("key", JSON.stringify(_this.todos));
      }
    });
    mediator.$on("transType", (val) => {
      this.alltypes = val;
      console.log(this.alltypes);
    });
    mediator.$on("changeColor", (val) => {
      for (let i = 0; i < _this.todos.length; i++) {
        if (_this.todos[i].type[0].typeName == val) {
          _this.todos[i].type = [
            { typeName: "default", typeColor: "rgb(75,75,75)" },
          ];
        }
      }
    });
    mediator.$on("changeSign", () => {
      if (_this.todos.length > 0) {
        _this.taskNum = _this.todos.length;
        _this.danwei = " 个";
        _this.tasks = "当前所有任务量：";
      } else {
        _this.tasks = "当前没有任务";
        _this.danwei = "";
        _this.taskNum = "";
      }
    });
    // console.log(JSON.parse(localStorage.getItem("key") || '[]').toLocaleString());
    // console.log(JSON.parse(localStorage.getItem("key") || '[]').toLocaleString().split(",").length);
  },
  methods: {
    add() {
      if (this.todo.length > 0 && this.$refs.todotypes.selected !== "") {
        let exam = this.$refs.todotypes.selected;
        this.todos.push({
          text: this.todo,
          checked: false,
          seen: true,
          type: this.alltypes.filter(function (ff) {
            return ff.typeName == exam;
          }),
          addtime: time,
          up: 1,
          steps: [],
          showIt: "inherit",
        });
        time = "";
        this.todo = "";
        this.$refs.todotypes.selected = "";
        localStorage.setItem("key", JSON.stringify(this.todos));
      } else if (this.todo.length > 0 && this.$refs.todotypes.selected == "") {
        this.todos.push({
          text: this.todo,
          checked: false,
          seen: true,
          type: [{ typeName: "default", typeColor: "rgb(75,75,75)" }],
          addtime: time,
          up: 1,
          steps: [],
          showIt: "inherit",
        });
        time = "";
        this.todo = "";
        this.$refs.todotypes.selected = "";
        localStorage.setItem("key", JSON.stringify(this.todos));
      } else {
        alert("请填写待办事项！");
      }
      if (this.todos.length > 0) {
        this.taskNum = this.todos.length;
        this.danwei = " 个";
        this.tasks = "当前所有任务量：";
      } else {
        this.tasks = "当前没有任务";
        this.danwei = "";
        this.taskNum = "";
      }
    },
    deleteTodo(index) {
      if (this.todos.length - 1 == index) {
        mediator.$emit("prevent");
      }
      this.todos.splice(index, 1);
      // localStorage.removeItem(index);
      localStorage.setItem("key", JSON.stringify(this.todos));
      if (this.todos.length > 0) {
        this.taskNum = this.todos.length;
        this.danwei = " 个";
        this.tasks = "当前所有任务量：";
      } else {
        this.tasks = "当前没有任务";
        this.danwei = "";
        this.taskNum = "";
      }
    },
    inputMsg(val) {
      this.todos = val;
      localStorage.setItem("key", JSON.stringify(val));
    },
    changeMsg(index) {
      this.todos[index].checked = !this.todos[index].checked;
      localStorage.setItem("key", JSON.stringify(this.todos));
    },
    trans(index) {
      mediator.$emit("tran", this.todos, index);
    },
  },
  computed: {
    done: function () {
      // e是返回的数组
      return this.todos.filter(function (e) {
        return e.checked;
      }).length;
    },
    undo: function () {
      return this.todos.length - this.done;
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: block;
  /* width: 250px; */
  margin-left: auto;
  margin-right: auto;
}

#sign {
  display: block;
  width: 850px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  font-size: 15px;
  text-align: center;
  color: rgb(7, 107, 99);
  font-weight: bold;
}

form {
  text-align: center;
}

form input {
  height: 34px;
  width: 500px;
  text-indent: 10px;
  font-size: 25px;
  vertical-align: bottom;
}

form button {
  color: white;
  background-color: rgb(128, 204, 204);
  border: none;
  font-weight: bold;
  width: 100px;
  height: 40px;
  border-width: 0px;
  cursor: pointer;
  outline: none;
  vertical-align: bottom;
  margin-left: -5px;
  font-size: 18px;
}

form button:hover {
  background-color: rgb(110, 173, 173);
}
</style>