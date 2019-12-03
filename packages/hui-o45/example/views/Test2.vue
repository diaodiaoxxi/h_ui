<template>
  <div>
    <p>我叫{{ list[0].name }},年芳{{ age }}</p>
    <p>我可爱吗？</p>
    <div v-if="!list[0].isRight">
      <p>小姐姐：{{ isRight }}
        <h-icon name="checkmark" v-if="yes"></h-icon>
        <h-icon name="close-round" v-else></h-icon>
      </p>
      <p>小明：{{ lovelyMessage }}</p>
      <p v-if="isShow">小哥哥：呃呃呃</p>
      <p v-else>小哥哥：呵呵呵</p>
    </div>
    <p v-else>小哥哥：哇哇哇</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list:[{name: '小明', isRight: false}],
      yes: false,
      isShow: false
    }
  },
  props: {
    age: Number,
    isRight: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    lovelyMessage() {
      let msg = ''
      if(this.isRight) {
        msg = '么么哒~~'
      }else {
        msg = '滚!!!'
      }
      return msg
    }
  },
  watch: {
    isRight(val) {
      this.yes = val
      //nextTick演示使用
//      debugger
      this.$nextTick(() => {
//        debugger
        this.isShow = !this.isShow
      })
    }
  }
}
</script>
