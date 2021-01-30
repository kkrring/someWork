<template>
  <div>
    <div class="tishi" v-if="start">
      开&nbsp;始&nbsp;计&nbsp;划<br />你&nbsp;的&nbsp;todo&nbsp;list
    </div>
    <div class="details" :id="likey" v-else>
      <div class="text">
        📝&nbsp;<span class="todo">{{ litext }}</span
        ><br />
        <span class="time" :style="showTime">⏰&nbsp;&nbsp;{{ litime }}</span
        ><br :style="showTime" />
        <span class="leixing" :style="typeColor"
          >📂&nbsp;&nbsp;{{ leixing }}</span
        >
      </div>
      <hr />
      <button @click="dele">删除此待办</button>
      <hr />
      <span class="changeType" @click="changeTypeNow">
        更改待办类型
        <changeTypes
          :style="{ display: see }"
          v-bind:msg="types"
          @input="msgNew"
        ></changeTypes>
      </span>
      <hr />
      <PickerTest2 @ddltime="ddltime"></PickerTest2>
      <hr />
      <div class="steps">添加详细步骤</div>
      <hr />
      <steps
        v-bind:msg="todos"
        v-bind:stpkey="likey"
        @inputSteps="inputSteps"
        @add="addStep"
        @change="changeStep"
        @del="delStep"
      ></steps>
    </div>
  </div>
</template>

<script>
import mediator from "./../model/mediator.js";
import PickerTest2 from "./使用Picker2.vue";
import changeTypes from "./changeTypes.vue";
import steps from "./steps.vue";
let stop = false;
export default {
  name: "right",
  components: {
    PickerTest2,
    steps,
    changeTypes,
  },
  data() {
    return {
      start: true,
      litext: "",
      litime: "",
      leixing: "",
      todos: [],
      likey: null,
      showTime: {
        display: "inline-block",
      },
      typeColor: {
        color: "black",
      },
      see: "none",
      types: [],
    };
  },
  created: function () {
    this.showtext();
    mediator.$on("transType", (val) => {
      this.types = val;
    });
  },
  methods: {
    showtext: function () {
      mediator.$on("prevent", function () {
        stop = true;
      });
      mediator.$on("tran", (todos, index) => {
        if (!stop) {
          if (todos[index].seen) {
            this.showTime = { display: "inline-block" };
            this.start = !todos[index].seen;
            this.litext = todos[index].text;
            if (todos[index].addtime == null || todos[index].addtime == "") {
              this.showTime = { display: "none" };
            }
            this.litime = todos[index].addtime;
            this.leixing = todos[index].type[0].typeName;
            this.typeColor = { color: todos[index].type[0].typeColor };
            this.todos = todos;
            this.likey = index;
            mediator.$emit("itsType", todos[index].type[0].typeName);
          }
        } else {
          this.start = true;
          stop = false;
        }
      });
    },
    addStep(key, value) {
      this.todos[key].steps.push([value, false]);
      localStorage.setItem("key", JSON.stringify(this.todos));
    },
    changeStep(key, index) {
      this.todos[key].steps[index][1] = !this.todos[key].steps[index][1];
      this.todos[key].steps = [...this.todos[key].steps];
      localStorage.setItem("key", JSON.stringify(this.todos));
    },
    delStep(key, index) {
      this.todos[key].steps.splice(index, 1);
      localStorage.setItem("key", JSON.stringify(this.todos));
    },
    dele: function () {
      this.todos.splice(this.likey, 1);
      localStorage.setItem("key", JSON.stringify(this.todos));
      this.start = true;
      mediator.$emit("changeSign");
    },
    ddltime: function (date3) {
      // console.log("date3");
      this.todos[this.likey].addtime = date3;
      this.litime = this.todos[this.likey].addtime;
      this.showTime = { display: "inline-block" };
      localStorage.setItem("key", JSON.stringify(this.todos));
    },
    inputSteps: function (val) {
      this.todos[this.likey].steps = val;
      localStorage.setItem("key", JSON.stringify(this.todos));
    },
    changeTypeNow: function () {
      if ((this.see = "none")) {
        this.see = "inline-block";
      } else {
        this.see = "none";
      }
    },
    msgNew(name) {
      this.leixing = name;
      for (let i = 0; i < this.types.length; i++) {
        if (this.types[i].typeName == name) {
          this.typeColor = { color: this.types[i].typeColor };
        }
      }
    },
  },
};
</script>

<style scoped>
.tishi {
  font-size: 35px;
  height: 100px;
  margin-top: 200px;
  color: rgb(161, 184, 176);
}
.text {
  font-size: 16.5px;
  text-align: left;
  margin: 20px;
}
.todo {
  height: 80px;
}
.time {
  color: rgb(158, 158, 158);
  font-size: 14px;
  font-weight: bold;
}
.leixing {
  font-size: 14px;
  font-weight: bold;
}
button {
  border: none;
  background-color: rgb(255, 255, 255);
  width: 300px;
  font-weight: bold;
  font-size: 15px;
  color: #2c3e50;
  outline: medium;
}
.steps {
  font-weight: bold;
  font-size: 15px;
  color: #2c3e50;
}
.changeType {
  font-weight: bold;
  font-size: 15px;
  color: #2c3e50;
}
hr {
  margin: 4px 0;
  opacity: 40%;
}
</style>