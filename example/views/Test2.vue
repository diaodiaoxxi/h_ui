export default code;
<template>
<div>
    <h-table width="750" border :multiLevel="multiLevel1" :columns="columnsFixed" :data="dataFixed"></h-table>
</div>
</template>
<script>
export default {
  data() {
    return {
      multiLevel1: [
        [
          {
            title: "姓名多级",
            cols: 1,
            rows: 2,
            align: "center",
            fixed: "left"
          },
          {
            title: "机构",
            cols: "1",
            align: "center",
            fixed: "left"
          },
          {
            title: "个人",
            cols: "1",
            align: "center",
            classname: "multi2"
          },
          {
            title: "产品",
            cols: "1",
            align: "center",
            classname: "multi2"
          },
          {
            title: "名臣",
            cols: "1",
            align: "center",
            classname: "multi2"
          },
          {
            title: "宝仪",
            cols: "1",
            align: "center",
            classname: "multi2",
            fixed: "right"
          },
          {
            title: "认购金额",
            cols: "1",
            rows: 2,
            align: "center",
            fixed: "right"
          }
        ],
        [
          {
            title: "年龄",
            width: 100,
            fixed: "left"
          },
          {
            title: "省份",
            width: 100
          },
          {
            title: "市区",
            width: 100
          },
          {
            title: "地址",
            width: 200
          },
          {
            title: "邮编",
            width: 100,
            fixed: "right"
          },
          {
            title: "操作",
            width: 100,
            fixed: "right"
          }
        ]
      ],
      columnsFixed: [
        {
          title: "姓名",
          key: "name",
          width: 100,
          fixed: "left"
        },
        {
          title: "年龄",
          key: "age",
          width: 100,
          fixed: "left"
        },
        {
          title: "省份",
          key: "province",
          width: 100
        },
        {
          title: "市区",
          key: "city",
          width: 100
        },
        {
          title: "地址",
          key: "address",
          width: 200
        },
        {
          title: "邮编",
          key: "zip",
          width: 100,
          fixed: "right"
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          width: 120,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      dataFixed: [
        {
          name: "王小明",
          age: 18,
          address: "北京市朝阳区芍药居",
          province: "北京市",
          city: "朝阳区",
          zip: 100000
        },
        {
          name: "张小刚",
          age: 25,
          address: "北京市海淀区西二旗",
          province: "北京市",
          city: "海淀区",
          zip: 100000
        },
        {
          name: "李小红",
          age: 30,
          address: "上海市浦东新区世纪大道",
          province: "上海市",
          city: "浦东新区",
          zip: 100000
        },
        {
          name: "周小伟",
          age: 26,
          address: "深圳市南山区深南大道",
          province: "广东",
          city: "南山区",
          zip: 100000
        }
      ]
    };
  }
};
</script>
<style>
.cur-th {
  display: none;
}
</style>
