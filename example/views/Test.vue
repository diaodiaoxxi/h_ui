<template>
<div style="background: #eee;">
    <h-tree :data="baseData1" show-checkbox multiple selectToCheck ref="tree1"></h-tree>
    <h-select-tree v-model="val1" style="width:200px" selectToCheck :data="baseData1" showCheckbox></h-select-tree>
    <p>----- button ------</p>
    <h-button type="text">text</h-button>
</div>
</template>
<script>
    // import Code from '../../code/selectTree';
    export default {
        data () {
            return {
                val1: [],         
                baseData1: [
                  {
                    title: 'parent',
                    id: '1-0',
                    expand: true,
                    children: [
                      {
                        title: 'child1',
                        id: '1-1',
                        expand: true,
                        children: [
                          {
                            title: 'child1-1-1',
                            id: '1-1-1'
                          },
                          {
                            title: 'child1-1-2',
                            id: '1-1-2'
                          }
                        ]
                      },
                      {
                        title: 'child2',
                        id: '1-2',
                        children: []
                      }
                    ] }
                ]}
        } 
    }
</script>
