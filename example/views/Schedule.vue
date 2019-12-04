<template>
  <div>
    <h-schedule
      :events="events"
      @on-event-click="handleEvtClick"
      @on-event-dblclick="handleEvtDblClick"
      @on-click="handleCellClick"
      @on-dblclick="handleCellDblClick"
      @on-select="handleCellSelect"
    ></h-schedule>
    <h2>自定义头部</h2>
    <h-schedule
      ref="schedule"
      :events="events"
      @on-panel-change="handlePanelChange"
    >
      <div class="schedule-header" slot="header">
          <h-button-group>
            <h-button type="primary"
                      icon="arrow-l"
                      title="上一年"
                      @click="prevYear"></h-button>
            <h-button type="primary"
                      icon="return"
                      title="上一个月"
                      @click="prevMonth"></h-button>
            <h-button type="primary"
                      icon="enter"
                      title="下一个月"
                      @click="nextMonth"></h-button>
            <h-button type="primary"
                      icon="arrow-r"
                      title="下一年"
                      @click="nextYear"></h-button>
          </h-button-group>
          <h-button type="primary"
                    class="schedule-today-btn"
                    @click="jumpToday">今天</h-button>
          <h1 class="schedule-date-text">{{curYear}}年 {{curMonth}}月</h1>
        </div>
    </h-schedule>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curYear: new Date().getFullYear(),
      curMonth: new Date().getMonth() + 1,
      events: [
        {
          startDate: '2019-03-30',
          endDate: '2019-04-03',
          title: '看电影'
        },
        {
          startDate: '2019-04-01',
          endDate: '2019-04-01',
          title: '玩游戏'
        },
        {
          startDate: '2019-03-29',
          endDate: '2019-04-03',
          title: '出差',
          data: {
            form: {
              place: "you know where"
            }
          }
        }, {
          startDate: '2019-04-02',
          endDate: '2019-04-03',
          title: '整理报告'
        }, {
          startDate: '2019-04-02',
          endDate: '2019-04-03',
          title: '听音乐会'
        }, {
          startDate: '2019-04-02',
          endDate: '2019-04-03',
          title: '学习油画'
        }, {
          startDate: '2019-04-02',
          endDate: '2019-04-03',
          title: '玩滑板'
        }, {
          startDate: '2019-04-02',
          endDate: '2019-04-03',
          title: '准备旅行攻略'
        }, {
          startDate: '2019-04-02',
          endDate: '2019-04-02',
          title: '预定话剧票'
        }, {
          startDate: '2019-04-03',
          endDate: '2019-04-12',
          title: '健身房锻炼'
        }, {
          startDate: '2019-04-13',
          endDate: '2019-04-23',
          title: '完成需求：日历控件(灰色日期为非交易日，蓝色日期为正常交易日，“T”标识的为交易日非交收日，“S”标识的为非交易日但是交收日（颜色和字母可以使用方自定义）)'
        }
      ]
    }
  },
  methods: {
    prevYear() {
      this.$refs.schedule.prevYear();
    },
    prevMonth() {
      this.$refs.schedule.prevMonth();
    },
    nextMonth() {
      this.$refs.schedule.nextMonth();
    },
    nextYear() {
      this.$refs.schedule.nextYear();
    },
    jumpToday() {
      this.$refs.schedule.jumpToday();
    },
    handleEvtClick(evt) {
      console.log(evt);
      if (evt.title === '看电影') {
        // this.$set(evt.data.form, 'name', 'Dr.Who');
        // evt.data.form.place = "nowhere";
        evt.endDate = "2019-03-30";
        // evt.order = 10000
        // evt.title = "hah"
      }
      if (evt.title === '出差') {
        evt.startDate = '2019-04-01';
      }
    },
    handleEvtDblClick(evt) {
      console.log(evt);
    },
    handleCellClick(month, date) {
      console.log(`click: ${month}月${date}日`);
    },
    handleCellDblClick(month, date) {
      console.log(`dblclick: ${month}月${date}日`);
    },
    handleCellSelect(month, date) {
      console.log(`select: ${month}月${date}日`);
    },
    handlePanelChange(newDate, oldDate) {
      this.curYear = newDate.getFullYear();
      this.curMonth = newDate.getMonth() + 1;
      console.log(newDate.toDateString(), ", ", oldDate.toDateString())
    }
  },
  mounted() {
    /* setTimeout(() => {
      this.$set(this.events[0], 'endDate', '2019-04-02');
      // this.events[0].endDate = '2019-04-02'
    }, 5000) */
  }
}
</script>

<style lang="scss">
.schedule-header {
  position: relative;
  text-align: center;
  .h-btn-group, .schedule-today-btn {
    position: absolute;
    top: 1px;
  }
  .h-btn-group {
    left: 1.5%;
    button {
      width: 35px;
      padding-left: 10px;
      padding-right: 10px;
      height: 34px;
    }
  }
  .schedule-today-btn {
    right: 1.5%;
    height: 34px;
  }
  .schedule-date-text {
    display: inline-block;
  }
}
</style>
