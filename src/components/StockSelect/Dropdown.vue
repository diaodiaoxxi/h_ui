<template>
  <div class="h-select-dropdown" :style="styles" @click="handleClick" @mousedown.stop ref="selectdrop">
    <slot></slot>
  </div>
</template>
<script>
import { getStyle, getScrollBarSize } from '../../util/tools';
const Popper = require('../../util/popper.js');
export default {
  name: 'Drop',
  props: {
    widthAdaption: {
      type: Boolean,
      default: false,
    },
    maxDropWidth: {
      type:[String,Number],
      default: 500
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    className: {
      type: String
    },
    dropWidth:{
      type:[String,Number]
    }
  },
  data() {
    return {
      popper: null,
      width: '',
      parentWidth: null, 	// 保存当前父节点的宽度，当进行下拉内容自适应时需要与最大宽度进行对比,取较大者设为最大宽度
      scrollBarWidth: getScrollBarSize()
    };
  },
  computed: {
    styles() {
      let style = {}
      if (this.widthAdaption) {
        if (parseFloat(this.dropWidth) > 0) {
          style.minWidth = `${parseFloat(this.dropWidth)}px`
        }else {
          style.minWidth = `${parseFloat(this.parentWidth)}px`
        }
        if (parseFloat(this.maxDropWidth) > 0 && parseFloat(this.dropWidth) > 0
          && parseFloat(this.maxDropWidth) > parseFloat(this.dropWidth)) {
          let maxWidth = Math.max(parseFloat(this.maxDropWidth), parseFloat(this.parentWidth))
          style.maxWidth = `${maxWidth}px`
        }else if(parseFloat(this.maxDropWidth) > 0 && parseFloat(this.dropWidth) > 0
          && parseFloat(this.maxDropWidth) <= parseFloat(this.dropWidth)) {
          let maxWidth = Math.max(parseFloat(this.dropWidth), parseFloat(this.parentWidth))
          style.maxWidth = `${maxWidth}px`
        }else {
          style.maxWidth = `${this.maxDropWidth}px`
        }
        if (this.width) {
          style.width = `${this.width}px`
        }else {
          style.width = `${this.dropWidth}px`
        }
      } else {
        if (this.width) {
          style.width = `${this.width}px`
        }else {
          style.width = `${this.dropWidth}px`
        }
      }
      return style
    }
  },
  methods: {
    handleClick(event){
      this.$emit('click', event);
    },
    setWidthAdaption(){
      setTimeout(()=>{
        let content = this.$refs.selectdrop
        content = content.querySelectorAll('.h-selectTable-dropdown-list')[0].children[0]
        // 横向或者纵向滚动条导致的像素偏移的问题
        // 是否有纵向滚动条
        let isScrollY = parseInt(this.$refs.selectdrop.clientWidth) > parseInt(content.clientWidth) ? true : false
        // 是否有横向滚动条
        let isScrollX = parseInt(this.$refs.selectdrop.clientHeight) > parseInt(content.clientHeight) ? true : false
//        this.width = parseInt(content.scrollWidth) + this.scrollBarWidth
        this.width = isScrollY ? parseInt(content.scrollWidth) + this.scrollBarWidth : content.scrollWidth
//        if(isScrollX) {
//
//        }
      },0)
    },
    update() {
      if (this.popper) {
        this.$nextTick(() => {
          // select 组件 placement 改变后同步改变 popper 实例
          this.popper._options.placement = this.widthAdaption ? this.placement.indexOf('top') >= 0 ? 'top-start' : 'bottom-start' : this.placement
          this.popper.update();
          // 有滚动条时，下拉宽度为内容宽度
          if (this.widthAdaption) {
            this.setWidthAdaption()
          }
        });
      } else {
        this.$nextTick(() => {
          let curPlacement = this.widthAdaption ? this.placement.indexOf('top') >= 0 ? 'top-start' : 'bottom-start' : this.placement
          // let curPlacement = this.placement.indexOf('top') >= 0 ? 'top-start' : this.placement
          this.popper = new Popper(this.$parent.$refs.reference, this.$el, {
            gpuAcceleration: false,
            placement: curPlacement,
            boundariesPadding: 0,
            forceAbsolute: true,
            boundariesElement: 'body'
          });
          this.popper.onCreate(popper => {
            this.resetTransformOrigin(popper);
          });
          // 有滚动条时，下拉宽度为内容宽度
          if (this.widthAdaption) {
            this.setWidthAdaption()
          }
        });
      }

      if (!this.dropWidth) {
        let width = parseInt(getStyle(this.$parent.$el, 'width'));
        this.width = width
        this.parentWidth = width
      }else{
        this.width = this.dropWidth;
        this.parentWidth = this.dropWidth;
      }
    },
    destroy () {
      if (this.popper) {
        this.resetTransformOrigin(this.popper);
        setTimeout(() => {
          this.popper.destroy();
          this.popper = null;
        }, 300);
      }
    },
    resetTransformOrigin(popper) {
      let placementMap = {top: 'bottom', bottom: 'top'};
      let placement = popper._popper.getAttribute('x-placement').split('-')[0];
      let origin = placementMap[placement];
      popper._popper.style.transformOrigin = `center ${ origin }`;
    }
  },
  created () {
    this.$on('on-update-popper', this.update);
    this.$on('on-destroy-popper', this.destroy);
  },
  beforeDestroy () {
    if (this.popper) {
      this.popper.destroy();
    }
  }
};
</script>
