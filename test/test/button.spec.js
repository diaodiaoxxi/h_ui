import { createTest, destroyVM,createVue,triggerEvent,triggerKeyUp } from './vm';
import Button from '../../src/components/Button';

describe('Button', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  // 检查原始组件选项
  it('create', () => {
    vm = createTest(Button, {
      type: 'primary'
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.classList.contains('h-btn-primary')).to.be.true;
  });
  it('shape', () => {
    vm = createTest(Button, {
      shape: 'circle'
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.classList.contains('h-btn-circle')).to.be.true;
  });
  it('nativeType', () => {
    vm = createTest(Button, {
      nativeType: 'submit'
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.getAttribute('type')).to.be.equal('submit');
  });
  it('disabled', () => {
    vm = createTest(Button, {
      disabled: true
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.classList.contains('h-btn-disable')).to.be.true;
  });
  it('size', () => {
    vm = createTest(Button, {
      size: 'large'
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.classList.contains('h-btn-large')).to.be.true;
  });
  it('textColor', () => {
    vm = createTest(Button, {
      textColor: 'red'
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.style.color).to.be.equal('red');
  });
   it('loading', () => {
    vm = createTest(Button, {
      loading: true
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.classList.contains('h-btn-loading')).to.be.true;
    expect(buttonElm.querySelector('.icon-load-c')).to.be.ok;
  });
  it('long', () => {
    vm = createTest(Button, {
      long: true
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.classList.contains('h-btn-long')).to.be.true;
  });
  it('icon', () => {
    vm = createTest(Button, {
      icon: 'mail'
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.querySelector('.h-icon-mail')).to.be.ok;
  });
    it('btnWith', () => {
    vm = createTest(Button, {
      btnWith: 200
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.style.width).to.be.equal('200px');
  });
    it('btnHeight', () => {
    vm = createTest(Button, {
      btnHeight: 200
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.style.height).to.be.equal('200px');
  });
    it('btnBgColor', () => {
    vm = createTest(Button, {
      btnBgColor: 'red'
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.style.backgroundColor).to.be.equal('red');
  });
      })

    // 检查原始组件选项
  describe('Button click', () => {  
    let vm;
    afterEach(() => {
      destroyVM(vm);
    });

  it('click', done => {
    let result;
    vm = createVue({
      template: `
        <h-button @click="handleClick"></h-button>
      `,
      methods: {
        handleClick(evt) {
          result = evt;
        }
      }
    }, true);
    vm.$el.click();
    setTimeout(_ => {
      expect(result).to.exist;
      done();
    }, 20);
  });

    it('click inside', done => {
    let result1;
    vm = createVue({
      template: `
        <h-button @click="handleClick"><span class="inner-slot">点击</span></h-button>
      `,
      methods: {
        handleClick(evt) {
          result1 = evt;
        }
      }
    }, true);
    vm.$el.querySelector('.inner-slot').click();

    setTimeout(_ => {
      expect(result1).to.exist;
      done();
    }, 20);
  });
  
  it('keyupclick', done => {
    let result3=0;
    vm = createVue({
      template: `
        <div>
        <h-button @keyup="keyup1" @click="handleClick" @on-click="handleClick" canFocus><span class="inner-slot"></span></h-button>
        </div>
      `,
      methods: {  
        keyup1(evt) {
          result3 = result3+1;
        },
        handleClick(evt) {
          result3 = result3+1;
        }
      }
    }, true);
    vm.$el.querySelector('.inner-slot').click();
    let triggerElm=vm.$el.querySelector('.inner-slot');
    triggerEvent(triggerElm, 'mouseenter');
      triggerKeyUp(vm.$el.querySelector('.inner-slot'), 13); 
    setTimeout(_ => {
      expect(result3).to.be.equal(2);
      done();
    }, 20);       
  });

  it('focusclick', done => {
    vm = createVue({
      template: `
        <div>
        <h-button @click="totest" canFocus ref="focusTest"><span class="inner-slot"></span></h-button>
        </div>
      `,
      methods: {       
        totest() {
           this.$refs.focusTest.focus();
           this.$refs.focusTest.blur();
       }
      }
    }, true);
    vm.$el.querySelector('.inner-slot').click();
    done();
  });

  it('focusclick return', done => {
    vm = createVue({
      template: `
        <div>
        <h-button @click="totest" ref="focusTest"><span class="inner-slot"></span></h-button>
        </div>
      `,
      methods: {       
        totest() {
           this.$refs.focusTest.focus();
           this.$refs.focusTest.blur();
       }
      }
    }, true);
    vm.$el.querySelector('.inner-slot').click();
    done();
  });
    })
