import { createVue, destroyVM } from './vm';
import DatePicker from '../../src/components/Form';

const DELAY = 100;

describe('Form', () => {
  let vm;
  let hasPromise = true;
  before(() => {
    if (!window.Promise) {
      hasPromise = false;
      window.Promise = require('es6-promise').Promise;
    }
  });

  after(() => {
    if (!hasPromise) {
      window.Promise = undefined;
    }
  });

  afterEach(() => {
    destroyVM(vm);
  });

  it('label width', done => {
    vm = createVue({
      template: `
        <h-form ref="form" :model="form" :label-width="80">
          <h-form-item label="活动名称">
            <h-input v-model="form.name"></h-input>
          </h-form-item>
        </h-form>
      `,
      data() {
        return {
          form: {
            name: ''
          }
        };
      }
    }, true);
    expect(vm.$el.querySelector('.h-form-item-label').style.width).to.equal('80px');
 //   expect(vm.$el.querySelector('.h-form-item-content').style.margin-left).to.equal('80px');
    done();
  });

  it('inline form', done => {
    vm = createVue({
      template: `
        <h-form ref="form" :model="form" inline>
          <h-form-item>
            <h-input v-model="form.name"></h-input>
          </h-form-item>
          <h-form-item>
            <h-input v-model="form.address"></h-input>
          </h-form-item>
        </h-form>
      `,
      data() {
        return {
          form: {
            name: '',
            address: ''
          }
        };
      }
    }, true);
    expect(vm.$el.classList.contains('h-form-inline')).to.be.true;
    done();
  });

  it('label position', done => {
    vm = createVue({
      template: `
        <div>
          <h-form :model="form" label-position="top" ref="labelTop">
            <h-form-item>
              <h-input v-model="form.name"></h-input>
            </h-form-item>
            <h-form-item>
              <h-input v-model="form.address"></h-input>
            </h-form-item>
          </h-form>
          <h-form :model="form" label-position="left" ref="labelLeft">
            <h-form-item>
              <h-input v-model="form.name"></h-input>
            </h-form-item>
            <h-form-item>
              <h-input v-model="form.address"></h-input>
            </h-form-item>
          </h-form>
        </div>
      `,
      data() {
        return {
          form: {
            name: '',
            address: ''
          }
        };
      }
    }, true);
    expect(vm.$refs.labelTop.$el.classList.contains('h-form-label-top')).to.be.true;
    expect(vm.$refs.labelLeft.$el.classList.contains('h-form-label-left')).to.be.true;
    done();
  });

  it('show message', done => {
    vm = createVue({
      template: `
      <div>
      <h-form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <h-form-item prop="user">
              <h-input type="text" v-model="formInline.user" placeholder="Username">
                  <h-icon name="android-person" slot="prepend"></h-icon>
              </h-input>
          </h-form-item>
      </h-form>
  </div>
      `,
      data () {
        return {
            formInline: {
                user: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ]
            }
        }
    }
    }, true);
    vm.$refs.formInline.validate(valid => {
      expect(valid).to.not.true;
      setTimeout(_ => {
        expect(vm.$el.querySelector('.h-form-item-error')).to.exist;
        done();
      }, DELAY);
    });
  });

  it('reset field', done => {
    vm = createVue({
      template: `
        <h-form ref="form" :model="form" :rules="rules">
          <h-form-item label="活动名称" prop="name">
            <h-input v-model="form.name" ref="fieldName"></h-input>
          </h-form-item>
          <h-form-item label="活动地址" prop="address">
            <h-input v-model="form.address" ref="fieldAddr"></h-input>
          </h-form-item>
          <h-form-item label="活动性质" prop="type">
            <h-checkbox-group v-model="form.type">
              <h-checkbox label="美食/餐厅线上活动" name="type"></h-checkbox>
              <h-checkbox label="地推活动" name="type"></h-checkbox>
              <h-checkbox label="线下主题活动" name="type"></h-checkbox>
              <h-checkbox label="单纯品牌曝光" name="type"></h-checkbox>
            </h-checkbox-group>
          </h-form-item>
        </h-form>
      `,
      data() {
        return {
          form: {
            name: '',
            address: '',
            type: []
          },
          rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'blur' }
            ],
            address: [
              { required: true, message: '请选择活动区域', trigger: 'change' }
            ],
            type: [
              { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ]
          }
        };
      },
      methods: {
        setValue() {
          this.form.name = 'jack';
          this.form.address = 'aaaa';
          this.form.type.push('地推活动');
        }
      }
    }, true);
    vm.setValue();
    vm.$refs.form.resetFields();
    vm.$refs.form.$nextTick(_ => {
      expect(vm.form.name).to.equal('');
      expect(vm.form.address).to.equal('');
      expect(vm.form.type.length).to.equal(0);
      done();
    });
  });

  it('form item nest', done => {
    vm = createVue({
      template: `
      <h-form ref="form" :model="formItem1" :rules="rules">
      <h-form-item label="日期控件">
       <h-row>
         <h-col span="11">
           <h-form-item prop="date" required>
             <h-datePicker type="date" placeholder="选择日期" v-model="formItem1.date"></h-datePicker>
           </h-form-item>
         </h-col>
         <h-col span="2" style="text-align: center">-</h-col>
         <h-col span="11">
           <h-form-item prop="time" required>
             <h-timePicker type="time" placeholder="选择时间" v-model="formItem1.time"></h-timePicker>
           </h-form-item>
         </h-col>
       </h-row>
     </h-form-item>
     </h-form>
      `,
      data() {
        return {
          formItem1: {
            date: '',
            time: ''
          },
          rules: {
            date: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ]
          }
        };
      }
    }, true);
    vm.$refs.form.validate(valid => {
      expect(valid).to.not.true;
      done();
    });
  });
});

describe('form validate', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  it('input', done => {
    vm = createVue({
      template: `
        <h-form :model="form" :rules="rules" ref="form">
          <h-form-item label="活动名称" prop="name" ref="field">
            <h-input v-model="form.name"></h-input>
          </h-form-item>
        </h-form>
      `,
      data() {
        return {
          form: {
            name: ''
          },
          rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'change', min: 3, max: 6 }
            ]
          }
        };
      },
      methods: {
        setValue(value) {
          this.form.name = value;
        }
      }
    }, true);
    vm.$refs.form.validate(valid => {
      let field = vm.$refs.field;
      expect(valid).to.not.true;
      vm.$refs.form.$nextTick(_ => {
        expect(field.validateMessage).to.equal('请输入活动名称');
        vm.setValue('aaaaa');

        vm.$refs.form.$nextTick(_ => {
          expect(field.validateMessage).to.equal('');
          vm.setValue('aa');

          vm.$refs.form.$nextTick(_ => {
            expect(field.validateMessage).to.equal('请输入活动名称');
            done();
          });
        });
      });
    });
  });

  it('textarea', done => {
    vm = createVue({
      template: `
        <h-form :model="form" :rules="rules" ref="form">
          <h-form-item label="活动名称" prop="name" ref="field">
            <h-input type="textarea" v-model="form.name"></h-input>
          </h-form-item>
        </h-form>
      `,
      data() {
        return {
          form: {
            name: ''
          },
          rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'change', min: 3, max: 6 }
            ]
          }
        };
      },
      methods: {
        setValue(value) {
          this.form.name = value;
        }
      }
    }, true);
    vm.$refs.form.validate(valid => {
      let field = vm.$refs.field;
      expect(valid).to.not.true;
      vm.$refs.form.$nextTick(_ => {
        expect(field.validateMessage).to.equal('请输入活动名称');
        vm.setValue('aaaaa');

        vm.$refs.form.$nextTick(_ => {
          expect(field.validateMessage).to.equal('');
          vm.setValue('aa');

          vm.$refs.form.$nextTick(_ => {
            expect(field.validateMessage).to.equal('请输入活动名称');
            done();
          });
        });
      });
    });
  });

  it('selector', done => {
    vm = createVue({
      template: `
        <h-form :model="form" :rules="rules" ref="form">
          <h-form-item label="记住密码" prop="region" ref="field">
            <h-select v-model="form.region" placeholder="请选择活动区域">
              <h-option label="区域一" value="shanghai"></h-option>
              <h-option label="区域二" ref="opt" value="beijing"></h-option>
            </h-select>
          </h-form-item>
        </h-form>
      `,
      data() {
        return {
          form: {
            region: ''
          },
          rules: {
            region: [
              {required: true, message: '请选择活动区域', trigger: 'change' }
            ]
          }
        };
      }
    }, true);
    vm.$refs.form.validate(valid => {
      let field = vm.$refs.field;
      expect(valid).to.false;
      setTimeout(_ => {
        expect(field.validateMessage).to.equal('请选择活动区域');
        // programatic modification triggers change validation
        vm.form.region = 'shanghai';
        setTimeout(_ => {
          expect(field.validateMessage).to.equal('');
          vm.form.region = '';
          setTimeout(_ => {
            expect(field.validateMessage).to.equal('请选择活动区域');
            // user modification of bound value triggers change validation
            vm.$refs.opt.$el.click();
            setTimeout(_ => {
              expect(field.validateMessage).to.equal('');
              done();
            }, DELAY);
          }, DELAY);
        }, DELAY);
      }, DELAY);
    });
  });

  it('timepicker', done => {
    vm = createVue({
      template: `
      <h-form :model="form" :rules="rules" ref="form">
      <h-form-item label="记住密码" prop="date" ref="field">
        <h-time-picker type="time" ref="picker" placeholder="选择时间" v-model="form.date"></h-time-picker>
      </h-form-item>
    </h-form>
      `,
      data() {
        return {
          form: {
            date: ''
          },
          rules: {
            date: [
              { required: true, type: 'string', message: '请选择时间', trigger: 'change' }
            ]
          }
        };
      }
    }, true);
    vm.$refs.form.validate(valid => {
      let field = vm.$refs.field;
      expect(valid).to.not.true;
      setTimeout(_ => {
        expect(field.validateMessage).to.equal('请选择时间');
        // programatic modification does not trigger change
        vm.value = new Date();
        setTimeout(_ => {
          expect(field.validateMessage).to.equal('请选择时间');
          vm.value = '';
          // user modification triggers change
          const input = vm.$refs.picker.$el.querySelector('input');
          input.blur();
          input.focus();
          setTimeout(_ => {
            vm.$refs.picker.$el.querySelector('.h-time-picker-cells-cell').click();
            setTimeout(_ => {
              expect(field.validateMessage).to.equal('');
              done();
            }, 500);
          }, DELAY);
        }, DELAY);
      }, DELAY);
    });
  });

  it('checkbox group', done => {
    vm = createVue({
      template: `
        <h-form :model="form" :rules="rules" ref="form">
          <h-form-item label="活动名称" prop="type" ref="field">
            <h-checkbox-group v-model="form.type">
              <h-checkbox label="美食/餐厅线上活动" name="type"></h-checkbox>
              <h-checkbox label="地推活动" name="type"></h-checkbox>
              <h-checkbox label="线下主题活动" name="type"></h-checkbox>
              <h-checkbox label="单纯品牌曝光" name="type"></h-checkbox>
            </h-checkbox-group>
          </h-form-item>
        </h-form>
      `,
      data() {
        return {
          form: {
            type: []
          },
          rules: {
            type: [
              { type: 'array', required: true, message: '请选择活动类型', trigger: 'change' }
            ]
          }
        };
      },
      methods: {
        setValue(value) {
          this.form.type = value;
        }
      }
    }, true);
    vm.$refs.form.validate(valid => {
      let field = vm.$refs.field;
      expect(valid).to.not.true;
      vm.$refs.form.$nextTick(_ => {
        expect(field.validateMessage).to.equal('请选择活动类型');
        vm.setValue(['地推活动']);
        vm.$el.querySelector('.h-checkbox-input').click();
        vm.$refs.form.$nextTick(_ => {
          expect(field.validateMessage).to.equal('');
          done();
        });
      });
    });
  });

  it('radio group', done => {
    vm = createVue({
      template: `
        <h-form :model="form" :rules="rules" ref="form">
          <h-form-item label="活动名称" prop="type" ref="field">
            <h-radio-group v-model="form.type">
              <h-radio label="线上品牌商赞助"></h-radio>
              <h-radio label="线下场地免费"></h-radio>
            </h-radio-group>
          </h-form-item>
        </h-form>
      `,
      data() {
        return {
          form: {
            type: ''
          },
          rules: {
            type: [
              { required: true, message: '请选择活动类型', trigger: 'change' }
            ]
          }
        };
      },
      methods: {
        setValue(value) {
          this.form.type = value;
        }
      }
    }, true);
    vm.$refs.form.validate(valid => {
      let field = vm.$refs.field;
      expect(valid).to.not.true;
      vm.$refs.form.$nextTick(_ => {
        expect(field.validateMessage).to.equal('请选择活动类型');
        vm.setValue('线下场地免费');
        vm.$el.querySelector('.h-radio-input').click();
        vm.$refs.form.$nextTick(_ => {
          expect(field.validateMessage).to.equal('');
          done();
        });
      });
    });
  });

  it('validate field', done => {
    vm = createVue({
      template: `
        <h-form :model="form" :rules="rules" ref="form">
          <h-form-item label="活动名称" prop="name" ref="field">
            <h-input v-model="form.name"></h-input>
          </h-form-item>
        </h-form>
      `,
      data() {
        return {
          form: {
            name: ''
          },
          rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'change', min: 3, max: 6 }
            ]
          }
        };
      },
      methods: {
        setValue(value) {
          this.form.name = value;
        }
      }
    }, true);
    vm.$refs.form.validateField('name', valid => {
      expect(valid).to.not.true;
      done();
    });
  });

  it('datepicker', done => {
    vm = createVue({
      template: `
        <h-form :model="form" :rules="rules" ref="form">
          <h-form-item label="记住密码" prop="date" ref="field">
            <h-date-picker type="date" ref="picker" placeholder="选择日期" v-model="form.date" style="width: 100%;"></h-date-picker>
          </h-form-item>
        </h-form>
      `,
      data() {
        return {
          form: {
            date: ''
          },
          rules: {
            date: [
              {type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ]
          }
        };
      }
    }, true);
    vm.$refs.form.validate(valid => {
      let field = vm.$refs.field;
      expect(valid).to.not.true;
      setTimeout(_ => {
        expect(field.validateMessage).to.equal('请选择日期');
        // programatic modification does not trigger change
        vm.value = new Date();
        setTimeout(_ => {
          expect(field.validateMessage).to.equal('请选择日期');
          vm.value = '';
          // user modification triggers change
          const input = vm.$refs.picker.$el.querySelector('input');
          input.blur();
          input.focus();
          setTimeout(_ => {
            const keyDown = (el, keyCode) => {
              const evt = document.createEvent('Events');
              evt.initEvent('keydown', true, true);
              evt.keyCode = keyCode;
              el.dispatchEvent(evt);
            };
            keyDown(input, 37);
            setTimeout(_ => {
              keyDown(input, 13);
              vm.$el.querySelector('.h-date-picker-cells-cell').click();
              setTimeout(_ => {
                expect(field.validateMessage).to.equal('');
                done();
              }, DELAY);
            }, DELAY);
          }, DELAY);
        }, DELAY);
      }, DELAY);
    });
  });

  it('custom validate', done => {
    var checkName = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('长度至少为5'));
      } else {
        callback();
      }
    };
    vm = createVue({
      template: `
        <h-form :model="form" :rules="rules" ref="form">
          <h-form-item label="活动名称" prop="name" ref="field">
            <h-input v-model="form.name"></h-input>
          </h-form-item>
        </h-form>
      `,
      data() {
        return {
          form: {
            name: ''
          },
          rules: {
            name: [
              { validator: checkName, trigger: 'change' }
            ]
          }
        };
      },
      methods: {
        setValue(value) {
          this.form.name = value;
        }
      }
    }, true);
    vm.$refs.form.validate(valid => {
      let field = vm.$refs.field;
      expect(valid).to.not.true;
      vm.$refs.form.$nextTick(_ => {
        expect(field.validateMessage).to.equal('长度至少为5');
        vm.setValue('aaaaaa');
     //   vm.$el.querySelector('.input').click();
        vm.$refs.form.$nextTick(_ => {
          expect(field.validateMessage).to.equal('');
          done();
        });
      });
    });
  });

  it('error', done => {
    vm = createVue({
      template: `
        <h-form :model="form" :rules="rules" ref="form">
          <h-form-item label="活动名称" prop="name" :error="error" ref="field">
            <h-input v-model="form.name"></h-input>
          </h-form-item>
        </h-form>
      `,
      data() {
        return {
          error: 'dsad',
          form: {
            name: 'sada'
          },
          rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'change', min: 3, max: 6 }
            ]
          }
        };
      },
      methods: {
        setValue(value) {
          this.form.name = value;
        }
      }
    }, true);
    vm.$refs.form.validate(valid => {
      let field = vm.$refs.field;
      expect(valid).to.true;
      vm.error = '输入不合法';

      vm.$refs.field.$nextTick(_ => {
        expect(field.validateState).to.equal('error');
        expect(field.validateMessage).to.equal('输入不合法');
        done();
      });
    });
  });
});

describe('form methods', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
it('handleValidField', done => {
  vm = createVue({
    template: `
    <h-form ref="formMethod" :model="formMethod" :label-width="80" placement="top">
        <h-form-item label="姓名" prop="name"  required ref="field">
            <h-input v-model="formMethod.name" placeholder="请输入姓名"></h-input>
        </h-form-item>
        <h-form-item label="邮箱" prop="mail" required>
            <h-input v-model="formMethod.mail" placeholder="请输入邮箱"></h-input>
        </h-form-item>
        <h-form-item label="城市" prop="city" required>
            <h-select v-model="formMethod.city" placeholder="请选择所在地">
                <h-option value="beijing">北京市</h-option>
                <h-option value="shanghai">上海市</h-option>
                <h-option value="shenzhen">深圳市</h-option>
            </h-select>
        </h-form-item>
        <h-form-item>
            <h-button type="primary" @click="handleSubmit('formMethod')">提交</h-button>
            <h-button type="primary" @click="handleValidField('formMethod','name')" style="margin-left: 8px">校验</h-button>
            <h-button type="ghost" @click="handleReset('formMethod')" style="margin-left: 8px">重置</h-button>
            <h-button type="ghost" @click="resetValidate('formMethod')" style="margin-left: 8px">重置表单校验结果</h-button>
            <h-button type="ghost" @click="resetValidateField('formMethod')" style="margin-left: 8px">重置单个表单校验结果</h-button>
            <h-button type="ghost" @click="firstNodeFocused('formMethod')" style="margin-left: 8px">第一项获取焦点</h-button>
            <h-button type="ghost"  style="margin-left: 8px">失去焦点</h-button>
        </h-form-item>
    </h-form>
    `,
    data () {
      return {
          formMethod: {
              name: '',
              mail: '',
              city: ''
          }
      }
  },
  methods: {
      handleSubmit (name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                  this.$hMessage.success('提交成功!');
              } else {
                  this.$hMessage.error('表单验证失败!');
              }
          })
      },
      handleValidField (name, str) {
          this.$refs[name].validateField(str, (valid) => {
              if (valid) {
                  this.$hMessage.error(valid);
              } else {
                  this.$hMessage.success('校验正确');
              }
          })
      },
      handleReset (name) {
          this.$refs[name].resetFields();
      },
      resetValidate (name) {
          this.$refs[name].resetValidate();
      } ,
      resetValidateField (name) {
          this.$refs[name].resetValidateField("name");
      } ,firstNodeFocused(name) {
        this.$refs[name].firstNodeFocused();
    }       
  }
  }, true);
  vm.$refs.formMethod.validate(valid => {
    let field = vm.$refs.field;
    expect(valid).to.false;
    setTimeout(_ => {
      expect(field.validateMessage).to.equal('输入不能为空');
      vm.$el.querySelectorAll("button")[4].click();
      setTimeout(_ => {
        expect(field.validateMessage).to.equal('');
        vm.$el.querySelectorAll("button")[0].click();
        setTimeout(_ => {
          expect(field.validateMessage).to.equal('输入不能为空');
          vm.$el.querySelectorAll("button")[3].click();
          setTimeout(_ => {
            expect(field.validateMessage).to.equal('');
            vm.$el.querySelectorAll("button")[1].click();
            setTimeout(_ => {
              expect(field.validateMessage).to.equal('输入不能为空');
              vm.$el.querySelectorAll("button")[2].click();
              setTimeout(_ => {
                expect(field.validateMessage).to.equal('');
              }, DELAY);
            }, DELAY);
          }, DELAY);
        }, DELAY);
      }, DELAY);
    }, DELAY);  
  });
    vm.$el.querySelectorAll("button")[5].click();
    setTimeout(_ => {
      vm.$el.querySelectorAll("button")[6].click();
      setTimeout(_ => {
      expect(vm.$el.querySelector(".verify-tip-inner").textContent).to.equal('输入不能为空');
      done();
     }, DELAY);
    }, DELAY);
});
});