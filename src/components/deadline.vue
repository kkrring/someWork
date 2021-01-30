<template>
  <div>
    <slot></slot>
    <div :style="{ display: 'inline-block', position: 'relative' }">
      <span @click="showPicker" :style="pickertext">{{
        getLangText(label.datetimePicker)
      }}</span>
      <div class="date-picker-bg" v-show="isShow" @click="closePicker"></div>
      <div class="date-picker" v-show="isShow" :style="{ width: '260px' }">
        <div class="picker-top">
          <span class="picker-arrow" @click="preYear">&lsaquo; &lsaquo;</span>
          <span class="picker-arrow" @click="preMonth">&lsaquo;</span>
          <span class="date-text"
            >{{ year }}-{{ month > 9 ? month : "0" + month }}</span
          >
          <span class="picker-arrow" @click="nextMonth">&rsaquo;</span>
          <span class="picker-arrow" @click="nextYear">&rsaquo;&rsaquo;</span>
        </div>
        <div class="picker-content1">
          <table>
            <thead>
              <tr>
                <th v-for="(item, idx) in weekList" :key="'week' + idx">
                  {{ getLangText(item) }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="idx in weekNum" :key="'weekNum' + idx">
                <td
                  v-for="m in 7"
                  :key="'monthDay' + idx + '_' + m"
                  :class="[
                    new Date(monthList[idx - 1][m - 1]).getMonth() + 1 == month
                      ? ''
                      : 'gray',
                    selectDate == monthList[idx - 1][m - 1] ? 'active' : '',
                  ]"
                  @click="onSelectDate(monthList[idx - 1][m - 1])"
                  @dblclick="onConfirmDate(monthList[idx - 1][m - 1])"
                >
                  {{ new Date(monthList[idx - 1][m - 1]).getDate() }}
                </td>
              </tr>
            </tbody>
          </table>
          <ul class="hour-list">
            <li
              v-for="n in 24"
              :key="'hourList' + n"
              @click="onSelectHour(n - 1)"
              :class="[selectHour == n - 1 ? 'active' : '']"
              @dblclick="onConfirmHour(n - 1)"
            >
              {{ n - 1 }}:00
            </li>
          </ul>
        </div>
        <div class="picker-footer">
          <button @click="closePicker()">
            {{ getLangText(label.close) }}
          </button>
          <!-- <button @click="setNow">{{ getLangText(label.today) }}</button> -->
          <button
            @click="
              confirmPicker();
              closePicker();
              addtime(deadline);
            "
          >
            {{ getLangText(label.ok) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mediator from "./../model/mediator.js";
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
export default {
  name: "deadline",
  props: {
    langType: {
      type: String,
      default: window.localStorage.getItem("langType"),
    },
    datetime: {
      type: String,
      default: new Date().format("yyyy-MM-dd hh:00"),
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    deadline: {
      type: String,
    },
  },
  data: () => ({
    pickertext: {
      "font-weight": "bold",
      "font-family": "Arial",
      "font-size": "15px",
    },
    label: {
      ok: { zh: "确定", en: "OK" },
      close: { zh: "关闭", en: "close" },
      today: { zh: "现在", en: "now" },
      datetimePicker: { zh: "待办结束时间", en: "datetimePicker" },
    },
    weekList: [
      { zh: "日", en: "Sun" },
      { zh: "一", en: "Mon" },
      { zh: "二", en: "Tue" },
      { zh: "三", en: "Wed" },
      { zh: "四", en: "Thu" },
      { zh: "五", en: "Fir" },
      { zh: "六", en: "Sat" },
    ],
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),

    startDay: 0,
    endDay: 0,
    weekNum: 0,
    selectDate: new Date(new Date().format("yyyy-MM-dd 00:00")).getTime(),
    monthList: [],
    selectHour: new Date().getHours(),
  }),
  watch: {
    year() {
      this.getMonthDay();
    },
    month() {
      this.getMonthDay();
    },
  },
  methods: {
    addtime(deadline) {
      mediator.$emit("addtime", deadline);
    },
    getLangText(item) {
      if (item) {
        if (this.langType == "en") {
          if (item.en && item.en.length > 1) {
            return item.en.substring(0, 1).toUpperCase() + item.en.substring(1);
          } else if (item.en && item.en.length == 1) {
            return item.en.toUpperCase();
          } else {
            return "--";
          }
        } else {
          return item.zh ? item.zh : "--";
        }
      } else {
        return "--";
      }
    },
    preYear() {
      this.year = this.year - 1;
    },
    nextYear() {
      this.year = this.year + 1;
    },
    nextMonth() {
      if (this.month == 12) {
        this.year = this.year + 1;
        this.month = 1;
      } else {
        this.month++;
      }
    },
    preMonth() {
      if (this.month == 1) {
        this.year = this.year - 1;
        this.month = 12;
      } else {
        this.month--;
      }
    },
    showPicker() {
      this.$emit("update:is-show", true);

      var time = new Date(this.datetime).getTime();
      this.year = new Date(time).getFullYear();
      this.month = new Date(time).getMonth() + 1;
      this.day = new Date(time).getDate();
      this.selectDate = new Date(
        new Date(time).format("yyyy-MM-dd 00:00")
      ).getTime();
      this.selectHour = new Date(time).getHours();
    },
    onConfirmDate(time) {
      this.onSelectDate(time);
      this.confirmPicker();
    },
    onConfirmHour(n) {
      this.onSelectHour(n);
      this.confirmPicker();
    },
    closePicker() {
      this.$emit("update:is-show", false);
    },
    setNow() {
      this.year = new Date().getFullYear();
      this.month = new Date().getMonth() + 1;
      this.day = new Date().getDate();
      this.selectDate = new Date(
        new Date().format("yyyy-MM-dd 00:00")
      ).getTime();
      this.selectHour = new Date().getHours();
    },
    confirmPicker() {
      this.$emit(
        "update:datetime",
        new Date(this.selectDate + this.selectHour * 3600000).format(
          "yyyy-MM-dd hh:00"
        )
      );
      this.$emit(
        "picker-result",
        new Date(this.selectDate + this.selectHour * 3600000).format(
          "yyyy-MM-dd hh:00"
        )
      );
      this.closePicker();
    },
    getMonthDay() {
      var monthFirst = new Date(this.year + "-" + this.month + "-01 00:00");
      var w = monthFirst.getDay();

      this.startDay = monthFirst.getTime() - w * 24 * 3600 * 1000;
      if (this.month == 12) {
        this.endDay = new Date(this.year + 1 + "-01-01 00:00").getTime() - 1000;
      } else {
        this.endDay =
          new Date(this.year + "-" + (this.month + 1) + "-01 00:00").getTime() -
          1000;
      }

      var monthDay = (this.endDay + 1000 - this.startDay) / (24 * 3600 * 1000);
      this.weekNum = Math.ceil(monthDay / 7);
      this.monthList = [];
      for (var i = 0; i < this.weekNum; i++) {
        var item = [];
        for (var j = 0; j < 7; j++) {
          item.push(
            this.startDay + i * 24 * 3600 * 1000 * 7 + j * 24 * 3600 * 1000
          );
        }
        this.monthList.push(item);
      }
    },
    onSelectHour(n) {
      this.selectHour = n;
      this.$emit(
        "update:datetime",
        new Date(this.selectDate + this.selectHour * 3600000).format(
          "yyyy-MM-dd hh:00"
        )
      );
    },
    onSelectDate(time) {
      this.selectDate = time;
      this.year = new Date(time).getFullYear();
      this.month = new Date(time).getMonth() + 1;
      this.day = new Date(time).getDate();
      this.$emit(
        "update:datetime",
        new Date(time + this.selectHour * 3600000).format("yyyy-MM-dd hh:00")
      );
    },
  },
  mounted() {
    this.getMonthDay();
  },
};
</script>

<style lang="scss">
</style>