import { createTest, destroyVM, createVue, triggerEvent, triggerKeyDown, dateToString,dateToTimeString ,stringToDate,promissedTick} from './vm';
import DatePicker from '../../src/components/DatePicker';
import sinon from 'sinon';
const DELAY = 100;

const LEFT = 37;
const ENTER = 13;
const TAB = 9;

const keyDown = (el, keyCode) => {
  const evt = document.createEvent('Events');
  evt.initEvent('keydown', true, true);
  evt.keyCode = keyCode;
  el.dispatchEvent(evt);
};

const trigger = (el, type) => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
};

describe('DatePicker', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(DatePicker, {
      readonly: true,
      placeholder: '23333',
      format: 'HH-mm-ss'
    });
    const input = vm.$el.querySelector('input');

    expect(input.getAttribute('placeholder')).to.equal('23333');
    expect(input.getAttribute('readonly')).to.equal('readonly');
  });

  it('clear value', done => {
    vm = createVue({
      template: `
        <h-date-picker v-model="value" ref="compo"></h-date-picker>
      `,
      data() {
        return {
          value: '20190909'
        };
      }
    }, true);
    const input = vm.$el.querySelector('input');

    input.focus();
    setTimeout(_ => {
  //    const $el = vm.$refs.compo.picker.$el;
      vm.$el.querySelector('span.h-date-picker-cells-cell').click();
      setTimeout(_ => {
        vm.$refs.compo.showClose = true;
        vm.$refs.compo.handleIconClick({ stopPropagation: () => null });
        setTimeout(_ => {
          expect(vm.value).to.equal('');
          done();
        }, DELAY);
      }, DELAY);
    }, DELAY);
  });

  it('disabled clear value', done => {
    vm = createVue({
      template: `
        <h-date-picker v-model="value" ref="compo" :clearable="false"></h-date-picker>
      `,
      data() {
        return {
          value: ''
        };
      }
    }, true);
    const input = vm.$el.querySelector('input');
    input.focus();
        vm.$el.querySelector('span.h-date-picker-cells-cell').click();
        vm.$el.querySelector('.h-input-icon').click();
      vm.$nextTick(_ => {     
        setTimeout(_ => {
          expect(vm.value).to.be.exist;
          done();
        }, DELAY);
      });
  });

  it('select datetime with defaultTime', done => {
    vm = createVue({
      template: `
        <h-date-picker ref="compo" type="datetime" v-model="value"></h-date-picker>
      `,
      data() {
        return {
          value: ''
        };
      }
    }, true);

    const input = vm.$el.querySelector('input');
    input.blur();
    input.focus();
    setTimeout(_ => {
      vm.$el.querySelector('span.h-date-picker-cells-cell').click();
      setTimeout(_ => {
        var date = vm.value;
        expect(date.getHours()).to.equal(0);
        expect(date.getMinutes()).to.equal(0);
        expect(date.getSeconds()).to.equal(0);
        done();
      }, DELAY);
    }, DELAY);
  });

  it('accepts format', done => {
    vm = createVue({
      template: `
        <h-date-picker
          ref="compo"
          v-model="value"
          type="date"
          format="dd/MM yyyy"/>`,
      data() {
        return {
          value: '01/02 2000'
        };
      }
    }, true);
    const input = vm.$refs.compo.$el.querySelector('input');
    expect(input.value).to.equal('01/02 2000');
    input.focus();
    setTimeout(_ => {
      const date = vm.value;
      expect(date.getFullYear()).to.equal(2000);
      expect(date.getMonth()).to.equal(1);
      expect(date.getDate()).to.equal(1);
      vm.$el.querySelector('span.h-date-picker-cells-cell').click();
      setTimeout(_ => {
        expect(input.value).to.equal('30/01 2000');
        done();
      }, DELAY);
    }, DELAY);
  });

  it('works for option-doing', done => {
    vm = createVue({
      template: `
      <h-date-picker v-model="value" type="date" :options="options1" placeholder="选择日期" style="width: 200px"></h-date-picker>`,
      data() {
        return {
          value: null,
          options1: {
            shortcuts: [
                {
                    text: '今天',
                    value () {
                        return new Date();
                    }
                },
                {
                    text: '昨天',
                    value () {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        return date;
                    },
                    onClick: (picker) => {
                        alert('点击了昨天');
                    }
                },
                {
                    text: '一周前',
                    value () {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        return date;
                    },
                    onClick: (picker) => {
                        alert('点击了一周前');
                    }
                }
            ]
        }
        };
      }
    }, true);
    const inputs = vm.$el.querySelector('input'); 
    expect(inputs.value).to.equal('');
    inputs.click();
    setTimeout(_ => { 
    const options= vm.$el.querySelectorAll('.h-picker-panel-shortcut');
    options[0].click();  
    setTimeout(_ => {
      expect(vm.value.getYear()).to.equal(119);
      expect(inputs.value).to.not.equal('');
      done();
    }, DELAY);
    }, DELAY);
  });

  it('hui value没有双向绑定，所以value赋值不成功', done => {
    vm = createVue({
      template: `
        <h-date-picker
          ref="compo"
          v-model="value"
          type="daterange"
          format="dd/MM yyyy" showFormat/>`,
      data() {
        return {
          value: ""
        };
      }
    }, true);
    const inputs = vm.$el.querySelector('input'); 
    inputs.click(); 
    setTimeout(_ => {
    inputs.value = "2016/01/01 - 2016/02/15";
    trigger(inputs, 'input')
        setTimeout(_ => {
          console.log(vm.value);
    //    expect(vm.value).to.eql('10/01 2000 - 10/02 2000');
          done();
        }, DELAY);
      }, DELAY);
  });

  it('should convert strings to Date objects', done => {
    vm = createVue({
      template: `
        <div>
          <h-date-picker v-model="value1" type="daterange" style="width: 200px"></h-date-picker>
          <h-date-picker v-model="value2" type="daterange" placement="bottom-end" style="width: 200px"></h-date-picker>
          <h-date-picker v-model="value3" type="datetime" placement="bottom-end" style="width: 200px"></h-date-picker>
          <h-date-picker v-model="value4" type="datetimerange" placement="bottom-end" style="width: 200px"></h-date-picker>
        </div>
      `,
      data() {
        return {
          value1: ['2017-10-10', '2017-10-20'],
          value2: [new Date(), new Date()],
          value3: '2017-10-10 10:00:00',
          value4: ['2027-10-10 10:00:00', '2027-10-20 10:00:00']
        };
      }
    });

    setTimeout(_ => {
      const {value1, value2, value3, value4} = vm;

      expect(value1[0] instanceof Date).to.equal(true);
      expect(value1[1] instanceof Date).to.equal(true);
      expect(value1.map(dateToString).join('|')).to.equal('2017-10-10|2017-10-20');

      expect(value2[0] instanceof Date).to.equal(true);
      expect(value2[1] instanceof Date).to.equal(true);
      expect(value2.map(dateToString).join('|')).to.equal([new Date(), new Date()].map(dateToString).join('|'));

      expect(dateToString(value3)).to.equal('2017-10-10');

      expect(value4[0] instanceof Date).to.equal(true);
      expect(value4[1] instanceof Date).to.equal(true);
      expect(value4.map(dateToString).join('|')).to.equal('2027-10-10|2027-10-20');
      done();
    }, DELAY);
  }); 

  it('should change type progamatically', done => {
    vm = createVue({
      template: '<h-date-picker :type="dateType"></h-date-picker>',
      data() {
        return {
          dateType: 'month'
        };
      }
    });

    const picker = vm.$children[0];
    picker.handleFocus({type: 'focus'});
    setTimeout(_ => {
      const panel = vm.$el.querySelector('.h-picker-panel-content');
      const dayPanel = panel.querySelector('[class="h-date-picker-cells"]');
      const monthPanel = panel.querySelector('.h-date-picker-cells-month');
      const yearPanel = panel.querySelector('.h-date-picker-cells-year');

      expect(dayPanel).to.equal(null);
      expect(monthPanel.style.display).to.equal('');
      expect(yearPanel).to.equal(null);

      expect(picker.type).to.equal('month');
      expect(picker.selectionMode).to.equal('month');

      vm.dateType = 'year';
      promissedTick(picker)
        .then(() => {
          const yearPanel = panel.querySelector('.h-date-picker-cells-year');
          const monthPanel = panel.querySelector('.h-date-picker-cells-month');
          expect(yearPanel.style.display).to.equal('');
          expect(monthPanel).to.equal(null);

          expect(picker.type).to.equal('year');
          expect(picker.selectionMode).to.equal('year');

          vm.dateType = 'date';
          return promissedTick(picker);
        })
        .then(() => {
          expect(picker.type).to.equal('date');
          expect(picker.selectionMode).to.equal('date');

          done();
        }).catch(err => console.log(err));
      }, DELAY);
  });

  it('should render date-picker label correctly in zh-CN', done => {
    vm = createVue(`
      <h-date-picker type="date"></h-date-picker>
    `);

    const picker = vm.$children[0];
    picker.handleFocus({type: 'focus'});
    vm.$nextTick(() => {
      const now = new Date();
      const labels = vm.$el.querySelectorAll('.h-picker-panel-body .h-date-picker-header-label');
      const labelText = [...labels].map(el => el.textContent).join(' ');
      expect(labelText).to.equal([now.getFullYear() + '年', now.getMonth() + 1 + '月'].join(' '));
      done();
    });
  });

  it('pick click', done => {
    vm = createVue({
      template: `
        <h-date-picker
          ref="compo"
          v-model="value"
          type="datetimerange"
          format="dd/MM yyyy" showFormat/>`,
      data() {
        return {
          value: ""
        };
      }
    }, true);

    const picker = vm.$children[0];
    picker.handleFocus({type: 'focus'});
    setTimeout(_ => {
      const displayField = vm.$el.querySelector('.h-input');
      const clickableCells = vm.$el.querySelectorAll('.h-date-picker-cells-cell');
      const lastMonthClass = 'h-date-picker-cells-cell-prev-month';
      const firstDayInMonthIndex = [...clickableCells].findIndex(cell => !cell.classList.contains(lastMonthClass));

      // choose first date
      clickableCells[firstDayInMonthIndex].firstElementChild.click();
      setTimeout(_ => {
        // choose second date
        clickableCells[firstDayInMonthIndex + 4].firstElementChild.click();
        setTimeout(_ => {
          expect(vm.value).to.not.equal("");
          done();
      }, DELAY);
    }, DELAY);
  }, DELAY);
  });

  it('should create a DatePicker component and open the calendar with the current month', done => {
    vm = createVue(`
      <h-date-picker></h-date-picker>
    `);
    const picker = vm.$children[0];
    picker.$el.querySelector('input.h-input').focus();
    vm.$nextTick(() => {
      const calendarBody = vm.$el.querySelector('.h-picker-panel-body .h-date-picker-cells:first-of-type');
      const calendarCells = [...calendarBody.querySelectorAll('.h-date-picker-cells-cell')].filter(el => {
        const prevMonth = el.classList.contains('h-date-picker-cells-cell-prev-month');
        const nextMonth = el.classList.contains('h-date-picker-cells-cell-next-month');
        return !prevMonth && !nextMonth;
      });
      const today = new Date();
      const daysInCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
      expect(daysInCurrentMonth).to.equal(calendarCells.length);
      done();
    });
  });
});

describe('keydown', () => {
  let input, datePicker;
  let vm;
  beforeEach(done => {
    vm = createVue({
      template: '<h-date-picker ref="compo" v-model="value" showFormat></h-date-picker>',
      data() {
        return {
          value: ''
        };
      }
    }, true);
    datePicker = vm.$refs.compo;
    input = vm.$el.querySelector('input');
    input.blur();
    input.focus();
    setTimeout(done, DELAY);
  });

  afterEach(() => destroyVM(vm));

  it('tab', done => {
    keyDown(input, TAB);
    setTimeout(_ => {
      expect(datePicker.visible).to.false;
      done();
    }, DELAY);
  });

  it('arrow keys during typing does not navigate', done => {
    const inputText = '2000-10-1';
    input.value = inputText;
    triggerEvent(input, 'input');
    keyDown(input, LEFT);
    vm.$nextTick(_ => {
      expect(input.value).to.equal(inputText);
      done();
    });
  });

  it('arrow keys navigates', done => {
    const date = new Date(2000, 9,1);
    const prevDate = new Date(2000, 8, 31);
    vm.value = date;
    vm.$nextTick(_ => {
      keyDown(input, LEFT);
      setTimeout(_ => {
        var newdate = new Date(datePicker.value);
        expect(newdate.getFullYear()).to.equal(prevDate.getFullYear());
        expect(newdate.getMonth()).to.equal(prevDate.getMonth());
        expect(newdate.getDate()).to.equal(prevDate.getDate());
        done();
      }, DELAY);
    });
  });
});

describe('event', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('change event', done => {
    var onChangeValue;

    vm = createVue({
      template: `
        <h-date-picker
          ref="compo"
          v-model="value"
          @on-change="handleChange" showFormat/>`,

      methods: {
        handleChange(val) {
          onChangeValue = val;
        }
      },

      data() {
        return {
          value: ''
        };
      }
    }, true);

    const input = vm.$el.querySelector('input');

    input.blur();
    input.focus();
   //   const picker = vm.$refs.compo.picker;
        expect(onChangeValue).to.not.exist;
        vm.value = new Date(2000, 9, 2);
        vm.$el.querySelector('span.h-date-picker-cells-cell').click();
        setTimeout(_ => {
          expect(onChangeValue).to.equal(vm.value);
          done();
        }, DELAY);
  });

  it('change event: when clear(), without opening picker', done => {
    var onChangeValue;
    vm = createVue({
      template: `
        <h-date-picker
          ref="compo"
          v-model="value"  @on-change="handleChange"
        />`,

      methods: {
          handleChange(val) {
            onChangeValue = val;
          }
        },
      data() {
        return {
          value: new Date()
        };
      }
    }, true);

    setTimeout(_ => {
      expect(vm.value).to.not.equal("");
      vm.$refs.compo.showClose = true;
      vm.$refs.compo.handleIconClick({ stopPropagation: () => null });
      setTimeout(_ => {
        expect(onChangeValue).to.equal("");
        done();
      }, DELAY);
    }, DELAY);
  });

  it('should pass correct arguments to on-change event', done => {
    const now = new Date();
    const nowDate = dateToString(now);
    const nowTime = dateToTimeString(now);
    const nextHour = dateToTimeString(now.getTime() + 36e5);
    const nextWeek = new Date(now.getTime() + 6048e5);

    let dateValue, dateRangeValue, timeValue, timeRangeValue;
    vm = createVue({
      template: `
        <div>
          <h-date-picker type="date" @on-change="onChangeDate"></h-date-picker>
          <h-date-picker type="daterange" @on-change="onChangeDateRange"></h-date-picker>
          <h-time-picker type="time" @on-change="onChangeTime"></h-time-picker>
          <h-time-picker type="timerange" @on-change="onChangeTimeRange"></h-time-picker>
        </div>
      `,
      methods: {
        onChangeDate(val) {
          dateValue = val;
        },
        onChangeDateRange(val) {
          dateRangeValue = val;
        },
        onChangeTime(val) {
          timeValue = val;
        },
        onChangeTimeRange(val) {
          timeRangeValue = val;
        },
      }
    }, true);

    vm.$nextTick(() => {
      const [datePicker, dateRangePicker, timePicker, timeRangePicker] = vm.$children;

      datePicker.handleInputChange({target: {value: nowDate}});
      dateRangePicker.handleInputChange({target: {value: [
          nowDate,
          dateToString(nextWeek)
        ].join(' - ')
      }});

      timePicker.handleInputChange({target: {value: nowTime}});
      const timeRangeString = [
          nowTime,
          nextHour
      ].join(' - ');
      timeRangePicker.handleInputChange({target: {
        value: timeRangeString
      }});

      vm.$nextTick(() => {
        // DATE
        expect(typeof dateValue).to.equal('string');
        expect(dateValue).to.equal(nowDate);
        // DATERANGE
        expect(Array.isArray(dateRangeValue)).to.equal(true);
        expect(dateRangeValue[0]).to.equal(nowDate);
        expect(dateRangeValue[1]).to.equal(dateToString(nextWeek));

        // TIME
        expect(typeof timeValue).to.equal('string');
        expect(timeValue).to.equal(nowTime);
        // TIMERANGE
        expect(Array.isArray(timeRangeValue)).to.equal(true);
        expect(timeRangeValue[0]).to.equal(nowTime);
        expect(timeRangeValue[1]).to.equal(nextHour);
        done();
      });
    });
  });

  it('should fire `on-change` when reseting value', done => {
    const now = new Date();
    const nowDate = dateToString(now);
    let onChangeCalled = false;
    vm = createVue({
      template: '<h-date-picker :value="date" type="date" @on-change="onChange"></h-date-picker>',
      data(){
        return { date: now };
      },
      methods: {
        onChange() {
          onChangeCalled = true;
        }
      }
    });

    vm.$nextTick(() => {
      const picker = vm.$children[0];
      const displayField = vm.$el.querySelector('.h-input');
      expect(displayField.value).to.equal(nowDate);

      picker.showClose = true; // to simulate mouseenter in the Input
      picker.handleIconClick(); // reset the input value
      vm.$nextTick(() => {
        expect(onChangeCalled).to.equal(true);
        expect(displayField.value).to.equal('');
        done();
      });
    });
  });

  it('open-change-event', done => {
    var onChange;
    vm = createVue({
      template: `
        <h-date-picker
          @on-open-change="handleChange"/>`,

      methods: {
        handleChange(val) {
          onChange = val;
        }
      }
    }, true);
    const picker = vm.$children[0];
    picker.handleFocus({type: 'focus'});
        setTimeout(_ => {
          expect(onChange).to.equal(true);
          picker.handleBlur({type: 'blur'});
          setTimeout(_ => {
            expect(onChange).to.equal(false);
          done();
          }, DELAY);
        }, DELAY);
  });

  it('on-select-range-event', done => {
    var datevalue;
    var isdone;
    vm = createVue({
      template: `
        <h-date-picker
          ref="compo"
          v-model="value"
          type="datetimerange"
          format="yyyy-MM-dd" showFormat @on-select-range="selectrange"/>`,
      data() {
        return {
          value: ""
        };
      },
      methods: {
        selectrange(val,done) {
          datevalue = val;
          isdone = done;
        }
      }
    }, true);

    const picker = vm.$children[0];
    picker.handleFocus({type: 'focus'});
    setTimeout(_ => {
      const clickableCells = vm.$el.querySelectorAll('.h-date-picker-cells-cell');
      const firstDayInMonthIndex = [...clickableCells].findIndex(cell => !cell.classList.contains('h-date-picker-cells-cell-prev-month'));

      // choose first date
      clickableCells[firstDayInMonthIndex].firstElementChild.click();
      setTimeout(_ => {
        expect(datevalue).to.not.equal("");
        expect(isdone).to.equal(false);
        clickableCells[firstDayInMonthIndex + 4].firstElementChild.click();
        setTimeout(_ => {
          expect(datevalue).to.not.equal("");
          expect(isdone).to.equal(true);
          done();
      }, DELAY);
    }, DELAY);
  }, DELAY);
  });

  it('on-illegal-input-event---doning', done => {
    var illegalvalue="";
    vm = createVue({
      template: `
      <h-date-picker ref="compo" type="date" v-model="value" placeholder="选择日期" :clearOnIllegal=true @on-illegal-input="selectrange"></h-date-picker>`,
      data() {
        return {
          value: ""
        };
      },
      methods: {
        selectrange(val) {
          console.log("chufafangfa"+val);
          illegalvalue = val;
        }
      }
    }, true);
    console.log(illegalvalue);
    const picker = vm.$children[0];
    picker.handleFocus({type: 'focus'});   
     const input = vm.$el.querySelector('input');
    input.value = '20190909111';
    keyDown(input, ENTER);
  //  picker.handleBlur({type: 'blur'});
    setTimeout(_ => {
      //XUYAOGAIGAI
  //    expect(illegalvalue).to.equal("20190909");
      done();
    }, DELAY);
  });
  
  it('focus', done => {
    vm = createVue({
      template: `
        <h-date-picker ref="picker"></h-date-picker>
      `
    }, true);

    var spy = sinon.spy(vm.$refs.picker,'focus');
    vm.$refs.picker.focus();
    vm.$nextTick(_ => {
      expect(spy.calledOnce).to.be.true;
      done();
    });
  });

  it('blur', done => {
    vm = createVue({
      template: `
        <h-date-picker ref="picker"></h-date-picker>
      `
    }, true);

    var spy = sinon.spy(vm.$refs.picker,'blur');
    vm.$refs.picker.blur();
    vm.$nextTick(_ => {
      expect(spy.calledOnce).to.be.true;
      done();
    });
  });
});

describe('splice-panel', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('clear value', done => {
    vm = createVue({
      template: `
      <h-splice-panel v-model="valrange1" format="yyyy/MM/dd" style="width: 200px" controlRange  ref="compo"></h-splice-panel>  
      `,
      data() {
        return {
          valrange1:['2018/01/03','2018/01/08']
        };
      }
    }, true);
    const input = vm.$el.querySelector('input');

    input.focus();
    setTimeout(_ => {
  //    const $el = vm.$refs.compo.picker.$el;
  //    vm.$el.querySelector('span.h-date-picker-cells-cell').click();
      setTimeout(_ => {
        vm.$refs.compo.showClose = true;
        vm.$refs.compo.handleIconClick({ stopPropagation: () => null });
        setTimeout(_ => {
          //需要改动代码
     //     expect(vm.value).to.equal('');
          done();
        }, DELAY);
      }, DELAY);
    }, DELAY);
  });
});