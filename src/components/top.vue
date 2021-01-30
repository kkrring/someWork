<template>
  <div>
    <h1>{{ msg }}</h1>
    <PickerTest>
      <h4 :style="h4S">Add your deadline:</h4>
    </PickerTest>
  </div>
</template>

<script>
import PickerTest from "./使用Picker.vue";
export default {
  components: {
    PickerTest,
  },
  name: "top",
  data() {
    return {
      msg: "WHAT DO YOU WANT TO DO?",
      h4S: {
        fontWeight: "bold",
        textAlign: "center",
        color: "rgb(18, 153, 158)",
        display: "inline-block",
        margin: 0,
        marginBottom: "15px",
      },
    };
  },
};
</script>

<style scoped>
h1 {
  font-weight: bold;
  text-align: center;
  color: cadetblue;
  padding-top: 20px;
}
</style>