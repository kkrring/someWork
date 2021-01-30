<template>
  <div>
    <div class="tishi" v-if="show" @click="change">
      查&nbsp;看&nbsp;你&nbsp;的<br />待&nbsp;办&nbsp;小&nbsp;仓&nbsp;库
    </div>
    <div v-else>
      <div class="cangku">
        <div class="newOne">
          <button @click="add">添加分类</button>
          <button @click="edit">编辑分类</button>
          <button @click="deleAll">全部删除</button>
          <p>待办分类一览💬</p>
        </div>
        <hr />
        <div class="fenlei1">
          <div id="moren">
            <span :style="{ color: defualtColor }">◀</span>
            <input
              type="text"
              value="默认/所有待办"
              readonly="readonly"
              @click="allshow"
            />
          </div>
          <hr />
          <div id="done">
            <span>◆</span>
            <input
              value="已完成"
              type="text"
              readonly="readonly"
              @dblclick="alldone"
            />
          </div>
          <hr />
          <div id="undone">
            <span>◆</span>
            <input
              value="未完成"
              type="text"
              readonly="readonly"
              @dblclick="allundone"
            />
          </div>
          <hr />
        </div>
        <draggable
          element="div"
          :value="types"
          :options="{ scroll: true }"
          class="fenlei"
          @input="classify"
        >
          <div class="fenlei2" v-for="(item, index) in types" :key="index">
            <div :id="names[index]">
              <span
                :style="{ color: item.typeColor }"
                @click="changeColor(index)"
                >◉</span
              >
              <input
                type="text"
                v-focus
                v-model="item.typeName"
                :readonly="names[index].typeName == '' ? false : 'readonly'"
                @keyup.enter="save(item.typeName, index)"
                class="diyType"
                @dblclick="specify(item.typeName)"
                :style="outlook"
              />
              <img
                src="./111.jpg"
                width="15px"
                @click="deleType(index, item.typeName)"
              />
            </div>
            <hr />
          </div>
        </draggable>
      </div>
      <div class="wrapper" v-show="slid">
        <Slider id="slider" :value="colors" @input="updateValue"></Slider>
        <button id="close" @click="closeIt">close</button>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import mediator from "../model/mediator";
// https://www.npmjs.com/package/vue-color
// https://github.com/xiaokaike/vue-color#readme
var Slider = require("../../vue-color-master/src/components/Slider.vue");
export default {
  name: "left",
  created: function () {
    if (JSON.parse(localStorage.getItem("types") || "[]").length == 0) {
      localStorage.setItem(
        "types",
        JSON.stringify([
          { typeName: "life", typeColor: "rgb(196, 44, 44)" },
          { typeName: "study", typeColor: "rgb(202, 165, 41)" },
          { typeName: "work", typeColor: "rgb(26, 80, 161)" },
          { typeName: "relax", typeColor: "rgb(44, 196, 69)" },
        ])
      );
      this.types = JSON.parse(localStorage.getItem("types") || "[]");
    } else {
      this.types = JSON.parse(localStorage.getItem("types") || "[]");
    }
    setTimeout(() => {
      this.change();
    }, 10);
  },
  components: {
    draggable,
    Slider,
  },
  // https://blog.csdn.net/weixin_37251044/article/details/105505362?ops_request_misc=&request_id=&biz_id=102&utm_term=vue%20focus%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8C%87%E4%BB%A4&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-105505362.pc_search_result_no_baidu_js&spm=1018.2226.3001.4187
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus();
      },
    },
  },
  data() {
    return {
      show: false,
      types: [
        { typeName: "life", typeColor: "rgb(196, 44, 44)" },
        { typeName: "study", typeColor: "rgb(202, 165, 41)" },
        { typeName: "work", typeColor: "rgb(26, 80, 161)" },
        { typeName: "relax", typeColor: "rgb(44, 196, 69)" },
      ],
      names: JSON.parse(localStorage.getItem("types") || "[]"),
      colors: {
        hex: "#194d33",
        hex8: "#194D33A8",
        hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
        hsv: { h: 150, s: 0.66, v: 0.3, a: 1 },
        rgba: { r: 25, g: 77, b: 51, a: 1 },
        a: 1,
      },
      slid: false,
      comtemp: "black",
      trans: null,
      defualtColor: {
        color: "rgb(75, 75, 75)",
      },
      outlook: {
        cursor: "grab",
      },
    };
  },
  methods: {
    change: function () {
      this.show = !this.show;
      localStorage.setItem("types", JSON.stringify(this.types));
      mediator.$emit("transType", this.types);
    },
    add: function () {
      this.types.push({
        typeName: "",
        typeColor: "black",
      });
      this.slid = true;
      this.trans = this.types.length - 1;
      localStorage.setItem("types", JSON.stringify(this.types));
      this.names = JSON.parse(localStorage.getItem("types") || "[]");
      // console.log(this.names[0].typeName);
      mediator.$emit("transType", this.types);
    },
    save: function (e, index) {
      this.outlook = { cursor: "grab" };
      if (e !== "") {
        this.types[index].typeName = e;
        localStorage.setItem("types", JSON.stringify(this.types));
        this.names = JSON.parse(localStorage.getItem("types") || "[]");
      } else {
        this.types.splice(index, 1);
        localStorage.setItem("types", JSON.stringify(this.types));
        this.names = JSON.parse(localStorage.getItem("types") || "[]");
      }
    },
    classify(val) {
      this.types = val;
      localStorage.setItem("types", JSON.stringify(this.types));
      this.names = JSON.parse(localStorage.getItem("types") || "[]");
    },
    deleType(index, typename) {
      this.types.splice(index, 1);
      localStorage.setItem("types", JSON.stringify(this.types));
      this.names = JSON.parse(localStorage.getItem("types") || "[]");
      mediator.$emit("transType", this.types);
      mediator.$emit("changeColor", typename);
    },
    changeColor: function (index) {
      this.slid = true;
      this.trans = index;
    },
    updateValue(val) {
      this.types[this.trans].typeColor =
        "rgb(" + val.rgba.r + "," + val.rgba.g + "," + val.rgba.b + ")";
      // console.log(this.types[this.trans].typeColor);
      localStorage.setItem("types", JSON.stringify(this.types));
      this.names = JSON.parse(localStorage.getItem("types") || "[]");
    },
    closeIt: function () {
      this.slid = false;
      mediator.$emit("transType", this.types);
    },
    edit: function () {
      this.outlook = { cursor: "text" };
      let diyType = document.querySelectorAll(".diyType");
      console.log(diyType[0].readonly);
      for (let i = 0; i < diyType.length; i++) {
        this.names[i].typeName = "";
      }
    },
    deleAll: function () {
      this.types = [];
      localStorage.setItem("types", JSON.stringify(this.types));
      this.names = JSON.parse(localStorage.getItem("types") || "[]");
      mediator.$emit("deleAll");
      mediator.$emit("transType", this.types);
    },
    specify(val) {
      mediator.$emit("select", val);
    },
    allshow: function () {
      mediator.$emit("allshow");
    },
    alldone: function () {
      mediator.$emit("alldone");
    },
    allundone: function () {
      mediator.$emit("allundone");
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
.newOne {
  font-size: 18px;
  font-weight: bold;
  margin-top: 15px;
}
.newOne button {
  margin: 0 5px;
}
.newOne p {
  color: rgb(99, 153, 146);
}
hr {
  opacity: 40%;
  margin: 0;
}
/* #moren span {
  color: rgb(75, 75, 75);
} */
.fenlei {
  height: 250px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.fenlei1 div {
  height: 40px;
  width: 280px;
}
.fenlei1 input {
  font-size: 16px;
  font-weight: bold;
  line-height: 40px;
  border: none;
  outline: medium;
  cursor: pointer;
}
.fenlei2 div {
  height: 40px;
  width: 300px;
}
.fenlei2 input {
  font-size: 16px;
  font-weight: bold;
  line-height: 40px;
  border: none;
  outline: medium;
}
#slider {
  position: absolute;
}
img {
  position: relative;
}
.wrapper {
  position: absolute;
}
#close {
  position: absolute;
  left: 230px;
}
</style>