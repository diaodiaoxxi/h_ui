<template>
  <div>
    <h-edit-gird
      ref="editGird"
      :columns="columns2"
      :data="data1"
      size="small"
      :disabled-hover="true"
      :highlight-row="true"
      @on-current-change="click1"
      :showEditInput="false"
      height="200"
      :loading="false"
      :option="options1"
      :treeOption="treeOption"
      @on-editinput-enter="onEnter"
      @on-money-enter="moneyChange"
    ></h-edit-gird>
    <h-button @click="addDate">新增一行</h-button>
    <h-button @click="getDate">获取数据</h-button>
  </div>
</template> 
<script>
  var tData = [
    {
      name: "王小明",
      age: 18,
      address: "北京市朝阳区芍药居",
      money: "120.00",
      cardId: "6223 5678 1234 5678",
      city: "北京",
      dating: "2018-01-09T16:00:00.000Z",
      timing: "16:00:00.00",
      tree: "leaf1"
      // _highlight: true//默认选择当前项
    },
    {
      name: "张小刚",
      age: 25,
      address: "北京市海淀区西二旗",
      money: "130.00",
      cardId: "6223 5678 1234 5678",
      city: "北京",
      dating: "2018-01-09T16:00:00.000Z",
      timing: "16:00:00.00",
      tree: "leaf1"
    },
    {
      name: "李小红",
      age: 30,
      address: "上海市浦东新区世纪大道",
      money: "140.00",
      cardId: "6223 5678 1234 5678",
      city: "北京",
      dating: "2018-01-09T16:00:00.000Z",
      timing: "16:00:00.00",
      tree: "leaf1"
    },
    {
      name: "周小伟",
      age: 26,
      address: "深圳市南山区深南大道",
      money: "150.00",
      cardId: "6223 5678 1234 5678",
      city: "北京",
      dating: "2018-01-09T16:00:00.000Z",
      timing: "16:00:00.00",
      tree: "leaf1"
    }
  ];
  export default {
    data() {
      return {
        columns2: [
          {
            type: "text",
            title: "姓名",
            key: "name",
            width: 200,
            rule: [
              {
                validator: function(rule, value, callback) {
                  if (!value) {
                    callback(new Error("姓名必填"));
                  } else {
                    callback();
                  }
                }
              },
              {
                test: /^c/,
                message: "姓名要以字母 c 开头"
              },
              {
                pattern: /y$/,
                message: "姓名要以字母 y 结尾"
              }
            ]
          },
          {
            type: "text",
            title: "年龄",
            width: 200,
            key: "age",
            hiddenCol: false,
            rule: { required: true, message: "年龄不能为空" }
          },
          {
            type: "textArea",
            rows: 2,
            width: 200,
            title: "地址",
            key: "address",
            rule: { required: true, message: "地址不能为空" }
          },
          {
            type: "money",
            title: "金额",
            width: 200,
            integerNum: 3,
            suffixNum: 2,
            bigTips: true,
            key: "money",
            rule: { required: true, message: "金额不能为空" }
          },
          {
            type: "card",
            title: "卡号",
            width: 200,
            key: "cardId",
            rule: { required: true, message: "卡号不能为空" }
          },
          {
            type: "select",
            title: "地区",
            width: 200,
            key: "city",
            multiple: false,
            transfer: true,
            option: [
              { value: "北京" },
              { value: "上海" },
              { value: "天津" },
              { value: "沈阳" },
              { value: "杭州" },
              { value: "武汉" }
            ],
            rule: { required: true, message: "请选择城市" }
          },
          {
            type: "date",
            title: "日期",
            width: 200,
            key: "dating",
            dateType: "date",
            format: "yyyy-MM-dd",
            rule: { required: true, message: "请选择日期" }
          },
          {
            type: "time",
            title: "时间",
            width: 200,
            key: "timing",
            dateType: "time",
            format: "HH:mm:ss",
            steps: [],
            rule: { required: true, message: "请选择时间" }
          },
          {
            type: "selectTree",
            title: "下拉树",
            width: 200,
            key: "tree",
            treeData: [
              {
                expand: true,
                title: "parent 1",
                children: [
                  {
                    title: "parent 1-0",
                    expand: true,
                    children: [
                      {
                        title: "leaf1",
                        disableCheckbox: true
                      },
                      {
                        title: "leaf2"
                      }
                    ]
                  },
                  {
                    title: "parent 1-1",
                    expand: true,
                    checked: true,
                    children: [
                      {
                        title: "leaf3"
                      }
                    ]
                  }
                ]
              }
            ],
            showCheckbox: false,
            checkStrictly: false,
            rule: { required: true, message: "请选择子节点" }
          }
        ],
        data1: tData,
        options1: [],
        treeOption: []
      };
    },
    mounted() {
      this.treeOption[8] = [
        {
          expand: true,
          title: "parent 1",
          children: [
            {
              title: "parent 1-0",
              expand: true,
              children: [
                {
                  title: "leaf1",
                  disableCheckbox: true
                },
                {
                  title: "leaf2"
                }
              ]
            },
            {
              title: "parent 1-1",
              expand: true,
              checked: true,
              children: [
                {
                  title: "leaf3"
                }
              ]
            }
          ]
        }
      ];
      this.options1[5] = [
        { value: "Alabama", label: "Alabama" },
        { value: "beijing", label: "北京" },
        { value: "Delaware", label: "Delaware" }
      ];
    },
    methods: {
      click1(s) {
        // console.log(s);
      },
      addDate() {
        tData = this.data1.push({
          name: "",
          age: null,
          address: "",
          money: "",
          cardId: "",
          city: "",
          dating: "",
          timing: "",
          tree: ""
        });
      },
      getDate() {
        console.log(this.$refs.editGird.cloneData);
      },
      onEnter(a, b, c) {
        console.log("on-enter", a, b, c);
      },
      moneyChange(a, b, c) {
        console.log("moneyEnter", a, b, c);
      }
    }
  };
</script>
