<template>
  <select v-model="seleType" @input="msgNew(seleType)">
    <option
      v-for="(type, index) in msg"
      :key="index"
    >
      {{ type.typeName }}
    </option>
  </select>
</template>

<script>
import mediator from "../model/mediator";
export default {
  name: "changeTypes",
  data() {
    return {
      seleType: "",
    };
  },
  props: {
    msg: {
      type: Array,
    },
  },
  created: function () {
    mediator.$on("itsType", (val) => {
      this.seleType = val;
      console.log(val);
    });
    console.log(this.seleType);
  },
  methods: {
    msgNew(val) {
      console.log(val);
      this.$emit("input",val);
    },
  },
};
</script>

<style scoped>
</style>