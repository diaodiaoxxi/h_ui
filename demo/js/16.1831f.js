webpackJsonp([16],{731:function(e,l,t){t(961);var a=t(0)(t(808),t(862),null,null);e.exports=a.exports},808:function(e,l,t){"use strict";Object.defineProperty(l,"__esModule",{value:!0});for(var a=[{value:"1",label:"1"},{value:"2",label:"2"},{value:"3",label:"3"},{value:"4",label:"4"},{value:"5",label:"5"},{value:"6",label:"6"},{value:"7",label:"7"},{value:"8",label:"8"},{value:"9",label:"9"},{value:"10",label:"10"},{value:"11",label:"11"},{value:"12",label:"12"},{value:"13",label:"13"},{value:"14",label:"14"},{value:"15",label:"15"},{value:"16",label:"16"},{value:"17",label:"17"},{value:"18",label:"18"},{value:"19",label:"19"}],n=[],o=0;o<1e3;o++){var i={};i.value=o,i.label="lable"+o,n.push(i)}l.default={data:function(){return{canPage:!0,isComputed:!1,cityList:[],model34:"",model44:[1,2],mode224:"",model1:"",model2:"",model3:"",model4:"",model5:"beijing",model6:"",model7:"",model8:"",model9:"",model10:"",model11:"",model13:"hangzhou",loading1:!1,options1:[{value:"hangzhou",label:"杭州市"},{value:"nanjing",label:"南京市"},{value:"chongqing",label:"重庆市"}],mu:!0,mu1:!0,d:[],uList:[],list:["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New hampshire","New jersey","New mexico","New york","North carolina","North dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode island","South carolina","South dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West virginia","Wisconsin","Wyoming"],cityList1:[{value:"beijing",label:"北京市"},{value:"shanghai",label:"上海市"},{value:"shenzhen",label:"深圳市"}],cityList2:[{value:"hangzhou",label:"杭州市"},{value:"nanjing",label:"南京市"},{value:"chongqing",label:"重庆市"}],cityList224:"",cy:{flag:!0,value1:"",value2:"",options1:[{value:"1",label:'&nbsp;<a herf="www.google.com"></a><script><\/script>'},{value:"2",label:"从前有座山山上有座庙庙里有个老和尚和一个小和尚"},{value:"3",label:"水缸"},{value:"4",label:"扁担儿"}]},bigData:n}},methods:{setNull:function(){this.model34="0"},cy_change_test:function(e){console.log(e)},iconClick:function(){this.$refs.iconclick.handleIconClose()},testClick:function(e){e?this.$refs.test.focus():this.$refs.test.blur()},fuzhi:function(){this.cityList=a.slice(0,2)},qk:function(){this.cityList=[]},scroll:function(e){var l=this,t=this;if(e<=1&&t.canPage){t.canPage=!1;var n=t.cityList.length;setTimeout(function(){var e=a.slice(n,n+10);e.length>0?(t.cityList=t.cityList.concat(e),t.canPage=!0):l.isComputed=!0},200)}},blurH:function(){console.log("失去焦点了")},change:function(e){console.log(e)},clear:function(){this.d=[]},remoteMethod1:function(e){var l=this;""!==e?(this.loading1=!0,setTimeout(function(){l.loading1=!1,l.options1=[];var t=l.list.map(function(e){return{value:e,label:e}});l.options1=t.filter(function(l){return l.label.toLowerCase().indexOf(e.toLowerCase())>-1})},200)):this.options1=this.list.map(function(e){return{value:e,label:e}})}},mounted:function(){var e=this;this.cityList=[];setTimeout(function(){e.cityList=a.slice(0,10)},10);this.uList=[{id:"1",name:"中国"},{id:"2",name:"美国"},{id:"3",name:"韩国1"},{id:"4",name:"韩国2"},{id:"5",name:"韩国3"},{id:"6",name:"韩国4"},{id:"7",name:"韩国5"},{id:"8",name:"韩国6"}]}}},862:function(e,l,t){"use strict";e.exports={render:function(){var e=this,l=e.$createElement,t=e._self._c||l;return t("div",[t("div",[t("h1",[e._v("Select组件")]),e._v(" "),t("p",[e._v("选择器支持单选、多选、搜索，以及键盘快捷操作。")]),e._v(" "),t("h1",[e._v("基础用法")]),e._v(" "),t("p",[e._v("使用v-model双向绑定数据,默认为单选")]),e._v(" "),t("p",[e._v("单选时，value只接受字符串和数字类型，多选时，value只接受数组类型")]),e._v(" "),t("Button",{on:{"on-click":function(l){e.testClick(!0)}}},[e._v("获取焦点")]),e._v(" "),t("Button",{on:{"on-click":function(l){e.testClick(!1)}}},[e._v("失去焦点")]),e._v(" "),t("Button",{on:{"on-click":e.setNull}},[e._v("赋不存在值")]),e._v(e._s(e.model34)+"\n    "),t("h-select",{staticStyle:{width:"80px"},attrs:{zeroToNull:"",algin:"right",setDefSelect:"",widthAdaption:""},on:{"on-change":e.change,"on-scroll":e.scroll},model:{value:e.model34,callback:function(l){e.model34=l},expression:"model34"}},[t("h-option",{attrs:{value:"index"}},[t("a",{attrs:{href:"http://www.google.com/"}},[e._v("link1214121111111111111111111111")])]),e._v(" "),e._l(e.cityList,function(l,a){return t("h-option",{key:a,attrs:{value:l.value}},[e._v(e._s(l.label))])}),e._v(" "),t("Button",{attrs:{slot:"footer"},slot:"footer"},[e._v("124")])],2),e._v(" "),t("h-button",{on:{click:e.fuzhi}},[e._v("赋值")]),e._v(" "),t("h-button",{on:{click:e.qk}},[e._v("清空")]),e._v(" "),e._v("\n    "+e._s(e.model44)+"\n     "),t("h-select",{ref:"iconclick",staticStyle:{width:"320px"},attrs:{isBackClear:"",multiple:"",isCheckall:"",isComputed:e.isComputed,noMoreText:"哈哈哈哈",specialIndex:!0,showTitle:"",multClearable:"",algin:"center"},on:{"on-change":e.change,"on-scroll":e.scroll},model:{value:e.model44,callback:function(l){e.model44=l},expression:"model44"}},[t("h-option",{key:"-1",attrs:{value:-1}},[e._v("-1 所有link121412111111111111111111")]),e._v(" "),e._l(e.cityList,function(l){return t("h-option",{key:l.value,attrs:{multiple:"",value:Number(l.value),disabled:2==l.value}},[e._v(e._s(l.label))])})],2),e._v("\n    "+e._s(e.model44)+"\n    "),t("h-button",{on:{click:e.iconClick}},[e._v("清空icon")]),e._v(" "),t("br"),e._v(" "),t("div",[t("h-select",{attrs:{"label-in-value":"",width:"200",setDefSelect:!0,showTitle:""},on:{"on-change":e.change},model:{value:e.model1,callback:function(l){e.model1=l},expression:"model1"}},e._l(e.uList,function(l,a){return t("h-option",{key:l.id,attrs:{value:l.id}},[e._v(e._s(l.name))])}))],1),e._v("\n    "+e._s(e.model1)+"\n    "),t("h1",[e._v("\n      设置select尺寸\n    ")]),e._v(" "),t("p",[e._v("设置size属性为large或small，将输入框设置为大和小尺寸，不设置为默认中尺寸")]),e._v(" "),t("div",[t("span",[e._v("小:")]),e._v(" "),t("h-select",{attrs:{size:"small",width:"100"},model:{value:e.model2,callback:function(l){e.model2=l},expression:"model2"}},e._l(e.uList,function(l,a){return t("h-option",{key:l.id,attrs:{value:l.id}},[e._v(e._s(l.name))])})),e._v(" "),t("span",[e._v("正常:")]),e._v(" "),t("h-select",{attrs:{width:"100"},model:{value:e.model3,callback:function(l){e.model3=l},expression:"model3"}},e._l(e.uList,function(l,a){return t("h-option",{key:l.id,attrs:{value:l.id}},[e._v(e._s(l.name))])})),e._v(" "),t("span",[e._v("大:")]),e._v(" "),t("h-select",{attrs:{size:"large",width:"100"},model:{value:e.model4,callback:function(l){e.model4=l},expression:"model4"}},e._l(e.uList,function(l,a){return t("h-option",{key:l.id,attrs:{value:l.id}},[e._v(e._s(l.name))])}))],1),e._v(" "),t("h1",[e._v("\n      disabled:禁用(可直接配置disabled，或配置disabled属性为true)\n    ")]),e._v(" "),t("div",[t("span",[e._v("select禁用：")]),e._v(" "),t("h-select",{attrs:{width:"200",disabled:""},model:{value:e.model5,callback:function(l){e.model5=l},expression:"model5"}},e._l(e.uList,function(l,a){return t("h-option",{key:l.id,attrs:{value:l.id}},[e._v(e._s(l.name))])})),e._v(" "),t("h-select",{attrs:{width:"200",readonly:""},model:{value:e.model5,callback:function(l){e.model5=l},expression:"model5"}},e._l(e.uList,function(l,a){return t("h-option",{key:l.id,attrs:{value:l.id}},[e._v(e._s(l.name))])})),e._v(" "),t("h-select",{attrs:{width:"200",editable:!1},model:{value:e.model5,callback:function(l){e.model5=l},expression:"model5"}},e._l(e.uList,function(l,a){return t("h-option",{key:l.id,attrs:{value:l.id}},[e._v(e._s(l.name))])})),e._v(" "),t("span",[e._v("option禁用：")]),e._v(" "),t("h-select",{attrs:{width:"200"},model:{value:e.model5,callback:function(l){e.model5=l},expression:"model5"}},[t("h-option",{attrs:{value:"beijing"}},[e._v("北京市")]),e._v(" "),t("h-option",{attrs:{value:"shanghai",disabled:""}},[e._v("上海市")]),e._v(" "),t("h-option",{attrs:{value:"shenzhen"}},[e._v("深圳市")])],1),e._v(" "),t("span",[e._v("正常;")]),e._v(" "),t("h-select",{attrs:{width:"200"},model:{value:e.model6,callback:function(l){e.model6=l},expression:"model6"}},e._l(e.uList,function(l,a){return t("h-option",{key:l.id,attrs:{value:l.id}},[e._v(e._s(l.name))])}))],1),e._v(" "),t("h1",[e._v("\n      clearable:选择后可清空输入框选项(可直接配置clearable，或配置clearable属性为true)注意：仅适用于单选模式\n    ")]),e._v(" "),t("div",[t("h1",[e._v("黄沙")]),e._v(" "),t("span",[e._v("可清空")]),e._v(" "),t("h-select",{attrs:{width:"200",clearable:""},model:{value:e.model6,callback:function(l){e.model6=l},expression:"model6"}},e._l(e.uList,function(l,a){return t("h-option",{key:l.id,attrs:{value:l.id}},[e._v(e._s(l.name))])}))],1),e._v(" "),t("h1",[e._v("\n      option-group:选项分组\n    ")]),e._v(" "),t("div",[t("span",[e._v("分组:")]),e._v(" "),t("h-select",{attrs:{width:"200",multiple:"",isString:!0,isCheckall:""},model:{value:e.model7,callback:function(l){e.model7=l},expression:"model7"}},[t("h-option-group",{attrs:{label:"热门城市"}},e._l(e.cityList1,function(l,a){return t("h-option",{key:l.value,attrs:{value:l.value}},[e._v(e._s(l.label))])})),e._v(" "),t("h-option-group",{attrs:{label:"其他城市"}},e._l(e.cityList2,function(l,a){return t("h-option",{key:l.value,attrs:{value:l.value}},[e._v(e._s(l.label))])}))],1),e._v("\n      "+e._s(e.model7)+"\n    ")],1),e._v(" "),t("h1",[e._v("\n      自定义select下拉选项格式(一般会在option中国绑定label显示)\n    ")]),e._v(" "),t("div",[t("span",[e._v("自定义:")]),e._v(" "),t("h-select",{attrs:{width:"200"},model:{value:e.model8,callback:function(l){e.model8=l},expression:"model8"}},e._l(e.uList,function(l,a){return t("h-option",{key:l.id,attrs:{value:l.id,label:l.name}},[t("span",[e._v(e._s(l.name))]),e._v(" "),t("span",{staticStyle:{float:"right",color:"#ccc",position:"absolute",right:"8px"}},[e._v(e._s(l.id))])])}))],1),e._v(" "),t("h1",[e._v("\n      multiple:多选（可直接配置 multiple，或配置 multiple属性为true），多选模式下。model接收数组类型的数据，返回数组类型的数据\n    ")]),e._v(" "),t("div",[t("span",[e._v("多选123:")]),e._v(" "),t("h-select",{attrs:{width:"260",multiple:"",isString:!0,showTitle:""},model:{value:e.model9,callback:function(l){e.model9=l},expression:"model9"}},e._l(e.uList,function(l,a){return t("h-option",{key:l.id,attrs:{value:l.id}},[e._v(e._s(l.name))])})),e._v("\n      "+e._s(e.model9)+"\n    ")],1),e._v(" "),t("h1",[e._v("\n      filterable:可搜索（可直接配置 filterable，或配置 filterable属性为true），多选模式下可以使用键盘delete键删除最后一个选项\n    ")]),e._v(" "),t("div",[t("span",[e._v("单选可搜索:")]),e._v(" "),t("h-select",{attrs:{width:"200",filterable:""},on:{"on-blur":e.blurH},model:{value:e.model10,callback:function(l){e.model10=l},expression:"model10"}},[t("h-option",{attrs:{value:3}},[e._v(e._s("<你>"))]),e._v(" "),e._l(e.uList,function(l,a){return t("h-option",{key:l.id,attrs:{value:l.id}},[e._v(e._s(l.name))])})],2),e._v(" "),t("span",[e._v("多选可搜索:")]),e._v(" "),t("h-select",{attrs:{width:"200",multiple:"",filterable:"",isString:!0,isCheckall:""},on:{"on-blur":e.blurH},model:{value:e.model11,callback:function(l){e.model11=l},expression:"model11"}},e._l(e.uList,function(l,a){return t("h-option",{key:l.id,attrs:{value:l.id}},[e._v(e._s(l.name))])})),e._v("\n      "+e._s(e.model11)+"\n      "),t("h2",[e._v("搜索框在下")]),e._v(" "),t("span",[e._v("单选可搜索:")]),e._v(" "),t("h-select",{attrs:{width:"200",filterable:"",showBottom:!0,searchHolder:"123",transfer:!0},on:{"on-blur":e.blurH},model:{value:e.model10,callback:function(l){e.model10=l},expression:"model10"}},e._l(e.uList,function(l,a){return t("h-option",{key:l.id,attrs:{value:l.id}},[e._v(e._s(l.name))])})),e._v(" "),t("span",[e._v("多选可搜索:")]),e._v(" "),t("h-select",{attrs:{width:"200",multiple:"",filterable:"",isString:!0,showBottom:!0,checkToHead:"",transfer:!0},on:{"on-blur":e.blurH},model:{value:e.model11,callback:function(l){e.model11=l},expression:"model11"}},e._l(e.uList,function(l,a){return t("h-option",{key:l.id,attrs:{value:l.id}},[e._v(e._s(l.name))])})),e._v("\n      "+e._s(e.model11)+"\n    ")],1),e._v(" "),t("h1",[e._v("\n      remote:远程可搜索，需同时设置 filterable、remote、remote-method、loading 四个 props，其中 loading 用于控制是否正在搜索中，remote-method 是远程搜索的方法。设置初始显示值，需设置 label 属性。\n    ")]),e._v(" "),t("div",[t("span",[e._v("远程搜索:")]),e._v(" "),t("h-select",{attrs:{width:"200",filterable:"",remote:"","remote-method":e.remoteMethod1,loading:e.loading1},on:{"on-blur":e.blurH},model:{value:e.model13,callback:function(l){e.model13=l},expression:"model13"}},e._l(e.options1,function(l){return t("h-option",{key:l.value,attrs:{value:l.value}},[e._v(e._s(l.label))])})),e._v("\n      "+e._s(e.model13)+"\n    ")],1),e._v(" "),t("h-select",{attrs:{"not-found-text":"新设置的为空显示的内容",filterable:""},on:{"on-blur":e.blurH},model:{value:e.mode224,callback:function(l){e.mode224=l},expression:"mode224"}},e._l(e.cityList224,function(l){return t("h-option",{key:l.value,attrs:{value:l.value}},[e._v(e._s(l.value))])})),e._v(" "),t("h2",[e._v("test 1")]),e._v("\n    "+e._s(e.cy.value1)+"\n    "),t("h-select",{attrs:{width:"260",multiple:"",size:"large",isString:!0,showTitle:""},model:{value:e.cy.value1,callback:function(l){e.$set(e.cy,"value1",l)},expression:"cy.value1"}},e._l(e.cy.options1,function(l){return t("h-option",{key:l.value,attrs:{value:l.value}},[e._v(e._s(l.label))])})),e._v("\n    "+e._s(e.cy.value2)+"\n    "),t("h-select",{attrs:{width:"260",size:"large",isString:!0,showTitle:"","on-change":"cy_change_test"},model:{value:e.cy.value2,callback:function(l){e.$set(e.cy,"value2",l)},expression:"cy.value2"}},e._l(e.cy.options1,function(l){return t("h-option",{key:l.value,attrs:{value:l.value}},[e._v(e._s(l.label))])}))],1)])},staticRenderFns:[]}},923:function(e,l,t){l=e.exports=t(39)(),l.push([e.i,"\np {\r\n  font-size: 18px;\n}\r\n",""])},961:function(e,l,t){var a=t(923);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t(49)("2a7df32c",a,!0)}});