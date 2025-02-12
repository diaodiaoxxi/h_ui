<template>
  <div :class="classes" ref="select" :style="singleWidth" v-clickoutside="{trigger: 'mousedown', handler: handleClose}">
    <div :class="[`${prefixCls}-selection`, 'single-selection']" ref="reference" >
      <input ref="input" type="text" v-model="query" :disabled="disabled" :readonly="!editable||readonly"
             :class="[`${prefixCls}-input`]" :title="selected" :placeholder="showPlaceholder?localePlaceholder:''" :tabindex="tabindex"
             @focus="handleFocus" @blur="handleBlur" @keydown="handleInputKeyDown" @keyup="handleInputKeyup">
      <Icon name="unfold" :class="[`${prefixCls}-arrow`]" @click.native.stop="arrowClick"></Icon>
    </div>
    <div v-if="animated">
      <transition :name="transitionName">
        <Drop ref="dropdown" v-show="dropVisible" :class="dropdownCls" :placement="fPlacement"
              :dropWidth="dropWidth" :maxDropWidth="maxDropWidth" :widthAdaption="widthAdaption"
              :data-transfer="transfer" v-transfer-dom>
          <div :class="[`${prefixCls}-dropdown-noline-content`]" ref="content">
            <div id="blockWrapper" :class="[`${prefixCls}-dropdown-list`]" ref='blockWrapper'>
              <slot></slot>
            </div>
            <div v-show="loading" :class="[`${prefixCls}-block-loading`]">{{localeLoadingText}}</div>
          </div>
        </Drop>
      </transition>
    </div>
    <div v-else>
      <Drop ref="dropdown" v-show="dropVisible" :class="dropdownCls" :placement="fPlacement"
            :dropWidth="dropWidth" :maxDropWidth="maxDropWidth" :widthAdaption="widthAdaption"
            :data-transfer="transfer" v-transfer-dom>
        <div :class="[`${prefixCls}-dropdown-noline-content`]" ref="content">
          <div :class="[`${prefixCls}-dropdown-list`]" ref='blockWrapper'>
            <slot></slot>
          </div>
          <div v-show="loading" :class="[`${prefixCls}-block-loading`]">{{localeLoadingText}}</div>
        </div>
      </Drop>
    </div>
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
import { SingleSelectApi } from './Api'

export default {
  name: 'SingleSelect',
  mixins: [Emitter, Locale, SingleSelectApi],
  components: { Icon, Drop },
  directives: { clickoutside, TransferDom },
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
    singleWidth() {
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
    model(val) {
//      this.modelToQuery()
      this.updateSingleSelected()
    },
    selected(val) {
      this.$emit('input', this.model)
      this.$emit('on-change', this.model)
      if (!this.isQuerySelect) {// 选中内容是点选而非模糊匹配到的
        this.query = val
        if (this.query !== '') {
          this.selectToChangeQuery = true
        }else {
          this.selectToChangeQuery = false
        }
      }
      this.setSingleSelect()
    },
    query(val) {
      if(val === '' ) {
//        this.$emit('input', val)
        this.$emit('on-change', val)
      }
      let querySingle = val.toString().split(' ')[0] //此处改变query
      this.querySingle = querySingle
      if (this.remote && this.remoteMethod) {
        if (!this.selectToChangeQuery) {
          // 解决当通过表单方法firstNodeFocused定位到SimpleSelect时只能输入但不展示下拉选项的问题
          if (!this.visible && querySingle) {
            this.visible = true
          }
          this.remoteMethod(querySingle, () => {
            this.$nextTick(() => {
              // o45业务代码会默认绑定model值为下拉选项第一个
              if(this.firstInit) {
                this.broadcast('Block', 'on-query-change', '',true)
              }else {
                this.broadcast('Block', 'on-query-change', this.querySingle)
              }
            })
          })
          this.$emit('on-query-change', querySingle)
        }else {
          // 非自动匹配到的值手动清空后绑定的model没清空问题
          if(querySingle === '') {
            this.model = ''
          }
        }
//        this.findChild(child => {
//          child.isFocus = false
//        })
      }else {
        if (!this.selectToChangeQuery) {
          // o45指令备注框赋默认值时不应该弹出框
          if (!this.visible && querySingle && !this.firstInit) {
            this.visible = true
          }
          this.$emit('on-query-change', querySingle)
          this.broadcast('Block', 'on-query-change', querySingle)
        } else if (this.isQuerySelect) {
          this.broadcast('Block', 'on-query-change', querySingle)
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
    },
//    isInputFocus(val) {
//      if (!val) {
//        this.setSingleSelect()
//      }
//    }
  },
  methods: {
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
      this.isQuerySelect = false
      let flag = false
      if (this.model === '' && this.query !== '') {
        // 先选值，左右键切换，再删除一个字符仍然有匹配项时
        for(let i in this.availableOptions) {
          if(this.query.toString().split(' ')[0] === this.availableOptions[i].label) {
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
      }else if(this.model !== '' && this.query !== '') { // 删除字符仍有匹配项但model未被清空
        this.setSingleSelect()
      }
//      this.broadcast('Block', 'on-query-change', this.query)
      this.$nextTick(() => {
        this.dispatch('FormItem', 'on-form-blur', this.model)
      })
    },
    handleClose() {
      this.fold()
      if (this.isInputFocus) {
        let flag = false
        if (this.model === '' && this.query !== '') {
          // 先选值，左右键切换，再删除一个字符仍然有匹配项时
          for(let i in this.availableOptions) {
            if(this.query.toString().split(' ')[0] === this.availableOptions[i].label) {
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
          this.isQuerySelect = false
        }else {
          this.setSingleSelect()
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
      // 获取焦点全选内容
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
      if (this.visible && e.keyCode == 9) {
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
        if (!this.remote) {
          this.updateSingleSelected(true, slot)
        }
        if(this.remote){
          this.$refs.dropdown.setWidthAdaption()
        }
      }
    },
    updateSingleSelected(init = false, slot = false) {
      // 赋值默认项是遍历选项绑定focusIndex
      if(init) {
        for(let i in this.availableOptions) {
          if(this.availableOptions[i].value === this.model) {
            this.focusIndex = this.availableOptions[i].index + 1
            break
          }
        }
      }
      const type = typeof this.model
      if (type === 'string' || type === 'number') {
        let findModel = false
        let curSingle = ''
        if(this.model === '' && this.query !== '') {
          for (let j in this.options) {
            if (this.query === this.options[j].label) {
              curSingle = this.options[j].label
              findModel = true
              break
            }
          }
        }else if(this.model !== '') {
          //O45刷新新增下拉项导致显示中文被清空，O45client测试通过，本地测试却有问题
          this.findChild(child => {
            if(this.remote && child.showCol.length > 0) {
              for (let k in this.options) {
                if (this.model === this.options[k].value) {
                  curSingle = this.options[k].label + ' ' + this.options[k][child.showCol[0]]
                  findModel = true
                  break
                }
              }
            }else {
              for (let k in this.options) {
                if (this.model === this.options[k].value) {
                  curSingle = this.options[k].label
                  findModel = true
                  break
                }
              }
            }
          })
        }
        if (this.model === '') {
          this.selected = ''
        } else if (this.remote && curSingle) {
          this.selected = curSingle
        } else if (!this.remote) {
          this.selected = curSingle
        }
        //o45 证券代码控件需要
        if (slot && !findModel) {
          this.model = ''
          this.query = ''
        }
      }
      this.toggleSingleSelected(this.model, init)
    },
    toggleSingleSelected(value, init = false) {
//      let label = value
//      if (this.options.length) {
//        let option = this.options.filter(opt => opt.value === value)[0]
//        if (option) {
//          label = option.label
//        }
//      }
      this.findChild(child => {
        this.options.forEach((col, i) => {
          if (value == col.value) {
            this.$set(child.cloneData[i], 'selected', true)
          } else {
            this.$set(child.cloneData[i], 'selected', false)
          }
        })
      })
      // o45开启keepInputValue默认初始值
      if (init) {
        if(this.keepInputValue) {
          this.selected = this.model
        }
      }else {
        for(let j in this.availableOptions) {
          if(this.availableOptions[j].value === value) {
            this.focusIndex = this.availableOptions[j].index + 1
            break
          }
        }
        if(this.keepInputValue) {
          this.selected = this.model
        }
//        this.$emit('on-change', value)
//        this.dispatch('FormItem', 'on-form-change', value)
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
    modelToQuery() {
      if (this.model !== undefined) {
        this.findChild(child => {
          if (this.model === child.value) {
            if (child.label) {
              this.query = child.label
            } else if (child.searchLabel) {
              this.query = child.searchLabel
            } else {
              this.query = child.value
            }
            this.selectToChangeQuery = true
          }
        })
      }
    },
    //左右键、点选选中options中value值
    selectBlockSingle(value, status = false, str, nullValue = false) {
      this.isQuerySelect = status
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
      if(nullValue) {
        this.$nextTick(() => {
          this.focusIndex = 0
        })
        this.selectToChangeQuery = false
      }else {
        //value有值表示精确匹配，无值不匹配，但是无论是否精确匹配都要选中筛选第一项 是cloneData中focus=true
        //但是使用nextTick会出现一种特殊情况第一项模糊匹配focus，第二项精确匹配selected,所以还是判断value
        if(value === '' && !this.keepInputValue) {
          this.$nextTick(() => {
            this.focusIndex = 0
            this.$nextTick(() => {
              this.focusIndex = 1
            })
          })
        }
        this.selectToChangeQuery = false
      }
    },
    setSingleSelect() {
      let curlabel = ''
      let index = 0
      //焦点在输入框内
      if(this.isInputFocus) {
        this.findChild(child => {
          // 多列、非多列显示selected值不一样需区分对待
          if(child.showCol.length > 0) {
            this.availableOptions.forEach((col, i) => {
              if (col.value === this.model) {
                curlabel = col.label + ' ' + col[child.showCol[0]]
                index = col.index + 1
              }
            })
          }else {
            this.availableOptions.forEach((col, i) => {
              if (col.value === this.model) {
                curlabel = col.label
                index = col.index + 1
              }
            })
          }
        })
        //下拉框不弹出，仅使用左右键切换选值，要求带出中文,弹出不带中文
        if(this.visible || this.showFirstLabelOnly) {
          let ind = curlabel.indexOf(' ')
          curlabel = curlabel.substring(0, ind)
        }
        this.selected = curlabel
      }else {
        this.findChild(child => {
          if(child.showCol.length > 0) {
            this.availableOptions.forEach((col, i) => {
              if (col.value === this.model) {
                curlabel = col.label + ' ' + col[child.showCol[0]]
                index = col.index + 1
              }
            })
          }else {
            this.availableOptions.forEach((col, i) => {
              if (col.value === this.model) {
                curlabel = col.label
                index = col.index + 1
              }
            })
          }
        })
        if(this.showFirstLabelOnly) {
          let ind = curlabel.indexOf(' ')
          curlabel = curlabel.substring(0, ind)
        }else {
          this.selectToChangeQuery = true
          this.$nextTick(() => {
            this.query = curlabel
          })
        }
        this.selected = curlabel
        //o45 证券代码控件 模糊输入，不匹配下拉项保留输入值
        if(curlabel == '' && this.keepInputValue && this.model) {
          this.query = this.model
          return
        }
      }
//      this.isQuerySelect = false
      this.focusIndex = index
    }
  },
  mounted() {
    on(this.$refs.select, 'keydown', this.handleKeydown)
//    this.modelToQuery()
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
