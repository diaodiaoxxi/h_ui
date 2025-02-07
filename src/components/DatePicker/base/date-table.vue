<template>
  <div :class="classes">
    <div :class="[prefixCls + '-header']">
      <span v-for="day in headerDays"
            :key="day">
        {{day}}
      </span>
    </div>
    <span :class="getCellCls(cell)"
          v-for="(cell, i) in readCells"
          :key="String(cell.date) + i"
          @click="handleClick(cell)"
          @mouseenter="handleMouseMove(cell)"
          @mousedown="handleMouseDown(cell)"
          @mouseup="handleMouseUp(cell)">
      <em>{{ cell.desc }}</em>
    </span>

  </div>
</template>
<script>
import { clearHours, isInRange } from '../util'
import Locale from '../../../mixins/locale'
import jsCalendar from 'js-calendar'

import mixin from './mixin'
import prefixCls from './prefixCls'

export default {
  mixins: [Locale, mixin],
  props: {
    /* more props in mixin */
    showWeekNumbers: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const weekStartDay = Number(this.t('i.datepicker.weekStartDay'))
    return {
      prefixCls: prefixCls,
      calendar: new jsCalendar.Generator({
        onlyDays: !this.showWeekNumbers,
        weekStart: weekStartDay
      })
    }
  },

  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-show-week-numbers`]: this.showWeekNumbers
        }
      ]
    },
    headerDays() {
      const weekStartDay = Number(this.t('i.datepicker.weekStartDay'))
      const translatedDays = [
        'sun',
        'mon',
        'tue',
        'wed',
        'thu',
        'fri',
        'sat'
      ].map(item => {
        return this.t('i.datepicker.weeks.' + item)
      })
      const weekDays = translatedDays
        .splice(weekStartDay, 7 - weekStartDay)
        .concat(translatedDays.splice(0, weekStartDay))
      return this.showWeekNumbers ? [''].concat(weekDays) : weekDays
    },
    readCells() {
      const tableYear = this.tableDate.getFullYear()
      const tableMonth = this.tableDate.getMonth()
      const today = clearHours(new Date()) // timestamp of today
      const selectedDays = this.dates.filter(Boolean).map(clearHours) // timestamp of selected days
      const [minDay, maxDay] = this.dates.map(clearHours)
      const rangeStart = this.rangeState.from && clearHours(this.rangeState.from)
      const rangeEnd = this.rangeState.to && clearHours(this.rangeState.to)

      const isRange = this.selectionMode === 'range'
      const disabledTestFn =
        typeof this.disabledDate === 'function' && this.disabledDate

      return this.calendar(tableYear, tableMonth, cell => {
        const time = cell.date && clearHours(cell.date)
        const dateIsInCurrentMonth =
          cell.date && tableMonth === cell.date.getMonth()
        return {
          ...cell,
          type: time === today ? 'today' : cell.type,
          // selected: dateIsInCurrentMonth && selectedDays.includes(time),
          selected:
            dateIsInCurrentMonth &&
            (selectedDays.indexOf(time) > -1 ? true : false),
          disabled:
            cell.date && disabledTestFn && disabledTestFn(new Date(time)),
          range:
            dateIsInCurrentMonth &&
            isRange &&
            isInRange(time, rangeStart, rangeEnd),
          start: dateIsInCurrentMonth && isRange && time === minDay,
          end: dateIsInCurrentMonth && isRange && time === maxDay
        }
      }).cells.slice(this.showWeekNumbers ? 8 : 0)
    }
  },
  methods: {
    getCellCls(cell) {
      return [
        `${prefixCls}-cell`,
        {
          [`${prefixCls}-cell-selected`]:
            cell.selected || cell.start || cell.end,
          [`${prefixCls}-cell-start`]: cell.start,
          [`${prefixCls}-cell-end`]: cell.end,
          [`${prefixCls}-cell-disabled`]:
            cell.disabled ||
            (this.spliceDirec == 'right' && cell.date < this.rangeState.from) ||
            (this.maxDate && cell.date > this.maxDate),
          [`${prefixCls}-cell-today`]: cell.type === 'today',
          [`${prefixCls}-cell-prev-month`]: cell.type === 'prevMonth',
          [`${prefixCls}-cell-next-month`]: cell.type === 'nextMonth',
          [`${prefixCls}-cell-week-label`]: cell.type === 'weekLabel',
          [`${prefixCls}-cell-range`]: cell.range,
          [`${prefixCls}-cell-left`]:
            this.spliceDirec && this.spliceDirec == 'left',
          [`${prefixCls}-cell-right`]:
            this.spliceDirec && this.spliceDirec == 'right'
        }
      ]
    }
  }
}
</script>
