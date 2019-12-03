<template>
  <div>
    <h2>format支持2种格式yyyy/MM/dd或者yyyy-MM-dd或者yyMMdd</h2>
    {{valrange1}}
    <h-splice-panel :open="open" v-model="valrange1" format="yyyy/MM/dd" confirm @on-ok="handleOk" showFormat @on-change="onChange">
      <a href="javascript:void(0)" @click="handleClick">
        <h-icon name="activity"></h-icon>
        <template v-if="valrange1 === []">选择日期</template>
        <template v-else>{{ valrange1 }}</template>
      </a>
    </h-splice-panel>
    {{valrange2}}
    <h-splice-panel 
      v-model="valrange2" 
      @on-change="onChange" 
      @on-open-change="onOpenChange" 
      
      >
    </h-splice-panel>
  </div>
</template>

<script>
export default {
  data() {
    return{
      val1:'2018/01/01',
      val2:'2018-01-01',
      val3:'20180101',
      val4:'',
      val5:20180101,
      valrange1:['2018/01/03','2018/01/08'],
      valrange2:['2019-01-03', '2019-01-06' ],
      readonly:false,
      options1: {
        shortcuts: [
          {
            text: '今天',
            value () {
              return new Date();
            },
            onClick: (picker) => {
              this.$hMessage.info('点击了今天');
            }
          },
          {
            text: '昨天',
            value () {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              return date;
            },
            onClick: (picker) => {
              this.$hMessage.info('点击了昨天');
            }
          },
          {
            text: '一周前',
            value () {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              return date;
            },
            onClick: (picker) => {
              this.$hMessage.info('点击了一周前');
            }
          }
        ],
      },
      options3: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      open:false,
      options5:{

      }
    }
  },
  methods: {
    onChange (value) {
        // console.log(value);
    },
    onOpenChange (val) {
        // console.log("触发了on-open-change", val);
    },
    onOk () {
        console.log("触发了on-ok");
    },
    clear(){
      console.log("触发了on-clear");
    },
    handleClick () {
      this.open = !this.open;
    },
    handleClear () {
      this.open = false;
    },
    handleOk () {
      this.open = false;
    },
    handleRange(val,status){
      this.options5={
        disabledDate (date) {
          if (status) {
            return false;
          }else{
            return date.valueOf()>val.valueOf()+86400000*30||date.valueOf()<val.valueOf()-86400000*30;
          }
        }
      }
    },
  } 
}
</script>