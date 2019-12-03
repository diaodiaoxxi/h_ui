<template>
  <div>
    <div class="mb20">
      <h2>v-model</h2>
      <input type="text" v-model="message"/>
      <p>{{ message }}</p>
    </div>
    <div class="mb20">
      <h2>v-if/v-else</h2>
      <input type="text" v-model="age">
      <p v-if="age > 25">你的年龄{{ age }}，大于25</p>
      <p v-else>你的年龄{{ age }}，小于25</p>
    </div>
    <div class="mb20">
      <h2>v-show</h2>
      <input type="text" v-model="name">
      <p>名字：{{ name }},
        <span style="background:yellow;" v-show="name.indexOf('h') >= 0">包含h字母</span>
      </p>
    </div>
    <div class="mb20">
      <h2>v-for</h2>
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <p>{{ item }}</p>
        </li>
      </ul>
    </div>
    <div class="mb20">
      <h2>v-bind</h2>
      <p v-bind:class="'bg-red'">背景色红, v-bind</p>
      <p :class="'bg-blue'">背景色蓝, 简写:</p>
    </div>
    <div class="mb20">
      <h2>v-on</h2>
      <p>{{ count }}</p>
      <h-button type="primary" v-on:click="add">点击+1</h-button>
      <h-button @click="say('hi')">打招呼</h-button>
    </div>
    <div class="mb20">
      <h2>prop</h2>
      <Test2 :isRight="isRight" :age="age" ref="test"></Test2>
      <h-button @click="isRight = !isRight">点击切换</h-button>
    </div>
    <div class="mb20">
      <h2>this.$set</h2>
      <h-button type="primary" @click="beauty">要变美</h-button>
    </div>
    <div class="mb20">
      <h2>h_ui Grid</h2>
      <h-row>
        <h-col span="12" style="background:red">col-12</h-col>
        <h-col span="12" style="background:blue">col-12</h-col>
      </h-row>
      <br>
      <h-row>
        <h-col span="8" style="background:yellow">col-8</h-col>
        <h-col span="8" style="background:green">col-8</h-col>
        <h-col span="8" style="background:pink">col-8</h-col>
      </h-row>
      <br>
      <h-row>
        <h-col span="6" style="background:gray">col-6</h-col>
        <h-col span="6" style="background:black">col-6</h-col>
        <h-col span="6" style="background:grey">col-6</h-col>
        <h-col span="6" style="background:black">col-6</h-col>
      </h-row>
    </div>
    <div class="mb20">
      <h2>h_ui buttonGroup</h2>
      <h-button-group>
        <h-button style="margin-right: 5px;">打开弹窗</h-button>
        <h-button type="primary" @click="showBox = true">打开弹框</h-button>
      </h-button-group>
      <h2>h_ui checkboxGroup</h2>
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
      <h-msg-box v-model="showBox" title="普通的Modal对话框标题" :mask-closable="false">
        <p>这里是内容</p>
      </h-msg-box>
    </div>
    <div class="mb20">
      <h2>h_ui Table</h2>
      <h-table :columns="columns" :data="data0" :loading="loading" border :highlight-row="true">
        <span slot="loading">我是自定义加载！！！</span>
      </h-table>
    </div>
    <div class="mb20">
      <h2>h_ui Tree</h2>
      <h-tree :data="treeData" show-checkbox></h-tree>
    </div>
  </div>
</template>
<script>
import Test2 from './Test2.vue'

export default {
  components: {
    Test2
  },
  data() {
    return {
      message: '',
      age: 18,
      name: '',
      list: ['第一行','第二行','第三行','第四行','第五行'],
      count: 0,
      isRight: false,
      loading: false,
      btncheck:[],
      showBox: false,
      cityList: [{value: 'beijing', label: '北京市'},
        {value: 'shanghai', label: '上海市'},
        {value: 'shenzhen', label: '深圳市'},
        {value: 'hangzhou', label: '杭州市'},
        {value: 'nanjing', label: '南京市'},
        {value: 'chongqing', label: '重庆市'},
        {value: 'chengdu', label: '成都'},
        {value: 'xiamen', label: '厦门'}],
      columns: [
        {
          title: '',
          key: 'index',
          type: 'index',
          fixed: 'left'
        },
        {
          title: '姓名',
          key: 'name',
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
          title: '城市',
          width:150,
          key: 'city',
          render: (h, params) => {
            return h('h-simple-select', {
              props: {
                filterable: true,
                transfer: true,
                autoPlacement: true
              }
            },
            [h('h-select-block', {
              props: {
                data: this.cityList
              }
            })])
          }
        },
        {
          title: '市区',
          width:150,
          key: 'city',
          ellipsis:true,
        },
        {
          title: '市区1',
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
          type: 'text',
          width: 150,
          title: '地址1',
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
        }
      ],
      treeData: [{
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
    }
  },
  methods: {
    add() {
      this.count += 1
    },
    say(w) {
      alert(w+'你好呀!!！')
    },
    beauty() {
      this.$set(this.$refs.test.list[0], 'name', '小美')
      this.$set(this.$refs.test.list[0], 'isRight', true)
    }
  },
  created() {
    console.log('created生命周期：',this.$refs.test)
  },
  mounted() {
    console.log('mounted生命周期：',this.$refs.test)
  }
}
</script>
<style type="text/css">
  .mb20{
    margin-bottom: 20px;
  }
  .bg-red{
    background:palevioletred;
  }
  .bg-blue{
    background:dodgerblue;
  }
</style>
