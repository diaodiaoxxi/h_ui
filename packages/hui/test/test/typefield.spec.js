import { createTest, destroyVM, createVue, triggerEvent, triggerKeyDown, waitForIt } from './vm';
import Select from '../../src/components/Typefield';

describe('Typefield', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });


  it('integerNum_value', done => {
    vm = createVue({
      template: `
      <div>
      <h-typefield v-model="value"  integerNum="2" type="money" placeholder="integerNum"></h-typefield>
      </div>
      `,
      data() {
        return {
          value: '1111'
        };
      }
    });
    setTimeout(() => {
      expect(vm.value).to.equal('11.00');
      vm.$el.value=-11;
      setTimeout(() => {
      expect(vm.value).to.equal('-11.00');
      });
      done();
    });
  });


  it('integerNum_0', done => {
    vm = createVue({
      template: `
      <div>
      <h-typefield v-model="value"  suffixNum="0" type="money" placeholder="integerNum" isround></h-typefield>
      </div>
      `,
      data() {
        return {
          value: '1111.9'
        };
      }
    });
    setTimeout(() => {
      expect(vm.value).to.equal('1112');
      done();
    });
  });

  it('integerNum_22', done => {
    vm = createVue({
      template: `
      <div>
      <h-typefield v-model="value" integerNum="22" bigTips  type="money" placeholder="integerNum" isround></h-typefield>
      </div>
      `,
      data() {
        return {
          value: '1234567891234567189.999'
        };
      }
    });
    setTimeout(() => {
      expect(vm.value).to.equal('1234567891234567190.00');
      done();
    });
  });
  
  it('suffixNum_value', done => {
    vm = createVue({
      template: `
      <div>
      <h-typefield v-model="value"  suffixNum="2" type="money" placeholder="integerNum"></h-typefield>
      </div>
      `,
      data() {
        return {
          value: '11.567'
        };
      }
    });
    setTimeout(() => {
      expect(vm.value).to.equal('11.56');
      done();
    });
  });

  it('suffixNum_value', done => {
    vm = createVue({
      template: `
      <div>
      <h-typefield v-model="value"  suffixNum="2" type="money" placeholder="integerNum" isround></h-typefield>
      </div>
      `,
      data() {
        return {
          value: '11.567'
        };
      }
    });
    setTimeout(() => {
      expect(vm.value).to.equal('11.57');
      done();
    });
  });

  it('divided', done => {
    vm = createVue({
      template: `
      <div>
      <h-typefield v-model="value" type="money" placeholder="integerNum" divided></h-typefield>
      </div>
      `,
      data() {
        return {
          value: '123456789123456'
        };
      }
    });
    setTimeout(() => {
      expect(vm.$el.getElementsByTagName("input")[0].value).to.equal('1,234,567,891,234.00');
      done();
    });
  });

  it('bigtip', done => {
    vm = createVue({
      template: `
      <div>
      <h-typefield v-model="value" type="money" placeholder="integerNum" bigTips></h-typefield>
      </div>
      `,
      data() {
        return {
          value: '123456789'
        };
      }
    });
    setTimeout(() => {
      vm.$el.getElementsByTagName("input")[0].click;
   //   vm.$el.querySelector("h-typefield-left").click;
      setTimeout(() => {
      expect(vm.$el.querySelector("h-typefield-tip")).to.equal('壹亿贰仟叁佰肆拾伍万陆仟柒佰捌拾玖元整');
      }, 200);
      done();
    });
  });

  it('notFillin', done => {
    vm = createVue({
      template: `
      <div>
      <h-typefield v-model="value" type="money" placeholder="integerNum" suffixNum="3" notFillin></h-typefield>
      </div>
      `,
      data() {
        return {
          value: '12.3'
        };
      }
    });
    setTimeout(() => {
      expect(vm.value).to.equal('12.3');
      done();
    });
  });

  it('setNull', done => {
    vm = createVue({
      template: `
      <div>
      <h-typefield v-model="value" type="money" placeholder="integerNum"  setNull></h-typefield>
      </div>
      `,
      data() {
        return {
          value: ''
        };
      }
    });
    setTimeout(() => {
      expect(vm.value).to.equal('0.00');
      done();
    });
  });

  it('cardNo&maxlength', done => {
    vm = createVue({
      template: `
      <div>
      <h-typefield v-model="value" type="cardNo" placeholder="integerNum" maxlength=12></h-typefield>
      </div>
      `,
      data() {
        return {
          value: '123456789'
        };
      }
    });
    setTimeout(() => {
      expect(vm.value).to.equal('1234  5678  9');
      let inputElm = vm.$el.getElementsByTagName("input")[0];
      expect(inputElm.getAttribute('maxlength')).to.equal('12');
      done();
    });
  });

  it('cardnoformat', done => {
    vm = createVue({
      template: `
      <div>
      <h-typefield v-model="value" type="cardNo" placeholder="integerNum" :cardFormat=false></h-typefield>
      </div>
      `,
      data() {
        return {
          value: '123456789'
        };
      }
    });
    setTimeout(() => {
      expect(vm.value).to.equal('123456789');
      done();
    });
  });

  it('event', done => {
    let result=0;
    vm = createVue({
      template: `
      <div>
      <h-typefield v-model="value" placeholder="焦点事件" @on-blur="bChange" @on-focus="fChange" @on-keyup="kChange" ref="focusTest">
      <div slot="prepend">前缀</div>
      <div slot="append">后缀</div>
      </h-typefield>
      <h-button @click="totest"><span class="inner-slot"></span>焦点事件</h-button>
      <h-button @click="tochange"><span class="inner"></span>change事件</h-button>
      </div>
      `,
      data() {
        return {
          value: '123456789'
        };
      },
      methods:{
          bChange(){
            result=result+1;
          },
          fChange(){
            result=result+2;
          },
          kChange(val){
            result=result+val;
          },
          totest() {
            this.$refs.focusTest.focus();
            this.$refs.focusTest.blur();
        },
         tochange() {
          this.value="111";
      }
      }
    });
    vm.$el.querySelector('.inner-slot').click();
    setTimeout(() => {
      expect(vm.$el.querySelector(".h-typefield-group-prepend")).to.exist;
      expect(vm.$el.querySelector(".h-typefield-group-append")).to.exist;
    //  vm.$el.getElementsByTagName("input")[0].click;
      vm.$el.querySelector('.inner').click();
      setTimeout(() => {
    //  console.log(result);
      });
      done();
    });
  });
});
