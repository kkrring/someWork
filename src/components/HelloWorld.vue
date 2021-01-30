<template>
  <div class="hello">
    <left id="left"></left>
    <div class="bg">
      <top></top>
      <center></center>
    </div>
    <right id="right"></right>
  </div>
</template>

<script>
import Top from "./top.vue";
import Center from "./main.vue";
import Left from "./left.vue";
import Right from "./right.vue";
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  components: {
    Top,
    Center,
    Left,
    Right,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  position: absolute;
  width: 100%;
  display: flex;
  margin-top: 3%;
}
.bg {
  flex: 1;
  max-width: 850px;
  min-width: 850px;
  min-height: 680px;
  max-height: 680px;
  margin: 0px;
  margin-left: 65px;
  margin-right: 65px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 10px 10px 15px rgb(146, 191, 197);
  opacity: 80%;
  text-align: center;
}

#left {
  display: block;
  max-width: 300px;
  min-width: 300px;
  min-height: 500px;
  max-height: 500px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 10px 10px 15px rgb(146, 191, 197);
  opacity: 80%;
  margin-top: 90px;
  margin-left: 50px;
}

#right {
  display: block;
  min-width: 300px;
  max-width: 300px;
  min-height: 500px;
  max-height: 500px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 10px 10px 15px rgb(146, 191, 197);
  opacity: 80%;
  /* text-align: center; */
  margin-right: 50px;
  margin-top: 90px;
}
</style>
