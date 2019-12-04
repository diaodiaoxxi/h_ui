<template>
  <div>
      <h-form ref="formItem1" :model="formItem1" :compareModel="formItem2" :label-width="80" errorFocus cols="2" onlyBlurRequire>
        <h-form-item label="输入框" prop="input" required>
          <h-input v-model="formItem1.input" placeholder="请输入" class="curItemClass"></h-input>
        </h-form-item>
        <h-form-item label="特殊日期" required prop="fatdate">
          <h-fast-date v-model="formItem1.fatdate" class="curItemClass" showToday></h-fast-date>
        </h-form-item>
        <h-form-item label="金额框" prop="money" required>
          <h-typefield class="curItemClass" v-model="formItem1.money" nonNegative divided bigTips focusAllSelect
                       integerNum="10" suffixNum="2"  type="money">
          </h-typefield>
        </h-form-item>
        <h-form-item label="选择器" prop="select" required>
          <h-simple-select class="curItemClass" v-model="formItem1.select" filterable>
            <h-select-block></h-select-block>
            <h-option value="beijing">北京市</h-option>
            <h-option value="shanghai">上海市</h-option>
            <h-option value="shenzhen">深圳市</h-option>
          </h-simple-select>
        </h-form-item>
        <h-form-item label="日期控件">
          <h-row>
            <h-col span="11">
              <h-form-item prop="date" required>
                <h-datePicker type="date" iconVisible placeholder="选择日期" class="curItemClass" v-model="formItem1.date"></h-datePicker>
              </h-form-item>
            </h-col>
            <h-col span="2" style="text-align: center">-</h-col>
            <h-col span="11">
              <h-form-item prop="time" required>
                <h-timePicker type="time" placeholder="选择时间" class="curItemClass" v-model="formItem1.time"></h-timePicker>
              </h-form-item>
            </h-col>
          </h-row>
        </h-form-item>

        <h-form-item label="单选框" prop="radio" required>
          <h-radio-group v-model="formItem1.radio">
            <h-radio label="male">男</h-radio>
            <h-radio label="female">女</h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item label="多选框" prop="checkbox" required>
          <h-checkbox-group v-model="formItem1.checkbox">
              <h-checkbox label="吃饭"></h-checkbox>
              <h-checkbox label="睡觉"></h-checkbox>
              <h-checkbox label="跑步"></h-checkbox>
              <h-checkbox label="看电影"></h-checkbox>
          </h-checkbox-group>
        </h-form-item>
        <h-form-item label="下拉表" prop='slider' required>
          <h-select-table v-model="formItem1.slider" >
            <h-table-option border :columns="columns1" :data="data1"></h-table-option>
          </h-select-table>
        </h-form-item>
        <h-form-item label="下拉树" prop='tree' required>
          <h-select-tree v-model="formItem1.tree" :first-value="firstValc" style="width:200px" :data="baseData1" placement="top" placeholder="你好"></h-select-tree>
        </h-form-item>
        <h-form-item label="文本域" prop="textarea" required>
          <h-input v-model="formItem1.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></h-input>
        </h-form-item>
        <h-form-item label="文本域" prop="cascader" required>
          <h-cascader v-model="formItem1.cascader" :data="data2" trigger="hover" style="width:200px"></h-cascader>
        </h-form-item>
        <h-form-item>
          <h-button type="primary" @click="handleValidField('formItem1','money')" style="margin-left: 8px">校验</h-button>
            <h-button type="primary" @click="handleSubmit('formItem1')">提交</h-button>
            <h-button type="ghost" style="margin-left: 8px" @click="handleReset('formItem1')">取消</h-button>
            <h-button type="ghost" style="margin-left: 8px" @click="focus">获取焦点</h-button>
        </h-form-item>
      </h-form>
  </div>
</template>
<script>
  import { enterHandler1 } from "../../src/util/tools.js";
  export default {
    data () {
      return {
        model1:'',
        changeform:false,
        formItem1: {
          input: '',
          select: '',
          radio: '',
          money: '',
          checkbox: [],
          fatdate: '',
          date: '',
          time: '',
          slider: '',
          tree:'',
          textarea: '',
          cascader:[]
        },
        formItem2:{
          input: '1',
          select: '',
          radio: '',
          money: '',
          checkbox: [],
          fatdate: '',
          date: '',
          time: '',
          slider: '',
          tree:'',
          textarea: '',
        },
        data2: [{
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
          },
          {
            value: 'jiangsu',
            label: '江苏',
            children: [
              {
                value: 'nanjing',
                label: '南京',
                children: [
                  {
                      value: 'fuzimiao',
                      label: '夫子庙',
                  }
                ]
              },
              {
                value: 'suzhou',
                label: '苏州',
                children: [
                  {
                    value: 'zhuozhengyuan',
                    label: '拙政园',
                  },
                  {
                    value: 'shizilin',
                    label: '狮子林',
                  }
                ]
              }
            ],
          }
        ],
        formValid: {
          user: '你好',
          stringInput:'',
          password: '',
          test1: '',
          test2: ''
        },
        select1:'',
        stringRule:['email'],
        regRule: [{test:/^[a-zA-Z]+$/, message:'不全是字母',trigger:'blur'}],
        columns1: [
          {
            title: '姓名',
            key: 'name',
            ellipsis: true
          },
          {
            title: '年龄',
            key: 'age',
            hiddenCol:true
          },
          {
            title: '地址',
            key: 'address'
          }
        ],
        data1:[
          {
            name: '王小明',
            age: 18,
            address: '北京市朝阳区芍药居'
            // _highlight: true//默认选择当前项
          },
          {
            name: '张小刚',
            age: 25,
            address: '北京市海淀区西二旗'
          },
          {
            name: '李小红',
            age: 30,
            address: '上海市浦东新区世纪大道'
          },
          {
            name: '周小伟',
            age: 26,
            address: '深圳市南山区深南大道'
          },
        ],
        baseData1: [
          {
            title: 'parent',
            id: '1-0',
            children: [
              {
                title: 'child1',
                id: '1-1',
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
                children: []
              }
            ]
          }
        ],
        firstValc: 'parent',
      }
    },
    methods: {
      changeform1(){
        this.changeform = !this.changeform;
      },
      handleValidField (name, str) {
        this.$refs[name].validateField(str, (valid) => {
          if (valid) {
            this.$hMessage.error(valid);
          } else {
            this.$hMessage.success('校验正确');
          }
        })
      },
      handleSubmit (name) {
        let _this=this
        this.$refs[name].validate((valid) => {
            if (valid) {
              _this.$hMessage.success('提交成功!');
            } else {
              _this.$hMessage.error('表单验证失败!');
            }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
//        this.$refs[name].resetValidate();
      },
      totest() {
        this.$refs.changeDrop.focus();
      },
      focus(){
        this.$refs.formItem1.firstNodeFocused()
      },
      handleKeydown(e) {
        if(e.keyCode === 27) {
          this.$refs.formItem1.resetFields();
        }
      }
    },
    created() {
      window.isO45 = false
    },
    mounted(){
      document.addEventListener("keydown", event => {
        enterHandler1(this.$refs.formItem1, event);
      });
//      document.addEventListener("keydown", this.handleKeydown);
    }
  }
</script>
<!-- <template>
<div> -->
<!--   <h-edit-gird :columns="columns4" :data="data1" @on-select-all="allSelect" @on-select="select" :rowSelect="true" @on-selection-change="selsetChange" height="200" ref="table1">
  </h-edit-gird> -->
<!--   <h-table :columns="columns3" :data="data2" border></h-table>
  <Button @click = "click">获取数据</Button> -->
<!-- </div>
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
  export default {
    data () {
      return {
        columns4: [
            {
              type: 'selection',
              width: 60,
              align: 'center',
            },
            {
              type: 'text',
              title: '姓名',
              key: 'name',
              width: 200
            },
            {
              type: 'text',
              title: '年龄',
              width: 200,
              key: 'age',
            },
            {
              type: 'textArea',
              rows: 2,
              width: 200,
              title: '地址',
              key: 'address',
            },
            {
              type: 'money',
              title: '金额',
              width: 200,
              integerNum: 3,
              suffixNum: 2,
              bigTips: true,
              key: 'money',
            },
            {
              type: 'card',
              title: '卡号',
              width: 200,
              key: 'cardId',
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
            },
            {
              type: 'date',
              title: '日期',
              width: 200,
              key: 'dating',
              dateType:'date',
              editable:false,
              format: 'yyyy-MM-dd'
            },
            {
              type: 'time',
              title: '时间',
              width: 200,
              key: 'timing',
              dateType:'time',
              format: 'HH:mm:ss',
              steps: [],
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
            }
        ],
        data1: tData,
        columns3: [
          {key:"fund_account",title:"资金账号"},
          {key:"mobile_tel",title:"手机号"},
          {key:"trade_times",title:"交易天数"},
          {key:"business_amount",title:"交易量"},
          {key:"income_ratio",title:"收益率"},
          {key:"open_amount",title:"开仓数量"},
          {key:"drop_amount",title:"平仓数量"},
          {key:"buy_right_amount",title:"认购权利仓"},
          {key:"buy_duty_amount",title:"认购义务仓"},
          {key:"buy_duty_cover_amount",title:"认购备兑义务仓"},
          {key:"sell_right_amount",title:"认沽权利仓"},
          {key:"sell_duty_amount",title:"认沽义务仓"},
          {key:"fare0",title:"佣金"},
          {key:"sharp_30",title:"近30天夏普比率"},
          {key:"sharp_120",title:"近120天夏普比率"},
          {key:"sharp_360",title:"近360天夏普比率"},
          {key:"drawdown_30",title:"近30天最大回撤率"},
          {key:"drawdown_120",title:"近120天最大回撤率"},
          {key:"drawdown_360",title:"近360天最大回撤率"}
        ],
        data2:[
          {fund_account:'1',mobile_tel:'1'}
        ],
      }
    },
    methods: {
      click(){
        console.log(this.$refs.table1.cloneData);
      },
      allSelect (allSelection){
        console.log("allSelect");
        console.log(allSelection);
      },
      select (selection,row){//已选择的项和刚刚选择的项
       console.log("已选择的项和刚刚选择的项");
        console.log(selection);
        console.log(row);
      },
      selsetChange (selection){//选项发生变化时触发已选择的项
     console.log("选项发生变化时触发已选择的项");
        console.log(selection);
      },
    }
  }
</script>
 -->


<!-- <template>
  <div class="wrapper">
    <h2>hUI</h2>
    <p>h_ui是由恒生电子研发中心推出的一套专用于服务金融IT的UI基础组件库</p>
    <h1>datagird示例2</h1>
    <h-table border :columns="columns" :data="data"></h-table>
    <h-page></h-page>
  </div>
</template>

<script>
var data = [
  {
    name: '王小明',
    age: 18,
    address: '北京市朝阳区芍药居'
  },
  {
    name: '张小刚',
    age: 25,
    address: '北京市海淀区西二旗'
  },
  {
    name: '李小红',
    age: 30,
    address: '上海市浦东新区世纪大道'
  },
  {
    name: '周小伟',
    age: 26,
    address: '深圳市南山区深南大道'
  }
];
export default {
  name: 'home',
  data() {
    return {
      msg:'this is home component',
      data:data,
      columns:[
        {
          title: '姓名',
          key: 'name',
          render: (h, params) => {
            return h('div', [
              h('h-icon', {
                props: {
                  name: 'addressbook'
                }
              }),
              h('strong', params.row.name)
            ]);
          }
        },
        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '邮箱',
          key: 'mail'
        },
        {
          title: '电话',
          key: 'phone'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('h-dropdown',
                {
                  props: {
                    trigger: 'click'
                  },
                  on:{
                    'on-click':(v)=>{
                      this.show(v,params.index)
                    }
                  },
                  nativeOn: {
                    click: () => {
                      // alert(1);
                    }
                  }
                },
                [
                  h('h-button',
                    {
                      props: {
                        type: 'primary',
                      },
                      on:{
                        cilck:()=>{
                          alert(1);
                        }
                      }
                    },
                    [
                      '操作',
                      h('h-icon', {
                        props: {
                          name: 'arrowdownb'
                        }
                      })
                    ]
                  ),
                  h('h-dropdown-menu',
                    {
                      slot: 'list'
                    },
                    [
                      h('h-dropdown-item', {
                        props: {
                          name: 'delete'
                        }
                      }, '删除'),
                      h('h-dropdown-item', {
                        props: {
                          name: 'revise'
                        }
                      }, '修改'),
                      h('h-dropdown-item', {
                        props: {
                          name: 'search'
                        }
                      }, '查看')
                    ]
                  ),
                ]
              )
            ]);
          }
        }
      ]
    }
  },
  methods:{
    show (v,index) {
      if (v=='delete') {
        this.data.splice(index, 1);
      }else if(v=='search'){
        this.$hMsgBox.info({
          title: '用户信息',
          content: `姓名：${this.data[index].name}<br>年龄：${this.data[index].age}<br>地址：${this.data[index].address}`
        });
      }else{
        this.$hMsgBox.info({
          title: '用户信息',
          content: '你点击了修改操作'
        });
      }

    }
  }
}
</script>
<style lang='scss' scoped>
</style> -->
