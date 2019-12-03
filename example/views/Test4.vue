<template>
<div>
    <!-- <h-cascader ref="cascader" v-model="value" :data="data4" multiple :load-data="loadData"></h-cascader> -->
    <h-cascader ref="cascader" v-model="value1" :load-data="loadData" multiple :data="data4" ></h-cascader>
</div>
</template>
<script>
    export default {
        data () {
            return {
                value: [ 
                    ['beijing', 'talkingdata'],
                    ['beijing', 'baidu']
                ],
                value1: ['hangzhou', 'ali'],
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
                item.loading = true;
                setTimeout(() => {
                    if (item.value === 'beijing') {
                        item.children = [
                            {
                                value: 'talkingdata',
                                label: 'TalkingData'
                            },
                            {
                                value: 'baidu',
                                label: '百度'
                            },
                            {
                                value: 'sina',
                                label: '新浪'
                            }
                        ];
                    } else if (item.value === 'hangzhou') {
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
