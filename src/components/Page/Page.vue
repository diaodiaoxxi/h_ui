<template>
  <ul :class="simpleWrapClasses" :style="styles" v-if="simple">
    <li
      v-if="fastArrival"
      :title="t('i.page.first')"
      :class="prevClasses"
      @click="toFirst">
      <a><icon name="arrow-l"></icon></a>
    </li>
    <span :class="[prefixCls + '-total']" v-if="showTotal">
      <slot>{{ t('i.page.total') }} {{ total }} <template v-if="total <= 1">{{ t('i.page.item') }}</template><template v-else>{{ t('i.page.items') }}</template></slot>
    </span>
    <Options
        ref = 'option'
        :showSizerLabel='showSizerLabel'
        :show-sizer="showSizer"
        :page-size="currentPageSize"
        :page-size-opts="pageSizeOpts"
        :placement="placement"
        :show-elevator="showElevator"
        :show-custom="showCustom"
        :show-reload="showReload"
        :current="currentPage"
        :all-pages="allPages"
        :is-small="isSmall"
        :is-blur = "isBlur"
        @on-size="onSize"
        @on-page="onPage"
        @on-reload="onReload">
    </Options>
    <li
      :title="t('i.page.prev')"
      :class="prevClasses"
      @click="prev">
      <a><icon name="return"></icon></a>
    </li>
    <div :class="simplePagerClasses" :title="currentPage + '/' + allPages">
      <input
        type="text"
        :value="currentPage"
        @keydown="keyDown"
        @keyup="keyUp"
        @change="keyUp"
        @blur="simpleBlur"
        :style = "{width: inputWidth + 'px'}" ref='simpleInput'>
      <span>/</span>
      <span :class="[prefixCls + '-allpage']" ref='allPage'>{{ allPages }}</span>
    </div>
    <li
      :title="t('i.page.next')"
      :class="nextClasses"
      @click="next">
      <a><icon name="enter"></icon></a>
    </li>
    <li
      v-if="fastArrival"
      :title="t('i.page.last')"
      :class="nextClasses"
      @click="toLast">
      <a><icon name="arrow-r"></icon></a>
    </li>
  </ul>
  <ul :class="wrapClasses" :style="styles" v-else>
      <span :class="[prefixCls + '-total']" v-if="showTotal">
        <slot>{{ t('i.page.total') }} {{ total }} <template v-if="total <= 1">{{ t('i.page.item') }}</template><template v-else>{{ t('i.page.items') }}</template></slot>
      </span>
      <li
        v-if="fastArrival"
        :title="t('i.page.first')"
        :class="prevClasses"
        @click="toFirst">
        <a><icon name="arrow-l"></icon></a>
      </li>
      <li
        :title="t('i.page.prev')"
        :class="prevClasses"
        @click="prev">
        <a><icon name="return"></icon></a>
      </li>
      <li title="1" :class="firstPageClasses" @click="changePage(1)"><a>1</a></li>
      <li :title="t('i.page.prev5')" v-if="currentPage - 3 > 1" :class="[prefixCls + '-item-jump-prev']" @click="fastPrev"><a><icon name="return"></icon></a></li>
      <li :title="currentPage - 2" v-if="currentPage - 2 > 1" :class="[prefixCls + '-item']" @click="changePage(currentPage - 2)"><a>{{ currentPage - 2 }}</a></li>
      <li :title="currentPage - 1" v-if="currentPage - 1 > 1" :class="[prefixCls + '-item']" @click="changePage(currentPage - 1)"><a>{{ currentPage - 1 }}</a></li>
      <li :title="currentPage" v-if="currentPage != 1 && currentPage != allPages" :class="[prefixCls + '-item',prefixCls + '-item-active']"><a>{{ currentPage }}</a></li>
      <li :title="currentPage + 1" v-if="currentPage + 1 < allPages" :class="[prefixCls + '-item']" @click="changePage(currentPage + 1)"><a>{{ currentPage + 1 }}</a></li>
      <li :title="currentPage + 2" v-if="currentPage + 2 < allPages" :class="[prefixCls + '-item']" @click="changePage(currentPage + 2)"><a>{{ currentPage + 2 }}</a></li>
      <li :title="t('i.page.next5')" v-if="currentPage + 3 < allPages" :class="[prefixCls + '-item-jump-next']" @click="fastNext"><a><icon name="enter"></icon></a></li>
      <li :title="allPages" v-if="allPages > 1" :class="lastPageClasses" @click="changePage(allPages)"><a>{{ allPages }}</a></li>
      <li
        :title="t('i.page.next')"
        :class="nextClasses"
        @click="next">
        <a><icon name="enter"></icon></a>
      </li>
      <li
        v-if="fastArrival"
        :title="t('i.page.last')"
        :class="nextClasses"
        @click="toLast">
        <a><icon name="arrow-r"></icon></a>
      </li>
      <Options
        ref = 'option'
        :showSizerLabel="showSizerLabel"
        :show-sizer="showSizer"
        :page-size="currentPageSize"
        :page-size-opts="pageSizeOpts"
        :is-load-all="isLoadAll"
        :placement="placement"
        :show-elevator="showElevator"
        :show-custom="showCustom"
        :show-reload="showReload"
        :current="currentPage"
        :all-pages="allPages"
        :is-small="isSmall"
        :is-blur = "isBlur"
        @on-size="onSize"
        @on-page="onPage"
        @on-reload="onReload">
      </Options>
  </ul>
</template>
<script>
  import { oneOf } from '../../util/tools';
  import Options from './Options.vue';
  import Locale from '../../mixins/locale';
  import Icon from '../Icon/Icon.vue';

  const prefixCls = 'h-page';

  export default {
    name: 'Page',
    mixins: [ Locale ],
    components: { Options,Icon },
    props: {
      current: {
        type: Number,
        default: 1
      },
      total: {
        type: Number,
        default: 0
      },
      pageSize: {
        type: Number,
        default: 10
      },
      pageSizeOpts: {
        type: Array,
        default () {
          return [10, 20, 30, 40];
        }
      },
      placement: {
        validator (value) {
          return oneOf(value, ['top', 'bottom']);
        },
        default: 'bottom'
      },
      size: {
        validator (value) {
          return oneOf(value, ['small']);
        }
      },
      simple: {
        type: Boolean,
        default: false
      },
      showTotal: {
        type: Boolean,
        default: false
      },
      showElevator: {
        type: Boolean,
        default: false
      },
      showSizer: {
        type: Boolean,
        default: false
      },
      showCustom:{
        type: Boolean,
        default: false
      },
      className: {
        type: String
      },
      styles: {
        type: Object
      },
      isBlur:{
        type: Boolean,
        default: false
      },
      fastArrival:{
        type: Boolean,
        default: false
      },
      showSizerLabel: {
        type: Boolean,
        default: false
      },
      showReload:{
        type: Boolean,
        default: false
      },
      isLoadAll: {
        type: Boolean,
        default: false,
      }
    },
    data () {
      return {
        prefixCls: prefixCls,
        currentPage: this.current,
        currentPageSize: this.pageSize,
        maxPage:null,
        inputWidth: null,
      };
    },
    watch: {
      total (val) {
        this.maxPage = Math.ceil(val / this.currentPageSize);
        if (Number(val) == 0) this.maxPage = 1;
        if (this.maxPage < this.currentPage && this.maxPage > 0) {
            this.currentPage = this.maxPage;
        }
      },
      current (val) {
        if (this.maxpage && this.maxpage>0) {
          if (this.currentPage>this.maxpage) {
            this.currentPage = 1;
          }
        }else{
          this.currentPage = val;
        }
      },
      pageSize (val) {
        this.currentPageSize = val;
      },
      allPages (val) {
        if(!this.simple) return;
        this.$nextTick(() => {
          let inputStyle = getComputedStyle(this.$refs.simpleInput)
          this.inputWidth =  this.$refs.allPage.clientWidth + parseInt(inputStyle.paddingRight) + parseInt(inputStyle.paddingLeft)
        })
      }
    },
    computed: {
      isSmall () {
        return !!this.size;
      },
      allPages () {
        const allPage = Math.ceil(this.total / this.currentPageSize);
        return (allPage === 0) ? 1 : allPage;
      },
      simpleWrapClasses () {
        return [
          `${prefixCls}`,
          `${prefixCls}-simple`,
          {
              [`${this.className}`]: !!this.className
          }
        ];
      },
      simplePagerClasses () {
        return `${prefixCls}-simple-pager`;
      },
      wrapClasses () {
        return [
          `${prefixCls}`,
          {
              [`${this.className}`]: !!this.className,
              'mini': !!this.size
          }
        ];
      },
      prevClasses () {
        return [
          `${prefixCls}-prev`,
          {
            [`${prefixCls}-disabled`]: this.currentPage === 1
          }
        ];
      },
      nextClasses () {
        return [
          `${prefixCls}-next`,
          {
            [`${prefixCls}-disabled`]: this.currentPage === this.allPages
          }
        ];
      },
      firstPageClasses () {
        return [
          `${prefixCls}-item`,
          {
            [`${prefixCls}-item-active`]: this.currentPage === 1
          }
        ];
      },
      lastPageClasses () {
        return [
          `${prefixCls}-item`,
          {
            [`${prefixCls}-item-active`]: this.currentPage === this.allPages
          }
        ];
      }
    },
    methods: {
      clearElevator(){
        this.$refs.option.currentNo = ''
      },
      changePage (page) {
        if (this.currentPage != page) {
          this.currentPage = page;
          this.$emit('update:current', page);
          this.$emit('on-change', page);
        }
      },
      prev () {
        const current = this.currentPage;
        if (current <= 1) {
          return false;
        }
        this.changePage(current - 1);
      },
      next () {
        const current = this.currentPage;
        if (current >= this.allPages) {
          return false;
        }
        this.changePage(current + 1);
      },
      fastPrev () {
        const page = this.currentPage - 5;
        if (page > 0) {
          this.changePage(page);
        } else {
          this.changePage(1);
        }
      },
      fastNext () {
        const page = this.currentPage + 5;
        if (page > this.allPages) {
          this.changePage(this.allPages);
        } else {
          this.changePage(page);
        }
      },
      onSize (pageSize) {
        this.currentPageSize = pageSize;
        this.$emit('on-page-size-change', pageSize);
        this.changePage(1);
      },
      onPage (page) {
        this.changePage(page);
      },
      keyDown (e) {
        const key = e.keyCode;
        const condition = (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key == 8 || key == 37 || key == 39;

        if (!condition) {
          e.preventDefault();
        }
      },
      keyUp (e) {
        const key = e.keyCode;
        const val = parseInt(e.target.value);

        if (key === 38) {
          this.prev();
        } else if (key === 40) {
          this.next();
        } else if (key == 13 && !this.isBlur) {
          let page = 1;

          if (val > this.allPages) {
              page = this.allPages;
          } else if (val <= 0) {
              page = 1;
          } else {
              page = val||1;
          }

          e.target.value = page;
          this.changePage(page);
        }
      },
      simpleBlur(e){
        const val = parseInt(e.target.value);
        if(!this.isBlur) return false
        let page = 1;
        if (val > this.allPages) {
            page = this.allPages;
        } else if (val <= 0) {
            page = 1;
        } else {
            page = val||1;
        }
        e.target.value = page;
        this.changePage(page)
      },
      toFirst(){
        this.changePage(1);
      },
      toLast(){
        this.changePage(this.allPages);
      },
      onReload(){
         this.$emit('on-reload',this.currentPage);
      }
    },
    mounted(){
      let pageAll = Math.ceil(this.total / this.currentPageSize);
      this.maxPage = pageAll === 0? 1 : pageAll;
      if (this.simple && this.allPages) {
        let inputStyle = getComputedStyle(this.$refs.simpleInput)
        this.inputWidth = this.$refs.allPage.clientWidth + parseInt(inputStyle.paddingRight) + parseInt(inputStyle.paddingLeft)
      }
    }
  }
</script>
