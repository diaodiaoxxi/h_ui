<template>
  <div>
    <h-button @on-click="loadData">加载数据</h-button>
    <h-button @on-click="loadDataAndResetChecked">重置勾选，加载数据</h-button>
    <h-button @on-click="removeData">清空数据</h-button>
    <h-button @on-click="changeData1('1103')">展开第一层</h-button>
    <h-button @on-click="changeData('1103')">展开关闭某行</h-button>
    <h-button @on-click="clearData">清除已选项</h-button>
    <h-button @on-click="selectData(true)">选择某行</h-button>
    <h-button @on-click="selectData(false)">不选择某行</h-button>
    <h-button @on-click="checkedData(true)">多选选择某行</h-button>
    <h-button @on-click="checkedData(false)">多选不选择某行</h-button>
    <h-button @on-click="selectAll(true)">全选</h-button>
    <h-button @on-click="selectAll(false)">非全选</h-button>
    <h-button @click="modify">修改数据</h-button>
    <h-button @click="getSelection">获取选中行</h-button>
    <!-- isCheckbox checkStrictly -->
    <!-- selectRoot -->
    <h-simple-tree-gird stripe canDrag headSelection canMove @on-expand="load" ref="treeGird" selectRoot :columns="columns1" isCheckbox :data="treedata" :height="400" @on-row-click="selectChange" @on-select-root="selectChange" >
      <span slot="loading">1244</span>
    </h-simple-tree-gird>
  </div>
</template>
<script>
let tData =require('../assets/simpleTreeGird.json')
let bigData = []
for(var i=0;i<15;i++){
  let obj =  {
    id: i,
    expand: 'false',
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
  bigData.push(obj)
}
for(var i=50;i<100;i++){
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
    _parentId:parseInt(Math.random()*5,10),
    leaf: 'false',
    expand: 'false'
  }
  bigData.push(obj)
}

export default {
  data() {
    return {
      baseData: [],
      treedata: [],
      columns1: [
        {
          title:'index',
          key: 'index',
          type: 'index',
          fixed: 'left'
        },
        {
          title: 'name',
          key: 'name',
          width: 200,
          fixed: 'left'
        },
        {
          title: 'age',
          width: 100,
          key: 'age',
        },
        {
          title: 'address',
          width: 300,
          key: 'address',
          hiddenCol: false,
        },
        {
          title: 'money',
          width: 200,
          key: 'money',
        },
        {
          title: 'cardId',
          width: 100,
          key: 'cardId',
          hiddenCol: false,
//          fixed: 'right'
        },
        {
          title: 'city',
          key: 'city',
          width: 300
        },
        {
          title: 'dating',
          width: 200,
          key: 'dating',
          hiddenCol: false,
        }
      ],
    }
  },
  methods: {
    load(item, status) {
      if (item.leaf + '' === 'false' && status) {
        this.$set(item, 'loading', true)
        setTimeout(() => {
          item.children = [{
            id: item.id * 100 + Math.random() + '',
            name: '王小明xx',
            age: 18,
            address: '北京市朝阳区芍药居',
            money: '666.00',
            cardId: '6223 ',
            city: '北京',
            dating:'2018',
            timing:'16',
            _parentId: item.id
          }]
          this.$set(item, 'loading', false)
          item.leaf = 'true'
        },3000)
      }
    },
    modify() {
      let c = JSON.parse(JSON.stringify(this.treedata))
      c[0].expand = false
      c[0].checked = true
      c[0].name = 'sss'
      this.treedata = c
    },
    move(i,j){
      console.log(i,j)
    },
    convertTreeData(rows, attributes) {
      var keyNodes = {}, parentKeyNodes = {}
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i]
        row.id = row[attributes.keyField]
        row.parentId = row[attributes.parentKeyField]
        // row.expanded = row[attributes.expanded]?true:false
        // row.checked = row[attributes.checked]?true:false
        // row.indeterminate = row[attributes.indeterminate]?true:false
        row.children = []
        keyNodes[row.id] = row
        if (parentKeyNodes[row.parentId]) { parentKeyNodes[row.parentId].push(row) }
        else { parentKeyNodes[row.parentId] = [row] }
        var children = parentKeyNodes[row.id]
        if (children) { row.children = children }
        var pNode = keyNodes[row.parentId]
        if (pNode) { pNode.children.push(row) }
      }
      return parentKeyNodes[attributes.rootParentId]
    },
    removeData() {
      this.treedata = []

    },
    loadData(){
      let old = new Date().getTime()
      this.treedata = this.baseData
      // this.treedata=bigData;
      // this.treedata = jsonData.slice(0, 100);
      this.$nextTick(() => {
        let newDate = new Date().getTime() - old
        //        console.log(newDate)
      })
      // setTimeout(() => {
      //   // this.$refs.treeGird.selectRow(51, true)
      //   this.$refs.treeGird.checkedRow(3, true)
      // }, 1000)
    },
    loadDataAndResetChecked() {
      this.$refs.treeGird.clearSelected()
      this.treedata = this.baseData.slice(1,2)
      this.$refs.treeGird.forceUpdate()
    },
    selectChange(data, index) {
      console.log(data)
      console.log(index)
    },
    getSelection() {
      console.log(this.$refs.treeGird.getSelection())
    },
    expand(data,status){
      console.log(data)
      console.log(status)
    },
    changeData(id){
      this.$refs.treeGird.expandRow(1,false)
    },
    changeData1(){
      this.$refs.treeGird.expandRow(1,true)
    },
    clearData(){
      this.$refs.treeGird.clearSelected()
    },
    selectData(status){
      this.$refs.treeGird.selectRow(0,status)
      console.log(this.$refs.treeGird.getSelection())
    },
    checkedData(status){
      this.$refs.treeGird.checkedRow(0,status)
      console.log(this.$refs.treeGird.getSelection())
    },
    rowClassName(row,id){
      if (id === 1||id===50) {
        return 'demo-table-info-row'
      }
      return ''
    },
    selectAll(status){
      this.$refs.treeGird.selectAll(status)
    },
  },
  mounted() {
    let attributes = {
      keyField: 'id',
      parentKeyField: '_parentId',
      expanded: 'expand',
      checked: 'checked',
      checked: 'indeterminate',
      rootKey: 'root'
    }
    this.baseData = this.convertTreeData(bigData, attributes)
  }
}
</script>
<style>
.demo-table-info-row td{
  background-color: #2db7f5 !important;
  color: #fff;
}
</style>

