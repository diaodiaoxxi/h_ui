<template>
  <div>
   <h-tree-gird isCheckbox :columns="columns1" :data="data1" size="small" :highlight-row="true" ref="editGird" height="200" :loading="loading" :option="options1" :treeOption="treeOption"
              @on-editinput-change="handler1"
              @on-editinput-blur="handler2"
              @on-editarea-change="handler3"
              @on-editarea-blur="handler4"
              @on-money-blur="handler5"
              @on-money-change="handler6"
              @on-editdate-change="handler7"
              @on-editselect-change="handler8" stripe></h-tree-gird>
   <Button @click="setLoad">切换loading</Button>
  </div>
</template>
<script>
  var tData= [
    {
          id: 2,
          name: '王小明',
          age: 21,
          address: '北京市朝阳区芍药居',
          money: '120.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1',
          // _highlight: true//默认选择当前项
        },
        {
          id: 21,
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          money: '130.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1',
          _parentId: 2,
        },
        {
          id: 22,
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          money: '140.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1',
          _parentId: 2,
        },
        {
          id: 1,
          name: '王小明',
          age: '',
          address: '北京市朝阳区芍药居',
          money: '120.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1',
          foldable:true,
          expanded:true,
          // _highlight: true//默认选择当前项
        },
        {
          id: 11,
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          money: '130.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1',
          _parentId: 1,
        },
        {
          id: 111,
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          money: '130.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1',
          foldable:true,
          _parentId: 11,
        },
        {
          id: 1112,
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          money: '130.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1',
          foldable:true,
          _parentId: 111,
        },
        {
          id: 1111,
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          money: '130.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1',
          foldable:true,
          _parentId: 111,
        },
        {
          id: 112,
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          money: '130.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1',
          _parentId: 11,
        },
        {
          id: 12,
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          money: '140.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1',
          _parentId: 1,
        },
        {
          id: 13,
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          money: '150.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1',
          _parentId: 1,
        },
        {
          id: 23,
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          money: '150.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1',
          _parentId: 2,
        },
        {
          id: 3,
          name: '王小明',
          age: 21,
          address: '北京市朝阳区芍药居',
          money: '120.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1',
          // _highlight: true//默认选择当前项
        },
        {
          id: 31,
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          money: '130.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1',
          _parentId: 3,
        },
        {
          id: 32,
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          money: '140.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1',
          _parentId: 3,
        },
        {
          id: 33,
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          money: '150.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-03-07',
          timing:'16:00:00.00',
          tree:'leaf1',
          _parentId: 3,
        },
      ];
  export default {
    data () {
      return {
        loading:false,
        options1:[[],[],[],[],[],[],[{value:'Alabama',label:'Alabama'},{value:'beijing',label:'北京'},{value:'Delaware',label:'Delaware'}]],
        treeOption:[],
        columns1: [
          {
            type: 'selection',
            width: 120,
            align: 'center'
          },
          {
            type: 'text',
            title: '姓名',
            key: 'name',
            width: 200,
            align: 'center',
            headAlign: 'right'
          },
          {
            type: 'number',
            title: '年龄',
            width: 200,
            key: 'age',
            treeNode: true
          },
          {
            type: 'textArea',
            rows: 2,
            width: 80,
            title: '地址',
            ellipsis:true,
            key: 'address',
            showTooltip: true
          },
          {
            type: 'money',
            title: '金额',
            width: 200,
            integerNum: 3,
            suffixNum: 2,
            bigTips: true,
            key: 'money',
            showTooltip: true
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
            multiple:false
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
            // width: 200,
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
      }
    },
    methods: {
      handler1(val, i , j) {
        console.log(`input-change: ${val}, pos: (${i}, ${j})`);
      },
      handler2(val, i , j) {
        console.log(`input-blur: ${val}, pos: (${i}, ${j})`);
      },
      handler3(val, i , j) {
        console.log(`area-change: ${val}, pos: (${i}, ${j})`);
      },
      handler4(val, i , j) {
        console.log(`area-blur: ${val}, pos: (${i}, ${j})`);
      },
      handler5(val, i , j) {
        console.log(`money-blur: ${val}, pos: (${i}, ${j})`);
      },
      handler6(val, i , j) {
        console.log(`money-change: ${val}, pos: (${i}, ${j})`);
      },
      handler7(val, i , j) {
        console.log(`date-change: ${val}, pos: (${i}, ${j})`);
      },
      handler8(val, i , j) {
        console.log(`select-change: ${val}, pos: (${i}, ${j})`);
      },
      setLoad(){
        this.data1 = tData;
        // this.loading = !this.loading;
      },
      click1(s){
        console.log(s);
      },
      click2(s){
        console.log(s);
      },

    },
    mounted () {
      this.options1[6]=[{value:'Alabama',label:'Alabama'},{value:'beijing',label:'北京'},{value:'Delaware',label:'Delaware'}]
      this.treeOption[9]=[{
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
            }]
    }
  }
</script>
