<template>
  <div :class="classes" ref="select" :style="singleStyle" v-clickoutside="{trigger: 'mousedown', handler: handleClose}">
    <div :class="[`${prefixCls}-selection`, 'single-selection']" ref="reference" >
      <input ref="input" type="text" v-model="query"
             :disabled="disabled" :readonly="!editable||readonly"
             :class="[`${prefixCls}-input`]" :title="selected"
             :placeholder="showPlaceholder?localePlaceholder:''" :tabindex="tabindex"
             @focus="handleFocus" @blur="handleBlur"
             @keydown="handleInputKeyDown" @keyup="handleInputKeyup">
      <Icon name="unfold" :class="[`${prefixCls}-arrow`]" @click.native.stop="arrowClick"></Icon>
    </div>
    <Drop ref="dropdown" v-show="dropVisible"
          :class="dropdownCls" :placement="fPlacement"
          :dropWidth="dropWidth" :maxDropWidth="maxDropWidth"
          :widthAdaption="widthAdaption" :data-transfer="transfer"
          v-transfer-dom>
      <div :class="[`${prefixCls}-dropdown-noline-content`]" ref="content">
        <div :class="[`${prefixCls}-dropdown-list`]" ref='blockWrapper'>
          <slot></slot>
        </div>
        <div v-show="loading" :class="[`${prefixCls}-block-loading`]">{{localeLoadingText}}</div>
      </div>
    </Drop>
  </div>
</template>
<script>
import Icon from '../Icon/Icon.vue'
import Drop from './Dropdown.vue'
import clickoutside from '../../directives/clickoutside'
import TransferDom from '../../directives/transfer-dom'
import { on, off } from '../../util/dom'
import { getScrollBarSize, getStyle } from '../../util/tools'
import Emitter from '../../mixins/emitter'
import Locale from '../../mixins/locale'

export default {
  name: 'StockSelect',
  mixins: [Emitter, Locale],
  components: { Icon, Drop },
  directives: { clickoutside, TransferDom },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    firstInit: {
      type: Boolean,
      default: false
    },
    accuFilter: {
      type: Boolean,
      default: false
    },
    isSingleSelect:{
      type:Boolean,
      default:true,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String
    },
    remote: {
      type: Boolean,
      default: true
    },
    remoteMethod: {
      type: Function,
      default(key, done) {
        done()
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String
    },
    width: {
      type: [String, Number]
    },
    transfer: {
      type: Boolean,
      default: false
    },
    autoPlacement: {
      type: Boolean,
      default: false
    },
    placement: {
      validator(value) {
        return ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'].includes(value)
      },
      default: 'bottom'
    },
    widthAdaption: {
      type: Boolean,
      default: false
    },
    dropWidth: {
      type: [String, Number]
    },
    maxDropWidth: {
      type: [String, Number],
      default: 500
    },
    keepInputValue: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: [String, Number],
      default: 0,
      validator(value) {
        let num = parseInt(value)
        return num <= 32767 && num >= -1
      }
    }
  },
  data() {
    return {
      prefixCls: 'h-selectTable',
      visible: false,
      fPlacement: this.placement,
      options: [],
      availableOptions: [], // 用于左右键选择时选择可用（过滤后）的options
      isInputFocus: false, //是否焦点，为false时触发blur校验
      focusIndex: 0,// 当前选中项在当前下拉选项列表中的序号
      model: null,// 组件双向绑定的值
      query: '',// 输入框内的值
      querySingle: '',
      selected: '',// 已选记录
      isQuerySelect: false, // 是否点选选中 false点选 true模糊匹配选中
      selectToChangeQuery: false, // 选择一个值后执行过滤，false: 不执行 true: 执行
      scrollBarWidth: getScrollBarSize(),
    }
  },
  computed: {
    singleStyle() {
      return {
        width: `${this.width}px`
      }
    },
    classes() {
      return [
        `${this.prefixCls}`,`${this.prefixCls}-single`,
        {
          [`${this.prefixCls}-visible`]: this.visible,
          [`${this.prefixCls}-disabled`]: this.disabled,
          [`${this.prefixCls}-readonly`]: this.readonly,
          [`${this.prefixCls}-editable`]: !this.editable,
          [`${this.prefixCls}-${this.size}`]: !!this.size
        }
      ]
    },
    dropdownCls() {
      return {
        ['h-select-dropdown-transfer']: this.transfer
      }
    },
    showPlaceholder() {
      let status = false
      if (typeof this.model === 'string') {
        if (this.model === '') {
          status = true
        }
      } else if (this.model === null) {
        status = true
      }
      return status
    },
    localePlaceholder() {
      if (this.placeholder === undefined) {
        return this.t('i.select.placeholder')
      } else {
        return this.placeholder
      }
    },
    localeLoadingText() {
      if (this.loadingText === undefined) {
        return this.t('i.select.loading')
      } else {
        return this.loadingText
      }
    },
    transitionName() {
      const bottomPlaced = this.fPlacement.match(/^bottom/)
      return bottomPlaced ? 'slide-up' : 'slide-down'
    },
    dropVisible() {
      let status = true
      const options = this.$slots.default || []
      if (!this.loading && this.remote && this.query === '' && !options.length) status = false
      return this.visible && status
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.model = val
      }
    },
    model(newVal) {
      const type = typeof newVal
      if (type === 'string' || type === 'number') {
        let findModel = false
        let curValue = ''
        if(newVal !== '') {
          for (let k in this.options) {
            if (this.model === this.options[k].value) {
              curValue = this.options[k].value
              findModel = true
              break
            }
          }
        }
        if (newVal === '') {
          this.selected = ''
        } else if (this.remote && findModel) {
          this.selected = curValue
        }
      }
      this.findChild(child => {
        this.options.forEach((col, i) => {
          if (newVal === col.value) {
            this.$set(child.cloneData[i], 'selected', true)
          } else {
            this.$set(child.cloneData[i], 'selected', false)
          }
        })
      })
    },
    selected(newVal) {
      this.$emit('input', newVal)
      this.$emit('on-change', newVal)
      let curlabel = ''
      let index = 0
      this.availableOptions.forEach((col, i) => {
        if (col.value === newVal) {
          curlabel = col.label
          index = col.index + 1
        }
      })
      this.focusIndex = index

      this.$nextTick(() => {
        this.query = curlabel
        this.selectToChangeQuery = true
      })
    },
    query(newVal) {
      this.querySingle = newVal
      if (!this.selectToChangeQuery) {
        // 解决当通过表单方法firstNodeFocused定位到SimpleSelect时只能输入但不展示下拉选项的问题
        if (!this.visible && this.querySingle) {
          this.visible = true
        }
        this.remoteMethod(this.querySingle, () => {
          this.$nextTick(() => {
            // o45业务代码会默认绑定model值为下拉选项第一个
            if(this.firstInit) {
              this.broadcast('Block', 'on-query-change', '',true)
            }else {
              this.broadcast('Block', 'on-query-change', this.querySingle)
            }
          })
        })

        this.$emit('on-query-change', this.querySingle)
      }else {
        // 非自动匹配到的值手动清空后绑定的model没清空问题
        if(this.querySingle === '') {
          this.model = ''
        }
      }
      this.selectToChangeQuery = false
      this.broadcast('Drop', 'on-update-popper')
    },
    visible(val) {
      if (val) {
        this.setPlacement()
        this.$nextTick(() => {
          let content = this.$refs.content
          if (content.scrollHeight > content.clientHeight) {
            let cur = this.dropWidth > 0 ? this.dropWidth : parseInt(getStyle(this.$el, 'width'))
            this.findChild(child => {
              child.hasWidth = cur - this.scrollBarWidth
            })
          }
        })
        setTimeout(() => {
          this.dispatch('Msgbox', 'on-esc-real-close', false)
        }, 0)
        this.broadcast('Drop', 'on-update-popper')
      } else {
        this.$refs.input.blur()
        setTimeout(() => {
          if (this.remote && this.remoteMethod) return
          this.broadcast('Block', 'on-query-change', '', true)
        }, 300)
        setTimeout(() => {
          this.dispatch('Msgbox', 'on-esc-real-close', true)
        }, 0)
      }
      this.$emit('on-drop-change', val)
    },
    placement(val) {
      this.fPlacement = val
    },
    focusIndex: {
      handler(nv) {
        this.broadcast('Block', 'on-focus-index-change', nv - 1)
      }
    }
  },
  methods: {
    findChild(cb) {
      const find = function(child) {
        const name = child.$options.componentName
        if (name) {
          cb(child)
        } else if (child.$children.length) {
          child.$children.forEach(innerChild => {
            find(innerChild, cb)
          })
        }
      }
      this.$children.forEach(child => {
        find(child)
      })
    },
    fold() {
      this.visible = false
    },
    setPlacement() {
      if (this.autoPlacement) {
        let clientHeight = document.documentElement.clientHeight
        let rect = this.$refs.select.getBoundingClientRect()
        let curbottom = clientHeight - rect.top - rect.height
        let bottomNum = 210
        if (curbottom < bottomNum) {
          this.fPlacement = 'top'
        }else {
          this.fPlacement = 'bottom'
        }
      }
    },
    focus() {
      this.isInputFocus = true
      this.$refs.input.focus()
      this.$nextTick(() => {
        this.$refs.input.select()
      })
    },
    blur() {
      this.$refs.input.blur()
      this.visible = false
      this.isInputFocus = false
      let flag = false
      if(this.query !== '') {
        for(let i in this.availableOptions) {
          if(this.querySingle === this.availableOptions[i].label) {
            this.model = this.availableOptions[i].value
            flag = true
            break
          }
        }
        if(!flag) {
          if(!this.keepInputValue) {
            if (this.availableOptions.length > 0) {
              this.model = this.availableOptions[0].value
            }else {
              this.query = ''
            }
          }else {
            this.model = this.query
          }
        }
        flag = false
      }else {
        this.model = ''
      }
      this.$nextTick(() => {
        this.dispatch('FormItem', 'on-form-blur', this.model)
      })
    },
    handleClose() {
      this.fold()
      this.selectToChangeQuery = false
      if (this.isInputFocus) {
        let flag = false
        if (this.query !== '') {
          // 先选值，左右键切换，再删除一个字符仍然有匹配项时
          for(let i in this.availableOptions) {
            if(this.querySingle === this.availableOptions[i].label) {
              this.model = this.availableOptions[i].value
              flag = true
              break
            }
          }
          if(!flag) {
            if(!this.keepInputValue) {
              if (this.availableOptions.length > 0) {
                this.model = this.availableOptions[0].value
              }else {
                this.query = ''
              }
            }else {
              this.model = this.query
            }
          }
        }else {
          this.model = ''
        }
        this.isInputFocus = false
        this.$nextTick(() => {
          this.dispatch('FormItem', 'on-form-blur', this.model)
        })
      }
    },
    arrowClick() {
      if (this.disabled || !this.editable || this.readonly) {
        return false
      }
      this.visible = !this.visible
      this.focus()
    },
    handleFocus(e) {
      this.isInputFocus = true
      e.target.selectionStart = 0
      e.target.selectionEnd = this.query.length
      this.$emit('on-focus')
      this.$emit('on-input-focus')
      this.dispatch('FormItem', 'on-form-focus')
    },
    handleBlur() {
      this.isInputFocus = false
      this.$emit('on-blur')
      this.dispatch('FormItem', 'on-form-blur')
    },
    handleInputKeyDown(e) {
      if (this.visible && e.keyCode === 9) {
        this.fold()
        this.isInputFocus = false
      }
      if (!this.isInputFocus) {
        this.isInputFocus = true
      }
      this.$emit('on-keydown', this.query, e)
    },
    handleInputKeyup(e){
      //o45 忽略tab
      if(e.keyCode !== 9) {
        this.$emit('on-keyup', this.query, e)
      }
    },
    updateOptions(init, slot = false) {
      let options = []
      this.findChild(child => {
        let data = child.cloneData
        data.forEach((col, i) => {
          options.push({
            value: col.value,
            label: col.label || col.value,
            label1: col[child.showCol[0]],
            disabled: col.disabled || false,
            index: i
          })
        })
      })
      this.options = options
      this.availableOptions = options
      this.broadcast('Drop', 'on-update-popper')
      if (init) {
        this.$refs.dropdown.setWidthAdaption()
      }
    },
    handleKeydown(e) {
      const keyCode = e.keyCode
      // right
      if (keyCode === 39) {
        e.preventDefault()
        this.navigateOptions('next')
      }
      // left
      if (keyCode === 37) {
        e.preventDefault()
        this.navigateOptions('prev')
      }
      //delete
      if (keyCode === 46) {
        e.preventDefault()
        this.model = ''
        this.query = ''
      }
      // Esc
      if (keyCode === 27) {
        e.preventDefault()
        if (this.visible) {
          this.fold()
          //下拉框弹出，ESC收起面板后，焦点在输入框，内容全选
          this.blur()
          this.focus()
        }
      }
    },
    navigateOptions(direction) {
      if(this.readonly) {
        return false
      }
      if (direction === 'next') {
        const next = this.focusIndex + 1
        this.focusIndex = this.focusIndex >= this.availableOptions.length ? 1 : next
      } else if (direction === 'prev') {
        const prev = this.focusIndex - 1
        this.focusIndex = this.focusIndex <= 1 ? this.availableOptions.length : prev
      }
      let focusValue = this.availableOptions[this.focusIndex - 1].value
      // 处理滚动条
      this.findChild(child => {
        // let curTop = child.$el.scrollTop
        let itemHeight = child.itemHeight
        let top = itemHeight * (this.focusIndex - 1)
        child.$el.scrollTop = top
      })
      this.selectBlockSingle(focusValue)
    },
    //左右键、点选选中options中value值
    selectBlockSingle(value, status = false, str, nullValue = false) {
      //焦点未离开勿更新可选options
      if(!this.isInputFocus) {
        this.availableOptions = this.options
      }
//      this.selectToChangeQuery = true
      if (this.model !== value) {
        this.model = value
      }
      if (str === 'click') {
        this.fold()
        this.blur()
        // o45要求点选完焦点不移开与formitem焦点所在位置显示errorTip冲突，当前次为空重新选值时如果不失焦下errorTip会显示
        this.$nextTick(() => {
          this.focus()
        })
      }
    }
  },
  mounted() {
    on(this.$refs.select, 'keydown', this.handleKeydown)
    this.updateOptions(true)
    this.$on('on-options-visible-change', arg => {
      this.availableOptions = arg.data.filter(option => !option.hidden)
      // 筛选后的options写入index 左右切换使用
      this.availableOptions.forEach((col, i) => {
        this.$set(this.availableOptions[i], 'index', i)
      })
    })
  },
  beforeDestroy() {
    off(this.$refs.select, 'keydown', this.handleKeydown)
    this.broadcast('Drop', 'on-destroy-popper')
  }
}
</script>
