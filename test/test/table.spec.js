import { createTest, destroyVM, createVue, triggerEvent, triggerKeyDown } from './vm';
import Select from '../../src/components/Table';
const DELAY = 10;
const testDataArr = [];
const toArray = function (obj) {
  return [].slice.call(obj);
};

const getTestData = function () {
  return [
    { id: 1, name: 'Toy Story', release: '1995-11-22', director: 'John Lasseter', runtime: 80 },
    { id: 2, name: 'A Bug\'s Life', release: '1998-11-25', director: 'John Lasseter', runtime: 95 },
    { id: 3, name: 'Toy Story 2', release: '1999-11-24', director: 'John Lasseter', runtime: 92 },
    { id: 4, name: 'Monsters, Inc.', release: '2001-11-2', director: 'Peter Docter', runtime: 92 },
    { id: 5, name: 'Finding Nemo', release: '2003-5-30', director: 'Andrew Stanton', runtime: 100 }
  ];
};

getTestData().forEach(cur => {
  Object.keys(cur).forEach(prop => {
    testDataArr.push(cur[prop].toString());
  });
});

describe('rendering data is correct', () => {
  const vm = createVue({
    template: `
    <div>
    <h-table :data="testData" :columns="columns1"></h-table>
  </div>
    `,
    data() {
      return {
        columns1: [
          {
            title: 'id',
            key: 'id'
          },
          {
            title: '片名',
            key: 'name'
          },
          {
            title: '发行日期',
            key: 'release'
          },
          {
            title: '导演',
            key: 'director'
          },
          {
            title: '时长（分）',
            key: 'runtime'
          }
        ]
      }
    },
    created() {
      this.testData = getTestData();
    }
  });

  it('head', done => {
    setTimeout(_ => {
      const ths = toArray(vm.$el.querySelectorAll('thead th span'));
      expect(ths.map(node => node.textContent).filter(o => o))
        .to.eql([ 'id', '片名', '发行日期', '导演', '时长（分）']);
      done();
    }, DELAY);
  });

  it('row length', () => {
    expect(vm.$el.querySelectorAll('.h-table-tbody tr').length).to.eql(getTestData().length);
  });

  it('row data', () => {
    const cells = toArray(vm.$el.querySelectorAll('td .h-table-cell span'))
      .map(node => node.textContent);
    expect(cells).to.eql(testDataArr);
    destroyVM(vm);
  });
});

  describe('attributes', () => {
    const createTable = function(props, opts) {
      return createVue(Object.assign({
        template: `
          <h-table :data="testData" :columns="columns1" ${props}></h-table>
        `,
        data() {
          return {
            columns1: [
              {
                title: 'id',
                key: 'id'
              },
              {
                title: '片名',
                key: 'name'
              },
              {
                title: '发行日期',
                key: 'release'
              },
              {
                title: '导演',
                key: 'director'
              },
              {
                title: '时长（分）',
                key: 'runtime',
                isSum:true,
                fixed:"right"
              }
            ]
          }
        },
        created() {
          this.testData = getTestData();
        }
      }, opts));
    };

    it('width', done => {
      const vm = createTable('width="500"');
      setTimeout(_ => {
        expect(vm.$el.style.width).to.equal('500px');
        destroyVM(vm);
        done();
      }, DELAY);
    });

    it('width as string', done => {
      const vm = createTable(':width="500"');
      setTimeout(_ => {
        expect(vm.$el.style.width).to.equal('500px');
        destroyVM(vm);
        done();
      }, DELAY);
    });

    it('height', done => {
      const vm = createTable('height="200"');
      setTimeout(_ => {
        expect(vm.$el.querySelector(".h-table-body").style.height).to.equal('217px');
        destroyVM(vm);
        done();
      }, DELAY);
    });

    it('stripe', done => {
      const vm = createTable(':stripe="true"');
      setTimeout(_ => {
        expect(vm.$el.querySelector(".h-table").classList.contains('h-table-stripe')).to.true;
        destroyVM(vm);
        done();
      }, DELAY);
    });

    it('border', done => {
      const vm = createTable(':border="true"');
      setTimeout(_ => {
        expect(vm.$el.querySelector(".h-table").classList.contains('h-table-border')).to.true;
        destroyVM(vm);
        done();
      }, DELAY);
    });

    it('show-header', done => {
      const vm = createTable(':show-header="false"');
      setTimeout(_ => {
        expect(vm.$el.querySelectorAll('.h-table-header').length).to.equal(0);
        destroyVM(vm);
        done();
      }, DELAY);
  
  it('is summ', done => {
    const footer = vm.$el.querySelector('.h-table-summation');
    expect(footer).to.exist;
    const cells = toArray(footer.querySelectorAll('.h-table-cell'));
    expect(cells[cells.length - 1].innerText).to.equal('459');
    destroyVM(vm);
    done();
});

it('fixed right', done => {
  expect(vm.$el.querySelector(".h-table-fixed-right")).to.exist;
  destroyVM(vm);
  done();
});
    });

    it('tableRowClassName', done => {
      const vm = createTable(':row-class-name="rowClassName"', {
        methods: {
          rowClassName (row, index) {
            if (index === 1) {
              return 'demo-table-info-row';
            } else if (index === 3) {
              return 'demo-table-error-row';
            }
            return '';
          }
        }
      });

      setTimeout(_ => {
        expect(vm.$el.querySelectorAll('.demo-table-info-row')).to.length(2);
        expect(vm.$el.querySelectorAll('.demo-table-error-row')).to.length(2);
        destroyVM(vm);
        done();
      }, DELAY);
    }); 
  });

  describe('filter', () => {
    let vm;
    beforeEach(done => {
      vm = createVue({
        template: `
        <h-table border :columns="columns6" :data="data5"></h-table>
        `,
          data () {
              return {
                  columns6: [
                      {
                          title: '日期',
                          key: 'date'
                      },
                      {
                          title: '姓名',
                          key: 'name'
                      },
                      {
                          title: '年龄',
                          key: 'age',
                          filters: [
                              {
                                  label: '大于25岁',
                                  value: 1
                              },
                              {
                                  label: '小于25岁',
                                  value: 2
                              }
                          ],
                          filterMultiple: false,
                          filterMethod (value, row) {
                              if (value === 1) {
                                  return row.age > 25;
                              } else if (value === 2) {
                                  return row.age < 25;
                              }
                          }
                      },
                      {
                          title: '地址',
                          key: 'address',
                          filters: [
                              {
                                  label: '北京',
                                  value: '北京'
                              },
                              {
                                  label: '上海',
                                  value: '上海'
                              },
                              {
                                  label: '深圳',
                                  value: '深圳'
                              }
                          ],
                          filterMethod (value, row) {
                              return row.address.indexOf(value) > -1;
                          }
                      }
                  ],
                  data5: [
                      {
                          name: '王小明',
                          age: 18,
                          address: '北京市朝阳区芍药居',
                          date: '2016-10-03'
                      },
                      {
                          name: '张小刚',
                          age: 25,
                          address: '北京市海淀区西二旗',
                          date: '2016-10-01'
                      },
                      {
                          name: '李小红',
                          age: 30,
                          address: '上海市浦东新区世纪大道',
                          date: '2016-10-02'
                      },
                      {
                          name: '周小伟',
                          age: 26,
                          address: '深圳市南山区深南大道',
                          date: '2016-10-04'
                      }
                  ]
              }
          }
      }, true);

      setTimeout(done, DELAY);
    });

    afterEach(() => destroyVM(vm));

    it('render', () => {
      expect(vm.$el.querySelector('.h-table-filter')).to.exist;
    });

    it('click dropdown', done => {
      const btn = vm.$el.querySelector('.h-table-filter');
      triggerEvent(btn, 'click', true, false);
      setTimeout(_ => {
        const filter = document.body.querySelector('.h-table-filter');
        expect(filter).to.exist;
        done();
      }, 100);
    });

    it('click filter', done => {
      const btn = vm.$el.querySelector('.h-table-filter');

      triggerEvent(btn, 'click', true, false);
      setTimeout(_ => {
        const filter = document.body.querySelectorAll('.h-poptip')[1];
        // John Lasseter
        triggerEvent(filter.querySelector('.h-checkbox'), 'click', true, false);
        // confrim button
        setTimeout(_ => {
          triggerEvent(filter.querySelector('.h-btn-text'), 'click', true, false);
          setTimeout(_ => {
       //   expect(vm.filters['address']).to.be.eql(['北京']);
            expect(vm.$el.querySelectorAll('.h-table-body tbody tr')).to.length(2);
        //  document.body.removeChild(filter);
            done();
          }, DELAY);
        }, 100);
      }, 100);
    });

    it('click reset', done => {
      const btn = vm.$el.querySelector('.h-table-filter');
      triggerEvent(btn, 'click', true, false);
      setTimeout(_ => {
        const filter = document.body.querySelectorAll('.h-poptip')[0];
        setTimeout(_ => {
          triggerEvent(filter.querySelectorAll('.h-table-filter-select-item')[2], 'click', true, false);
          setTimeout(_ => {
            expect(vm.$el.querySelectorAll('.h-table-body tbody tr')).to.length(1);
            // reset button
            triggerEvent(filter.querySelectorAll('.h-table-filter-select-item')[0], 'click', true, false);
            setTimeout(_ => {
            expect(vm.$el.querySelectorAll('.h-table-body tbody tr')).to.length(4); }, 100);
            done();
          }, DELAY);
        }, 100);
      }, 100);
    });
  });

  describe('events', () => {
    const createTable = function(prop = '', opts) {
      return createVue({
        template: `
          <h-table :data="testData" @${prop}="handleEvent" :columns="columns1" highlight-row :height="200">
          </h-table>
        `,
        data() {
          return {
            result: '', 
            testData: this.testData,
            columns1: [
              {
                type: 'expand',
                width: 50,
                render: (h, params) => {               
                }
            },
              {
                type: 'selection',
                width: 60,
                align: 'center'
            },
              {
                title: 'id',
                key: 'id'
              },
              {
                title: '片名',
                key: 'name'
              },
              {
                title: '发行日期',
                key: 'release'
              },
              {
                title: '导演',
                key: 'director'
              },
              {
                title: '时长（分）',
                key: 'runtime'
              }
            ]
          }
        },
        methods: {
          handleEvent(...args) {
            this.result = args;
          }
        },

        created() {
          this.testData = getTestData();
        }
      }, true);
    };

    it('select', done => {
      const vm = createTable('on-select');
      setTimeout(_ => {
        vm.$el.querySelectorAll('.h-checkbox-wrapper')[1].click();
        expect(vm.result).to.length(2);
        expect(vm.result[1]).to.have.property('name').to.equal(getTestData()[0].name);
        destroyVM(vm);
        done();
      }, DELAY);
    });

    it('select-all', done => {
      const vm = createTable('on-select-all');
      setTimeout(_ => {
        vm.$el.querySelector('.h-checkbox-wrapper').click();
        setTimeout(_ => {
          expect(vm.result).to.length(1);
          expect(vm.result[0]).to.length(getTestData().length);
          destroyVM(vm);
          done();
        }, DELAY);
      }, DELAY);
    });

    it('selection-change', done => {
      const vm = createTable('on-selection-change');
      setTimeout(_ => {
        vm.$el.querySelectorAll('.h-checkbox-wrapper')[1].click();
        expect(vm.result).to.length(2);
        destroyVM(vm);
        done();
      }, DELAY);
    });

    it('on-select-cancel', done => {
      const vm = createTable('on-select-cancel');
      setTimeout(_ => {
        vm.$el.querySelectorAll('.h-checkbox-wrapper')[1].click();
        vm.$el.querySelectorAll('.h-checkbox-wrapper')[1].click();
        expect(vm.result).to.length(2);
        destroyVM(vm);
        done();
      }, DELAY);
    });

    it('row-click', done => {
      const vm = createTable('on-row-click');

      setTimeout(_ => {
        const cell = vm.$el.querySelectorAll('.h-table-tbody .h-table-cell')[1]; // first row

        triggerEvent(cell.parentNode.parentNode, 'click');
        expect(vm.result).to.length(1); // row, event, column
        expect(vm.result[0][0]).to.have.property('name').to.equal(getTestData()[0].name);
        destroyVM(vm);
        done();
      }, DELAY);
    });

    it('row-dblclick', done => {
      const vm = createTable('on-row-dblclick');

      setTimeout(_ => {
        const cell = vm.$el.querySelectorAll('.h-table-tbody .h-table-cell')[1]; // first row

        triggerEvent(cell.parentNode.parentNode, 'dblclick');
        expect(vm.result).to.length(1); // row, event, column
        expect(vm.result[0]).to.have.property('name').to.equal(getTestData()[0].name);
        destroyVM(vm);
        done();
      }, DELAY);
    });

    it('on-current-change', done => {
      const vm = createTable('on-current-change');

      setTimeout(_ => {
        const cell = vm.$el.querySelectorAll('.h-table-tbody .h-table-cell')[1]; // first row

        triggerEvent(cell.parentNode.parentNode, 'click');
        expect(vm.result).to.length(3); // currentRow, oldCurrentRow
        expect(vm.result[0]).to.have.property('name').to.equal(getTestData()[0].name);
        expect(vm.result[1]).to.equal(null);

        destroyVM(vm);
        done();
      }, DELAY);
    });

    it('on-current-change-cancle', done => {
      const vm = createTable('on-current-change-cancle');
      setTimeout(_ => {
        const cell = vm.$el.querySelectorAll('.h-table-tbody .h-table-cell')[1]; 
        triggerEvent(cell.parentNode.parentNode, 'click');
        triggerEvent(cell.parentNode.parentNode, 'click');
        expect(vm.result).to.length(3); // currentRow, oldCurrentRow
        expect(vm.result[0]).to.have.property('name').to.equal(getTestData()[0].name);
        destroyVM(vm);
        done();
      }, DELAY);
    });

    it('on-expand', done => {
      var expandme;
      const vm = createTable('on-expand');
      setTimeout(_ => {
        vm.$el.querySelectorAll('.h-table-tbody tr i')[0].click();
        expect(vm.result).to.length(2); 
        destroyVM(vm);
        done();
    }, DELAY);
    });

    it('on-scroll', done => {
      var expandme;
      const vm = createTable('on-scroll');
      setTimeout(_ => {
        vm.$el.querySelector(".h-table-body").scrollTop=10;
        setTimeout(_ => {
        //需要改成2
        expect(vm.result).to.length(0); 
        destroyVM(vm);
        done();
      }, 1000);
    }, DELAY);
    });
  });

  describe('sortable', () => {
    let vm;
    let sort;
    beforeEach(done => {
      vm = createVue({
        template: `
        <h-table border :columns="columns5" :data="data5" canMove @on-sort-change="handleEvent" :summationData="summationData1" :multiLevel="multiLevel1"></h-table>
        `,
        data () {
          return {
            multiLevel1:[
              {
              title:'省',
              cols:'1',
              fixed:"left",
              align:'center',
              classname:'multi1'
              },
              {
              title:'市',
              cols:'1',
              align:'center',
              classname:'multi2'
              },
              {
              title:'区',
              cols:'2',
              align:'center',
              classname:'multi2'
              }
              ],
            summationData1:[
              {
                      name: '名字',
                      age: 99,
                      address: '北京市朝阳区芍药居'
                  }
              ],
              result1: '', 
              columns5: [
                  {
                      title: '日期',
                      key: 'date'
                  },
                  {
                      title: '姓名',
                      key: 'name',
                      fixed:"left",
                      sortable: true,
                      sortMethod:(a, b,c)=> {
                        sort=c;
                        if (a.runtime < b.runtime) {
                          return 1;
                        }
                        if (a.runtime > b.runtime) {
                          return -1;
                        }
                        return 0;
                      }
                  }, {
                      title: '地址',
                      key: 'address'
                  },
                  {
                      title: '年龄',
                      key: 'age',
                      sortable: true
                  }
                 
              ],
              data5: [
                  {
                      name: '王小明',
                      age: 18,
                      address: '北京市朝阳区芍药居',
                      date: '2016-10-03'
                  },
                  {
                      name: '张小刚',
                      age: 25,
                      address: '北京市海淀区西二旗',
                      date: '2016-10-01'
                  },
                  {
                      name: '李小红',
                      age: 30,
                      address: '上海市浦东新区世纪大道',
                      date: '2016-10-02'
                  },
                  {
                      name: '周小伟',
                      age: 26,
                      address: '深圳市南山区深南大道',
                      date: '2016-10-04'
                  }
              ]
          }
      },
      methods: {
        handleEvent(...args) {
          this.result1 = args;
        }
      }
      }, true);

      setTimeout(done, DELAY);
    });

    afterEach(() => destroyVM(vm));

    it('render', () => {
      expect(vm.$el.querySelectorAll('.h-table-sort')).to.length(4);
    });

    it('sortable orders', done => {
        const elm = vm.$el.querySelectorAll('.h-icon-android-arrow-dropdo');
        elm[1].click();
        setTimeout(_ => {
          const lastCells = vm.$el.querySelectorAll('.h-table-body tbody tr td:last-child span');
          expect(toArray(lastCells).map(node => node.textContent)).to.eql(['30', '26', '25', '18']);
          destroyVM(vm);
          done();
        }, DELAY);
    });

    it('sortable method', done => {
      const elm = vm.$el.querySelectorAll('.h-icon-android-arrow-dropdo');
      elm[0].click();
      setTimeout(_ => {
        expect(sort).to.eql("desc");
        destroyVM(vm);
        done();
      }, DELAY);
  });

  it('on-sort-change', done => {
    const elm = vm.$el.querySelectorAll('.h-icon-android-arrow-dropdo');
    elm[0].click();
    setTimeout(_ => {
      expect(vm.result1).to.length(1); 
      expect(vm.result1[0]).to.have.property('key').to.equal("name");
      expect(vm.result1[0]).to.have.property('order').to.equal("desc");
      destroyVM(vm);
      done();
    }, DELAY);
  });

  it('canMove', done => {
    const column=vm.$el.querySelector('.h-table-head-column-left')
    triggerEvent(column, 'mouseenter');
    triggerEvent(column, 'mousedown');
    const columnto=vm.$el.querySelectorAll('.h-table-head-column-left')
    //需要添加移动坐标及断言
    triggerEvent(column, 'mousemove');
    triggerEvent(columnto[3], 'mouseup');
    destroyVM(vm);
    done();
  });

  it('summation', done => {
      const footer = vm.$el.querySelector('.h-table-summation');
      expect(footer).to.exist;
      const cells = toArray(footer.querySelectorAll('.h-table-cell'));
      expect(cells[cells.length - 1].innerText).to.equal('99');
      destroyVM(vm);
      done();
  });

  it('multi level column', done => {
      const trs = vm.$el.querySelectorAll('.h-table-header tr');
      expect(trs.length).equal(2);
      const firstRowHeader = trs[0].querySelectorAll('th .h-table-cell').length;
      const secondRowHeader = trs[1].querySelectorAll('th .h-table-cell').length;
      expect(firstRowHeader).to.equal(3);
      expect(secondRowHeader).to.equal(4);

      expect(trs[0].querySelector('th:first-child').getAttribute('rowspan')).to.equal('1');
      expect(trs[0].querySelector('th:nth-child(3)').getAttribute('colspan')).to.equal('2');
      destroyVM(vm);
      done();
  });
  });  

  describe('methods', () => {
    const createTable = function(prop = '', opts) {
      return createVue({
        template: `
        <div>
          <h-table ref="table" :data="testData" :columns="columns1" @${prop}="handleEvent"></h-table>
          <h-button @click="exportData(1)"><span class="inner-slot1"></span>导出原始数据</h-button>
          <h-button @click="exportData(2)"><span class="inner-slot2"></span>导出排序和过滤后的数据</h-button>
          <h-button @click="exportData(3)"><span class="inner-slot3"></span>导出自定义数据</h-button>
          </div>
        `,

        methods: {
          totest(){
            this.$refs.table.selectAll(true);
           },
          handleEvent(selection) {
            this.fireCount++;
            this.selection = selection;
          },
            exportData (type) {
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: '原始数据'
                    });
                } else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: '排序和过滤后的数据',
                        original: false
                    });
                } else if (type === 3) {
                    this.$refs.table.exportCsv({
                        filename: '自定义数据',
                        columns: this.columns8.filter((col, index) => index < 4),
                        data: this.data7.filter((data, index) => index < 4)
                    });
                }      
        }
        },
        created() {
          this.testData = getTestData();
        },

        data() {
          return { selection: null, testData: this.testData, fireCount: 0 ,           
         columns1: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
          },
            {
              title: 'id',
              key: 'id'
            },
            {
              title: '片名',
              key: 'name',
              exportRender: (cellData) => {
                  return 'render之后的值<br>换行'
              }
            },
            {
              title: '发行日期',
              key: 'release'
            },
            {
              title: '导演',
              key: 'director'
            },
            {
              title: '时长（分）',
              key: 'runtime',
              sortable: true
            }
          ]};
        }
      }, true);
    };

    it('selectAll', done =>{
      const vm = createTable('on-selection-change');
     vm.$refs.table.selectAll(true);
      setTimeout(_ => {
        expect(vm.selection).to.length(5);
        expect(vm.fireCount).to.equal(1);
        vm.$refs.table.selectAll(false);
        setTimeout(_ => {
          expect(vm.selection).to.length(0);
          expect(vm.fireCount).to.equal(2);       
        destroyVM(vm);
        }, 20);   
        done();
      }, 20);     
 
    });

    it('sort', done =>{
      const vm = createTable('on-selection-change');
      const elm = vm.$el.querySelector('.h-icon-android-arrow-dropdo');
      elm.click();
      setTimeout(_ => {
        const lastCells = vm.$el.querySelectorAll('.h-table-body tbody tr td:last-child span');
        expect(toArray(lastCells).map(node => node.textContent)).to.eql(['100', '95', '92', '92','80']);
        vm.$refs.table.handleSort('all','normal');
        setTimeout(_ => {
          const lastCells = vm.$el.querySelectorAll('.h-table-body tbody tr td:last-child span');
        expect(toArray(lastCells).map(node => node.textContent)).to.eql(['80', '95', '92', '92','100']);
        destroyVM(vm);
        done();
      }, 20);  
      }, 20);
    });

    it('exportCsv', done =>{
      const vm = createTable('on-selection-change');
      vm.$el.querySelector('.inner-slot1').click();
    //  vm.$el.querySelector('.inner-slot2').click();
   //   vm.$el.querySelector('.inner-slot3').click();
      destroyVM(vm);
      done();
    });
  });
