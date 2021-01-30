<template>
  <div class="lists">
    <!-- https://blog.csdn.net/zjiang1994/article/details/79809687 -->
    <!-- https://github.com/SortableJS/Vue.Draggable -->
    <!-- https://sortablejs.github.io/Vue.Draggable/#/simple -->
    <draggable
      element="ul"
      :value="message"
      @input="inputMsg"
      :options="{ scroll: true }"
    >
      <li
        v-for="(todo, index) in message"
        :key="index"
        :class="{ line: todo.checked }"
        @mouseenter="goTop = index"
        @mouseleave="goTop = -1"
        @click="trans(index)"
        :style="{
          'border-left-color': todo.type[0].typeColor,
          display: todo.showIt,
        }"
      >
        {{ todo.text }}
        <input
          type="checkbox"
          :style="{ visible: seen }"
          :value="todo.checked"
          @click="change(index)"
          :checked="todo.checked"
        />
        <span :class="{ line: todo.checked }" v-if="todo.addtime"
          >Deadline:&nbsp;{{ todo.addtime }}</span
        >
        <img src="./111.jpg" width="15px" @click="deleteit(index)" />
        <toTop
          v-bind:number="index"
          v-bind:lists="message"
          v-show="goTop == index"
        ></toTop>
        <hr />
      </li>
      <br />
    </draggable>
    <!-- <p>{{ message }}</p> -->
  </div>
</template>

<script>
import draggable from "vuedraggable";
import toTop from "./toTop.vue";
import Vue from "vue";
import mediator from "../model/mediator";
export default {
  name: "lists",
  components: {
    toTop,
    draggable,
  },
  data() {
    return {
      seen: false,
      deleteit(index) {
        this.$emit("deleteTodo", index);
      },
      goTop: -1,
    };
  },
  props: {
    message: {
      type: Array,
    },
    deleteTodo: {
      type: Function,
    },
  },
  methods: {
    change(index) {
      this.$emit("change", index);
    },
    trans(index) {
      this.$emit("trans", index);
    },
    inputMsg(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style scoped>
ul {
  padding: 0;
  margin: 0;
  margin-left: auto;
  margin-right: auto;
  width: 850px;
  max-height: 460px;
  display: inline-block;
  text-align: center;
  overflow-y: auto;
}

li {
  list-style: none;
  text-align: left;
  position: relative;
  font-size: 20px;
  width: 600px;
  height: 40px;
  line-height: 40px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  border-left: 5px solid rgb(75, 75, 75);
}

li input {
  float: left;
  position: relative;
  top: 7px;
  vertical-align: middle;
  background: rgb(172, 27, 27);
  border: #999 solid 1px;
  border-radius: 3px;
  min-height: 12px;
  min-width: 12px;
  width: 20px;
  height: 20px;
}

li span {
  display: inline-block;
  color: rgb(189, 186, 186);
  font-size: 15px;
  line-height: 40px;
  height: 40px;
  margin-top: auto;
  font-weight: bold;
}

li img {
  position: relative;
  top: 1px;
  cursor: pointer;
  visibility: hidden;
}

li:hover img {
  visibility: visible;
}

li img:hover {
  visibility: visible;
}

.line {
  text-decoration: line-through;
  color: darkgray;
}

hr {
  width: 600px;
  margin: 0;
}
</style>