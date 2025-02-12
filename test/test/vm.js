import Vue from 'vue'
import HUI from '../../src/index.js'

Vue.use(HUI)

let id = 0
const pad = (nr) => nr < 10 ? '0' + nr : nr;
const createElm = function() {
  const elm = document.createElement('div')
  elm.id = 'app' + ++id
  document.body.appendChild(elm)

  return elm
}

/**
 * 销毁 vm
 */
exports.destroyVM = function(vm) {
  vm.$el &&
  vm.$el.parentNode &&
  vm.$el.parentNode.removeChild(vm.$el)
}

/**
 * 创建一个 Vue 的实例对象
 * @param  {Object|String}  Compo   组件配置，可直接传 template
 * @param  {Boolean=false} mounted 是否添加到 DOM 上
 * @return {Object} vm
 */
exports.createVue = function(Compo, mounted = false) {
  if (Object.prototype.toString.call(Compo) === '[object String]') {
    Compo = { template: Compo };
  }
  return new Vue(Compo).$mount(mounted === false ? null : createElm());
};
/**
 * 创建一个测试组件实例
 * http://vuejs.org/v2/guide/unit-testing.html
 * Component
 * props
 * mounted
 */
exports.createTest = function(Compo, propsData = {}, mounted = false) {
  if (propsData === true || propsData === false) {
    mounted = propsData;
    propsData = {};
  }
  const elm = createElm();
  const Ctor = Vue.extend(Compo);
  return new Ctor({ propsData }).$mount(mounted === false ? null : elm);
};

/**
 * 触发一个事件
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {Element} elm
 * @param  {String} name
 * @param  {*} opts
 */
exports.triggerEvent = function(elm, name, ...opts) {
  let eventName;

  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents';
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent';
  } else {
    eventName = 'HTMLEvents';
  }
  const evt = document.createEvent(eventName);

  evt.initEvent(name, ...opts);
  elm.dispatchEvent
    ? elm.dispatchEvent(evt)
    : elm.fireEvent('on' + name, evt);

  return elm;
};

/**
 * 触发 “mouseup” 和 “mousedown” 事件
 * @param {Element} elm
 * @param {*} opts
 */
exports.triggerClick = function(elm, ...opts) {
  exports.triggerEvent(elm, 'mousedown', ...opts);
  exports.triggerEvent(elm, 'mouseup', ...opts);
  exports.triggerEvent(elm, 'mousemove', ...opts);
  return elm;
};

/**
 * 触发 keydown 事件
 * @param {Element} elm
 * @param {keyCode} int
 */
exports.triggerKeyDown = function(el, keyCode) {
  const evt = document.createEvent('Events');
  evt.initEvent('keydown', true, true);
  evt.keyCode = keyCode;
  el.dispatchEvent(evt);
};

/**
 * 触发 keyup 事件
 * @param {Element} elm
 * @param {keyCode} int
 */
exports.triggerKeyUp = function(el, keyCode) {
  const evt = document.createEvent('Events');
  evt.initEvent('keyup', true, true);
  evt.keyCode = keyCode;
  el.dispatchEvent(evt);
};

/**
* Wait for components inner async process, when this.$nextTick is not enough
* @param {Function} the condition to verify before calling the callback
* @param {Function} the callback to call when condition is true
*/
exports.waitForIt = function waitForIt(condition, callback) {
  if (condition()) callback();
  else setTimeout(() => waitForIt(condition, callback), 50);
};

/**
 * Transform Date string (yyyy-mm-dd hh:mm:ss) to Date object
 * @param {String}
 */
exports.stringToDate = function(str) {
  const parts = str.split(/[^\d]/).filter(Boolean);
  parts[1] = parts[1] - 1;
  return new Date(...parts);
};

/**
 * Transform Date to yyyy-mm-dd string
 * @param {Date}
 */
exports.dateToString = function(d) {
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(pad).join('-');
};

/**
 * Transform Date to HH:MM:SS string
 * @param {Date}
 */
exports.dateToTimeString = function(d){
  const date = new Date(d);
  return [date.getHours(), date.getMinutes(), date.getSeconds()].map(pad).join(':');

};

/**
* Call a components .$nextTick in a promissified way
* @param {Vue Component} the component to work with
*/
exports.promissedTick = component => {
  return new Promise((resolve, reject) => {
    component.$nextTick(resolve);
  });
};
