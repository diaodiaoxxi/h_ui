import { createTest, destroyVM,createVue,triggerEvent } from './vm';
import Select from '../../src/components/Select';

describe('Select', () => {
  const getSelectVm = (configs = {}, options) => {
    ['multiple', 'clearable', 'filterable', 'allowCreate', 'remote', 'collapseTags', 'automaticDropdown'].forEach(config => {
      configs[config] = configs[config] || false;
    });
    configs.multipleLimit = configs.multipleLimit || 0;
    if (!options) {
      options = [{
        value: '选项1',
        label: '黄金糕',
        disabled: false
      }, {
        value: '选项2',
        label: '双皮奶',
        disabled: false
      }, {
        value: '选项3',
        label: '蚵仔煎',
        disabled: false
      }, {
        value: '选项4',
        label: '龙须面',
        disabled: false
      }, {
        value: '选项5',
        label: '北京烤鸭',
        disabled: false
      }];
    }
    const vm = createVue({
      template: `
        <div>
          <h-select
            ref="select"
            v-model="value"
            :multiple="multiple"
            :multiple-limit="multipleLimit"
            :popper-class="popperClass"
            :clearable="clearable"
            :filterable="filterable"
            :collapse-tags="collapseTags"
            :allow-create="allowCreate"
            :filterMethod="filterMethod"
            :remote="remote"
            :loading="loading"
            :remoteMethod="remoteMethod"
            :automatic-dropdown="automaticDropdown">
            <h-option
              v-for="item in options"
              :label="item.label"
              :key="item.value"
              :disabled="item.disabled"
              :value="item.value">
            </h-option>
          </h-select>
        </div>
      `,

      data() {
        return {
          options,
          multiple: configs.multiple,
          multipleLimit: configs.multipleLimit,
          clearable: configs.clearable,
          filterable: configs.filterable,
          collapseTags: configs.collapseTags,
          allowCreate: configs.allowCreate,
          popperClass: configs.popperClass,
          automaticDropdown: configs.automaticDropdown,
          loading: false,
          filterMethod: configs.filterMethod && configs.filterMethod(this),
          remote: configs.remote,
          remoteMethod: configs.remoteMethod && configs.remoteMethod(this),
          value: configs.multiple ? [] : ''
        };
      }
    }, true);
    return vm;
  };

  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Select, true);
    expect(vm.$el.className).to.equal('h-select h-select-single');
    expect(vm.$el.querySelector('.h-select-placeholder').textContent).to.equal('请选择');
    vm.toggleMenu();
    expect(vm.visible).to.true;
  });
  it('options rendered correctly', () => {
    vm = getSelectVm();
    const options = vm.$el.querySelectorAll('.h-select-item');
    const result = [].every.call(options, (option, index) => {
      var text = option.innerText;
      var label= vm.options[0].label;
      label.indexOf(text) != -1;
    return text;
    });
  });
  
  it('disabled option', done => {
    vm = getSelectVm();
    vm.options[1].disabled = true;
    setTimeout(() => {
      const options = vm.$el.querySelectorAll('.h-select-item');
      expect(options[1].classList.contains('h-select-item-disabled')).to.true;
      options[1].click();
      setTimeout(() => {
        expect(vm.value).to.equal('');
        done();
      }, 100);
    }, 100);
  });

  it('keyboard operations', done => {
    vm = getSelectVm();
    const select = vm.$children[0];
    let i = 8;
    while (i--) {
      select.navigateOptions('next');
    }
    select.navigateOptions('prev');
    setTimeout(() => {
    expect(select.tabIndex).to.equal(0);
    const options = vm.$el.querySelectorAll('.h-select-item');
    options[select.tabIndex].click();
      setTimeout(() => {
        expect(select.value).to.equal('选项1');
        done();
      }, 100);
    }, 100);
  });

  it('clearable getSelectVm', done => {
    vm = getSelectVm({ clearable: true });
    const select = vm.$children[0];
    vm.value = '选项1';
  const input=vm.$el.querySelector('.h-select-selected-value')
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

  it('multiple select', done => {
    vm = getSelectVm({ multiple: true });
    const options = vm.$el.querySelectorAll('.h-select-item');
    vm.value = ['选项1'];
    setTimeout(() => {
      options[1].click();
      setTimeout(() => {
        options[3].click();
        setTimeout(() => {
          expect(vm.value.indexOf('选项2') > -1 && vm.value.indexOf('选项4') > -1).to.true;
          const tagCloseIcons = vm.$el.querySelectorAll('.h-icon-close');
          tagCloseIcons[0].click();
          setTimeout(() => {
            expect(vm.value.indexOf('选项1')).to.equal(-1);
            done();
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  });
});


