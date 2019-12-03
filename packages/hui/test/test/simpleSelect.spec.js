import { createTest, destroyVM, createVue, triggerEvent, triggerKeyDown, waitForIt } from './vm';
import Select from '../../src/components/SimpleSelect';

const LEFT = 37;
const Down = 34;
const ENTER = 13;
const TAB = 9;

const keyDown = (el, keyCode) => {
  const evt = document.createEvent('Events');
  evt.initEvent('keydown', true, true);
  evt.keyCode = keyCode;
  el.dispatchEvent(evt);
};


describe('SimpleSelect', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });


  it('should set new options', done => {
    let bigData = [];
    for(let i=0;i<20;i++){
      let obj={};
      obj.value="value"+i;
      obj.label="label"+i;
      bigData.push(obj);
    }
    vm = createVue({
      template: `
        <h-simple-select v-model="value" ref="test">
        <h-select-block :data="bigData"></h-select-block>
        </h-simple-select>
      `,
      data() {
        return {
          bigData:[],
          value:'value0'
        };
      },
      mounted() {
        this.$nextTick(() => (this.bigData = bigData));
      }
    });
    setTimeout(() => {
      vm.$nextTick(() => {
        const condition = function () {
          const componentOptions = vm.$children[0].flatOptions;
          return componentOptions && componentOptions.length > 0;
        };
        const callback = function () {
          const renderedOptions = vm.$el.querySelectorAll('.h-selectTable-dropdown-list li');
          expect(renderedOptions.length).to.equal(laterOptions.length);

          const labels = [...renderedOptions].map(el => el.textContent).join('<>');
          const expected = laterOptions.map(o => o.label).join('<>');
          expect(labels).to.equal(expected);
        };
        waitForIt(condition, callback);
        done();
      });
      done();
    });
  });

  it('should display normal characters in input when in filterable mode', done => {
    vm = createVue({
      template: `
        <h-simple-select v-model="value"  filterable>
        <h-select-block :data="bigData"></h-select-block>
      </h-simple-select>
      `,
      data() {
        return {
          value: 1,
          bigData: [{ value: 1, label: "> 100$" }, { value: 2, label: "< 100$" }]
        };
      }
    });
    setTimeout(() => {
      const input = vm.$el.querySelector('.h-selectTable-input');
      expect(input.value).to.equal('> 100$');
      done();
    }, 100);
  });

  it('single select', done => {
    vm = createVue({
      template: `
        <div>
        <h-simple-select v-model="value" filterable  @on-change="handleChange">
        <h-select-block :data="bigData"></h-select-block>
        </h-simple-select>
        </div>
      `,

      data() {
        return {
          bigData: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value: '选项1',
          count: 0
        };
      },

      methods: {
        handleChange() {
          this.count++;
        }
      }
    }, true);
    const options = vm.$el.querySelectorAll('.h-select-block-item');
    expect(vm.value).to.equal('选项1');

    const input = vm.$el.querySelector('.h-selectTable-selected-value')
    setTimeout(() => {
    expect(input.textContent).to.equal('黄金糕');
    triggerEvent(input, 'mouseenter');
      setTimeout(() => {
      const icon = vm.$el.querySelector('.h-icon-close');
      expect(icon.classList.contains('h-icon-close')).to.true;
      icon.click();
      setTimeout(() => {
        expect(vm.value).to.equal('');
        done();
      }, 100);
    }, 100);
  }, 100);
  });

  it('default value number', done => {
    vm = createVue({
      template: `
        <div>
        <h-simple-select v-model="value">
        <h-select-block :data="bigData"></h-select-block>
        </h-simple-select>
        </div>
      `,

      data() {
        return {
          bigData: [{
            value: 1,
            label: '黄金糕'
          }, {
            value: 2,
            label: '双皮奶'
          }],
          value: 1
        };
      }
    }, true);
    setTimeout(() => {
      expect(vm.$el.querySelector('.h-selectTable-selected-value').textContent).to.equal('黄金糕');
      expect(vm.$el.querySelector('.h-select-block-item').classList.contains('h-select-block-selected'));
      done();
    }, 1000);
  });

  it('disabled select', done => {
    vm = createVue({
      template: `
        <div>
          <h-simple-select v-model="value" :disabled=true>
          <h-select-block :data="bigData"></h-select-block>
          </h-simple-select>
        </div>
      `,
      data() {
        return {
          bigData: [{
            value: 1,
            label: '黄金糕'
          }, {
            value: 2,
            label: '双皮奶'
          }],
          value: 1
        };
      }
    }, true);
    setTimeout(() => {
      expect(vm.$el.querySelector('.h-selectTable').classList.contains('h-selectTable-disabled')).to.true;
      done();
    }, 100);
  });

  it('multiple select', done => {
    vm = createVue({
      template: `
        <div>
        <h-simple-select v-model="value" filterable  @on-change="handleChange" multiple>
        <h-select-block :data="bigData"></h-select-block>
        </h-simple-select>
        </div>
      `,

      data() {
        return {
          bigData: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value: [],
          count: 0
        };
      },

      methods: {
        handleChange() {
          this.count++;
        }
      }
    }, true);
    const input = vm.$el.querySelector('.h-selectTable-selected-value');
    input.click();
    const drop = vm.$el.querySelector('.h-select-blockblock-content');
    keyDown(input, 33);
    setTimeout(() => {
      keyDown(input, ENTER);
      setTimeout(() => {
        console.log("-----------------------");
        console.log(vm.value);
        done();
      }, 100);
    }, 100);
  });
});
