<template>
  <div id="h-input1"
       class="wrapper">
    <!-- <h-input algin="left"  placeholder="请输入..." ref="test"></h-input> -->
    <!-- /^[0-9]+$/ -->
    <h-input algin="left"
             specialFilter
             placeholder="请输入..."
             ref="test"
             :specialDecimal="0"
             :maxlength="20"
             :tabindex="1"
             focusAllSelect></h-input>
    <Button @on-click="testClick(true)">获取焦点</Button>
    <Button @on-click="testClick(false)">失去焦点</Button>
    <h-input algin="center"
             :filterRE=/[^\d]/g
             placeholder="请输入..."
             :tabindex="1"
             @on-change="onChange"></h-input>
    <h-input algin="right"
             placeholder="请输入..."
             :tabindex="1"
             @mousedown.native="onChange"></h-input>
    <h2>基础用法</h2>
    <p>可以直接设置 style 来改变输入框的宽度</p>
    <h-input v-model="formData.value"
             placeholder="请输入..."
             style="width: 300px"
             focusAllSelect
             @on-change="keypress"></h-input>
    <h-input placeholder="请输入..."
             icon="unfold"
             style="width: 300px"
             disabled></h-input>
    <h-input value="你好呀我不好呀"
             placeholder="请输入..."
             style="width: 300px"
             readonly></h-input>
    <h-input placeholder="请输入..."
             style="width: 300px"
             :editable="false"></h-input>
    <h1>Type password密码</h1>
    <h-input type="password"
             strengthTip></h-input>

    <h-input type="password"
             style="width: 300px"
             strengthTip
             tipState="weak"></h-input>
    <h-input type="password"
             style="width: 300px"
             strengthTip
             tipState="general"></h-input>
    <h-input type="password"
             style="width: 300px"
             strengthTip
             tipState="complex"></h-input>
    <h2>文本域</h2>
    <p>通过设置属性 type 为 textarea 来使用文本域，用于多行输入。
      通过设置属性 rows 控制文本域默认显示的行数</p>
    <h-row>
      <h-col span="12">
        {{value5}}
        <h-input v-model="value5"
                showWordLimit
                :maxlength="100"
                limitTip="字"
                 type="textarea"
                 placeholder="请输入..."
                 focusAllSelect
                 :tabindex="1"
                 :disabled="disabled"
                 :canResize="false"></h-input>
      </h-col>
      <h-col span="12">
        <h-input v-model="value6"
                 type="textarea"
                 :rows="4"
                 :tabindex="1"
                 placeholder="请输入..."
                 :disabled="disabled"></h-input>
      </h-col>
    </h-row>
    <h2>适应文本高度的文本域</h2>
    <h-input v-model="value7"
             type="textarea"
             placeholder="请输入..."
             style="width: 200px"
             :disabled="true"
             ></h-input>
    <h-input v-model="value8"
             type="textarea"
             :autosize="{minRows: 2,maxRows: 5}"
             placeholder="请输入..."
             style="width: 200px"
             lengthByByte
             show-word-limit
             :maxlength="20"></h-input>
    <h2>输入框尺寸</h2>
    <h-input v-model="value1"
             size="large"
             placeholder="large size"
             style="width: 300px"></h-input>
    <h-input v-model="value2"
             placeholder="default size"
             style="width: 300px"></h-input>
    <h-input v-model="value3"
             size="small"
             placeholder="small size"
             style="width: 300px"></h-input>
    <h2>带Icon的输入框</h2>
    <p>通过 icon 属性可以在输入框右边加一个图标。<br>
      点击图标，会触发 on-click 事件。</p>
    <h-input v-model="value4"
             ref="input"
             icon="clock"
             placeholder="请输入..."
             style="width: 200px"
             @on-click="click"></h-input>
    <h2>复合型输入框</h2>
    <p>通过前置和后置的 slot 可以实现复合型的输入框。</p>
    <h-input v-model="value11">
      <span slot="prepend">http://</span>
      <span slot="append">.com</span>
    </h-input>
    <h-input v-model="value12">
      <h-select v-model="select1"
                slot="prepend"
                style="width: 80px">
        <h-option value="http">http://</h-option>
        <h-option value="https">https://</h-option>
      </h-select>
      <h-select v-model="select2"
                slot="append"
                style="width: 70px">
        <h-option value="com">.com</h-option>
        <h-option value="org">.org</h-option>
        <h-option value="io">.io</h-option>
      </h-select>
    </h-input>
    {{value12}}
    <br>
    <h-input v-model="value13">
      <h-select v-model="select3"
                slot="prepend"
                style="width: 80px">
        <h-option value="day">日活</h-option>
        <h-option value="month">月活</h-option>
      </h-select>
      <h-button slot="append"
                icon="search"></h-button>
    </h-input>
    <br>
    <h-input v-model="value14"
             :number="true">

    </h-input>

    <h1>2019/04/04 type = int</h1>
    <h-input type="int"
             v-model="v20190404.value"></h-input>
  </div>
</template>

<script>
export default {
  name: 'Input',
  data() {
    return {
      example: '<script><\/script>',
      disabled: false,
      formData: {
        value:''
      },
      value: '0.301',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '111111111111111112414',
      value6: '',
      value7:
        '11111111\r\n111111\r\n1111111111111111111111111111111\r\n111111111111111111111111111111111111111111111111111111111111111111\r\n1111111111111111111111111111111111111111111111111111',
      value8: '',
      value11: '',
      value12: '',
      value13: '',
      value14: '',
      select1: 'http',
      select2: 'com',
      select3: 'day',
      readtrue: true,
      readfalse: false,
      requiredtrue: true,
      requiredfalse: false,
      disabledtrue: true,
      disabledfalse: false,
      requiredRule: ['required'],
      phoneRule: ['isPhone'],
      emailRule: ['isEmail'],
      numberRule: ['required', 'isNumber'],
      regRule: [
        {
          test: /^[a-zA-Z]+$/,
          message: '不全是字母'
        }
      ],
      funRule: [
        {
          test: validFunc,
          message: '(函数验证)必须为1'
        }
      ],
      rules: [
        'required',
        { test: /^[a-zA-Z]+$/, message: '不全是字母' },
        {
          test: validFunc,
          message: '(函数验证)必须为1'
        }
      ],
      icon: 'close',
      v20190404: {
        value: 0
      }
    }
  },
  methods: {
    onChange(e) {
      console.log(e.target.value)
    },
    testClick(val) {
      if (val) {
        this.$refs.test.focus()
      } else {
        this.$refs.test.blur()
      }
    },
    click() {
      console.log(this.$refs.input)
      this.$refs.input.focus()
    },
    keypress(event) {
      this.$set(this.formData, 'value', event.target.value)
      console.log(this.formData)
      // console.log("案件事件");
    }
  },
  watch: {
    value14() {
      // console.log(this.value14);
    },
    'v20190404.value'(nv) {
      console.log(nv)
    }
  },
  mounted() {
    this.formData.value = '123'
    // this.$set(this.formData,'value','123')
  }
}
function validFunc(val) {
  if (val == 1) {
    return true
  } else {
    return false
  }
}
</script>
