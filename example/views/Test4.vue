<template>
<div>
    <h-cascader initDataMultiple ref="cascader" v-model="value" :data="data"  multiple :load-data="loadData"></h-cascader>
    <h-button @click="getViewValue">获得回显数据</h-button>
</div>
</template>
<script>
    export default {
        data () {
            return {
                value: [ 
                    ['beijing', 'talkingdata', 'talkingdata1', 'talkingdata1-1'],
                    ['beijing', 'talkingdata', 'talkingdata2', 'talkingdata2-2' ],
                    ['beijing', 'baidu'],
                    ['beijing', 'sina', 'sina1'],
                    ['beijing', 'sina', 'sina2'],
                    ['hangzhou', 'ali']
                ],
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
                                    label: 'TalkingData1',
                                    children: [],
                                    loading: false,
                                },
                                {
                                    value: 'talkingdata2',
                                    label: 'talkingdata2',
                                    children: [],
                                    loading: false,
                                },
                            ]
                        }
                        if (item.value === 'sina') {
                            item.children = [
                                {
                                    value: 'sina1',
                                    label: 'sina1',
                                },
                                {
                                    value: 'sina2',
                                    label: 'sina2',
                                },
                            ]
                        }
                        if (item.value === 'talkingdata1') {
                            item.children = [
                                {
                                    value: 'talkingdata1-1',
                                    label: 'TalkingData1-1'
                                },
                                {
                                   value: 'talkingdata1-2',
                                   label: 'TalkingData1-2'
                                },
                            ]
                        }
                        if (item.value === 'talkingdata2') {
                            item.children = [
                                {
                                    value: 'talkingdata2-1',
                                    label: 'TalkingData2-1'
                                },
                                {
                                    value: 'talkingdata2-2',
                                    label: 'talkingdata2-2'
                                },
                            ]
                        }
                        item.loading = false; 
                        callback && callback() 

                    }, 2000);
            },
            getViewValue() {
                let arr = this.$refs.cascader.multipleValue.map(v => v.label)
                console.log(arr)
            }
        },
        mounted() {
        }
    }
</script>


