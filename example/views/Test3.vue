<template>
<div>
    <h-table :columns="columns10" :data="data9" @on-expand="onExpand"></h-table>
</div>
</template>
<script>
    export default {
        data () {
            return {
                columns10: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h('div', '-----  text  on expand -----')
                        }
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        sortable: true
                    },
                    {
                        title: '地址',
                        key: 'address'
                    }
                ],
                  data9: [
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居',
                        job: '数据工程师',
                        interest: '羽毛球',
                        birthday: '1991-05-14',
                        book: '乔布斯传',
                        movie: '致命魔术',
                        music: 'I Cry',
                        _disableExpand:true
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗',
                        job: '数据科学家',
                        interest: '排球',
                        birthday: '1989-03-18',
                        book: '我的奋斗',
                        movie: '罗马假日',
                        _expanded:true,
                        music: 'My Heart Will Go On'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道',
                        job: '数据产品经理',
                        interest: '网球',
                        birthday: '1992-01-31',
                        book: '赢',
                        movie: '乔布斯',
                        music: 'Don’t Cry'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道',
                        job: '数据分析师',
                        interest: '桌球，跑步',
                        birthday: '1988-7-25',
                        book: '红楼梦',
                        movie: '倩女幽魂',
                        music: '演员'
                    }
                ]
            }
        },
        methods: {
          onExpand(row, status, index) {
            console.log(row, status, index)
            console.log(this.data9[index].name)
          }
        }
    }
</script>
