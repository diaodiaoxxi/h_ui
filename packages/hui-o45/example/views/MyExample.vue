<template>
  <div>
    <h1>tabs</h1>
    <h-tabs ref="remove" type="line" @on-tab-remove="handleTabRemove1" showArrow arrowOnRight closable :iconLeftClassName="'icon-left icon-arrow'">
      <!--<h-tab-pane label="macOS" icon="social-apple">标签一的内容</h-tab-pane>-->
      <!--<h-tab-pane label="Windows" icon="social-windows">标签二的内容</h-tab-pane>-->
      <!--<h-tab-pane label="Google" icon="social-googleplus">标签二的内容</h-tab-pane>-->
      <!--<h-tab-pane label="Card" icon="card">标签三的内容</h-tab-pane>-->
      <!--<h-tab-pane label="Close" icon="close">标签三的内容</h-tab-pane>-->
      <!--<h-tab-pane label="Laptop" icon="laptop">标签三的内容</h-tab-pane>-->
      <h-tab-pane v-for="tab in tabs" :key="tab" :name="'标签' + tab" :label="'标签' + tab">
        标签{{ tab }}的内容
      </h-tab-pane>
    </h-tabs>
    <h-button type="ghost" @click="handleTabsAdd(true)" size="small" slot="extra">增加</h-button>
    <h-button type="ghost" @click="handleTabsAdd(false)" size="small" slot="extra">减少</h-button>
    <h1>msgBox</h1>
    <h-button type="primary" @on-click="changeShow">打开弹框</h-button>
    <h-msg-box v-model="show" escClose :mask-closable="false" isOriginal maximize width="600" height="400">
      <h-form ref="formValidate" :model="formValidate" cols="2" :label-width="80" showTipsOnlyFocus @on-check-failed="onCheckFailed">
        <h-form-item label="stockSelect" prop="curValue">
          <h-stock-select ref="singlesel" v-model="formValidate.curValue" :dropWidth="230" :maxDropWidth="300"
                          widthAdaption filterable remote :remote-method="remoteMethod"
                          @on-keydown="handleKeyDown">
            <h-select-block :data="dataList" :showCol="showCol" :colWidth="colWidth"></h-select-block>
          </h-stock-select>
          {{formValidate.curValue}}
        </h-form-item>
        <h-form-item label="singleSelect" prop="stockCode" required >
          <h-single-select ref="stockCode" v-model="formValidate.stockCode" class="curItemClass"
                           remote :loading="isLoading" :remote-method="remoteMethod1" transfer autoPlacement
                           widthAdaption :width="200" :dropWidth="220" :maxDropWidth="250" :accuFilter="true">
            <h-select-block :data="remoteData" :showCol="showCol" :colWidth="colWidth"></h-select-block>
          </h-single-select>
          {{formValidate.stockCode}}
        </h-form-item>
        <h-form-item label="multiSelect" prop="stockInfo" required>
          <h-multi-select ref="stockInfo" class="curItemClass" v-model="formValidate.stockInfo">
            <h-multi-block :data="bigData" :showCol="showCol" :colWidth="colWidth"></h-multi-block>
          </h-multi-select>
          {{formValidate.stockInfo}}
        </h-form-item>
        <h-form-item label="simpleSelect" prop="stockName" required :dependencies="['stockInfo', 'stockCode']">
          <h-simple-select v-model="formValidate.stockName" class="curItemClass" :tabindex="11" filterable multiple >
            <h-select-block :data="bigData"></h-select-block>
          </h-simple-select>
        </h-form-item>
        <h-form-item label="select" prop="city" required>
          <h-select v-model="formValidate.city" class="curItemClass" filterable multiple transfer>
            <h-option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</h-option>
          </h-select>
        </h-form-item>
        <h-form-item prop="time" label="time" required upward>
          <h-time-picker type="time" placeholder="选择时间" v-model="formValidate.time" class="curItemClass" ></h-time-picker>
        </h-form-item>
        <h-form-item prop="date" label="date" required>
          <h-date-picker type="date" placeholder="选择日期" autoPlacement showToday v-model="formValidate.date" class="curItemClass" iconVisible></h-date-picker>
        </h-form-item>
        <h-form-item label="fastdate" prop="fastdate" required>
          <h-fast-date class="curItemClass" v-model="formValidate.fastdate" format="yyyy-MM-dd"></h-fast-date>
        </h-form-item>
        <h-form-item label="input" prop="name" required :tipWidth="200">
          <h-input v-model="formValidate.name" placeholder="请输入姓名" class="curItemClass" ></h-input>
        </h-form-item>
        <h-form-item label="typefield" prop="mail" required>
          <h-typefield v-model="formValidate.mail" placeholder="请输入邮箱" class="curItemClass" ></h-typefield >
        </h-form-item>

        <h-form-item label="selecttree" prop="selecttree">
          <h-select-tree v-model="formValidate.selecttree" :data="selectTreeData" ref="selecttree"
                         checkIndeter filterable showCheckbox :firstValue="firstValue">
          </h-select-tree>
        </h-form-item>
        <h-form-item label="radio" prop="gender">
          <h-radio-group v-model="formValidate.gender">
            <h-radio label="male" class="curItemClass" >男</h-radio>
            <h-radio label="female" class="curItemClass" >女</h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item label="checkbox" prop="interest">
          <h-checkbox-group v-model="formValidate.interest">
            <h-checkbox label="吃饭" class="curItemClass" ></h-checkbox>
            <h-checkbox label="睡觉" class="curItemClass" ></h-checkbox>
            <h-checkbox label="跑步" class="curItemClass" ></h-checkbox>
            <h-checkbox label="看电影" class="curItemClass" ></h-checkbox>
          </h-checkbox-group>
        </h-form-item>

      </h-form>
      <div slot="footer">
        <h-button @click="clearAdd">options</h-button>
        <h-button type="primary" @click="focusFirst">聚焦第一项输入框</h-button>
        <h-button type="ghost" @click="reset">重置</h-button>
        <h-button type="primary" @click="submit">提交</h-button>
      </div>
    </h-msg-box>
    <h1>form</h1>
    <h-form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80" @on-check-failed="checkf">
      <h-form-item label="密码" prop="passwd">
        <h-input type="password" v-model="formCustom.passwd"></h-input>
      </h-form-item>
      <h-form-item label="确认密码" prop="passwdCheck" :dependencies="['passwd','age']">
        <h-input type="password" v-model="formCustom.passwdCheck"></h-input>
      </h-form-item>
      <h-form-item label="年龄" prop="age">
        <h-input type="text" v-model="formCustom.age" number></h-input>
      </h-form-item>
      <h-form-item label="simpleselect" prop="city" >
        <h-simple-select v-model="formCustom.city" filterable multiple >
          <h-select-block :data="bigData"></h-select-block>
        </h-simple-select>
      </h-form-item>
      <h-form-item label="select" prop="city1" >
        <h-select v-model="formCustom.city1" filterable multiple transfer>
          <h-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</h-option>
        </h-select>
      </h-form-item>
      <h-form-item label="日期">
        <h-date-picker type="daterange" ref="datepicker" placeholder="选择日期" :pickMode="'move'"
                       unlinkPanels autoPlacement v-model="formCustom.date" class="curItemClass"></h-date-picker>
      </h-form-item>
      <h-form-item>
        <h-button type="primary" @click="handleSubmit('formCustom')">提交</h-button>
        <h-button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</h-button>
      </h-form-item>
    </h-form>
    <h1>calendar</h1>
    <!--<h-calendar ref="calendar" :disableDate="disableDate" @on-select-change="getSelectDate">-->
    <!--</h-calendar>-->
    <h1>table</h1>
    <!--<h-table ref="table" :columns="columnsMulti" :data="dataMulti" :multiLevel="multiTitle"-->
             <!--canDrag canMove border :loading="loading" clickHeadSort isMulitSort height="300"-->
             <!--highlight-row :lastColWidth="150" :minDragWidth="40" :minColWidth="60"-->
             <!--@on-sort-change="sortchange" @on-scroll="scrollchange"></h-table>-->
    <!--<h-button @click="resetSort">重置排序</h-button>-->
    <h1>simpleTable</h1>
    <!--<h-simple-table ref="simpletable" :columns="columns1" :data="treedata" :addData="addData"-->
                    <!--:loading="loading" height="380" canDrag canMove border stripe rowSelectOnly>-->
    <!--</h-simple-table>-->
    <h1>simpleTreeGrid</h1>
    <!--<h-button type="primary" @click="expandAll">展开</h-button>-->
    <!--<h-button @click="fold">收起</h-button>-->
    <!--<h-simple-tree-gird :columns="columns1" ref="treeGrid" :data="treedata" canDrag :height="400" @on-expand="expand"></h-simple-tree-gird>-->
    <h1>editGird</h1>
    <h-edit-gird ref="repoEditGrid" border height="400" size="small" showEditInput sortChangeIndex
                 :columns="columnsEdit" :data="dataEdit" :disabled-hover="true" :highlight-row="true"
                 @on-money-blur="on_money_blur" @on-select="on_select" @on-select-cancel="on_select_cancel">
    </h-edit-gird>
  </div>
</template>
<script>
let bigTreeData = [];
for(var i=0;i<30;i++){
  let obj =  {
    id: i,
    name: '王小明'+i,
    age: 18,
    address: '北京市朝阳区芍药居',
    money: '120.00',
    cardId: '6223 ',
    city: '北京',
    dating:'2018',
    timing:'16',
    tree: '345',
  }
  bigTreeData.push(obj)
}
for(var i=30;i<100;i++){
  let obj =  {
    id: i,
    name: '王小明'+i,
    age: 18,
    address: '北京市朝阳区芍药居',
    money: '120.00',
    cardId: '6223 ',
    city: '北京',
    dating:'2018',
    timing:'16',
    _parentId:parseInt(Math.random()*30,10)
  }
  bigTreeData.push(obj)
}
for(var i=100;i<200;i++){
  let obj =  {
    id: i,
    name: '王小明'+i,
    age: 18,
    address: '北京市朝阳区芍药居',
    money: '120.00',
    cardId: '6223 ',
    city: '北京',
    dating:'2018',
    timing:'16',
    _parentId:Math.ceil(Math.random()*100),
  }
  bigTreeData.push(obj)
}
for(var i=200;i<400;i++){
  let obj =  {
    id: i,
    name: '王小明'+i,
    age: 18,
    address: '北京市朝阳区芍药居',
    money: '120.00',
    cardId: '6223 ',
    city: '北京',
    dating:'2018',
    timing:'16',
    _parentId:Math.ceil(Math.random()*200),
  }
  bigTreeData.push(obj)
}

let bigData = [];
for(let i=0;i<2000;i++){
  let obj={};
  obj.value=i;
  obj.label=i;
  bigData.push(obj);
}
var num = 0;

import { enterHandler1 } from '../../src/util/tools.js'
export default {
  data() {
    const validateMoney = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入金额'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.formCustom.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField('passwdCheck');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formCustom.passwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      // 模拟异步验证效果
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };

    return {
      value:'',
      bigData111:[
        {label:'A', label1:'good', value:'1'},
        {label:'B', label1:'morningddddddddddddddddddddddddddd', value:'2'},
        {label:'C', label1:'error', value:'3'},
        {label:'D', label1:'success', value:'4'},
      ],

      dataList: [],
      loading: false,
      show:false,
      isLoading: false,
      tabs:15,
      value: 'value0',
      cityList1: [],
      cityList: [
        {value: 'beijing', label: '北京市'},
        {value: 'shanghai', label: '上海市'},
        {value: 'shenzhen', label: '深圳市'},
        {value: 'hangzhou', label: '杭州市'},
        {value: 'nanjing', label: '南京市'},
        {value: 'chongqing', label: '重庆市'},
        {value: 'chengdu', label: '成都'},
        {value: 'xiamen', label: '厦门'},
        {value: '379134', label: '内蒙古自治区农联社'},
        {value: '382217', label: '广州证券王炽东'},
        {value: '380870', label: '广州证券穗利5号'},
        {value: '379482', label: '广州证券穗利2号'},
        {value: '380257', label: '广州证券穗利10号'},
        {value: '382296', label: '广州证券红棉安心回报半年盈'},
        {value: '379135', label: '内蒙古自治区农联社1'},
        {value: '382218', label: '广州证券王炽东2'},
        {value: '380871', label: '广州证券穗利5号3'},
        {value: '379483', label: '广州证券穗利2号4'},
        {value: '380258', label: '广州证券穗利10号5'},
        {value: '382297', label: '广州证券红棉安心回报半年盈6'},
      ],
      formValidate: {
        curValue: '',
        stockCode: '',
        stockInfo: '',
        stockName: [],
        selecttree: '',
        name: '',
        mail: '',
        city: [],
        gender: '',
        interest: [],
        tree: '',
        date: '',
        fastDate: '',
        time: '',
        desc: '',
        valueRemote1: [],
      },
      colWidth:['120','120'],
      showCol:['label1'],
      bigData: [
        { value: "1", label: "lab1",label1: "多列00000000000000000000000000000000000001"},
        { value: "2", label: "lab2",label1: "多列02"},
        { value: "3", label: "lab3",label1: "多列03"},
        { value: "11", label: "lab11",label1: "多列11"},
        { value: "12", label: "lab12",label1: "多列12"},
        { value: "13", label: "lab13",label1: "多列13"},
        { value: "21", label: "lab21",label1: "多列21"},
        { value: "22", label: "lab22",label1: "多列22"},
        { value: "23", label: "lab23",label1: "多列23"},
        { value: "30", label: "lab30",label1: "多列30"},
        { value: "value1", label: "label1",label1: "恒生电子" },
        { value: "value2", label: "label2",label1: "大华股份" },
        { value: "value3", label: "label3",label1: "海康威视" },
        { value: "value4", label: "label4",label1: "多列4" },
        { value: "value5", label: "label5",label1: "多列5" },
        { value: "value6", label: "label6",label1: "多列6" },
        { value: "value7", label: "label7",label1: "多列7" },
        { value: "value8", label: "label8",label1: "多列8" },
        { value: "value9", label: "label9",label1: "多列9" },
        { value: "value10", label: "label10",label1: "多列10" },
        { value: "value11", label: "000001",label1: "平安银行" },
        { value: "value12", label: "601600",label1: "中国铝业" },
        { value: "value13", label: "300056",label1: "三维丝" },
        { value: "value14", label: "002354",label1: "天神娱乐" },
        { value: "value15", label: "002016",label1: "世荣兆业" },
        { value: "value16", label: "501009",label1: "生物科技" },
        { value: "value17", label: "502014",label1: "一带一A" },
        { value: "value18", label: "513660",label1: "恒生通" },
        { value: "100", label: "100",label1: "label100" },
        { value: "1000", label: "1000",label1: "label1000" },
      ],
      remoteData:[],
      isstring:false,
      remotebigData:bigData,
      list: [],
      formCustom: {
        date: '',
        passwd: '',
        passwdCheck: '',
        age: '',
        city: [],
        city1: []
      },
      selectTreeData: [
        {
          title: 'parent',
          id: '1-0',
          expand: true,
          children: [
            {
              title: 'child1',
              id: '1-1',
              expand: true,
              children: [
                {
                  title: 'child1-1-1',
                  id: '1-1-1'
                },
                {
                  title: 'child1-1-2',
                  id: '1-1-2'
                }
              ]
            },
            {
              title: 'child2',
              id: '1-2',
              children: [
                {
                  title: 'child1-2-1',
                  id: '1-2-1'
                },
                {
                  title: 'child1-2-2',
                  id: '1-2-2'
                }
              ]
            }
          ] }
      ],
      firstValue: [],
      ruleCustom: {
        money: [
          { validator: validateMoney, triggger: 'blur'}
        ],
        passwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        age: [
          { validator: validateAge, trigger: 'blur' }
        ]
      },
      columnsMulti: [
        {
          align: "left",
          ellipsis: true,
          fixed: "left",
          key: "rule_id",
          title: "序号",
          width: 60
        },
        {
          ellipsis: true,
          fixed: "left",
          key: "complianceIndex",
          title: "指标",
          width: 300
        },
        {
          key: "asset_before_0",
          title: "试算前",
          width: 140
        },
        {
          key: "asset_after_0",
          title: "试算后",
          width: 140
        },
        {
          key: "left_amout_before_0",
          title: "试算前",
          width: 140
        },
        {
          key: "left_amout_after_0",
          title: "试算后",
          width: 140
        },
        {
          key: "asset_before_1",
          title: "试算前",
          width: 140
        },{
          key: "asset_after_1",
          title: "试算后",
          width: 140
        },{
          key: "left_amout_before_1",
          title: "试算前",
          width: 140
        },{
          key: "left_amout_after_1",
          title: "试算后",
          width: 140
        },{
          key: "asset_before_2",
          title: "试算前",
          width: 140
        },{
          key: "asset_after_2",
          title: "试算后",
          width: 140
        },{
          key: "left_amout_before_2",
          title: "试算前",
          width: 140
        },{
          key: "left_amout_after_2",
          title: "试算后",
          width: 140
        },{
          key: "asset_before_3",
          title: "试算前",
          width: 140
        },{
          key: "asset_after_3",
          title: "试算后",
          width: 140
        },{
          key: "left_amout_before_3",
          title: "试算前",
          width: 140
        },{
          key: "left_amout_after_3",
          title: "试算后",
          width: 140
        },{
          key: "asset_before_4",
          title: "试算前",
          width: 140
        },{
          key: "asset_after_4",
          title: "试算后",
          width: 140
        },{
          key: "left_amout_before_4",
          title: "试算前",
          width: 140
        },{
          key: "left_amout_after_4",
          title: "试算后",
          width: 140
        },{
          key: "asset_before_5",
          title: "试算前",
          width: 140
        },{
          key: "asset_after_5",
          title: "试算后",
          width: 140
        },{
          key: "left_amout_before_5",
          title: "试算前",
          width: 140
        },{
          key: "left_amout_after_5",
          title: "试算后",
          width: 140
        },{
          key: "asset_before_6",
          title: "试算前",
          width: 140
        },{
          key: "asset_after_6",
          title: "试算后",
          width: 140
        },{
          key: "left_amout_before_6",
          title: "试算前",
          width: 140
        },{
          key: "left_amout_after_6",
          title: "试算后",
          width: 140
        }
      ],
      dataMulti: [
//        {
//          name: '张小刚',
//          age: 25,
//          address: '北京市海淀区西二旗',
//          status:"hui让业务开发变得简单，给程序猿带来更快、更炫、更灵活、更轻松的开发体验；它更 让系统页面加载速度更快",
//          width60: 'width60',
//          width70: 'width70',
//          width80: 'width80',
//          width90: 'width90',
//          width100: 'width100',
//          width110: 'width110',
//          width120: 'width120',
//          notset: 'notset',
//        },
//        {
//          name: '李小红',
//          age: 30,
//          address: '上海市浦东新区世纪大道',
//          status:"hui让业务开发变得简单，给程序猿带来更快、更炫、更灵活、更轻松的开发体验；它更 让系统页面加载速度更快",
//        },
//        {
//          name: '周小伟',
//          age: 26,
//          address: '深圳市南山区深南大道',
//          status:"hui让业务开发变得简单，给程序猿带来更快、更炫、更灵活、更轻松的开发体验；它更 让系统页面加载速度更快",
//        },
//        {
//          name: '周小伟',
//          age: 26,
//          address: '深圳市南山区深南大道',
//          status:"hui让业务开发变得简单，给程序猿带来更快、更炫、更灵活、更轻松的开发体验；它更 让系统页面加载速度更快",
//        },
//        {
//          name: '周小伟',
//          age: 26,
//          address: '深圳市南山区深南大道',
//          status:"hui让业务开发变得简单，给程序猿带来更快、更炫、更灵活、更轻松的开发体验；它更 让系统页面加载速度更快",
//        }
      ],
      multiTitle:[
        [
          {title:'序号',col:1,rows:3,align:'center',className:'rule_id',fixed:'left'},
          {title:'指标',col:1,rows:3,align:'center',className:'complianceIndex',fixed:'left'},
          {title:'2009/01/09',cols:4,align:'center',className:'multi'},
          {title:'2009/01/10',cols:4,align:'center',className:'multi'},
          {title:'2009/01/11',cols:4,align:'center',className:'multi'},
          {title:'2009/01/12',cols:4,align:'center',className:'multi'},
          {title:'2009/01/13',cols:4,align:'center',className:'multi'},
          {title:'2009/01/14',cols:4,align:'center',className:'multi'},
          {title:'2009/01/15',cols:4,align:'center',className:'multi'},
        ],
        [
          {align: "center",cols: 2,title: "存量资产(元)"}, {align: "center",cols: 2,title: "剩余额度/缺口(元)"},
          {align: "center",cols: 2,title: "存量资产(元)"}, {align: "center",cols: 2,title: "剩余额度/缺口(元)"},
          {align: "center",cols: 2,title: "存量资产(元)"}, {align: "center",cols: 2,title: "剩余额度/缺口(元)"},
          {align: "center",cols: 2,title: "存量资产(元)"}, {align: "center",cols: 2,title: "剩余额度/缺口(元)"},
          {align: "center",cols: 2,title: "存量资产(元)"}, {align: "center",cols: 2,title: "剩余额度/缺口(元)"},
          {align: "center",cols: 2,title: "存量资产(元)"}, {align: "center",cols: 2,title: "剩余额度/缺口(元)"},
          {align: "center",cols: 2,title: "存量资产(元)"}, {align: "center",cols: 2,title: "剩余额度/缺口(元)"},
        ],
        [
          {align: "center",key: "asset_before_0",title: "试算前"},{align: "center",key: "asset_after_0",title: "试算后"},
          {align: "center",key: "left_amout_before_0",title: "试算前"},{align: "center",key: "left_amout_after_0",title: "试算后"},
          {align: "center",key: "asset_before_1",title: "试算前"},{align: "center",key: "asset_after_1",title: "试算后"},
          {align: "center",key: "left_amout_before_1",title: "试算前"},{align: "center",key: "left_amout_after_1",title: "试算后"},
          {align: "center",key: "asset_before_2",title: "试算前"},{align: "center",key: "asset_after_2",title: "试算后"},
          {align: "center",key: "left_amout_before_2",title: "试算前"},{align: "center",key: "left_amout_after_2",title: "试算后"},
          {align: "center", key: "asset_before_3", title: "试算前"},{align: "center", key: "asset_after_3", title: "试算后"},
          {align: "center", key: "left_amout_before_3", title: "试算前"},{align: "center", key: "left_amout_after_3", title: "试算后"},
          {align: "center", key: "asset_before_4", title: "试算前"},{align: "center", key: "asset_after_4", title: "试算后"},
          {align: "center", key: "left_amout_before_4", title: "试算前"},{align: "center", key: "left_amout_after_4", title: "试算后"},
          {align: "center", key: "asset_before_5", title: "试算前"},{align: "center", key: "asset_after_5", title: "试算后"},
          {align: "center", key: "left_amout_before_5", title: "试算前"},{align: "center", key: "left_amout_after_5", title: "试算后"},
          {align: "center", key: "asset_before_6", title: "试算前"},{align: "center", key: "asset_after_6", title: "试算后"},
          {align: "center", key: "left_amout_before_6", title: "试算前"},{align: "center", key: "left_amout_after_6", title: "试算后"}
        ]
      ],
      columns1: [
        {
          title: '姓名',
          key: 'name',
          width: 100,
          ellipsis:true,
          // hiddenCol:true,
        },
        {
          title: '年龄',
          width: 150,
          key: 'age',
          align: 'center',
          render: (h, params) => {
            return h('h-input', {
              props: {
                value: params.row.age
              }
            })
          }
        },
        {
          width: 150,
          title: '地址',
          ellipsis: true,
          key: 'address',
          align: 'right',
        },
        {
          title: '金额',
          width: 200,
          key: 'money',
          render: (h, params) => {
            return h('h-typefield', {
              props: {
                value: params.row.money
              }
            })
          }
        },
        {
          title: '卡号',
          width: 200,
          key: 'cardId',
        },
        {
          title: '地区',
          width: 200,
          key: 'city',
          render: (h, params) => {
            return h('div', [
              h('h-single-select', {
                props: {
                  transfer: true,
                  filterable: true,
                },
                on: {
                  'on-change': (e) => {
                    console.log(e)
                  },
                  'on-blur': (e) => {
                    console.log(e)
                  },
                }
              }, [h('h-select-block', {
                props: {
                  data:this.cityList
                }
              })])
            ]);
          }
        },
        {
          title: '下拉树',
          width: 200,
          key: 'tree',
        }
      ],
      addData: [],
      baseTreeData: [],
      treedata: [],
      columns2: [],
      data1: [{id: 0}, {id:1}, {id:2}],
      columnsEdit: [
        {
          type: 'selection',
          key: 'ind',
          index: 'ind'
        },
        {
          type: "money",
          placeholder: "请输入",
          title: "质押数量(万元)",
          key: "mortgage_amount",
          width: 150,
          align: 'center'
        },
        {
          type: "money",
          placeholder: "请输入",
          title: "折算比例(%)",
          key: "mortgage_ratio",
          width: 150,
          align: 'center'
        },
        {
          title: "折算金额(万元)",
          key: "mortgage_balance",
          width: 120,
          align: 'center',
          hiddenOther: true,
          render(h, params) {
            const {
              mortgage_amount,
              mortgage_ratio
            } = params.row
            let deal_balance = "--"
            deal_balance = +mortgage_amount * +mortgage_ratio
            return h('p', deal_balance)
          }
        },
        {
          type: 'text',
          title: '姓名',
          key: 'name',
          width: 200,
//          filterRE:/[^\d]/g,
          sortable:true,
          rule: { required: true, message: '姓名不能为空'},
        },
        {
          width:220,
          title: '年龄',
          render: (h, params) => {
            return h('div', [
              h('h-simple-select', {
                props: {
                  transfer: true,
                  filterable: true,
                  value: params.row.age
                },
                on: {
                  'on-change': (e) => {
                    console.log(e)
                  },
                  'on-blur': (e) => {
                    console.log(e)
                  },
                }
              }, [h('h-select-block', {
                props: {
                  data:this.selectList
                }
              })])
            ]);
          }
        },
        {
          type: 'card',
          title: '卡号',
          // width: 200,
          key: 'cardId',
          rule: { required: true, message: '卡号不能为空'},
        },
        {
          type: 'date',
          title: '日期',
          // width: 200,
          key: 'dating',
          dateType:'date',
          placement:'top',
          transfer:true,
          format: 'yyyy-MM-dd',
          rule:{ required: true, message: '请选择日期', trigger: 'blur,change' }
        },
        {
          type: 'time',
          title: '时间',
          // width: 200,
          transfer:true,
          placement:'top',
          key: 'timing',
          dateType:'time',
          format: 'HH:mm:ss',
          steps: [2,2,2],
          rule:{ required: true, message: '请选择时间', trigger: 'blur,change' }
        }
      ],
      selectList: [{label: 17, value: 17},{label:18,value:18},{label:19,value:19}],
      dataEdit: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
          money: '120.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1',
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          money: '130.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1'
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          money: '140.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          money: '150.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1'
        },
        {
          name: '黄小虎',
          age: 21,
          address: '深圳市南山区深南大道',
          money: '150.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1'
        },
        {
          name: '蒋小林',
          age: 30,
          address: '深圳市南山区深南大道',
          money: '150.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1'
        },
        {
          name: '姚小军',
          age: 31,
          address: '深圳市南山区深南大道',
          money: '150.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1'
        }
      ]
    }
  },
  methods: {
    remoteMethod(query, done) {
      let reqTime = new Date().getTime();
      this.reqTime = reqTime;
      console.log(query)
      setTimeout(()=>{
        if(this.reqTime != reqTime) {
          return;
        }
        new Promise(resolve=>{
          setTimeout(()=>{
            this.dataList = [ {
              value: '110002',
              label: '110002',
              label1: '国债110002',
            }, {
              value: '010007',
              label: '010007',
              label1: '国债010007',
            },{
              value: '011002',
              label: '0110002',
              label1: '国债0110002'
            }];
            done();
            this.$nextTick(()=>{
              this.formValidate.curValue = '110002'
            })
          }, 600)
        })
      }, 600)
    },
    handleKeyDown(e) {
      if(window.event.keyCode == 13) {
        this.$refs.select.blur();
      }
    },
    handleTabRemove1(name){
      console.log(this.tabs)
    },
    handleTabsAdd (status) {
      if(status){
        this.tabs ++;
        this.key = "标签" + this.tabs;
      }else{
        this.tabs --;
        this.$refs.remove.handleRemove(this.tabs,true);//this.tabs 表示tab的顺序数
      }
    },
    sortchange(e) {
      console.log(e)
    },
    scrollchange(x, y, z) {
      console.log(x, y, z)
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid, unpass) => {
        console.log(unpass)
        if (valid) {
          this.$Message.success('提交成功!');
        } else {
          this.$Message.error('表单验证失败!');
        }
      })
    },
    handleReset(name) {
//      this.$refs.single.clearSingleSelect()
//      this.$refs.datepicker.fold()
      this.$refs[name].resetFields();
    },
    remoteMethod1(query, done) {
      num = num + 1
      console.log('触发远程搜索:::' + num)
      if (query !== "") {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
          const list = this.bigData.map(item => {
            return item;
          });
          this.remoteData = list.filter(
            item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }, 200);

      } else {
        this.remoteData = [];
      }
      done()
    },
    changeShow(){
      this.$refs.formValidate.resetFields()
      this.show=true
//      this.formValidate.stockCode = 'value1'
      this.$refs.formValidate.firstNodeFocused()
//      this.formValidate.stockInfo = '1,11'
      this.firstValue = ['child1-1-1','child1-1-2','child1-2-1']
    },
    focusFirst() {
//        this.formValidate.stockCode = '1'
//        this.$refs.stockCode.focus()
      this.formValidate.stockInfo = '1,11'
      this.$refs.stockInfo.focus()
    },
    clearAdd() {
      this.cityList1 = []
      setTimeout(() => {
        this.cityList1 = this.cityList
      },500)
    },
    onCheckFailed(arr) {
      console.log(arr)
    },
    submit() {
      let _this = this
      this.$refs.formValidate.validate((valid, unpass) => {
        console.log(unpass)
        if (valid) {
          _this.$hMessage.success('提交成功!');
        } else {
          _this.$hMessage.error('表单验证失败!');
        }
      })
    },
    reset() {
      this.$refs.formValidate.resetFields()
    },
    ok () {
      this.$hMessage.info('点击了确定');
    },
    cancel () {
      this.$hMessage.info('点击了取消');
    },
    resetSort() {
//      this.$refs.table.resetAllSort()
      let newArr = this.columnsMulti.filter(item => item.title !== '试算后')
      this.columnsMulti = []
      this.multiTitle = []
      this.$nextTick(()=> {
        this.columnsMulti = newArr
        this.multiTitle = [
          [
            {title:'序号',col:1,rows:3,align:'center',className:'rule_id',fixed:'left'},
            {title:'指标',col:1,rows:3,align:'center',className:'complianceIndex',fixed:'left'},
            {title:'2009/01/09',cols:2,align:'center',className:'multi'},
            {title:'2009/01/10',cols:2,align:'center',className:'multi'},
            {title:'2009/01/11',cols:2,align:'center',className:'multi'},
            {title:'2009/01/12',cols:2,align:'center',className:'multi'},
            {title:'2009/01/13',cols:2,align:'center',className:'multi'},
            {title:'2009/01/14',cols:2,align:'center',className:'multi'},
            {title:'2009/01/15',cols:2,align:'center',className:'multi'},
          ],
          [
            {align: "center",cols: 1,title: "存量资产(元)"}, {align: "center",cols: 1,title: "剩余额度/缺口(元)"},
            {align: "center",cols: 1,title: "存量资产(元)"}, {align: "center",cols: 1,title: "剩余额度/缺口(元)"},
            {align: "center",cols: 1,title: "存量资产(元)"}, {align: "center",cols: 1,title: "剩余额度/缺口(元)"},
            {align: "center",cols: 1,title: "存量资产(元)"}, {align: "center",cols: 1,title: "剩余额度/缺口(元)"},
            {align: "center",cols: 1,title: "存量资产(元)"}, {align: "center",cols: 1,title: "剩余额度/缺口(元)"},
            {align: "center",cols: 1,title: "存量资产(元)"}, {align: "center",cols: 1,title: "剩余额度/缺口(元)"},
            {align: "center",cols: 1,title: "存量资产(元)"}, {align: "center",cols: 1,title: "剩余额度/缺口(元)"},
          ],
          [
            {align: "center",key: "asset_before_0",title: "试算前"},
            {align: "center",key: "left_amout_before_0",title: "试算前"},
            {align: "center",key: "asset_before_1",title: "试算前"},
            {align: "center",key: "left_amout_before_1",title: "试算前"},
            {align: "center",key: "asset_before_2",title: "试算前"},
            {align: "center",key: "left_amout_before_2",title: "试算前"},
            {align: "center", key: "asset_before_3", title: "试算前"},
            {align: "center", key: "left_amout_before_3", title: "试算前"},
            {align: "center", key: "asset_before_4", title: "试算前"},
            {align: "center", key: "left_amout_before_4", title: "试算前"},
            {align: "center", key: "asset_before_5", title: "试算前"},
            {align: "center", key: "left_amout_before_5", title: "试算前"},
            {align: "center", key: "asset_before_6", title: "试算前"},
            {align: "center", key: "left_amout_before_6", title: "试算前"}
          ]
        ]
      })
    },
    convertTreeData(rows, attributes) {
      var keyNodes = {}, parentKeyNodes = {};
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        row.id = row[attributes.keyField];
        row.parentId = row[attributes.parentKeyField];
        row.children = [];
        keyNodes[row.id] = row;
        if (parentKeyNodes[row.parentId]) { parentKeyNodes[row.parentId].push(row); }
        else { parentKeyNodes[row.parentId] = [row]; }
        var children = parentKeyNodes[row.id];
        if (children) { row.children = children; }
        var pNode = keyNodes[row.parentId];
        if (pNode) { pNode.children.push(row); }
      }
      return parentKeyNodes[attributes.rootParentId];
    },
    expandAll(){
      this.$refs.treeGrid.expandAll(true)
    },
    fold() {
      this.$refs.treeGrid.expandAll(false)
    },
    expand(data,status){
      console.log(data)
      console.log(status)
    },
    on_select(selection, row, index) {
      console.log('on_select selection:::', selection)
      console.log('on_select row:::', row)
      console.log('on_select index:::', index)
      this.$nextTick(() => {
//        this.$refs.repoEditGrid.cancelSelect(0)
      })
    },
    on_select_cancel(selection, row, index) {
      console.log('on_select_cancel selection:::', selection)
      console.log('on_select_cancel index:::', index)
    },
    on_money_blur(data, x, y) {
      console.log(data, x, y)
      if (typeof (this.$refs.repoEditGrid.rebuildData[y].mortgage_amount) == 'number') {
        data = data + '';
      } else {
        data = Number(data);
      }
      if(x === 1){
        this.$set(this.$refs.repoEditGrid.rebuildData[y], 'mortgage_amount', data)
      }else if(x === 2){
        this.$set(this.$refs.repoEditGrid.rebuildData[y], 'mortgage_ratio', data)
      }
    },
    disableDate(date) {
      return (
        date &&
        date.valueOf() < Date.now() &&
        date.valueOf() >= Date.now() - 86400000
      )
    },
    getSelectDate(e) {
      console.log(e)
    },
    checkf(a){
      console.log("------------",a);
    },
  },
  created() {
    window.isO45 = false
  },
  mounted() {
    document.addEventListener("keydown", event => {
      enterHandler1(this.$refs.formValidate, event);
//      enterHandler1(this.$refs.formCustom, event);
    })
    let attributes = {
      keyField: 'id',
      parentKeyField: '_parentId',
      expanded: 'expand',
      checked: 'checked',
      rootKey: 'root'
    }
    this.baseTreeData = this.convertTreeData(bigTreeData, attributes);
    this.treedata=this.baseTreeData;
  },
}
</script>
