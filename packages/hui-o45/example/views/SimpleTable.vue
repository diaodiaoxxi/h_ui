<template>
  <div>
    <h2>基础</h2>
    <Button @click="changemsg">显示</Button>
    <h2>带边线 多选</h2>
    <Button @click="loadData">加载数据</Button>
    <Button @click="changeData">切换数据</Button>
    <Button @click="adddata">添加数据</Button>
    <Button @click="scroll20">scrollTo0</Button>
    <h-simple-table :columns="columnsBig1" :data="bigData" :addData="addData"  :summationData="summationData"
                    :loading="loading" :row-class-name="rowClassName" bodyAlgin="left" height="400"
                    :lastColWidth="60" allowLastColBlank
                    canDrag canMove border stripe rowSelectOnly :toScrollTop="scrollTop" :scrollTopSet="200"
                    @on-select="select" @on-select-cancel="select" @on-drag="onDrag"
                    @on-select-all='change' @on-selection-change="change">
      <span slot="loading">我是自定义加载！！！</span>
    </h-simple-table>
    <h-button @click="setLoading">切换状态</h-button>
    <h-button @click="clearData">清除数据</h-button>
    <h-button @click="delSelected">删除所选</h-button>
    <h2>不带边线 单选 on-current-change</h2>

    <!--<div style="width: 1000px;overflow: hidden;">-->
      <!--<h-simple-table ref="simTable" canMove :summationRender="false" @on-right-click="rightClick" rowSelectOnly-->
                      <!--:summationData="summationData" :columns="columnsBig1" border :data="bigData2" :height="customHeight"-->
                      <!--highlight-row @on-selection-change="selsetChange" @on-row-dblclick="dblclick">-->
      <!--</h-simple-table>-->
      <h-button type="dashed" @click="addrow">新增一列</h-button>
    <!--</div>-->

    <h-button @click='changeClo'>改变冻结列</h-button>
    <h-button type="primary" size="large" @click="exportData(1)"><h-icon type="ios-download-outline"></h-icon> 导出原始数据</h-button>
    <h-button type="primary" size="large" @click="exportData(2)"><h-icon type="ios-download-outline"></h-icon> 导出排序和过滤后的数据</h-button>
    <h-button type="primary" size="large" @click="exportData(3)"><h-icon type="ios-download-outline"></h-icon> 导出自定义数据</h-button>
    <!-- <h2>自定义样式</h2>
    <p>行：通过属性 row-class-name 可以给某一行指定一个样式名称。</p>
    <p>列：通过给列 columns 设置字段 className 可以给某一列指定一个样式。</p>
    <p>单元格：通过给数据 data 设置字段 cellClassName 可以给任意一个单元格指定样式。</p>
    <p>自定义行样式：</p>
    <h-simple-table :row-class-name="rowClassName" :columns="columns1" :data="data2" :loading="loading" :highlight-row='true' @on-selection-change="change" @on-row-click="change"></h-simple-table>
    <p>自定义列样式：</p>
    <h-simple-table :columns="columns9" :data="data2" :loading="loading" @on-row-click="change"></h-simple-table>
    <p>自定义任意单元格样式：</p>
    <h-simple-table :columns="columns3" :data="data2" @on-row-click="click1" :loading="loading"></h-simple-table>
    <h2>固定表头</h2>
    <p>通过设置属性 height 给表格指定高度后，会自动固定表头。当纵向内容过多时可以使用</p>
    <h-simple-table height="200" :columns="columns3" :data="data2" border :loading="loading" showTitle></h-simple-table>
    <h2>单选</h2>
    <p>通过设置属性 highlight-row，可以选中某一行。</p>
    <p>给 data 项设置特殊 key _highlight: true 可以默认选中当前项。</p>
    <h-simple-table highlight-row :columns="columns3" :data="data1" @on-current-change='radioChange' :loading="loading"></h-simple-table>
    <h2>多选</h2>
    <p>给 data 项设置特殊 key _checked: true 可以默认选中当前项。</p>
    <p>给 data 项设置特殊 key _disabled: true 可以禁止选择当前项。</p>
    <p>@on-select，选中某一项触发，返回值为 selection 和 row，分别为已选项和刚选择的项。</p>
    <p>@on-select-all，点击全选时触发，返回值为 selection，已选项。</p>
    <p>@on-selection-change，只要选中项发生变化时就会触发，返回值为 selection，已选项。</p>
    <h-simple-table border :columns="columns4" :data="data1" @on-select-all="allSelect" @on-select="select" :rowSelect="true" @on-selection-change="selsetChange" :loading="loading" canMove></h-simple-table>

    <h2>自定义列模板</h2>
    <p>通过给 columns 数据的项，设置一个函数 render，可以自定义渲染当前列，包括渲染自定义组件，它基于 Vue 的 Render 函数。</p>
    <p>render 函数传入两个参数，第一个是 h，第二个是对象，包含 row、column 和 index，分别指当前单元格数据，当前列数据，当前是第几行。</p>
    <h-simple-table border :columns="columns7" :data="data6" :loading="loading"></h-simple-table>
    <h2>设置大小</h2>
    <p>通过设置属性 size 为 large 或 small 可以调整表格尺寸为大或小，默认不填或填写 default 为中。</p>
    <h-simple-table size="large" :columns="columns1" :data="data1" :loading="loading"></h-simple-table>
    <h-simple-table size="small" :columns="columns1" :data="data1" :loading="loading"></h-simple-table> -->
  </div>
</template>
<script>
import TexpandRow from './Texpand-row.vue'
let jsonData=[]
let tData =require('../assets/aa.json')
for (let i = 0; i < 1; i++) {
  jsonData =tData.slice(0,10)
}
let ind = 1
export default {
  components:{TexpandRow},
  data() {
    return {
      checked:false,
      msgbox:false,
      loading:false,
      scrollTop: false,
      addData:[],
      bigData:[],
      bigData2:[],
      columnsBig1:[
        {
          type: 'index',
          align: 'center',
          fixed:'left',
          width: 100
        },
        {
          type: 'selection',
          align: 'center',
          key:'select',
          width: 100,
          sortable: true
        },
        {
          title: '姓名姓名姓名姓名姓名姓名姓名姓名',
          key: 'fundId',
          width: 300,
          showTitle:true,
          ellipsis:true,
        },
        {
          title: '今日开盘价(元)',
          key: 'tradeDate',
          width: 200,
          sortable:true,
          ellipsis:true,
        },
        {
          title: '地址',
          ellipsis:true,
          key: 'securityCode',
          width: 200,
          showTitle: true,
          align:'right',
          sortable:true,
          render: (h, params) => {
            if(params.row.securityCode === '600000') {
              this.$set(this.bigData[params.index], '_disabled', true)
            }
            return h('span',params.row.securityCode)
          },
        },
        {
          title: '银行',
          key: 'securityName',
          width:200,
          showTitle:true
        },
        {
          title: '年龄',
          key: 'tradeDir',
          width: 200,
        },
        {
          title: '数量',
          ellipsis:true,
          sortable:true,
          width: 200,
          key: 'tradeQuantity',
        },
        {
          title: '邀请人数',
          key: 'investType',
          width: 200,
        },
        {
          title: ' '
        }
      ],
      multiTitle:[
        {title:'信息',cols:2,rows:1,align:'center'},
        {title:'基本信息',cols:2,align:'center'},
        {title:'详情',cols:4,align:'center'},
      ],
      columns1: [
        {
          type: 'selection',
          align: 'center',
        },
        {
          type: 'index',
          align: 'center',
        },
        {
          title: '姓名',
          key: 'name',
          align: 'center',
        },
        {
          title: '年龄',
          key: 'age',
        },
        {
          title: '地址',
          ellipsis:true,
          key: 'address',
        },
        {
          title: '地址1',
          key: 'address1',
        },
        {
          title: '地址2',
          key: 'address2',
        },
        {
          title: '地址3',
          key: 'address3',
        },
        {
          title: '地址4',
          key: 'address4',
        },
        {
          title: '地址5',
          key: 'address5',
        },
        {
          title: '地址6',
          key: 'address6',
          sortType:'address',
        }
      ],
      columns3: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name',
          render: (h, params) => {
            return h('div',params.row.name+'1')
            // if (params.row._index==1) {
            //   return h('div', [
            //     h('h-icon', {
            //       props: {
            //         name: 'addressbook'
            //       }
            //     }),
            //     h('strong', params.row.name)
            //   ]);
            // }else{
            //   return h('span',params.row.name)
            // }
          },
          renderHeader:(h, params)=>{
            return h('span','123')
          }
        },
        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '地址',
          key: 'address'
        }
      ],
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        {
          title: '姓名',
          key: 'name',
          ellipsis: true
        },
        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '地址',
          key: 'address'
        }
      ],
      columns7: [
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
            ])
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
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('h-button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  'click': () => {
                    this.show(params.index)
                  }
                }
              }, '查看'),
              h('h-button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  'click': () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      columns9: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '年龄',
          key: 'age',
          className: 'demo-table-info-column'
        },
        {
          title: '地址',
          key: 'address'
        }
      ],
      data1: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区\r芍药居'
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
        }
      ],
      data2: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳\r区芍药居'
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
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳\r区芍药居'
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
      ],
      data6: [
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
      ],
      status:false,
      multiLevel1:[[
        {title:'123',cols:2, align:'center'},
        {title:'456',cols:2, className:"ceshi"},
        {title:'789',cols:2,hiddenCol:false, align:'right'},
        // {title:'789'},
      ],
      [{title:'123',cols:2,},
        {title:'456',cols:2,},
        {title:'789',cols:2,hiddenCol:true},]
      ],
      summationData: [{
        fundId: '12313',
        tradeDate: 730211221,
        securityCode: 5627223123,
        index: 1563123123,
        securityCode: 425413,
        securityId: 1438123,
        tradeDir: 27412312,
        day30: 285123,
        tradeSubtype: 1727123,
        marketNo: 558,
        tradeQuantity: 4440,
      }],
      summationData1: [{
        name: 'qeqweqw',
        age: 123123123,
        address: 'qqweqwe'
      }],
    }
  },
  computed: {
    customHeight() {
      let lng = this.bigData2.length
      if(lng == 0) {
        lng = 1
      }
      lng++
      return lng * 40
    }
  },
  methods:{
    scroll20() {
      this.scrollTop = true;
      this.$nextTick(() => {
        this.scrollTop = false;
      });
    },
    addrow() {
      this.bigData2 = tData.slice(0,ind)
      ind++
    },
    rightClick(e){
      console.log('right'+e)
    },
    clearData() {
      this.columnsBig1.splice(2, 1)
      this.columnsBig1.pop()
      this.$nextTick(()=> {
        this.bigData = []
      })
    },
    changeClo(){
      this.$set(this.columnsBig1[1],'fixed','left')
    },
    loadData(){
//      this.columnsBig1.splice(2, 0, {
//        title: '交易市场',
//        key: 'securityName',
//        width: 80,
//        sortable:true,
//        ellipsis:true,
//        showTitle:true
//      })
//      this.columnsBig1.push({
//        title: '年龄年龄年龄年龄年龄年龄年龄1',
//        key: 'tradeDate'
//      })

      this.$nextTick(()=>{
        this.bigData = jsonData;
      })
    },
    adddata() {
      this.addData = [].concat(jsonData)
//      this.addData = this.addData.push.apply(this.addData, jsonData)
//      this.bigData = this.bigData.concat(jsonData)
    },
    changeData(){
      this.bigData =tData.slice(500,600);
    },
    changemsg(){
      this.msgbox = !this.msgbox;
    },
    onDrag(e,i){
      // console.log(e);
      // console.log(i);
    },
    onMove(i,j){
      console.log(i);
      console.log(j);
    },
    handleScrollChange(num, e) {
      console.log(num, e)
    },
    change(e){
      console.log(e);
    },
    scroll(num){
      if(num==0&&!this.status){
        this.status = true;
        this.bigData = this.bigData.concat(jsonData);
      }
    },
    setLoading(){
//      this.$set(this.bigData[0],'fundId','sheishi')
      this.$set(this.bigData[2],'_checked',true)
      this.bigData[2]._checked = true
      // this.loading = !this.loading;
    },
    delSelected() {
      for(let i in this.bigData) {
        if(this.bigData[i].securityCode !== '600000') {
          delete this.bigData[i]
        }
      }
      this.bigData = this.bigData.filter((val) => {
        return val
      })
    },
    click1 (selection) {
      console.log(selection);
    },
    rowclick(){
      console.log('你点击了某一行');
    },
    dblclick(e,i,j){
      console.log(e);
      console.log(i);
      console.log(j);
    },
    expand(row,status){
      console.log(status);
    },
    sortchange(e) {
      console.log(e)
    },
    sortChange(obj){
      if (obj.order == 'asc') {
        let len = this.data5.length-1;
        let item = this.data5[len];
        this.data5.splice(len,1);
        this.data5.splice(0,0,item);
      }else{
        console.log('你点击勒向下排序按钮');
      }
    },
    rowClassName (row, index) {
      if (index === 1) {
        return 'demo-table-info-row';
      } else if (index === 3) {
        return 'demo-table-error-row';
      }
      return '';
    },
    radioChange (currentRow,oldRow){
      console.log(currentRow);
      console.log(oldRow);
    },
    allSelect (allSelection){
      console.log(allSelection);
    },
    select (selection,row){//已选择的项和刚刚选择的项
      console.log(selection);
      console.log(row);
    },
    selsetChange (selection,inx,i){//选项发生变化时触发已选择的项
//      console.log(selection);
//      console.log(inx);
//      console.log(i);
    },
    selsetChange1 (selection,inx,i){//选项发生变化时触发已选择的项
      console.log("1  "+selection);
      console.log("1  "+inx);
      console.log("1  "+i);
    },
    show (index) {
      this.$hMsgBox.info({
        title: '用户信息',
        content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
      });
    },
    remove (index) {
      this.data6.splice(index, 1);
    },
    exportData (type) {
      if (type === 1) {
        this.$refs.simTable.exportCsv({
          filename: '原始数据'
        });
      } else if (type === 2) {
        this.$refs.simTable.exportCsv({
          filename: '排序和过滤后的数据',
          original: false,
          noHeader:true,
        });
      } else if (type === 3) {
        this.$refs.simTable.exportCsv({
          filename: '自定义数据',
          columns: this.columnsBig1.filter((col, index) => index < 4),
          data: this.bigData.filter((data, index) => index < 200)
        });
      }
    }
  },
  created() {
    window.isO45 = true
  },
  mounted(){
    this.bigData = jsonData
  }
}
</script>
<style type="text/css">
.h-table .demo-table-info-row td{
  background-color: #2db7f5 !important;
  color: #fff;
}
.h-table .demo-table-error-row td{
  background-color: #ff6600!important;
  color: #fff;
}
.h-table td.demo-table-info-column{
  background-color: #2db7f5!important;
  color: #fff;
}
.h-table .demo-table-info-cell-name {
  background-color: #2db7f5!important;
  color: #fff;
}
.h-table .demo-table-info-cell-age {
  background-color: #ff6600!important;
  color: #fff;
}
.h-table .demo-table-info-cell-address {
  background-color: #187!important;
  color: #fff;
}
.h-table-title, .h-table-footer{
  background-color: #7eb8f1;
  text-align: center;
}
.h-table-cell{
  padding-left: 8px !important;
  padding-right: 8px !important;
}
</style>
