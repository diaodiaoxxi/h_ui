<template>
  <div v-if="!hidden" :class="clazz" @mouseover="hover" @mouseout="out" ref="reference">
    <div :class="[prefixCls + '-group-prepend']" v-if="prepend">
      <slot name="prepend"></slot>
    </div>
    <input
      :class="classes"
      :disabled="disabled"
      :readonly="!editable||readonly"
      :placeholder="localePlaceholder"
      :value="inputValue"
      :maxlength="maxlength"
      :tabindex="tabindex"
      @blur="blurValue"
      @input="valChange"
      @change="valChange"
      @keyup="keyup"
      @focus="focusValue($event)"
      ref="input"
    />
    <div :class="[prefixCls + '-group-append']" v-if="append">
      <slot name="append"></slot>
    </div>
    <transition name="label-fade">
      <template v-if="!transfer">
        <div v-show="tipShow" :class="tipzz">{{bigNum}}</div>
      </template>
      <template v-if="transfer">
        <Drop
          v-show="tipShow"
          :data-transfer="true"
          v-transfer-dom
          ref="drop"
          :class="tipzz"
        >{{bigNum}}</Drop>
      </template>
    </transition>
  </div>
</template>
<script>
import {
  oneOf,
  formatnumber,
  changeTipsVal,
  cutNum,
  divideNum,
  changeTipsNum,
  BIGNUMBER_DEFAULT_FORMAT,
  BIGNUMBER_GROUPING_FORMAT
} from "../../util/tools";
import Emitter from "../../mixins/emitter";
import Locale from "../../mixins/locale";
import Drop from "../Select/Dropdown.vue";
import TransferDom from "../../directives/transfer-dom";
const prefixCls = "h-typefield";
import { on, off } from "../../util/dom";
import BigNumber from 'bignumber.js'

function addNum(num1, num2) {
  let sq1, sq2, m;
  try {
    sq1 = num1.toString().split(".")[1].length;
  } catch (e) {
    sq1 = 0;
  }
  try {
    sq2 = num2.toString().split(".")[1].length;
  } catch (e) {
    sq2 = 0;
  }
  m = Math.pow(10, Math.max(sq1, sq2));
  return (Math.round(num1 * m) + Math.round(num2 * m)) / m;
}

export default {
  name: "Typefield",
  directives: { TransferDom },
  components: { Drop },
  data() {
    return {
      prefixCls: prefixCls,
      focused: false,
      havefocused: false,
      inputValue: "",
      checked: false,
      tipShow: false,
      bigNum: null,
      currentValue: String(this.value),
      prepend: true,
      append: true,
      viewValue: "",
      formatValue: '',
    };
  },
  mixins: [Emitter, Locale],
  props: {
    type: {
      validator(value) {
        return oneOf(value, ["money", "cardNo"]);
      },
      default: "money"
    },
    value: {
      required: false,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    },
    placeholder: String,
    hidden: Boolean,
    isround: Boolean,
    integerNum: {
      type: [Number, String],
      default: 13
    },
    suffixNum: {
      type: [Number, String],
      default: 2
    },
    bigTips: Boolean,
    position: String,
    divided: {
      //是否添加分隔符
      type: Boolean,
      default: false
    },
    immeDivided: {
      //是否添加分隔符
      type: Boolean,
      default: false
    },
    algin: {
      //金额组件内部显示
      type: String,
      default: "left"
    },
    notFillin: {
      //格式化金额时，当小数点少于指定位数是否需要补0
      type: Boolean,
      default: false
    },
    notFormat: {
      //不对数据进行格式化,输入什么是什么
      type: Boolean,
      default: false
    },
    setNull: {
      type: Boolean, //设置空值为0
      default: false
    },
    maxlength: {
      type: [String, Number],
      default: null
    },
    cardFormat: {
      type: Boolean,
      default: true
    },
    focusAllSelect: {
      type: Boolean,
      default: false
    },
    // 非负数
    nonNegative: {
      type: Boolean,
      default: false
    },
    hoverTips: {
      type: Boolean,
      default: false
    },
    transfer: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: [String, Number],
      default: "0",
      validator(value) {
        let num = parseInt(value);
        return num <= 32767 && num >= -1;
      }
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    step: {
      type: Number,
      default: 1
    },
    stepSwitch: {
      type: Boolean,
      default: true
    },
    uppercaseMethod: {
      type: Function
    }
  },
  computed: {
    integerRegExp() {
      //匹配整数长度的正则
      let matchLength = Number(this.integerNum) + 1;
      return new RegExp(
        "^[0-9]{" + matchLength + "}|^-[0-9]{" + matchLength + "}"
      );
    },
    precisionRegExp() {
      //用于小数位精度匹配的正则表达式
      let matchLength = Number(this.suffixNum) + 1;
      return new RegExp("\\.[0-9]{" + matchLength + "}");
    },
    clazz() {
      return [
        `${prefixCls}`,
        {
          "input-field-focused": this.focused,
          "input-field-active":
            this.inputValue ||
            this.placeholder ||
            (this.$refs.input && this.$refs.input.value),
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-readonly`]: this.readonly,
          [`${prefixCls}-editable`]: !this.editable,
          [`${prefixCls}-group`]: this.prepend || this.append,
          [`${prefixCls}-group-with-prepend`]: this.prepend,
          [`${prefixCls}-group-with-append`]: this.append
        }
      ];
    },
    tipzz() {
      return `${prefixCls}-tip`;
    },
    classes() {
      return `${prefixCls}-${this.algin}`;
    },
    localePlaceholder() {
      if (this.setNull) {
        return "";
      }
      if (this.placeholder === undefined) {
        return this.t("i.typefield.placeholder");
      } else {
        return this.placeholder;
      }
    },
    maxNum() {
      return new BigNumber(this.max)
    },
    minNum() {
      return new BigNumber(this.min)
    }
  },
  watch: {
    value(val) {
      if (val == null || val == undefined) {
        val = "";
      }
      this.initValue(String(val));
    },
    inputValue(val) {
      this.viewValue = changeTipsVal(
        val,
        this.integerNum,
        this.suffixNum,
        this.isround
      );
    },
    tipShow(val) {
      if (val && this.transfer) {
        this.$refs.drop.update();
      }
      // else {
      //     this.$refs.drop.destroy();
      // }
    }
  },
  mounted() {
    this.prepend = this.$slots.prepend !== undefined;
    this.append = this.$slots.append !== undefined;
    if (this.value != null || this.value != undefined) {
      this.initValue(String(this.value));
    }
    on(this.$refs.reference, "keydown", this.keyDown);
  },
  methods: {
    keyDown(e) {
      if (window.isO45) {
        if(this.stepSwitch) {
          if (e.keyCode === 39) {
            e.preventDefault();
            this.up(e);
          } else if (e.keyCode === 37) {
            e.preventDefault();
            this.down(e);
          }
        }
      }
    },
    up(e) {
      const targetVal = Number(e.target.value);
      if (isNaN(targetVal)) {
        return false;
      }
      this.changeStep("up", e);
    },
    down(e) {
      const targetVal = Number(e.target.value);
      if (isNaN(targetVal)) {
        return false;
      }
      this.changeStep("down", e);
    },
    changeStep(type, e) {
      if (this.disabled || this.readonly) {
        return false;
      }
      const targetVal = Number(e.target.value);
      let val = Number(this.currentValue);
      const step = Number(this.step);
      if (isNaN(val)) {
        return false;
      }
      if (!isNaN(targetVal)) {
        if (type === "up") {
          if (addNum(targetVal, step) <= this.max) {
              val = addNum(val, step);
          } else {
            val = this.max;
          }
        } else if (type === "down") {
          // 左右键减少步长时，考虑nonNegative 非负配置
          let newVal = addNum(targetVal, -step)
          if (this.nonNegative && newVal < 0) {
            val = 0
            return
          }
          if (newVal >= this.min) {
            val = newVal
          } else {
            val = this.min
          }
        }
      }
      val = val == null ? val : val.toString();

      this.$nextTick(() => {
        this.currentValue = val;
        this.bigShow(this.type, this.currentValue);
        this.$emit("input", val);
        this.$emit("on-keyup", val, event);
        this.$emit("on-change", val);
        this.dispatch("FormItem", "on-form-change", val);
      });
    },
    formatVModel(e) {
      let val = this.inputValue ? this.inputValue.trim() : this.inputValue;
      if (val && val !== "") {
        if (!this.notFormat) {
          if (this.type === 'cardNo') {
            val = this.formatCardNo(val)
          }
          if (this.type === 'money') {
            val = this.formatNum(e.target.value, this.integerNum, this.suffixNum)
          }
        }
        e.target.value = this.inputValue = val
      } else {
        if (this.setNull && this.type == "money") {
          val = this.setNullStr();
          e.target.value = this.inputValue = val
        }
      }
      return val;
    },
    // keyup,focus,blur
    blurValue(e) {
      this.havefocused = false
      this.focused = false;
      if (this.type == "money") this.tipShow = false;
      let val = this.formatVModel(e)
      
      const isValueChange = this.formatValue !== val  // 判断format后数据是否变化
      const vModelValue = this.cardFormatValue(val.replace(/,/g, ''))
      // this.$refs.input.blur();
      this.$emit("input", vModelValue)
      this.$emit("on-blur", e, isValueChange);
      isValueChange && this.$emit('on-change',vModelValue, this.formatValue)
      this.dispatch("FormItem", "on-form-blur", val.replace(/,/g, ''));
      this.formatValue = vModelValue  //val值赋值oldvalue, 存储 oldval值 ，用于新老val值对比。
    },
    keyup(e) {
      if (e.keyCode === 13) {
        if (this.type == "money") this.tipShow = false;
        let val = this.formatVModel(e)
        const isValueChange = this.formatValue !== val  // 判断format后数据是否变化
        const vModelValue = this.cardFormatValue(val.replace(/,/g, ''))
        this.$emit("input", vModelValue)
        this.$emit('on-enter', e)
        isValueChange && this.$emit('on-change',vModelValue, this.formatValue)
        this.formatValue = vModelValue
      } 
    },
    cardFormatValue(val) {
      if (!this.cardFormat && this.type == "cardNo") {
        val = val.replace(/\s+/g, "");
      }
      return val;
    },
    blur() {
      this.havefocused = false;
      this.$refs.input.blur();
      this.$emit("input", this.cardFormatValue(this.inputValue));
      this.dispatch("FormItem", "on-form-blur", this.inputValue);
    },
    focusValue(e) {
      if (this.readonly || this.disabled) return false;
      this.focused = true;
      this.havefocused = true;
      if (this.type == "money") {
        if (this.setNull && Number(this.inputValue.trim()) == 0) {
          this.currentValue = "";
          this.inputValue = "";
          e.target.value = "";
        } else {
          if (
            this.notFillin &&
            this.inputValue &&
            !this.immeDivided &&
            !this.divided
          ) {
            let bn = new BigNumber(this.inputValue.trim().replace(/[^0-9\.-]/g, ''))
            let numStr = bn.toFormat(null, null, BIGNUMBER_DEFAULT_FORMAT)
            if (numStr.indexOf('.') > -1) {
              numStr = numStr.replace(/0+?$/g, '')
              numStr = numStr.replace(/[.]$/g, '')
            }
            this.inputValue = numStr
          }
          if (!this.immeDivided) {
            this.currentValue = this.inputValue
              ? this.inputValue.trim().replace(/,/g, "")
              : this.inputValue;
          } else {
            this.currentValue = this.inputValue;
          }
          this.inputValue = this.currentValue;
        }
      }
      if (this.type == "cardNo") {
        this.inputValue = this.inputValue
          ? String(this.inputValue).replace(/\s+/g, "")
          : "";
      }
      this.bigShow(this.type, this.inputValue);
      if (this.focusAllSelect && this.type === "money") {
        this.$nextTick(() => {
          this.$refs.input.select();
        });
      }
      this.$emit("on-focus", e);
      this.dispatch('FormItem', 'on-form-focus')
    },
    focus() {
      this.$refs.input.focus();
    },
    select() {
      this.$refs.input.select();
    },
    valChange(event) {
      let value = event.target.value.trim().replace(/,/g, "");
      // if (event.type == 'input' && value.match(/^\-?\.?$|\.$/)) return; // prevent fire early if decimal. If no more input the change event will fire later
      // if (event.type == 'change' && Number(value) == this.currentValue) return; // already fired change for input event
      if (!isNaN(Number(value)) && Number(value) > this.max) {
        event.target.value = this.max.toString();
        value = this.max.toString();
      } else if (this.max == Infinity && value.match(this.integerRegExp)) {
        //匹配整数位数
        event.target.value = this.currentValue;
        value = this.currentValue;
      }
      if (this.isround) {
        //四舍五入模式下不做操作
      } else if (Number(this.suffixNum) === 0 && value.match(/\./)) {
        // 小数位为0时不允许输入小数点
        event.target.value = this.currentValue;
        value = this.currentValue;
      } else if (value.toString().match(this.precisionRegExp)) {
        //匹配小数位数；非四舍五入模式下，超过指定位数后不允许继续输入
        event.target.value = this.currentValue;
        value = this.currentValue;
      }

      if (this.nonNegative) {
        value = value.replace(/-/, "");
        event.target.value = value;
      }
      if (!isNaN(value) || value === "-") {
        this.currentValue = value;
      } else {
        event.target.value = this.currentValue;
        value = this.currentValue;
      }
      if (!this.immeDivided) {
        this.inputValue = value;
      } else {
        this.inputValue = divideNum(value)
      }
      this.bigShow(this.type, value);
      this.$emit("input", value);
      this.$emit("on-keyup", value);
      this.dispatch("FormItem", "on-form-change", value);
    },
    // 转换科学技术法为数值---Number(val)会在小数点7位后以科学计数法返回，影响格式化
    changeRexNum(val) {
      let e = String(val);
      let rex = /^([0-9])\.?([0-9]*)e-([0-9])/;
      if (!rex.test(e)) return val;
      let numArr = e.match(rex);
      let n = Number("" + numArr[1] + (numArr[2] || ""));
      let num =
        "0." + String(Math.pow(10, Number(numArr[3]) - 1)).substr(1) + n;
      return num.replace(/0*$/, ""); // 防止可能出现0.0001540000000的情况
    },
    // 修正val的小数位，val 为输入值，n为格式化位数【不用Number中的toFixed是因为超过7位小数Number会转换成科学计数法，格式化会报错，因此需要手动转换】
    toFixed(val, n) {
      if (n > 20 || n < 0) {
        throw new RangeError(
          "toFixed() digits argument must be between 0 and 20"
        );
      }
      // const number = this;
      if (isNaN(val) || val >= Math.pow(10, 21)) {
        return val.toString();
      }
      if (typeof n == "undefined" || n == 0) {
        return Math.round(val).toString();
      }
      let result = val.toString();
      const arr = result.split(".");
      // 整数的情况
      if (arr.length < 2) {
        result += ".";
        for (let i = 0; i < n; i += 1) {
          result += "0";
        }
        return result;
      }
      const integer = arr[0];
      const decimal = arr[1];
      if (decimal.length == n) {
        return result;
      }
      if (decimal.length < n) {
        for (let i = 0; i < n - decimal.length; i += 1) {
          result += "0";
        }
        return result;
      }
      result = integer + "." + decimal.substr(0, n);
      const last = decimal.substr(n, 1);

      // 四舍五入，转换为整数再处理，避免浮点数精度的损失
      if (parseInt(last, 10) >= 5) {
        const x = Math.pow(10, n);
        result = (Math.round(parseFloat(result) * x) + 1) / x;
        result = result.toFixed(n);
      }
      return result;
    },
    formatCardNo(value) {
      value = value.trim().replace(/,/g, "");
      value = value.replace(/[^0-9\.-]/g, "") || "";
      if (this.type == "cardNo") {
        value = value.replace("-", "").replace(".", "");
        if (value != null && value != "") {
          if (value.indexOf(".") != -1) {
            value = value.split(".")[0];
          }
          value = value ? value.match(/\d{1,4}/g).join("  ") : "";
        }
      }
      return value
    },
    formatNum(value, integerNum, suffixNum) {
      value = value.trim().replace(/,/g, "");
      value = value.replace(/[^0-9\.-]/g, "") || "";
      if (this.type == 'money') {
        let splitArr = value.split('.')
        // 整数部分
        let integer = splitArr.length > 0 ? splitArr[0] : value
        // 小数部分
        let fraction = splitArr.length > 1 ? splitArr[1] : ''
        let isNegative = value[0] === '-'
        // 按整数位数分割整数部分
        integer = cutNum(integer.replace('-', ''), integerNum)

        let bn = new BigNumber((isNegative ? '-' + integer : integer) + '.' + fraction)
        if (bn.isNaN()) return ''
        if (bn.isLessThan(this.minNum)) bn = this.minNum
        if (bn.isGreaterThan(this.maxNum)) bn = this.maxNum
        if (this.nonNegative && bn.isNegative()) {
          bn = bn.absoluteValue()
        }
        let format = this.divided || this.immeDivided ? BIGNUMBER_GROUPING_FORMAT : BIGNUMBER_DEFAULT_FORMAT
        value = this.isround ? bn.toFormat(Number(suffixNum), BigNumber.ROUND_HALF_UP, format)
          : bn.toFormat(Number(suffixNum), null, format)
        if (this.notFillin && value.indexOf('.') > -1) {
          value = value.replace(/0+?$/g, '')
          value = value.replace(/[.]$/g, '')
        }
      }
      return value
    },
    setBigData(value, arr) {
      let curInt, curSuffix, val1, val2;
      let isCarry = false;
      if (arr.length > 0) {
        curInt = arr[0].substr(0, this.integerNum);
        curSuffix = arr[1];
      } else {
        curInt = value;
      }
      val1 = curInt.slice(0, 8);
      val2 = curInt.slice(8);
      let curVal2 = curSuffix ? val2 + "." + curSuffix : val2;
      if (this.isround) {
        curVal2 = Number(curVal2).toFixedSelf(this.suffixNum);
      } else {
        curVal2 = this.fillZero(curVal2, Number(this.suffixNum));
        if (this.suffixNum > 0) {
          var arrNum = curVal2.split(".");
          curVal2 = arrNum[0] + "." + arrNum[1].substring(0, this.suffixNum);
        }
      }
      let arr2 = curVal2.split(".");
      if (
        (arr2.length > 0 && arr2[0].length > val2.length) ||
        (arr2.length == 0 && curVal2.length > val2.length)
      ) {
        isCarry = true;
        curVal2 = curVal2.slice(1);
      }
      val1 = isCarry ? Number(val1) + 1 : val1;
      value = val1 + curVal2;
      return value;
    },
    fillZero(number, bitNum) {
      /// 小数位不够，用0补足位数
      var f_x = parseFloat(number);
      if (isNaN(f_x)) {
        return;
      }
      var s_x = number.toString();
      var pos_decimal = s_x.indexOf(".");
      if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += ".";
      }
      while (s_x.length <= pos_decimal + bitNum && !this.notFillin) {
        s_x += "0";
      }
      if (bitNum == 0) {
        s_x = s_x.slice(0, pos_decimal);
      }
      return s_x;
    },
    setNum(value, suffixNum, integerNum) {
      if (isNaN(value)) return;
      if (suffixNum > 0) {
        var arrNum = value.split(".");
        var integerNumber = arrNum[0].substring(0, integerNum);
        value = Number(integerNumber) + "." + arrNum[1].substring(0, suffixNum);
      } else {
        value = Number(value) + "";
      }
      return value;
    },
    bigShow(type, value) {
      if (type == "money" && value) {
        if (this.bigTips) {
          //【TS:201908090448-资管业委会（资管）_钱佳华-【需求类型】需求【需求描述】需求背景：金额控件需要支持万】
          if(this.uppercaseMethod) {
            let val = changeTipsNum(value, this.integerNum, this.suffixNum, this.isround)
            this.bigNum = this.uppercaseMethod(val)
          }else {
            this.bigNum = changeTipsVal(
              value,
              this.integerNum,
              this.suffixNum,
              this.isround
            )
          }
          this.tipShow = Boolean(this.bigNum);
        }
      } else {
        this.tipShow = false;
      }
    },
    setNullStr() {
      let str = Number(this.suffixNum) === 0 ? "0" : "0.";
      for (var i = this.suffixNum - 1; i >= 0; i--) {
        str += "0";
      }
      return str;
    },
    initValue(val) {
      let formatVal
      if (
        (!val || Number(val) == 0) &&
        this.setNull &&
        this.type == "money" &&
        !this.focused
      ) {
        this.inputValue = this.setNullStr();
        formatVal = this.inputValue;
      } else {
        // 失焦的时候才格式化，避免不能增删小数位的问题
        if (this.notFormat || this.havefocused || !val) {
          if (this.havefocused && this.immeDivided && !this.notFormat && val) {
            formatVal = divideNum(val)
          } else {
            formatVal = val
          }
        } else {
          if (this.type === 'cardNo') {
            formatVal = this.formatCardNo(val)
          }
          if (this.type === 'money') {
            formatVal = this.formatNum(val, this.integerNum, this.suffixNum)
          }
        }
        this.inputValue = formatVal
      }
      // 失焦的时候才更新v-model绑定值，避免不能输入的问题
      !this.havefocused && this.$emit('input', this.cardFormatValue(formatVal.replace(/,/g, '')))
    },
    hover() {
      if (!this.hoverTips || !this.value || this.tipShow) return;
      this.bigShow(this.type, this.value);
    },
    out() {
      if (!this.focused) {
        this.tipShow = false;
      }
    }
  },
  beforeDestroy() {
    if (this.transfer) {
      this.$refs.drop.destroy();
    }
    off(this.$refs.reference, "keydown", this.keyDown);
  }
};
</script>
