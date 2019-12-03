<template>
  <div>
    <h-simple-select v-model="value" ref="test" transfer>
      <h-select-block :data="bigData"></h-select-block>
    </h-simple-select>
  </div>
</template>
<script>
let bigData = [];
for(let i=0;i<2000;i++){
  let obj={};
  obj.value="value"+i;
  obj.label="label"+i;
  bigData.push(obj);
}
    export default {
        data () {
          return {
            bigData:bigData,
            value:'value0',
            value1:['value0'],
            value2:'',
          }
        }
    }
</script>