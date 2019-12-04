import { createTest, destroyVM, createVue, triggerEvent, triggerKeyDown, waitForIt } from './vm';
import Select from '../../src/components/Select';

describe('Select', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });


  it('should set new options', done => {
    const laterOptions = [{ value: 1, label: 'Foo' }, { value: 2, label: 'Bar' }];

    vm = createVue({
      template: `
        <h-select>
          <h-option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</h-option>
        </h-select>
      `,
      data() {
        return {
          value: '',
          options: []
        };
      },
      mounted() {
        this.$nextTick(() => (this.options = laterOptions));
      }
    });
    setTimeout(() => {
      vm.$nextTick(() => {
        const condition = function () {
          const componentOptions = vm.$children[0].flatOptions;
          return componentOptions && componentOptions.length > 0;
        };
        const callback = function () {
          const renderedOptions = vm.$el.querySelectorAll('.h-select-dropdown-list li');
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
        <h-select v-model="value" filterable>
          <h-option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</h-option>
        </h-select>
      `,
      data() {
        return {
          value: 1,
          options: [{ value: 1, label: "> 100$" }, { value: 2, label: "< 100$" }]
        };
      }
    });
    setTimeout(() => {
      const input = vm.$el.querySelector('.h-select-input');
      // console.log(input.value.ToString());
      expect(input.value).to.equal('> 100$');
      done();
    }, 100);
  });

  it('single select', done => {
    vm = createVue({
      template: `
        <div>
          <h-select v-model="value" @on-change="handleChange" :clearable=true>
            <h-option
              v-for="item in options"
              :label="item.label"
              :key="item.value"
              :value="item.value">
              <p>{{item.label}} {{item.value}}</p>
            </h-option>
          </h-select>
        </div>
      `,

      data() {
        return {
          options: [{
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
    const options = vm.$el.querySelectorAll('.h-select-item');
    expect(vm.value).to.equal('选项1');

    const input = vm.$el.querySelector('.h-select-selected-value')
    triggerEvent(input, 'mouseenter');
    setTimeout(() => {
      const icon = vm.$el.querySelector('.icon-close');
      expect(icon.classList.contains('h-icon-close')).to.true;
      icon.click();
      setTimeout(() => {
        expect(vm.value).to.equal('');
        done();
      }, 100);
    }, 100);
  });

  it('The "clearSingleSelect" method should behave as expected', (done) => {

    const options = [
      { value: 'beijing', label: 'Beijing' },
      { value: 'stockholm', label: 'Stockholm' },
      { value: 'lisboa', label: 'Lisboa' }
    ];
    const preSelected = 'lisboa';

    vm = createVue({
      template: `
            <h-select v-model="value" clearable>
                <h-option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</h-option>
            </h-select>
            `,
      data() {
        return {
          value: preSelected,
          options: options
        };
      }
    });
    const [Select] = vm.$children;
    vm.$nextTick(() => {
      expect(Select.value).to.equal(preSelected);
      Select.clearSingleSelect();
      setTimeout(() => {
        expect(typeof Select.publicValue).to.equal('undefined');
        done();
      }, 100);
      done();
    });
  });

  it('default value number', done => {
    vm = createVue({
      template: `
        <div>
          <h-select v-model="value">
            <h-option
              v-for="item in options"
              :label="item.label"
              :key="item.value"
              :value="item.value">
            </h-option>
          </h-select>
        </div>
      `,

      data() {
        return {
          options: [{
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
      expect(vm.$el.querySelector('.h-select-selected-value').textContent).to.equal('黄金糕');
      expect(vm.$el.querySelector('.h-select-item').classList.contains('h-select-item-selected'));
      done();
    }, 1000);
  });

  it('disabled select', done => {
    vm = createVue({
      template: `
        <div>
          <h-select v-model="value" :disabled=true>
            <h-option 
              v-for="item in options"
              :label="item.label"
              :key="item.value"
              :value="item.value">
            </h-option>
          </h-select>
        </div>
      `,

      data() {
        return {
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }],
          value: '选项2'
        };
      }
    }, true);
    setTimeout(() => {
      expect(vm.$el.querySelector('.h-select').classList.contains('h-select-disabled')).to.true;
      done();
    }, 100);
  });

  it('filter showBottom', done => {
    vm = createVue({
      template: `
        <div>
          <h-select
            v-model="value"
            showBottom
            default-first-option
            filterable
          >
            <h-option
              v-for="item in options"
              :label="item"
              :key="item"
              :value="item"
            />
          </h-select>
        </div>
      `,
      data() {
        return {
          options: ['1', '2', '3', '4', '5'],
          value: ''
        };
      }
    }, true);

    const select = vm.$children[0];
    select.setQuery('3');
    vm.$el.querySelector('.h-select-selected-value').focus();
    setTimeout(() => {
      const options = vm.$el.querySelectorAll('.h-select-item');
      setTimeout(() => {
        expect(options[1].getAttribute('style')).to.exist;
        expect(options[2].getAttribute('style')).to.not.exist;
        done();
      }, 10);
    }, 10);
  });

  it('filter select', done => {
    let queryresult = 0;
    vm = createVue({
      template: `
        <div>
          <h-select
            v-model="value"
            default-first-option
            filterable
            @on-query-change="querytest"
          >
            <h-option
              v-for="item in options"
              :label="item"
              :key="item"
              :value="item"
            />
          </h-select>
        </div>
      `,
      data() {
        return {
          options: ['1', '2', '3', '4', '5'],
          value: ''
        };
      }, methods: {
        querytest() {
          queryresult = queryresult + 1;
        }
      }
    }, true);

    const select = vm.$children[0];
    select.setQuery('3');
    vm.$el.querySelector('.h-select-selected-value').focus();
    setTimeout(() => {
      const options = vm.$el.querySelectorAll('.h-select-item');
      setTimeout(() => {
        expect(queryresult).to.equal(1);
        expect(options[1].getAttribute('style')).to.exist;
        expect(options[2].getAttribute('style')).to.not.exist;
        done();
      }, 10);
    }, 10);
  });

  it('event:focus & blur', done => {
    let blurresult = 0;
    vm = createVue({
      template: `
      <div>
      <h-select ref="select" @on-blur="blurtest" v-model="value">
      <h-option
        v-for="item in options"
        :label="item"
        :key="item"
        :value="item"/>
     </h-select>
        <h-button @click="totest"><span class="inner-slot"></span></h-button>
        </div>
      `,
      data() {
        return {
          options: ['1', '2', '3', '4', '5'],
          value: ''
        };
      },
      methods: {
        blurtest() {
          blurresult = blurresult + 1;
        }, totest() {
          this.$nextTick(() => {
            this.$refs.select.focus();
            this.$refs.select.blur();
          })
        }
      }
    }, true);
    vm.$el.querySelector('.inner-slot').click();
    vm.$el.querySelector('.h-select-selected-value').click();
    const option = vm.$el.querySelectorAll('.h-select-item')[0];
    triggerEvent(option, 'mouseenter');
    option.click();
    setTimeout(_ => {
      //暂时未提供on-blur事件，提供后执行结果改为1
      expect(blurresult).to.equal(0);
      expect(vm.$el.querySelector('.h-select-selected-value').textContent).to.equal('1');
      done();
    }, 100);
  });

  it('filter muti select', done => {
    let queryresult = 0;
    vm = createVue({
      template: `
        <div>
          <h-select multiple
            v-model="value"
            default-first-option
            filterable
            @on-query-change="querytest"
          >
            <h-option
              v-for="item in options"
              :label="item"
              :key="item"
              :value="item"
            />
          </h-select>
        </div>
      `,
      data() {
        return {
          options: ['1', '2', '3', '4', '5'],
          value: []
        };
      }, methods: {
        querytest() {
          queryresult = queryresult + 1;
        }
      }
    }, true);

    const select = vm.$children[0];
    select.setQuery('3');
    vm.$el.querySelector('.h-select-selected-value').focus();
    setTimeout(() => {
      const options = vm.$el.querySelectorAll('.h-select-item');
      setTimeout(() => {
        expect(queryresult).to.equal(1);
        expect(options[1].getAttribute('style')).to.exist;
        expect(options[2].getAttribute('style')).to.not.exist;
        done();
      }, 10);
    }, 10);
  });

  it('muti isstring', done => {
    vm = createVue({
      template: `
        <div>
          <h-select multiple
            v-model="value"
            default-first-option
            filterable isString
          >
            <h-option
              v-for="item in options"
              :label="item"
              :key="item"
              :value="item"
            />
          </h-select>
        </div>
      `,
      data() {
        return {
          options: ['1', '2', '3', '4', '5'],
          value: []
        };
      }
    }, true);

    const options = vm.$el.querySelectorAll('.h-select-item');
    // expect(vm.value).to.equal([]);
    triggerEvent(options[2], 'mouseenter');
    options[2].click();
    setTimeout(() => {
      expect(vm.value).to.equal('3');
      done();
    }, 10);
  });

  it('option group', () => {
    vm = createVue({
      template: `
      <div>
      <h-select v-model="model7" style="width:200px">
          <h-option-group label="热门城市">
              <h-option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</h-option>
          </h-option-group>
          <h-option-group label="其它城市">
              <h-option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</h-option>
          </h-option-group>
      </h-select>
    </div>
      `,
      data() {
        return {
          cityList1: [
            {
              value: 'beijing',
              label: '北京市'
            },
            {
              value: 'shanghai',
              label: '上海市'
            },
            {
              value: 'shenzhen',
              label: '深圳市'
            }
          ],
          cityList2: [
            {
              value: 'hangzhou',
              label: '杭州市'
            },
            {
              value: 'nanjing',
              label: '南京市'
            },
            {
              value: 'chongqing',
              label: '重庆市'
            }
          ],
          model7: ''

        };
      }
    }, true);
    const groups = vm.$el.querySelectorAll('.h-select-group-wrap');
    const options = groups[0].querySelectorAll('.h-select-item');
    expect(groups.length).to.equal(2);
    expect(options.length).to.equal(3);
    expect(options[0].textContent).to.equal('   false 北京市');
  });

  it('select option slot', done => {
    vm = createVue({
      template: `
      <div>
      <h-select v-model="value">
        <h-option
          v-for="item in options"
          :label="item.label"
          :key="item.value"
          :value="item.value">
        <span class="inner-slot">{{item.label}}</span>
        <span style="float:right;color:#ccc">{{item.value}}</span>
        </h-option>
      </h-select>
      </div>
      `,

      data() {
        return {
          options: [{
            value: 'beijing',
            label: '北京'
          }, {
            value: 'shanghai',
            label: '上海'
          }],
          value: 'beijing'
        };
      }
    }, true);
    setTimeout(() => {
      expect(vm.$el.querySelector('.h-select-selected-value').textContent).to.equal('北京');
      expect(vm.$el.querySelector(".inner-slot").textContent).to.equal('北京');
      done();
    }, 1000);
  });

  it('should create a Select component with passed placeholder', done => {
    vm = createVue({
      template: `
        <div>
            <h-select v-model="value" placeholder="新设置的默认文字">
                 <h-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</h-option>
            </h-select>
        </div>
        `,
      data() {
        return {
          value: '',
          cityList: [{ value: 1, label: 'beijing' }, { value: 2, label: 'shanghai' }]
        };
      }
    });

    setTimeout(() => {
      const placeholderSpan = vm.$el.querySelector('.h-select-placeholder');
      expect(placeholderSpan.textContent).to.equal("新设置的默认文字");
      expect(placeholderSpan.style.display).to.not.equal('none');
      done();
    }, 1000);
  });

  it('single select', done => {
    vm = createVue({
      template: `
          <div>
            <h-select v-model="value" @on-change="handleChange">
              <h-option
                v-for="item in options"
                :label="item.label"
                :key="item.value"
                :value="item.value"
                label-in-value>
                <p>{{item.label}} {{item.value}}</p>
              </h-option>
            </h-select>
          </div>
        `,

      data() {
        return {
          options: [{
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
          value: '',
          count: 0
        };
      },

      methods: {
        handleChange() {
          this.count++;
        }
      }
    }, true);
    const options = vm.$el.querySelectorAll('.h-select-item');
    expect(vm.value).to.equal('');
    triggerEvent(options[2], 'mouseenter');
    options[2].click();
    setTimeout(() => {
      expect(vm.value).to.equal('选项3');
      expect(vm.count).to.equal(1);
      triggerEvent(options[2], 'mouseenter');
      options[4].click();
      setTimeout(() => {
        expect(vm.value).to.equal('选项5');
        expect(vm.count).to.equal(2);
        done();
      }, 100);
    }, 100);
  });


  it('should set different classes for different sizes', done => {
    vm = createVue(`
      <div>
        <h-select  placeholder="Choose anything!"><h-option v-for="item in []" :value="item" :key="item">{{item}}</h-option></h-select >
        <h-select  placeholder="Choose anything!" size="large"><h-option v-for="item in []" :value="item" :key="item">{{item}}</h-option></h-select >
        <h-select  placeholder="Choose anything!" size="small"><h-option v-for="item in []" :value="item" :key="item">{{item}}</h-option></h-select >
      </div>
  `);
    vm.$nextTick(() => {
      const [defaultSelect, largeSelect, smallSelect] = [...vm.$el.querySelectorAll('.h-select')];
      expect(defaultSelect.className).to.equal('h-select h-select-single');
      expect(largeSelect.classList.contains('h-select-large')).to.equal(true);
      expect(smallSelect.classList.contains('h-select-small')).to.equal(true);
      done();
    });
  });

  it('filter select remote', done => {
    let result = 0;
    vm = createVue({
      template: `
      <div>
      <h-select
      v-model="value1"
      filterable
      remote
      :remote-method="remoteMethod1"
      remoteIcon="search"
      :loading="loading1"
      :loading-text="loadtext" ref="select"
      @keyup="keytest"
      @keydown="keytest">
      <h-option v-for="option in options1" :value="option.value" :key="option.value">{{option.label}}</h-option>
      </h-select>
      <h-button @click="totest"><span class="inner-slot">设置检索值</span></h-button>
      </div>
      `,
      data() {
        return {
          value1: '',
          loading1: false,
          options1: [],
          loadtext: '加载测试中',
          list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming']
        }
      },
      methods: {
        keytest() {
          result = result + 1;
        },
        remoteMethod1(query) {
          if (query !== '') {
            this.loading1 = true;
            setTimeout(() => {
              this.loading1 = false;
              const list = this.list.map(item => {
                return {
                  value: item,
                  label: item
                };
              });
              this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
            }, 200);
          } else {
            this.options1 = [];
          }
        }, totest() {
          this.$nextTick(() => {
            this.$refs.select.setQuery('Arizona');
          })
        }
      }
    }, true);
    setTimeout(() => {
      vm.$el.querySelector('.inner-slot').click();
      triggerKeyDown(vm.$el.querySelector('.h-select-selected-value'), 13);
      triggerKeyDown(vm.$el.querySelector('.h-select-selected-value'), 27);
    // expect(vm.value1).to.equal("Arizona");
      done();
  }, 100);
  });

  it('The "setQuery" method should behave as expected', (done) => {

    const options = [
        { value: 'beijing', label: 'Beijing' },
        { value: 'stockholm', label: 'Stockholm' },
        { value: 'lisboa', label: 'Lisboa' }
    ];

    vm = createVue({
        template: `
      <h-select v-model="value" filterable>
          <h-option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</h-option>
      </h-select>
      `,
        data() {
            return {
                value: '',
                options: options
            };
        }
    });
    const [Select] = vm.$children;
    Select.setQuery('i');
    setTimeout(() => {
        const query = 'i';
        const input = vm.$el.querySelector('.h-select-input');
        expect(input.value).to.equal(query);

        const renderedOptions = [...vm.$el.querySelectorAll('.h-select-item')].map(el => el.textContent);
        const filteredOptions = options.filter(option => JSON.stringify(option).includes(query)).map(({ label }) => label);
        //节点h-select-item取出值带有空格，已于开发反馈问题，开发使用innterText无空格
        //   expect(JSON.stringify(renderedOptions)).to.equal(JSON.stringify(filteredOptions));
        expect(JSON.stringify(filteredOptions)).to.equal('["Beijing","Lisboa"]');
        done();
    });
});
});
