<template>
<div>
     <h-tree :data="baseData6" :load-data="loadData" show-checkbox></h-tree>   
</div>
</template>
<script>
    export default {
        data () {
            return {
                baseData6: [
                    {
                        title: 'parent',
                        loading: false,
                        children: []
                    }
                ]
            }
        },
        methods: {
            loadData (item, callback) {
                setTimeout(() => {
                    const data = [
                        {
                            title: 'children',
                            loading: false,
                            children: []
                        },
                        {
                            title: 'children',
                            loading: false,
                            children: []
                        }
                    ];
                    callback(data);
                }, 1000);
            }
        }
    }
</script>
