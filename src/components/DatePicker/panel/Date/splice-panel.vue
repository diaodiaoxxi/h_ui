<template>
  <div :class="classes" @mousedown.prevent>
    <div :class="[prefixCls + '-sidebar']" v-if="shortcuts.length">
      <div
        :class="[prefixCls + '-shortcut']"
        v-for="shortcut in shortcuts"
        @click="handleShortcutClick(shortcut)">{{ shortcut.text }}</div>
    </div>
    <div :class="[prefixCls + '-body']">
      <div :class="[prefixCls + '-content', prefixCls + '-content-left']" v-show="!isTime">
        <div :class="[datePrefixCls + '-header']" v-show="currentView !== 'time'">
          <span
            :class="iconBtnCls('prev', '-double')"
            @click="prevYear('left')"><Icon name="arrow-l"></Icon></span>
          <span
            v-if="leftPickerTable === 'date-table'"
            :class="iconBtnCls('prev')"
            @click="prevMonth('left')"
            v-show="currentView === 'date'"><Icon name="return"></Icon></span>
          <date-panel-label
            :date-panel-label="leftDatePanelLabel"
            :current-view="leftDatePanelView"
            :date-prefix-cls="datePrefixCls"></date-panel-label>
          <span
            v-if="splitPanels || leftPickerTable !== 'date-table'"
            :class="iconBtnCls('next', '-double')"
            @click="nextYear('left')"><Icon name="arrow-r"></Icon></span>
          <span
            v-if="splitPanels && leftPickerTable === 'date-table'"
            :class="iconBtnCls('next')"
            @click="nextMonth('left')"
            v-show="currentView === 'date'"><Icon name="enter"></Icon></span>
        </div>
        <component
          :is="leftPickerTable"
          ref="leftYearTable"
          v-if="currentView !== 'time'"
          :table-date="leftPanelDate"
          selection-mode="range"
          :disabled-date="disabledDate"
          :range-state="rangeState"
          :show-week-numbers="showWeekNumbers"
          :pickMode="pickMode"
          spliceDirec = "left"
          :value="preSelecting.left ? [dates[0]] : dates"
          @on-change-range="handleChangeRange"
          @on-pick="panelPickerHandlers.left"
          @on-pick-click="handlePickClick"
        ></component>
      </div>
      <div :class="[prefixCls + '-content', prefixCls + '-content-right']" v-show="!isTime">
        <div :class="[datePrefixCls + '-header']" v-show="currentView !== 'time'">
            <span
                v-if="(splitPanels || rightPickerTable !== 'date-table')&&rightBackState"
                :class="iconBtnCls('prev', '-double')"
                @click="prevYear('right')"><Icon name="arrow-l"></Icon></span>
            <span
                v-if="(splitPanels && rightPickerTable === 'date-table')&&rightBackState"
                :class="iconBtnCls('prev')"
                @click="prevMonth('right')"
                v-show="currentView === 'date'"><Icon name="return"></Icon></span>
            <date-panel-label
                :date-panel-label="rightDatePanelLabel"
                :current-view="rightDatePanelView"
                :date-prefix-cls="datePrefixCls"></date-panel-label>
            <span
                :class="iconBtnCls('next', '-double')"
                @click="nextYear('right')"><Icon name="arrow-r"></Icon></span>
            <span
                v-if="rightPickerTable === 'date-table'"
                :class="iconBtnCls('next')"
                @click="nextMonth('right')"
                v-show="currentView === 'date'"><Icon name="enter"></Icon></span>
        </div>
        <component
          :is="rightPickerTable"
          ref="rightYearTable"
          v-if="currentView !== 'time'"
          :table-date="rightPanelDate"
          selection-mode="range"
          :range-state="rangeState"
          :disabled-date="disabledDate"
          :show-week-numbers="showWeekNumbers"
          :pickMode="pickMode"
          spliceDirec = "right"
          :maxDate = "maxDated"
          :value="preSelecting.right ? [dates[dates.length - 1]] : dates"
          @on-change-range="handleChangeRange"
          @on-pick="panelPickerHandlers.right"
          @on-pick-click="handlePickClick"></component>
      </div>
      <div :class="[prefixCls + '-content']" v-show="isTime">
        <time-picker
          ref="timePicker"
          v-if="currentView === 'time'"
          :value="dates"
          :format="format"
          :time-disabled="timeDisabled"
          @on-pick="handleRangePick"
          @on-pick-click="handlePickClick"
          @on-pick-clear="handlePickClear"
          @on-pick-success="handlePickSuccess"
          @on-pick-toggle-time="handleToggleTime"
        ></time-picker>
      </div>
      <Confirm
        v-if="confirm"
        :show-time="showTime"
        :is-time="isTime"
        :time-disabled="timeDisabled"
        @on-pick-toggle-time="handleToggleTime"
        @on-pick-clear="handlePickClear"
        @on-pick-success="handlePickSuccess"></Confirm>
    </div>
  </div>
</template>
<script>
  import Icon from '../../../Icon/Icon.vue';
  import DateTable from '../../base/date-table.vue';
  import YearTable from '../../base/year-table.vue';
  import MonthTable from '../../base/month-table.vue';
  import TimePicker from '../Time/time-range.vue';
  import Confirm from '../../base/confirm.vue';

  import { toDate, initTimeDate, formatDateLabels } from '../../util';
  import datePanelLabel from './date-panel-label.vue';

  import Mixin from '../panel-mixin';
  import DateMixin from './date-panel-mixin';
  import Locale from '../../../../mixins/locale';

  const prefixCls = 'h-picker-panel';
  const datePrefixCls = 'h-date-picker';

  const dateSorter = (a, b) => {
      if (!a || !b) return 0;
      return a.getTime() - b.getTime();
  };

  export default {
      name: 'RangeDatePickerPanel',
      mixins: [ Mixin, Locale, DateMixin ],
      components: { Icon, DateTable, YearTable, MonthTable, TimePicker, Confirm, datePanelLabel },
      props: {
          // more props in the mixin
          splitPanels: {
              type: Boolean,
              default: false
          },
          rangeNum:[Number,String],
          pickMode: String
      },
      data(){
          const [minDate, maxDate] = this.value.map(date => date || initTimeDate());
          const leftPanelDate = this.startDate ? this.startDate : minDate;
          return {
              prefixCls: prefixCls,
              datePrefixCls: datePrefixCls,
              dates: this.value,
              rangeState: {from: this.value[0], to: this.value[1], selecting: minDate && !maxDate},
              currentView: this.selectionMode || 'range',
              leftPickerTable: `${this.selectionMode}-table`,
              rightPickerTable: `${this.selectionMode}-table`,
              leftPanelDate: leftPanelDate,
              rightPanelDate: new Date(leftPanelDate.getFullYear(), leftPanelDate.getMonth() + 1,
              leftPanelDate.getDate()),
              rightBackState:true,
              maxDated:null,
          }
      },
      computed: {
          classes(){
              return [
                  `clearfix`,
                  `${prefixCls}-body-wrapper`,
                  `${datePrefixCls}-with-range`,
                  {
                      [`${prefixCls}-with-sidebar`]: this.shortcuts.length,
                      [`${datePrefixCls}-with-week-numbers`]: this.showWeekNumbers
                  }
              ];
          },
          leftDatePanelLabel(){
              return this.panelLabelConfig('left');
          },
          rightDatePanelLabel(){
              return this.panelLabelConfig('right');
          },
          leftDatePanelView(){
              return this.leftPickerTable.split('-').shift();
          },
          rightDatePanelView(){
              return this.rightPickerTable.split('-').shift();
          },
          timeDisabled(){
              return !(this.dates[0] && this.dates[1]);
          },
          preSelecting(){
              const tableType = `${this.currentView}-table`;
              return {
                  left: this.leftPickerTable !== tableType,
                  right: this.rightPickerTable !== tableType,
              };
          },
          panelPickerHandlers(){
              return {
                  left: this.preSelecting.left ? this.handlePreSelection.bind(this, 'left') : this.handleRangePick,
                  right: this.preSelecting.right ? this.handlePreSelection.bind(this, 'right') : this.handleRangePick,
              };
          }
      },
      watch: {
        value(newVal) {
          const minDate = newVal[0] ? toDate(newVal[0]) : null;
          const maxDate = newVal[1] ? toDate(newVal[1]) : null;
          this.dates = [minDate, maxDate].sort(dateSorter);
          this.rangeState = {
              from: this.dates[0],
              to: this.dates[1],
              selecting: false
          };
          // set panels positioning
          const leftPanelDate = this.startDate || this.dates[0] || new Date();
          this.leftPanelDate = leftPanelDate;
          const rightPanelDate = new Date(leftPanelDate.getFullYear(), leftPanelDate.getMonth(), leftPanelDate.getDate());
          this.rightPanelDate = this.splitPanels ? new Date(Math.max(this.dates[1], rightPanelDate)) : rightPanelDate;
          this.controlRangeState();
          if (this.dates[0]&&this.dates[1]==null) {
            this.handleSelectRange(this.dates[0],false);
          }
          this.getMaxDated(leftPanelDate);
          // if (this.rangeNum==0) return false;
          // this.maxDated = new Date(leftPanelDate.getFullYear(), leftPanelDate.getMonth()+Number(this.rangeNum), leftPanelDate.getDate());
        },
        currentView(currentView){
            const leftMonth = this.leftPanelDate.getMonth();
            const rightMonth = this.rightPanelDate.getMonth();
            const isSameYear = this.leftPanelDate.getFullYear() === this.rightPanelDate.getFullYear();

            if (currentView === 'date' && isSameYear && leftMonth === rightMonth){
                this.changePanelDate('right', 'Month', 1);
            }
            if (currentView === 'month' && isSameYear){
                this.changePanelDate('right', 'FullYear', 1);
            }
            if (currentView === 'year' && isSameYear){
                this.changePanelDate('right', 'FullYear', 10);
            }
        },
        selectionMode(type){
            this.currentView = type || 'range';
        }
      },
      methods: {
          reset(){
            this.currentView = this.selectionMode;
            this.leftPickerTable = `${this.currentView}-table`;
            this.rightPickerTable = `${this.currentView}-table`;
          },
          panelLabelConfig (direction) {
            const locale = this.t('i.locale');
            const datePanelLabel = this.t('i.datepicker.datePanelLabel');
            const handler = type => {
              const fn = type == 'month' ? this.showMonthPicker : this.showYearPicker;
              return () => fn(direction);
            };

            const date = this[`${direction}PanelDate`];
            const { labels, separator } = formatDateLabels(locale, datePanelLabel, date);

            return {
              separator: separator,
              labels: labels.map(obj => ((obj.handler = handler(obj.type)), obj))
            };
          },
          prevYear (panel) {
            const increment = this.currentView === 'year' ? -10 : -1;
            this.changePanelDate(panel, 'FullYear', increment);
          },
          nextYear (panel) {
            const increment = this.currentView === 'year' ? 10 : 1;
            this.changePanelDate(panel, 'FullYear', increment);
          },
          prevMonth(panel){
            this.changePanelDate(panel, 'Month', -1);
          },
          nextMonth(panel){
            this.changePanelDate(panel, 'Month', 1);
          },
          changePanelDate(panel, type, increment){
            const current = new Date(this[`${panel}PanelDate`]);
            current[`set${type}`](current[`get${type}`]() + increment);
            this[`${panel}PanelDate`] = current;

            if (this.splitPanels){
              // change other panel if dates overlap
              const otherPanel = panel === 'left' ? 'right' : 'left';
              this.controlRangeState();
              if (panel === 'left' && this.compareDate(this.leftPanelDate,this.rightPanelDate)){
                this.changePanelDate(otherPanel, type, 1);
              }
              if (panel === 'right' && this.compareDate(this.leftPanelDate,this.rightPanelDate)){
                this.changePanelDate(otherPanel, type, -1);
              }
            } 
          },
          compareDate(leftPanelDate,rightPanelDate){
            let lYear=leftPanelDate.getFullYear();
            let lMonth=leftPanelDate.getMonth();
            let rYear=rightPanelDate.getFullYear();
            let rMonth=rightPanelDate.getMonth();
            return lYear*12+lMonth>rYear*12+rMonth;
          },
          controlRangeState(){
            const tleftDate = new Date(this.leftPanelDate);
            const trightDate = new Date(this.rightPanelDate);
            if (tleftDate.getFullYear()==trightDate.getFullYear()&&tleftDate.getMonth()==trightDate.getMonth()){
              this.rightBackState=false;
            }else{
              this.rightBackState=true;
            }
          },
          showYearPicker (panel) {
            this[`${panel}PickerTable`] = 'year-table';
          },
          showMonthPicker (panel) {
            this[`${panel}PickerTable`] = 'month-table';
          },
          handlePreSelection(panel, value){
            this[`${panel}PanelDate`] = value;
            const currentViewType = this[`${panel}PickerTable`];
            if (currentViewType === 'year-table') this[`${panel}PickerTable`] = 'month-table';
            else this[`${panel}PickerTable`] = `${this.currentView}-table`;

            if (!this.splitPanels){
              const otherPanel = panel === 'left' ? 'right' : 'left';
              const type = currentViewType === 'year-table' ? 'FullYear' : 'Month';
              this[`${otherPanel}PanelDate`] = value;
              this.changePanelDate(otherPanel, type, 1);
            }
          },
          handleRangePick (val,dirce) {
            if (this.currentView === 'time') this.dates = val;
            if (dirce=='left') {
              this.getMaxDated(val);
              let rangeTo = this.rangeState.to || null;
              if (rangeTo&&rangeTo<val) {rangeTo = val};
              rangeTo = this.getRangeTo(rangeTo);
              this.dates = [val, rangeTo];
              this.rangeState = {
                from: val,
                to: rangeTo,
                selecting: false
              }
              this.handleConfirm(true);
              this.handleSelectRange(val,false)
            }
            if (dirce=='right'){
              const rangeFrom = this.rangeState.from || null;
              val = this.getRangeTo(val);
              // if (val&&this.maxDated&&val>this.maxDated) {val = this.maxDated}
              this.dates = [rangeFrom, val];
              this.rangeState = {
                from: rangeFrom,
                to: val,
                selecting: false
              };
              this.handleConfirm(false);
              this.handleSelectRange(val,true)
            }
          },
          getRangeTo(val){
            if (val&&this.maxDated&&val>=this.maxDated) {
              val = new Date(this.maxDated.getFullYear(), this.maxDated.getMonth(), this.maxDated.getDate()-1);
            }
            return val;
          },
          handleChangeRange (val) {
            this.rangeState.to = val;
          },
          getMaxDated(leftDate){
            if (this.rangeNum==0) return false;
            this.maxDated = new Date(leftDate.getFullYear(), leftDate.getMonth()+Number(this.rangeNum), leftDate.getDate())
          }
      },
      mounted(){
      }
  };
</script>
