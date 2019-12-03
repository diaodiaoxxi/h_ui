<template>
  <div>
    <h-calendar ref="calendar"
                :disableDate="disableDate"
                @on-click="sClick"
                @on-dblclick="dClick"
                @on-select="handleSelect"
                @on-mouseover="oClick"
                @on-mouseout="mClick"
                @on-context-menu="handleMenu"
                @on-badge-click="handleBadgeClick"
                @on-preBtn-click="yearchange"
                @on-nextBtn-click="yearchange"
                :enableCtxMenu="true"
                :dateCellRender="dateRender1">
      <ul class="calendar-menu"
          slot="menu">
        <li class="calendar-menu-item"
            @click.stop="setDate(0)">设为交割日</li>
        <li class="calendar-menu-item"
            @click.stop="setDate(1)">设为开仓日</li>
      </ul>
    </h-calendar>
    <h-button @click="cancelSelected">取消选中</h-button>
    <h-calendar :currentYear="2020"
                :badges="[{date: '2020-06-13', num: 3}, {date: '2020-06-15', num: 7}]"
                @on-badge-click="handleBadgeClick">
    </h-calendar>
    <h-calendar :currentYear="2021">
      <p slot="header">自定义头部</p>
    </h-calendar>
    <p>单选且带有render特殊样式</p>
    <h-calendar :disableDate="disableDatelist"
                :multiSelect="multi"
                @on-select="oselect"
                :dateCellRender="dateRender">
    </h-calendar>
  </div>
</template>

<script>
export default {
  name: 'h123',
  data() {
    return {
      multi: false,
      disableDatelist: ['2019-01-02', '2019-03-03', '2019-04-02', '2019-08-12'],
      date: null
    }
  },
  methods: {
    setDate(flag) {
      this.$set(this.date, 'dateType', flag)
      this.$refs.calendar.hideCtxMenu()
    },
    handleMenu(e, date) {
      console.log(e)
      this.date = date
    },
    handleBadgeClick(badge) {
      console.log(badge)
    },
    yearchange(){
      alert("change");
    },
    dateRender1(h, data) {
      let color = ''
      if (data != null) {
        if (data.dateType === 1) {
          color = 'green'
        } else if (data.dateType === 0) {
          color = 'blue'
        }
      }
      return h('div', { style: { color: color } }, [
        data != null ? '' + data.date.getDate() : ''
      ])
    },
    dateRender(h, data) {
      if (data && data.date.getDate() == 15) {
        return h(
          'div',
          {
            style: {
              color: 'blue'
            },
            class: {
              [`costum-style`]: true
            }
          },
          [data != null ? '' + data.date.getDate() : '']
        )
      } else {
        return h('span', {}, [data != null ? '' + data.date.getDate() : ''])
      }
    },
    cancelSelected() {
      this.$refs.calendar.cancelAllSelected()
    },
    sClick(i, j) {
      // console.log('s')
      // console.log(i)
      // console.log(j)
    },
    dClick(i, j) {
      // console.log('d')
      // console.log(i)
      // console.log(j)
    },
    handleSelect(m, d) {
      console.log(m)
      console.log(d)
    },
    oClick(i, j) {
      // console.log('o')
      // console.log(i)
      // console.log(j)
    },
    mClick(i, j) {
      // console.log('m')
      // console.log(i)
      // console.log(j)
    },
    disableDate(date) {
      return (
        date &&
        date.valueOf() < Date.now() &&
        date.valueOf() >= Date.now() - 86400000
      )
    },
    oselect(i, j) {
      console.log('select')
      console.log(j)
    }
  }
}
</script>
<style>
.costum-style {
  border: solid 1px slateblue;
  height: 36px;
  width: 100%;
}
.calendar-menu {
  width: 100px;
  padding: 5px;
  border: 1px solid #e7e7e7;
  border-radius: 4px;
  list-style: none;
  background: #fff;
  box-shadow: 0 0 5px 0 rgab(0, 0, 0, 0.3);
}
.calendar-menu-item {
  display: block;
  line-height: 24px;
  text-align: center;
  cursor: default;
}
.calendar-menu-item:hover {
  color: #2e94d8;
}
</style>
