<template>
  <div>
    <h2>基础</h2>
    <h3>单选分组组件</h3>
    <!--<h-group-table :columns="columns1" childHighlightRow :height="300" width="600" :data="data1" size="small" @on-expand="expand"  @on-child-change="click1" ref="groupTable" :loading="loading">-->
      <!--<P slot="loading">我是自定义de</P>-->
    <!--</h-group-table>-->
    <!--<Button @click="setLoad">切换loading</Button>-->
    <!--<h-group-table :columns="columns1" :data="data1" @on-row-dblclick="dblClick" :loading="loading"></h-group-table>-->
    <h-group-table :columns="columns1" :data="data1" size="small" :disabled-hover="true" :highlight-row="true" cancelSelection
                   @on-row-click="click1" @on-current-change="click2" stripe :loading="loading"></h-group-table>
    <!--<h-group-table :columns="columns1" :data="[]" no-data-text="哎呀你好" :loading="loading"></h-group-table>-->
    <h3>多选分组组件</h3>
    <h-group-table :columns="columns4" :data="data1" @on-select-all="allSelect" @on-select="select" :rowSelect="true" @on-selection-change="selsetChange" :loading="loading"></h-group-table>
    <!--<h-group-table :columns="columns4" :data="data1" @on-select-all="allSelect" @on-select="select" @on-selection-change="selsetChange" :loading="loading"></h-group-table>-->
    <h3>simpleGroupTable</h3>
    <h-simple-group-table :columns="columns1" :data="data1" highlight-row @on-row-click="handleClick"></h-simple-group-table>
  </div>
</template>

<script>
import TexpandRow from './Texpand-row.vue'
var tData= [
  {
    title:'分组表格数据：group1【项目编号：45424451114】 共计：3项',
    expand:true,
    item:[
      {
        name: '王小明',
        age: 18,
        address: '北京市朝阳区芍药居',
        money: '120.00',
        cardId: '6223 5678 1234 5678',
        city: '北京',
        dating:'2018-03-07',
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
        name: '王小明',
        age: 18,
        address: '北京市朝阳区芍药居',
        money: '120.00',
        cardId: '6223 5678 1234 5678',
        city: '北京',
        dating:'2018-03-07',
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
        name: '王小明',
        age: 18,
        address: '北京市朝阳区芍药居',
        money: '120.00',
        cardId: '6223 5678 1234 5678',
        city: '北京',
        dating:'2018-03-07',
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
      }
    ]
  },
  {
    title:'分组表格数据：group2【项目编号：45424451114】 共计：3项',
    item:[
      {
        name: '王小明',
        age: 18,
        address: '北京市朝阳区芍药居',
        money: '120.00',
        cardId: '6223 5678 1234 5678',
        city: '北京',
        dating:'2018-03-07',
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
      }
    ]
  },
  {
    title:'分组表格数据：group3【项目编号：45424451114】 共计：3项',
    item:[
      {
        name: '王小明',
        age: 18,
        address: '北京市朝阳区芍药居',
        money: '120.00',
        cardId: '6223 5678 1234 5678',
        city: '北京',
        dating:'2018-03-07',
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
      }
    ]
  },
  {
    title:'分组表格数据：group4【项目编号：45424451114】 共计：3项',
    item:[
      {
        name: '王小明',
        age: 18,
        address: '北京市朝阳区芍药居',
        money: '120.00',
        cardId: '6223 5678 1234 5678',
        city: '北京',
        dating:'2018-03-07',
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
      }
    ]
  }
];
export default {
  components:{TexpandRow},
  data() {
    return {
      loading:false,
      columns1: [
        // {
        //   type: 'expand',
        //   width: 50,
        //   render: (h, params) => {
        //     return h(TexpandRow, {
        //       props: {
        //           row: params.row
        //       }
        //     })
        //   }
        // },
        // {
        //   title: '姓名',
        //   key: 'name',
        //   width: 200,
        //   hiddenOther:true,
        //   render:(h,params)=>{
        //     return h('span',[
        //       h('Icon', {
        //         props: {
        //           name: 'person'
        //         }
        //       }),
        //     ])
        //   }
        // },
        {
          title: '年龄',
          width: 200,
          key: 'age',
          sortable:true
        },
        {
          title: '地址',
          width: 200,
          key: 'address',
        },
        {
          title: '金额',
          key: 'money',
          width: 200
        },
         {
           title: '卡号',
           width: 200,
           key: 'cardId',
           hiddenCol: true
         },
         {
           title: '地区',
           width: 200,
           key: 'city',
         },
         {
           title: '日期',
           width: 200,
           key: 'dating',
         },
         {
           title: '时间',
           width: 200,
           key: 'timing',
         }
      ],
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
//          fixed:'left',
          width: 200
        },
        {
          type: 'number',
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
            selected:true,
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
      multiLevel2:[
        [
          {title:'123',cols:2,align:'center',className:'demo-table-info-column'},
          {title:'456',rows:2,align:'center'},
          {title:'789',align:'right'},
        ]
      ],
    }
  },
  methods: {
    expand(data, status) {
      console.log(data, status)
    },
    handleClick(row, status) {
      console.log(row)
      console.log(status)
    },
    dblClick(e,curIndex){
      console.log(e,curIndex);
    },
    setLoad(){
      this.loading = !this.loading;
    },
    click1(s,i) {
      console.log(s)
      console.log(i)
    },
    click2(s,j,i){
      console.log(s);
      console.log(j);
      console.log(i);
    },
    allSelect (allSelection){
      console.log(allSelection);
    },
    select (selection,row){//已选择的项和刚刚选择的项
      console.log(selection);
      console.log(row);
    },
    selsetChange (selection){//选项发生变化时触发已选择的项
      console.log(selection);
    },
    addDate(){
      tData = this.data1.push({
        name: '',
        age: null,
        address: '',
        money: '',
        cardId: '',
        city: '',
        dating:'',
        timing:'',
        tree:''
      });
    }
  }
}
</script>
<style>
.demo-table-info-column{
  color: red;
}
/* .h-editgird .h-editgird-cell-with-render .dbClass{display:none;} */
</style>
