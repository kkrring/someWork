<template>
  <select v-model="seleType"  @change="msgNew">
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
  },
  methods: {
    msgNew() {
      this.$emit("input",this.seleType);
    },
  },
};
</script>

<style scoped>
</style>