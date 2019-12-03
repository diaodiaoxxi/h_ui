import { createTest, destroyVM,createVue} from './vm';
import Button from '../../src/components/Button';

describe('ButtonGroup', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  // 检查原始组件选项
   it('shape', () => {
    vm = createTest(Button.Group, {
      shape: 'circle'
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.classList.contains('h-btn-group-circle')).to.be.true;
  });

     it('size', () => {
    vm = createTest(Button.Group, {
      size: 'large'
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.classList.contains('h-btn-group-large')).to.be.true;
  });
 
})
