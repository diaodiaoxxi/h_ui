<template>
<div>
    <h-cascader ref="cascader" v-model="value" :data="data4"  multiple :load-data="loadData"></h-cascader>
    <!-- <h-cascader ref="cascader" v-model="value1" :load-data="loadData"  :data="data4" ></h-cascader> -->
</div>
</template>
<script>
    export default {
        data () {
            return {
                value: [ 
                    ['beijing', 'talkingdata', 'talkingdata1'],
                    ['beijing', 'talkingdata', 'talkingdata2'],
                    //  ['beijing', 'talkingdata'],
                    ['hangzhou', 'ali']
                ],
                value1: ['beijing', 'talkingdata', 'talkingdata1'],
                data4: [
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
                ]
            }
        },
        methods: {
            loadData (item, callback) {
                console.log('loadData', item)
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
                    callback();
                }, 1000);
            }
        },
        mounted() {
            console.log(this.$refs.cascader)
            // this.$refs.cascader.displayRender = '杭州 / 阿里巴巴'
        }
    }
</script>
