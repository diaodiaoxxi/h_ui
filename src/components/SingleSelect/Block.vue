<template>
  <div ref="block"
       @scroll="handleBodyScroll"
       :class="blockCls">
    <div v-if="showHeader.length"
         :class="[prefixCls+'-item-header']">
      <span v-for="(item, index) in showHeader"
            :key="index"
            class="item-header"
            :style="styleArr[index]">
        {{item.title ? item.title : item}}
      </span>
    </div>
    <div :class="[prefixCls+'-phantom']"
         :style="phantomStl"></div>
    <ul :class="[prefixCls+'block-content']"
        ref="content">
      <li v-for="(item,inx) in visibleData"
          :key="inx"
          v-show="!item.hidden"
          :class="classes(item)"
          @click.stop="select(item)"
          @mouseout.stop="blur">

        <slot><span :style="showCol.length ? styleArr[0] : ''"
                :class="showCol.length ? 'itemcol' : ''"
                :title="showCol.length || hideMult ? showLabel(item) : ''">
            <checkbox v-show="multiple&&!hideMult"
                      size="large"
                      :value="item.selected"
                      @click.native.stop="handleclick"
                      :disabled="item.disabled"
                      @on-change="checkChange($event,item)"></checkbox>
            {{showLabel(item)}}
          </span></slot>
        <span class="itemcol"
              v-for="(col, index) in showCol"
              :key="col"
              :style="styleArr[index + 1]"
              :title="item[col]">{{item[col]}}</span>
      </li>
    </ul>
    <div v-if="showEmpty && !loading"
         :class="[prefixCls+'-empty']">{{localeNoMatch}}</div>
    <!-- 用于撑开高度 -->
    <div v-show="loading && visibleData.length === 0" :class="[prefixCls+'-loading-placeholder']">&nbsp;</div>
  </div>
</template>
<script>
import Locale from '../../mixins/locale'
import Checkbox from '../Checkbox/Checkbox.vue'
import { SingleSelectBlockApi } from './Api'
import { deepCopy, getBarBottom, getScrollBarSize} from '../../util/tools'

export default {
  mixins: [Locale, SingleSelectBlockApi],
  components: { Checkbox },
  data() {
    return {
      prefixCls: 'h-select-block',
      multiple: false,
      hideMult: false,
      visibleData: [],
      visibleCount: 20,
      cloneData: [],
      lastScollTop: 0,
      lastScollBottom:null,
      showEmpty: false,
      showBottom: false,
      focusIndex: 0
    }
  },
  computed: {
    phantomStl() {
      let style = {}
      let curData = this.cloneData.filter(col => {
        return !col.hidden
      })

      let height = curData.length * 30
      if (this.offset && height < 210) {
        height += 30
      }
      style.height = height + 'px'
      return style
    },
    blockCls() {
      return [
        `${this.prefixCls}-drop`,
        {
          [`${this.prefixCls}-multiple`]: this.multiple,
          [`${this.prefixCls}-show-bottom`]: this.showBottom,
          [`${this.prefixCls}-hideMult`]: this.hideMult && this.multiple
        }
      ]
    },
    localeNoMatch() {
      return this.t('i.select.noMatch')
    },
    itemClasses() {
      return ''
    },
    offset() {
      if (this.showHeader.length) return 30
      return 0
    },
    loading() {
      return this.$parent.$parent.loading
    }
  },
  methods: {
    classes(item) {
      return [
        `${this.prefixCls}-item`,
        {
          [`${this.prefixCls}-disabled`]: item.disabled || false,
          [`${this.prefixCls}-selected`]: item.selected || false,
          [`${this.prefixCls}-focus`]: item.focus || false
        }
      ]
    },
    showLabel(item) {
      return item.label ? item.label : item.value
    },
    select(item) {
      if (item.disabled) {
        return false
      }
      this.$parent.$parent.selectBlockSingle(item.value, false, 'click', false)
    },
    checkChange(val, item) {
      this.$parent.$parent.selectBlockMultiple(item.value,item)
    },
    blur() {
      this.isFocus = false
    },
    queryChange(val,states) {
      const parsedQuery = val.replace(
        /(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g,
        '\\$1'
      )
      let status = true
      let isEffective = false
      // 149105 【TS:201906280063-资管业委会（资管）_钱佳华-【需求类型】需求【需求描述】select和SimpleSelect 控件多选时 如果搜索时输入的信息完全匹配到 value或者label的时候 自动勾上；对接开发：郑海华【事业部】资管业委会【项目名称】HUNDSUN投资交易管理系统软件V4.5【产品负责人】孔磊【需求提出人】钱佳华
      // singleSelect自动勾选，多个label匹配是选第一个，foreach无法break
      //      try{
      this.cloneData.forEach(col => {
        let targetLabel = col.label
        // 如果存在多列，则匹配目标为多列所有列
        if (this.showCol.length&&!this.$parent.$parent.newSearchModel&&!this.$parent.$parent.isSingleSelect) {
          targetLabel = targetLabel + ' ' + this.getTargetLabel(col).join(' ')
        }
        let targetValue =col.value
        let selected=col.selected
        // let targetoption=this.$parent.$parent.filterBy=="label"||this.$parent.$parent.filterBy==undefined?targetLabel:targetValue;
        let hidden
        let checkLabel = !new RegExp(parsedQuery, 'i').test(col.label)
        let checkValue = !new RegExp(parsedQuery, 'i').test(col.value)
        if(col.label1) {
          let checkLabel1 = !new RegExp(parsedQuery, 'i').test(col.label1)
          hidden = checkLabel && checkLabel1 && checkValue
        }else {
          hidden = checkValue && checkLabel
        }
        this.$set(col, 'hidden', hidden)
        if (status && !hidden) {
          status = false
        }
        if(this.$parent.$parent.accuFilter){
          if ((parsedQuery===targetLabel)&&!selected&&!states) {
            if(this.$parent.$parent.isSingleSelect){
              isEffective = true
              this.$parent.$parent.selectBlockSingle(targetValue,true)
              //                throw new Error('EndIterative')
            }else{
              this.$parent.$parent.selectBlockMultiple(targetValue)
            }
          }
        }
      })
      //      }catch (e) {
      //        if(e.message != 'EndIterative') throw e
      //      }
      if(val===''&&this.$parent.$parent.isSingleSelect&&!isEffective&&!states){// 清空query值情况下
        this.$parent.$parent.selectBlockSingle('', true, '', true)
      }else if(val !==''&&this.$parent.$parent.isSingleSelect&&!isEffective&&!states) {//query不为空但未匹配到任何项
        this.$parent.$parent.selectBlockSingle('', true)
      }
      this.dispatch('SingleSelect', 'on-options-visible-change', { data: this.cloneData })
      this.showEmpty = status
      if (val) {
        this.dispatch('Drop', 'on-update-popper')
      }
      this.$nextTick(() => {
        if (val) {
          this.updateVisibleData(0)
        } else {
          this.updateVisibleData()
        }
        this.$refs.block.scrollTop = 0
      })
    },
    handleclick() {},
    handleBodyScroll(event) {
      let direction = this.lastScollTop !== event.target.scrollTop ? 'y' : 'x'
      this.lastScollTop = event.target.scrollTop
      this.updateVisibleData(event.target.scrollTop)
      this.lastScollBottom = getBarBottom(event.target, getScrollBarSize())
      if (this.lastScollBottom !== null && this.data.length > 0) {
        this.$emit('on-scroll', this.lastScollBottom, this.lastScollTop, direction)
      }
      // 修复滚动后出现 x 滚动条问题
      if (this.$parent.widthAdaption) {
        this.$parent.setWidthAdaption()
      }
    },
    updateVisibleData(scrollTop) {
      // o45 下拉最后一条时闪动问题处理 + 0.01 作为偏移值
      // 目前仅能在 o45 系统中复现
      let itemHeight = Number(this.itemHeight) + 0.01
      scrollTop = scrollTop == undefined ? this.lastScollTop : scrollTop
      this.start = Math.floor(scrollTop / itemHeight)
      let i = 0
      let j = this.start
      // 如果存在表头，添加初始偏移量
      let offset = 0
      if (this.start > 0)
        offset = -this.offset
      while (i < this.visibleCount) {
        if (!this.cloneData[j]) {
          i = this.visibleCount
          j = this.cloneData.length
        } else {
          if (!this.cloneData[j].hidden) {
            i++
          }
          j++
        }
      }
      this.end = j
      this.visibleData = this.cloneData
        .filter(item => !item.hidden)
        .slice(this.start, this.end)
      this.$nextTick(() => {
        this.$refs.content.style.transform = `translateY(${this.start * itemHeight + offset}px)`
      })
    },
    selectedTop(status) {
      if(status){
        this.cloneData.sort((a, b) => {
          if (a.selected && !b.selected) {
            return -1
          } else {
            return 0
          }
        })
      }else{
        this.cloneData.sort((a, b) => {
          return a._index<b._index?-1:0
        })
      }
      this.$refs.block.scrollTop = 0
      this.updateVisibleData(0)
      this.$parent.$parent.updateOptions()
    },
    /**
     * @description showHeader / showCol = true 时计算宽度
     */
    calcStyle(w) {
      this.calcStyle.cache || (this.calcStyle.cache = {})

      if (this.calcStyle.cache[w]) return this.calcStyle.cache[w]

      if (!this.showCol.length && !this.showHeader.length) {
        this.calcStyle.cache[w] = ''
        return this.calcStyle.cache[w]
      }

      let width = 'auto'
      if (w) {
        width = w + 'px'
      } else {
        width = '100px'
      }

      this.calcStyle.cache[w] = { width }
      return this.calcStyle.cache[w]
    },
    /**
     * @description 从 cloneData>item 中获取多列的 label 数组
     */
    getTargetLabel(option) {
      let target = []
      this.showCol.forEach(col => {
        target.push(option[col])
      })

      return target
    }
  },
  created() {
    // showHeader / showCol 生成样式数组
    if (this.showHeader.length) {
      this.styleArr = this.showHeader.map(item => this.calcStyle(item.width))
    } else if (this.showCol.length) {
      this.styleArr = []
      for(let i = 0; i < this.showCol.length + 1; i++) {
        let str = this.colWidth[i]?this.colWidth[i]:''
        this.styleArr.push(this.calcStyle(str))
      }
    }
  },
  mounted() {
    var str = this.$el.innerText
    this.searchLabel = str
      .replace('false', '')
      .replace('true', '')
      .trim()
    this.$on('on-select-close', () => {
      this.isFocus = false
    })
    this.$on('on-query-change', (val,states) => {
      this.queryChange(val,states)
    })
    this.$on('on-select-top', (status) => {
      this.selectedTop(status)
    })
    this.$on('on-focus-index-change', index => {
      this.cloneData.filter(item => !item.hidden).forEach((item, i) => {
        item.focus = false
        if (i === index) {
          item.focus = true
        }
      })
    })
    this.multiple = this.$parent.$parent.multiple
    this.showBottom = this.$parent.$parent.showBottom
    this.hideMult = this.$parent.$parent.hideMult
    this.cloneData = deepCopy(this.data)
    // v20190321 添加focus
    this.cloneData.forEach((item,i) => {
      item._index = i
      this.$set(item, 'focus', false)
    })
    this.$nextTick(() => {
      this.visibleCount = Math.ceil(210 / Number(this.itemHeight)) + 1
      this.updateVisibleData()
    })
  },
  watch: {
    data: {
      deep: true,
      handler: function(val) {
        if (val.length == 0) {
          this.showEmpty = true
        } else {
          this.showEmpty = false
        }
        // this.$nextTick(() => {//viewValue获取时机
        this.cloneData = deepCopy(this.data)
        this.cloneData.forEach((item,i) => {
          item._index = i
          this.$set(item, 'focus', false)
        })
        this.$parent.$parent.updateOptions(true)
        if(this.lastScollTop > val.length*this.itemHeight){
          this.lastScollTop = val.length*this.itemHeight-210
        }
        this.updateVisibleData()
        // })
      }
    },
    cloneData: {
      deep: true,
      handler: function() {
        // this.$nextTick(()=>{
        //   this.updateVisibleData();
        // })
      }
    },
  },
  destroyed() {
  }
}
</script>
