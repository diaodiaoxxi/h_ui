webpackJsonp([21],{724:function(n,t,o){o(962);var i=o(0)(o(801),o(864),null,null);n.exports=i.exports},801:function(n,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"Notices",data:function(){return{}},methods:{open:function(n){this.$hNotice.open({title:"这是通知标题",desc:n?"":"这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述",key:"key1",duration:5})},info:function(n){this.$hNotice.info({title:"这是通知标题",desc:n?"":"这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述"})},success:function(n){this.$hNotice.success({title:"这是通知标题",desc:n?"":"这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述"})},warning:function(n){this.$hNotice.warning({title:"这是通知标题",desc:n?"":"这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述"})},error:function(n){this.$hNotice.error({title:"这是通知标题",desc:n?"":"这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述"})},time:function(){this.$hNotice.open({title:"这是通知标题",desc:"这条通知不会自动关闭，需要点击关闭按钮才可以关闭。",duration:0})},close:function(){var n=this;this.$hNotice.close("key1"),this.$nextTick(function(){n.$hNotice.open({title:"这是通知标题",desc:"这条通知不会自动关闭，需要点击关闭按钮才可以关闭。",duration:5,name:"key1"})})},destroy:function(){this.$hNotice.destroy()}},mounted:function(){this.$hNotice.config({top:200,duration:3})}}},864:function(n,t,o){"use strict";n.exports={render:function(){var n=this,t=n.$createElement,o=n._self._c||t;return o("div",[o("h1",[n._v("Notice 通知提醒")]),n._v(" "),o("h1",[n._v("基础用法 ")]),n._v(" "),o("h-button",{attrs:{type:"primary"},on:{click:function(t){n.open(!1)}}},[n._v("打开提醒")]),n._v(" "),o("h-button",{on:{click:function(t){n.open(!0)}}},[n._v("打开提醒（仅标题）")]),n._v(" "),o("h1",[n._v("提醒类型")]),n._v(" "),o("h2",[n._v("带描述信息")]),n._v(" "),o("h-button",{attrs:{name:"key1"},on:{click:function(t){n.info(!1)}}},[n._v("消息")]),n._v(" "),o("h-button",{on:{click:function(t){n.success(!1)}}},[n._v("成功")]),n._v(" "),o("h-button",{on:{click:function(t){n.warning(!1)}}},[n._v("警告")]),n._v(" "),o("h-button",{on:{click:function(t){n.error(!1)}}},[n._v("错误")]),n._v(" "),o("h2",[n._v("仅标题")]),n._v(" "),o("h-button",{on:{click:function(t){n.info(!0)}}},[n._v("消息")]),n._v(" "),o("h-button",{on:{click:function(t){n.success(!0)}}},[n._v("成功")]),n._v(" "),o("h-button",{on:{click:function(t){n.warning(!0)}}},[n._v("警告")]),n._v(" "),o("h-button",{on:{click:function(t){n.error(!0)}}},[n._v("错误")]),n._v(" "),o("h-button",{on:{click:function(t){n.error(!0)}}},[n._v("错误")]),n._v(" "),o("h2",[n._v("自定义提示存在时间 duration为 0 则不自动关闭")]),n._v(" "),o("h-button",{attrs:{type:"primary"},on:{click:n.time}},[n._v("打开提醒")]),n._v(" "),o("h-button",{attrs:{type:"primary"},on:{click:n.close}},[n._v("关闭name为key1的notice")]),n._v(" "),o("h-button",{attrs:{type:"primary"},on:{click:n.destroy}},[n._v("全局销毁")])],1)},staticRenderFns:[]}},924:function(n,t,o){t=n.exports=o(39)(),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},962:function(n,t,o){var i=o(924);"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);o(49)("1d9281fc",i,!0)}});