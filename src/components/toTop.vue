<template>
  <div>
    <span @click="up">置顶</span>
  </div>
</template>

<script>
export default {
  name: "toTop",
  data() {
    return {
      goTop: null,
    };
  },
  props: {
    number: {
      type: Number,
    },
    lists: {
      type: Array,
    },
  },
  methods: {
    // up: function () {
    //   if (this.lists[this.number].checked == false) {
    //     let up = this.lists.splice(this.number, 1);
    //     this.lists.unshift(up);
    //     localStorage.setItem("key", JSON.stringify(this.todos));
    //     console.log(this.number);
    //     console.log(this.lists);
    //     console.log(up);
    //     console.log(this.lists);
    //   }
    // },
    up: function () {
      if (this.lists[this.number].checked == false) {
        this.lists[this.number].up = this.lists[this.number].up + 1;
        this.lists.sort(this.compare("up"));
        for (let i = 0; i < this.lists.length; i++) {
          this.lists[i].up = 1;
        }
        localStorage.setItem("key", JSON.stringify(this.lists));
        return this.lists;
      }
    },
    compare(property) {
      return function (a, b) {
        let x = a[property];
        let y = b[property];
        return x > y ? -1 : x < y ? 1 : 0;
      };
    },
  },
};
</script>

<style scoped>
div {
  float: right;
}
span {
  font-size: 11px;
  font-weight: bold;
  /* color:green; */
}
</style>