<template>
  <div>
    <div class="add">
      <label for="addSteps"> 新步骤： </label>
      <input
        type="text"
        id="addSteps"
        value=""
        placeholder="new steps"
        @keyup.enter="add"
      />
    </div>
    <div class="added">
      <draggable
        element="ul"
        @input="inputSteps"
        :value="msg[stpkey].steps"
        :options="{ scroll: true }"
      >
        <li v-for="(step, index) in msg[stpkey].steps" :key="index">
          <!-- @mouseenter="over = index"
          @mouseleave="over = -1" -->
          <span :class="{ done: step[1] }" @click="change(index)">
            {{ step[0] }}</span
          >
          <img src="./111.jpg" width="12px" @click="delStep(index)" />
          <!-- v-show="over == index" -->
        </li>
      </draggable>
    </div>
  </div>
</template>

<script>
import mediator from "../model/mediator";
import draggable from "vuedraggable";
export default {
  name: "steps",
  components: {
    draggable,
  },
  data() {
    return {
      newsteps: [],
      over: -1,
    };
  },
  props: {
    msg: {
      type: Array,
    },
    stpkey: {
      type: Number,
    },
  },
  methods: {
    add: function (e) {
      this.$emit("add", this.stpkey, e.target.value);
      e.target.value = "";
    },
    inputSteps: function (val) {
      this.$emit("inputSteps", val);
    },
    change: function (index) {
      this.$emit("change", this.stpkey, index);
    },
    delStep: function (index) {
      this.$emit("del", this.stpkey, index);
    },
  },
};
</script>

<style scoped>
input {
  border: none;
  outline: medium;
}
.add {
  font-size: 14px;
}
.added {
  text-align: left;
  height: 230px;
  overflow-y: scroll;
}
ul {
  padding-left: 45px;
  padding-right: 45px;
}
li {
  font-size: 17px;
  width: fit-content;
  margin-bottom: 10px;
}
.done {
  text-decoration: line-through;
  color: darkgray;
}
hr {
  margin: 0;
}
</style>