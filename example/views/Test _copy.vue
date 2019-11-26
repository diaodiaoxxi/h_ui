<template>
<div>
  
    <!-- <h-row>
      <h2>基本用法</h2>
      <p>设置属性 type 为 date 或 daterange 分别显示选择单日和选择范围类型。<br>
        设置属性 placement 可以更改选择器出现的方向</p>
      <h-col span="12">
      </h-col>
      <h-col span="12">
        {{model2}}
        <h-date-picker v-model="model2" type="daterange" format="yyyy-MM-dd HH:mm"  @on-change="handleChange1"  placement="bottom-end" placeholder="选择日期" valueTypeArr> </h-date-picker>
       <br><br><br>
       {{value1}}
        <h-date-picker :value="value1" format="yyyy年MM月dd日" type="date" placeholder="选择日期" style="width: 200px"></h-date-picker>
      </h-col>
    </h-row> -->
      <h-table :columns="columns" :data="data1" headAlgin="center" border :highlight-row="true" @on-current-change="click1" :loading="loading" bodyAlgin="left">
        <span slot="loading">我是自定义加载！！！</span>
      </h-table>
    
</div>
</template>
<script>
let jsonData =require('../assets/aa.json');
export default {
    data () {
        return {
            //  model2:["2018-08-16", "2018-08-23"],
            model2:"2017-11-13 00:00:00 - 2018-08-23 00:00:00 ",
            value1: '2016-01-01',
            model3:"2018-08-16 - 2018-08-24",
            jsonData:jsonData,
            columns: [
              {
                title: '姓名',
                key: 'name',
                width: 100,
                ellipsis:true,
                hiddenCol: true,
              },
              {
                title: '姓名1',
                key: 'name',
                ellipsis:true,
              },
              {
                title: '年龄',
                key: 'age',
                width: 100,
                ellipsis:true,
                sortable: true
              },
              {
                title: '年龄1',
                key: 'age',
                ellipsis:true,
                sortable: true
              },
              {
                title: '省份',
                key: 'province',
                width: 100,
                ellipsis:true,
                sortable: true
              },{
                title: '省份1',
                key: 'province',
                ellipsis:true
              },
              {
                title: '市区',
                key: 'city',
                width: 100,
                ellipsis:true,
                sortable: true
              },{
                title: '市区1',
                key: 'city',
                ellipsis:true
              },
              {
                type: 'text',
                title: '地址',
                key: 'address',
                width: 200,
                ellipsis:true
              },{
                type: 'text',
                title: '地址1',
                key: 'address',
                ellipsis:true
              },
              {
                title: '邮编',
                key: 'zip',
                width: 120,
                ellipsis:true,
                headerTooltip: true
              },
              {
                title: '邮编1',
                key: 'zip',
                ellipsis:true,
                headerTooltip: true
              },
              {
                title: '操作',
                key: 'action',
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
                  ]);
                },
                ellipsis:true
              },
              {
                title: '邮编1',
                key: 'zip',
                ellipsis:true,
                headerTooltip: true,
                hiddenCol: true,
              },
            ],
            data1: [
              {
                name: 0,
                age: 18,
                address: '北京市朝阳区\r芍药居',
                // _disabled:true,
                _checked:true,
              },
              {
                name: 0,
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


        }
    },
    methods: {
      handleChange1(val) {
        // console.log('handleChange---->', val)
      },
      click1() {

      },
    }
}
</script>