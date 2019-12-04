<template>
<div>
    <h-cascader ref="cascader" v-model="value" :data="data"  multiple :load-data="loadData"></h-cascader>
</div>
</template>
<script>
    export default {
        data () {
            return {
                value: [ 
                    ['beijing', 'talkingdata', 'talkingdata1'],
                    ['beijing', 'talkingdata', 'talkingdata2'],
                    ['hangzhou', 'ali']
                ],
                value1: ['beijing', 'talkingdata', 'talkingdata1'],
                data: [
                    {
                        value: 'beijing',
                        label: '北京',
                        children: [],
                        loading: false
                    },
                    {
                        value: 'hangzhou',
                        label: '杭州',
                        children: [],
                        loading:false
                    }
                ],
                promiseAll: []
            }
        },
        methods: {
            loadData (item, callback) {
                    item.loading = true;
                    setTimeout(() => {
                        if (item.value === 'beijing') {
                            item.children = [
                                {
                                    value: 'talkingdata',
                                    label: 'TalkingData',
                                    children: [],
                                    loading: false,
                                },
                                {
                                    value: 'baidu',
                                    label: '百度'
                                },
                                {
                                    value: 'sina',
                                    label: '新浪',
                                    children: [],
                                    loading: false,
                                }
                            ];
                        } 
                        if (item.value === 'hangzhou') {
                            item.children = [
                                {
                                    value: 'ali',
                                    label: '阿里巴巴'
                                },
                                {
                                    value: '163',
                                    label: '网易'
                                }
                            ];
                        }
                        if (item.value === 'talkingdata') {
                            item.children = [
                                {
                                    value: 'talkingdata1',
                                    label: 'TalkingData1'
                                },
                                {
                                    value: 'talkingdata2',
                                    label: 'talkingdata2'
                                },
                            ]
                        }
                        if (item.value === 'sina') {
                            item.children = [
                                {
                                    value: 'sina1',
                                    label: 'sina1'
                                },
                                {
                                    value: 'sina2',
                                    label: 'sina2'
                                },
                            ]
                        }
                        item.loading = false;   
                        callback && callback() 
                    }, 10000);                    

            },
            updateData(arr, data) {
                if ( arr.length === 0 ) return
                arr = JSON.parse(JSON.stringify(arr))
                let value = arr.shift()
                data.forEach(v => { 
                    if (value !== v.value) return
                    if ( v.children && v.children.length === 0 ) {
                        this.loadData(v, () => {
                            this.updateData(arr, v.children)
                        })
                    } else {
                        this.updateData(arr, v.children)
                    }
                })
            }
        },
        mounted() {
            // console.log(this.$refs.cascader)
            // this.$refs.cascader.displayRender = '杭州 / 阿里巴巴'
            // this.value.map(item => {
            //     this.updateData(item, this.data)
            // })
            // Promise.all(this.promiseAll).then(res => {
            //     console.log('wancheng')
            // })
        }
    }
</script>
