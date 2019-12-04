<template>
  <div>
    <h-tabs
      v-model="val"
      type="card"
      :animated="false"
      lazy
    >
      <h-tab-pane label="标签一" name="name1" icon="add">
        <h-table
          notSetWidth
          :columns="columns"
          :data="data"
          :summationData="summationData"
          border
          headAlgin="right"
          bodyAlgin="left"
          height="400"
          canMove
        >
        </h-table>
      </h-tab-pane>
      <h-tab-pane label="标签二" name="name2">
        <h-simple-table :summationData="summationData" :columns="columns" :data="data" height="300" highlight-row>
        </h-simple-table>
      </h-tab-pane>
      <h-tab-pane label="标签三" name="name3">标签三的内容</h-tab-pane>
    </h-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      val: 'name1',
      columns: [
        // {
        //   type: 'expand',
        // },
        {
          title: '姓名',
          key: 'name',
          // fixed: 'left',
          ellipsis: true
        },
        {
          title: '年龄',
          key: 'age',
          ellipsis: true,
          sortable: true
        },
        {
          title: '年龄1',
          key: 'age',
          ellipsis: true
        },
        {
          title: '省份',
          key: 'province',
          ellipsis: true,
          sortable: true
        },
        {
          title: '省份1',
          key: 'province',
          ellipsis: true
        },
        {
          title: '市区1231283712893719',
          key: 'city',
          ellipsis: true,
          sortable: true
        },
        {
          title: '市区1',
          key: 'city',
          ellipsis: true
        },
        {
          type: 'text',
          title: '地址',
          key: 'address',
          ellipsis: true
        },
        {
          type: 'text',
          title: '地址1',
          key: 'address',
          ellipsis: true
        },
        {
          title: '邮编',
          key: 'zip',
          ellipsis: true,
          headerTooltip: true
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h(
                'h-button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  }
                },
                '查看'
              ),
              h(
                'h-button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  }
                },
                '编辑'
              )
            ])
          },
          ellipsis: true
        }
      ],
      data: [
        {
          name: '<a href="javascript:alert(1);">王小明</a>',
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
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          province: '上海市',
          city: '浦东新区',
          zip: 100000
        },{
          name: '<a href="javascript:alert(1);">王小明</a>',
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
        }
      ],
      summationData: [{
        name: 'qeqweqw',
        age: 123123123,
        address: 'qqweqwe'
      }]
    }
  }
}
</script>
