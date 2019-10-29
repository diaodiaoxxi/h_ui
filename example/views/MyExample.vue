<template>
  <div>
    <h1>Grid</h1>
    <!--<h-row>-->
      <!--<h-col span="12" style="background:red">col-12</h-col>-->
      <!--<h-col span="12" style="background:blue">col-12</h-col>-->
    <!--</h-row>-->
    <!--<br>-->
    <!--<h-row>-->
      <!--<h-col span="8" style="background:yellow">col-8</h-col>-->
      <!--<h-col span="8" style="background:green">col-8</h-col>-->
      <!--<h-col span="8" style="background:pink">col-8</h-col>-->
    <!--</h-row>-->
    <!--<br>-->
    <!--<h-row>-->
      <!--<h-col span="6" style="background:gray">col-6</h-col>-->
      <!--<h-col span="6" style="background:black">col-6</h-col>-->
      <!--<h-col span="6" style="background:grey">col-6</h-col>-->
      <!--<h-col span="6" style="background:black">col-6</h-col>-->
    <!--</h-row>-->
    <br>
    <h1>tabs</h1>
    <!--<h-tabs ref="remove" type="line" @on-tab-remove="handleTabRemove1" showArrow arrowOnRight closable :iconLeftClassName="'icon-left icon-arrow'">-->
      <!--<h-spin size="large"></h-spin>-->
      <!--<h-tab-pane v-for="tab in tabs" :key="tab" :name="'标签' + tab" :label="'标签' + tab">-->
        <!--标签{{ tab }}的内容-->
      <!--</h-tab-pane>-->
    <!--</h-tabs>-->
    <!--<h-button type="ghost" @click="handleTabsAdd(true)" size="small" slot="extra">增加</h-button>-->
    <!--<h-button type="ghost" @click="handleTabsAdd(false)" size="small" slot="extra">减少</h-button>-->
    <br>
    <h1>buttonGroup</h1>
    <h-button-group>
      <h-button @on-click="handleShowBox" style="margin-right: 10px;">打开弹窗</h-button>
      <h-button type="primary" @on-click="changeShow">打开弹框</h-button>
    </h-button-group>
    <h1>checkboxGroup</h1>
    <h-checkbox-group v-model="btncheck">
      <h-checkbtn value="twitter" label="Twitter" disabled>
      </h-checkbtn>
      <h-checkbtn value="facebook" label="facebook">
        <span>Facebook</span>
      </h-checkbtn>
      <h-checkbtn value="github" label="github" icon="close">
        <span>Github</span>
      </h-checkbtn>
      <h-checkbtn value="snapchat" label="snapchat">
        <span>Snapchat</span>
      </h-checkbtn>
    </h-checkbox-group>
    <h-msg-box
      v-model="showBox"
      title="普通的Modal对话框标题"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>{{curValue}}</p>
      <h-single-select ref="singlesel" v-model="curValue" :dropWidth="230" :maxDropWidth="300"
                       widthAdaption filterable remote :remote-method="remoteMethod"
                       showFirstLabelOnly :accuFilter="false" :animated="false"
                       @on-keydown="handleKeyDown">
        <h-select-block :data="bigData" :showCol="showCol" :colWidth="colWidth"></h-select-block>
      </h-single-select>
    </h-msg-box>
    <h-msg-box v-model="show" escClose :mask-closable="false" maximize width="600" height="400">
      <h-form ref="formValidate" :model="formValidate" cols="2" :label-width="80" showTipsOnlyFocus>
        <h-form-item label="stockCode" prop="stockCode" required>
          <h-single-select ref="stockCode" v-model="formValidate.stockCode" placeholder="请选择所在地" class="curItemClass"
                           remote :loading="isLoading" :remote-method="remoteMethod1" transfer autoPlacement
                           :width="200" widthAdaption :dropWidth="220" :maxDropWidth="250"
                           @on-keydown="handlekeydown" @on-change="handlevaluechange">
            <h-select-block :data="remoteData" :showCol="showCol" :colWidth="colWidth"></h-select-block>
          </h-single-select>
          {{formValidate.stockCode}}
        </h-form-item>
        <h-form-item label="input" prop="name" required :tipWidth="200">
          <h-input v-model="formValidate.name" placeholder="请输入姓名" class="curItemClass" ></h-input>
        </h-form-item>
        <h-form-item prop="date" label="date" required>
          <h-date-picker type="date" placeholder="选择日期" showToday v-model="formValidate.date" class="curItemClass"></h-date-picker>
        </h-form-item>
        <h-form-item prop="time" label="time" required upward>
          <h-time-picker type="time" placeholder="选择时间" v-model="formValidate.time" class="curItemClass" ></h-time-picker>
        </h-form-item>

        <!--<h-form-item label="fastdate" prop="fastdate" required>-->
          <!--<h-fast-date class="curItemClass" v-model="formValidate.fastdate" format="yyyy-MM-dd"></h-fast-date>-->
        <!--</h-form-item>-->
        <!--<h-form-item label="typefield" prop="mail" required>-->
          <!--<h-typefield v-model="formValidate.mail" placeholder="请输入邮箱" class="curItemClass" ></h-typefield >-->
        <!--</h-form-item>-->
        <!--<h-form-item label="select" prop="city">-->
          <!--<h-select v-model="formValidate.city" class="curItemClass" filterable transfer placement="top" @on-keyup="selectKeyup">-->
            <!--<h-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</h-option>-->
          <!--</h-select>-->
        <!--</h-form-item>-->
        <h-form-item label="selecttree" prop="selecttree">
          <h-select-tree v-model="formValidate.selecttree" :data="selectTreeData" ref="selecttree"
                         checkIndeter filterable	showCheckbox :firstValue="firstValue">
          </h-select-tree>
          {{formValidate.selecttree}}
        </h-form-item>
        <!--<h-form-item label="tree" prop="tree">-->
          <!--<h-select-tree v-model="formValidate.tree" class="curItemClass" :data="treeData" ref="tree" filterable></h-select-tree>-->
        <!--</h-form-item>-->
        <!--<h-form-item label="radio" prop="gender">-->
          <!--<h-radio-group v-model="formValidate.gender">-->
            <!--<h-radio label="male" class="curItemClass" >男</h-radio>-->
            <!--<h-radio label="female" class="curItemClass" >女</h-radio>-->
          <!--</h-radio-group>-->
        <!--</h-form-item>-->
        <!--<h-form-item label="checkbox" prop="interest">-->
          <!--<h-checkbox-group v-model="formValidate.interest">-->
            <!--<h-checkbox label="吃饭" class="curItemClass" ></h-checkbox>-->
            <!--<h-checkbox label="睡觉" class="curItemClass" ></h-checkbox>-->
            <!--<h-checkbox label="跑步" class="curItemClass" ></h-checkbox>-->
            <!--<h-checkbox label="看电影" class="curItemClass" ></h-checkbox>-->
          <!--</h-checkbox-group>-->
        <!--</h-form-item>-->
      </h-form>
      <div slot="footer">
        <h-button type="primary" @click="focusFirst">聚焦第一项输入框</h-button>
        <h-button type="ghost" @click="reset">重置</h-button>
        <h-button type="primary" @click="submit">提交</h-button>
      </div>
    </h-msg-box>
    <br>
    <h1>form</h1>
    <h-form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
      <h-form-item label="股票代码" prop="stockCode">
        <h-single-select class="curItemClass" v-model="formCustom.stockCode" placeholder="请选择..."
                         widthAdaption autoPlacement :animated="false" keepInputValue
                         ref="single">
          <h-select-block :data="bigData" :showCol="showCol" :colWidth="colWidth"></h-select-block>
        </h-single-select>
        {{formCustom.stockCode}}
      </h-form-item>
      <h-form-item label="金额框" prop="face_balance">
        <h-typefield class="curItemClass" v-model="formCustom.face_balance"
                     nonNegative divided focusAllSelect :min="0" :max="1000000"
                     integerNum="10" suffixNum="2"  type="money" :step="10">
        </h-typefield>
      </h-form-item>

      <h-form-item label="密码" prop="passwd" required>
        <h-input class="curItemClass" type="password" v-model="formCustom.passwd"></h-input>
      </h-form-item>
      <h-form-item label="确认密码" prop="passwdCheck" required>
        <h-input class="curItemClass" type="password" v-model="formCustom.passwdCheck"></h-input>
      </h-form-item>
      <h-form-item label="年龄" prop="age" required>
        <h-input type="text" v-model="formCustom.age" number></h-input>
      </h-form-item>
      <h-form-item label="日期">
        <h-date-picker type="daterange" ref="datepicker" placeholder="选择日期" :pickMode="'move'" autoPlacement v-model="formCustom.date" class="curItemClass"></h-date-picker>
      </h-form-item>
      <h-form-item>
        <h-button type="primary" @click="handleSubmit('formCustom')">提交</h-button>
        <h-button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px;">重置</h-button>
      </h-form-item>
    </h-form>
    <h1>calendar</h1>
    <!--<h-calendar ref="calendar" :disableDate="disableDate" @on-select-change="getSelectDate">-->
    <!--</h-calendar>-->
    <h1>table</h1>
    <!--<h-table :columns="columns" :data="data0" :summationData="summationData1" :loading="loading"-->
             <!--border :highlight-row="true"  headAlgin="center" bodyAlgin="left"-->
             <!--canDrag :lastColWidth="150" :minDragWidth="40" :minColWidth="60" notSetWidth autoHeadWidth-->
             <!--@on-sort-change="sortchange" @on-table-width-change="widthChange">-->
      <!--<span slot="loading">我是自定义加载！！！</span>-->
    <!--</h-table>-->
    <h1>tree</h1>
    <!--<h-tree :data="baseData" show-checkbox></h-tree>-->
    <h1>simpleTreeGrid</h1>
    <!--<h-button type="primary" @click="expandAll">展开</h-button>-->
    <!--<h-button @click="fold">收起</h-button>-->
    <!--<h-simple-tree-gird :columns="columns1" ref="treeGrid" :data="treedata" canDrag :height="250" @on-expand="expand"></h-simple-tree-gird>-->
    <h1>editGird</h1>
    <!--<h-edit-gird ref="repoEditGrid" border height="400" size="small" showEditInput-->
                 <!--:columns="columnsEdit" :data="dataEdit" :disabled-hover="true" :highlight-row="true"-->
                 <!--@on-money-blur="on_money_blur">-->
    <!--</h-edit-gird>-->
    <h-edit-gird ref="editGird" :columns="columns2" :data="tData" size="small" :disabled-hover="true" :highlight-row="true"
                 @on-current-change="click1" :showEditInput="true" height="200" :option="options1" :treeOption="treeOption" ></h-edit-gird>
  </div>
</template>
<script>
  var tData= [
    {
      name: '王小明',
      age: 18,
      address: '北京市朝阳区芍药居',
      money: '120.00',
      cardId: '6223 5678 1234 5678',
      city: '北京',
      dating:'2018-01-09T16:00:00.000Z',
      timing:'16:00:00.00',
      tree:'leaf1'
      // _highlight: true//默认选择当前项
    },
    {
      name: '张小刚',
      age: 25,
      address: '北京市海淀区西二旗',
      money: '130.00',
      cardId: '6223 5678 1234 5678',
      city: '北京',
      dating:'2018-01-09T16:00:00.000Z',
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
      dating:'2018-01-09T16:00:00.000Z',
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
      dating:'2018-01-09T16:00:00.000Z',
      timing:'16:00:00.00',
      tree:'leaf1'
    },
    {
      name: '张小刚',
      age: 25,
      address: '北京市海淀区西二旗',
      money: '130.00',
      cardId: '6223 5678 1234 5678',
      city: '北京',
      dating:'2018-01-09T16:00:00.000Z',
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
      dating:'2018-01-09T16:00:00.000Z',
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
      dating:'2018-01-09T16:00:00.000Z',
      timing:'16:00:00.00',
      tree:'leaf1'
    }
  ];
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

import { enterHandler1 } from "../../src/util/tools.js"
export default {
  data () {
    const validateMoney = (rule, value, callback) => {
      console.log('face_balance validator', value)
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
      console.log('age', value)
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
      curValue: '',
      dataList: [],
      btncheck:[],
      loading: false,
      showBox: false,
      show:false,
      isLoading: false,
      tabs:15,
      value:'value0',
      cityList: [
//        {value: 'beijing', label: '北京市'},
//        {value: 'shanghai', label: '上海市'},
//        {value: 'shenzhen', label: '深圳市'},
//        {value: 'hangzhou', label: '杭州市'},
//        {value: 'nanjing', label: '南京市'},
//        {value: 'chongqing', label: '重庆市'},
//        {value: 'chengdu', label: '成都'},
//        {value: 'xiamen', label: '厦门'},
        {value: '379134', label: '内蒙古自治区农联社'},
        {value: '382217', label: '广州证券王炽东'},
        {value: '380870', label: '广州证券穗利5号'},
        {value: '379482', label: '广州证券穗利2号'},
        {value: '380257', label: '广州证券穗利10号'},
        {value: '382296', label: '广州证券红棉安心回报半年盈'},
      ],
      formValidate: {
        stockCode: "",
        selecttree: '',
        name: "",
        mail: "",
        city: '',
        gender: "",
        interest: [],
        tree: '',
        date: "",
        fastDate: "",
        time: "",
        desc: "",
        valueRemote1: [],
      },
      colWidth:['150','150'],
      showCol:['label1'],
      bigData: [
        { value: "1", label: "1",label1: "多列00000000000000000000000000000000000001"},
        { value: "2", label: "2",label1: "多列02"},
        { value: "3", label: "3",label1: "多列03"},
        { value: "11", label: "11",label1: "多列11"},
        { value: "12", label: "12",label1: "多列12"},
        { value: "13", label: "13",label1: "多列13"},
        { value: "21", label: "21",label1: "多列21"},
        { value: "22", label: "22",label1: "多列22"},
        { value: "23", label: "23",label1: "多列23"},
        { value: "30", label: "30",label1: "多列30"},
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
        face_balance: '',
        passwd: '',
        passwdCheck: '',
        age: '',
        stockCode: '',
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
        face_balance: [{
          validator: (rule, value, callback)=>{
            console.log('face_balance validator', value)
            let tmpVal = parseFloat(value);
            // let tmpVal = parseFloat((this.formItem.face_balance+'').replace(',', ''));
            if(isNaN(tmpVal) || tmpVal == 0 || tmpVal % 10 != 0) {

            } else {
              callback();
            }
          }, trigger:'blur,change'}
        ],
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
      columns: [
        {
          title: '',
          key: 'index',
          type: 'index'
        },
        {
          title: '姓名',
          key: 'name',
          fixed: 'left',
          width: 150,
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  name: 'person'
                }
              }),
              h('strong', params.row.name)
            ])
          }
        },
        {
          title: '年龄',
          width:150,
          key: 'age',
          ellipsis:true,
          sortable: true
        },
        {
          title: '省份',
          width:150,
          key: 'province',
          ellipsis:true,
          type: 'html'
        },
        {
          title: '市区',
          width:150,
          key: 'city',
          ellipsis:true,
        },
        {
          type: 'text',
          width: 150,
          title: '地址',
          key: 'address',
          ellipsis:true
        },
        {
          title: '邮编',
          width:150,
          key: 'zip',
          ellipsis:true,
          headerTooltip: true
        },
        {
          title: '邮编1',
          width:150,
          key: 'zip',
          ellipsis:true,
          headerTooltip: true
        },
        {
          title: '操作',
          key: 'action',
//          fixed: 'right',
//          hiddenCol: true,
          render: (h, params) => {
            return h('div', [
              h('h-button', {
                props: {
                  type: 'info',
                  size: 'small'
                }
              }, '查看'),
              h('h-button', {
                props: {
                  type: 'text',
                  size: 'small'
                }
              }, '编辑')
            ])
          }
        }
      ],
      data0: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
          province: '<a href="javascript:alert(123456);">北京市</a>',
          city: '朝阳区',
          zip: 100000
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          province: '北京市',
          city: '海淀区',
          zip: 100000
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          province: '上海市',
          city: '浦东新区',
          zip: 100000
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          province: '广东',
          city: '南山区',
          zip: 100000
        },
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
          province: '北京市',
          city: '朝阳区',
          zip: 100000
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          province: '北京市',
          city: '海淀区',
          zip: 100000
        }
      ],
      summationData1: [{
        name: '汇总',
        age: 123123123,
        city: 'gtryjuyhgfg',
        province: 'fsegergeryh',
        address: 'qqweqwe'
      }],
      baseData: [{
        expand: true,
        checked: true,
        title: 'parent 1',
        children: [{
          title: 'parent 1-0',
          expand: true,
          disabled: true,
          children: [{
            expand: true,
            checked: true,
            disabled: true,
            title: 'leaf',
            disableCheckbox: true
          }, {
            title: 'leaf',
          }]
        }, {
          title: 'parent 1-1',
          expand: true,
          checked: true,
          children: [{
            title: '<span style="color: red">leaf</span>',
          }, {
            title: 'leaf2',
          }]
        }]
      }],
      columns1: [
        {
          title: '姓名',
          key: 'name',
          width: 300,
          ellipsis:true,
          fixed: 'left'
        },
        {
          title: '年龄',
          width: 200,
          key: 'age',
          align: 'center',
        },
        {
          width: 100,
          title: '地址',
          ellipsis: true,
          key: 'address',
          align: 'right',
        },
        {
          title: '金额',
          width: 200,
          key: 'money',
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
          multiple:false,
        },
        {
          title: '下拉树',
          width: 200,
          key: 'tree',
        }
      ],
      baseTreeData: [],
      treedata: [],
//      columns2: [],
      tData: tData,
      columns2: [
        {
          type: 'text',
          title: '姓名',
          key: 'name',
          width: 200,
          rule: [{ required: true, message: '姓名不能为空'},
            {validator:function (rule, val, callback) {
              if(val == 'test'){
                callback()
              }else{
                callback(new Error("不是test"))
              }
            }}
          ]
        },
        {
          type: 'text',
          title: '年龄',
          width: 200,
          key: 'age',
          hiddenCol:false,
          rule:  [
            { required: true, message: '姓名不能为空' },
            { pattern: /^-?[1-9]\d*$|^0/, message: '只能输入数字格式' }
          ],
        },
        {
          type: 'textArea',
          rows: 2,
          width: 200,
          title: '地址',
          key: 'address',
          rule: { required: true, message: '地址不能为空'},
        },
        {
          type: 'money',
          title: '金额',
          width: 200,
          integerNum: 3,
          suffixNum: 2,
          bigTips: true,
          key: 'money',
          rule: { required: true, message: '金额不能为空'},
        },
        {
          type: 'card',
          title: '卡号',
          width: 200,
          key: 'cardId',
          rule: { required: true, message: '卡号不能为空'},
        },
        {
          type: 'select',
          title: '地区',
          width: 200,
          key: 'city',
          multiple:false,
          option: [
            {value:"北京"},
            {value:"上海"},
            {value:"天津"},
            {value:"沈阳"},
            {value:"杭州"},
            {value:"武汉"},
          ],
          rule:{ required: true, message: '请选择城市', trigger: 'blur,change' }
        },
        {
          type: 'date',
          title: '日期',
          width: 200,
          key: 'dating',
          dateType:'date',
          format: 'yyyy-MM-dd',
          rule:{ required: true, message: '请选择日期', trigger: 'blur,change' }
        },
        {
          type: 'time',
          title: '时间',
          width: 200,
          key: 'timing',
          dateType:'time',
          format: 'HH:mm:ss',
          steps: [],
          rule:{ required: true, message: '请选择时间', trigger: 'blur,change' }
        },
        {
          type: 'selectTree',
          title: '下拉树',
          width: 200,
          key: 'tree',
          treeData:[{
            expand: true,
            title: 'parent 1',
            children: [{
              title: 'parent 1-0',
              expand: true,
              children: [{
                title: 'leaf1',
                disableCheckbox: true
              }, {
                title: 'leaf2',
              }]
            }, {
              title: 'parent 1-1',
              expand: true,
              checked: true,
              children: [{
                title: 'leaf3',
              }]
            }]
          }],
          showCheckbox: false,
          checkStrictly: false,
          rule:{ required: true, message: '请选择子节点', trigger: 'blur,change' }
        }
      ],
      data1: [{id: 0}, {id:1}, {id:2}],
      columnsEdit: [
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
          filterRE:/[^\d]/g,
          sortable:true,
          rule: { required: true, message: '姓名不能为空'},
        },
        {
          width:220,
          title: '年龄',
          key: 'age',
          render: (h, params) => {
            return h('div', [
              h('h-simple-select', {
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
//          transfer:true,
          placement:'top',
          key: 'timing',
          dateType:'time',
          format: 'HH:mm:ss',
          steps: [2,2,2],
          rule:{ required: true, message: '请选择时间', trigger: 'blur,change' }
        }
      ],
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
          name: '周小伟',
          age: 26,
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
    handleShowBox() {
      this.showBox = true
      this.curValue = 'value1'
      this.$refs.singlesel.focus()

    },
    remoteMethod(query, done) {
      let reqTime = new Date().getTime();
      this.reqTime = reqTime;
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
            } ];
//            this.$nextTick(()=>{ this.curValue = '110002'; })
            done();
            this.curValue = '110002';
          }, 800)
        })
      }, 600)
    },
    handleKeyDown(e) {
      if(window.event.keyCode == 13) {
        this.$refs.select.blur();
      }
    },
    selectKeyup(val, e) {
      console.log(val)
      console.log(e)
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
    widthChange(e) {
      console.log(e)
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('提交成功!');
        } else {
          this.$Message.error('表单验证失败!');
        }
      })
    },
    handleReset (name) {
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
        }, 800);

      } else {
        this.remoteData = [];
      }
      done()
    },
    handlekeydown(val, e) {
//      console.log(val)
//      console.log(e)
    },
    handlevaluechange(val) {
      console.log('v-model:::'+this.formValidate.stockCode)
      console.log('onchange:::'+val)
    },
    changeShow(){
      this.$refs.formValidate.resetFields()
      this.show=true
//      this.formValidate.stockCode = 'value1'
      this.$refs.formValidate.firstNodeFocused()
      this.firstValue = ['child1-1-1','child1-1-2','child1-2-1']
    },
    focusFirst() {
      this.formValidate.stockCode = '1'
      this.$refs.stockCode.focus()
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
    on_money_blur(data, x, y) {
      if (typeof (this.$refs.repoEditGrid.rebuildData[y].mortgage_amount) == "number") {
        data = data + '';
      } else {
        data = Number(data);
      }
      if(x === 0){
        this.$set(this.$refs.repoEditGrid.rebuildData[y], "mortgage_amount", data)
      }else if(x === 1){
        this.$set(this.$refs.repoEditGrid.rebuildData[y], "mortgage_ratio", data)
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
    }
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
