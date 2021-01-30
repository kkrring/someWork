<template>
  <!-- https://blog.csdn.net/qq_25740691/article/details/105808767?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522161067722716780269855398%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=161067722716780269855398&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-105808767.pc_search_result_no_baidu_js&utm_term=vue%E6%97%A5%E6%9C%9F%E6%97%B6%E9%97%B4%E9%80%89%E6%8B%A9%E5%99%A8&spm=1018.2226.3001.4187 -->
  <section>
    <datetime-picker
      :datetime.sync="date3"
      :is-show.sync="showDate3"
      v-bind:deadline="date3"
    >
      <slot></slot>
    </datetime-picker>
  </section>
</template>


<script>
Date.prototype.format = function (fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
import deadline from "./deadline.vue";
export default {
  name: "PickerTest",
  components: {
    "datetime-picker": deadline,
  },
  data: () => ({
    showDate3: false,
    date3: new Date().format("yyyy-MM-dd hh:mm:ss"),
  }),
};
</script>

<style>
datetime-picker {
  display: inline;
}
</style>