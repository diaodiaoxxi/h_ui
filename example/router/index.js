import Vue from 'vue'
import Router from 'vue-router'
// import { resolve } from 'dns';
import Home from '../views/Home.vue'
import Hello from '../views/hello.vue'
import MyExample from '../views/MyExample.vue'
import Switchs from '../views/Switchs.vue'
import Typefield from '../views/Typefield.vue'
import Input from '../views/Input.vue'
import Checkbox from '../views/Checkbox.vue'
import Radio from '../views/Radio.vue'
import Icon from '../views/Icon.vue'
import Buttons from '../views/Buttons.vue'
import Messages from '../views/Messages.vue'
import Notices from '../views/Notices.vue'
import MsgBox from '../views/MsgBox.vue'
import Alerts from '../views/Alerts.vue'
import Progress from '../views/Progress.vue'
import Badge from '../views/Badge.vue'
import InputNumber from '../views/InputNumber.vue'
import Tooltip from '../views/Tooltip.vue'
import Poptip from '../views/Poptip.vue'
import Slider from '../views/Slider.vue'
import Carousel from '../views/Carousel.vue'
import Grid from '../views/Grid.vue'
import Select from '../views/Select.vue'
import Menu from '../views/Menu.vue'
import Breadcrumb from '../views/Breadcrumb.vue'
import Layout from '../views/Layout.vue'
import Upload from '../views/Upload.vue'
import Table from '../views/Table.vue'
import Page from '../views/Page.vue'
import DatePicker from '../views/DatePicker.vue'
import TimePicker from '../views/TimePicker.vue'
import Tree from '../views/Tree.vue'
import Tabs from '../views/Tabs.vue'
import Dropdown from '../views/Dropdown.vue'
import Timeline from '../views/Timeline.vue'
import Collapse from '../views/Collapse.vue'
import Cascader from '../views/Cascader.vue'
import Transfer from '../views/Transfer.vue'
import Loadingbar from '../views/Loadingbar.vue'
import Backtop from '../views/Backtop.vue'
import Spin from '../views/Spin.vue'
import Form from '../views/Form.vue'
import SelectTree from '../views/SelectTree.vue'
import Steps from '../views/Steps.vue'
import Circle from '../views/Circle.vue'
import Affix from '../views/Affix.vue'
import Card from '../views/Card.vue'
import EditGird from '../views/EditGird.vue'
import GroupTable from '../views/GroupTable.vue'
import TreeGird from '../views/TreeGird.vue'
import AsycTreeGird from '../views/AsycTreeGird.vue'
import SelectTable from '../views/SelectTable.vue'
import SimpleMultiSelect from '../views/SimpleMultiSelect.vue'
import FastDate from '../views/FastDate.vue'
import SplicePanel from '../views/SplicePanel.vue'
import Panel from '../views/Panel.vue'
import SimpleTable from '../views/SimpleTable.vue'
import TransferTable from '../views/TransferTable.vue'
import FormGird from '../views/FormGird.vue'
import Rate from '../views/Rate.vue'
import Textdiff from '../views/Textdiff.vue'
import TypefieldRange from '../views/TypefieldRange.vue'
import SimpleSelect  from '../views/SimpleSelect.vue'
import FileImport from '../views/FileImport.vue'
import FileExport from '../views/FileExport.vue'
import Split from '../views/Split.vue'
import Drawer from '../views/Drawer.vue'
import Log from '../views/Log.vue'
import Tag from '../views/Tag.vue'
import SimpleTreeGird from '../views/SimpleTreeGird.vue'
import Calendar from '../views/Calendar.vue'
// import Cuiyang from '../views/cuiyang/main'
import Schedule from '../views/Schedule.vue'

import DownLoad from '../views/DownLoad.vue'

import Test from '../views/Test.vue'
import Test2 from '../views/Test2.vue'
import Test3 from '../views/Test3.vue'
import Test4 from '../views/Test4.vue'

// const hyh = resolve=>{
//     import(xxx.js).then(module=>{//import 实现异步加载
//         resolve(module)
//     });
// }
Vue.use(Router)
// 使用require.ensure，会有一个缓存的效果，每次进行资源请求，判断出客户端缓存的资源是否是最新的,如果是的话,
//服务器就会返回HTTP/304 Not Modified响应头，不是的话会进行
// const router = new Router({
//   routes: [
//     { path: '/', redirect: '/home' },
//     { name: 'home', path: '/home', component:  Home  },
//     { name: 'switchs', path: '/switchs', component: Switchs },
//     { name: 'typefield', path: '/typefield', component:  Typefield  },
//     {
//         name: 'Input',
//         path: '/Input',
//         component:Input
//     },
//     {
//         name: 'inputNum',
//         path: '/inputNum',
//         component:InputNumber
//     },
//     {
//         name: 'checkbox',
//         path: '/checkbox',
//         component:Checkbox
//     },
//     {
//         name: 'radio',
//         path: '/radio',
//         component: Radio
//     },
//     {
//         name: 'icon',
//         path: '/icon',
//         component: Icon
//     },
//     {
//         name: 'buttons',
//         path: '/buttons',
//         component: Buttons
//     },
//     {
//         name: 'messages',
//         path: '/messages',
//         component: Messages
//     },
//     {
//         name: 'notices',
//         path: '/notices',
//         component: Notices
//     },
//     {
//         name: 'alert',
//         path: '/alerts',
//         component: Alerts
//     },
//     {
//         name: 'msgBox',
//         path: '/msgBox',
//         component: MsgBox
//     },
//     {
//         name: 'tooltip',
//         path: '/tooltip',
//         component: Tooltip
//     },
//     {
//         name: 'poptip',
//         path: '/poptip',
//         component: Poptip
//     },
//     {
//         name: 'progress',
//         path: '/progress',
//         component: Progress
//     },
//     {
//         name: 'slider',
//         path: '/slider',
//         component: Slider
//     },
//     {
//         name: 'badge',
//         path: '/badge',
//         component: Badge
//     },
//     {
//         name: 'carousel',
//         path: '/carousel',
//         component: Carousel
//     },
//     {
//         name: 'grid',
//         path: '/grid',
//         component: Grid
//     },
//     {
//         name: 'select',
//         path: '/select',
//         component: Select
//     },
//     {
//         name: 'simpleSelect',
//         path: '/simpleSelect',
//         component: SimpleSelect
//     },
//     {
//         name: 'menu',
//         path: '/menu',
//         component: Menu
//     },
//     {
//         name: 'breadcrumb',
//         path: '/breadcrumb',
//         component: Breadcrumb
//     },
//     {
//         name: 'layout',
//         path: '/layout',
//         component: Layout
//     },
//     {
//         name: 'upload',
//         path: '/upload',
//         component: Upload
//     },
//     {
//         name: 'table',
//         path: '/table',
//         component: Table ,
//         meta: {
//             isKeepAlive: true
//         }
//     },
//     {
//         name: 'page',
//         path: '/page',
//         component: Page
//     },
//     {
//         name: 'DatePicker',
//         path: '/datePicker',
//         component: DatePicker
//     },
//     {
//         name: 'TimePicker',
//         path: '/timePicker',
//         component: TimePicker
//     },
//     {
//         name: 'Tree',
//         path: '/tree',
//         component: Tree
//     },
//     {
//         name: 'Tabs',
//         path: '/tabs',
//         component: Tabs
//     },
//     {
//         name: 'Dropdown',
//         path: '/dropdown',
//         component: Dropdown
//     },
//     {
//         name: 'Timeline',
//         path: '/timeline',
//         component: Timeline
//     },
//     {
//         name: 'Collapse',
//         path: '/collapse',
//         component: Collapse
//     },
//     {
//         name: 'Cascader',
//         path: '/cascader',
//         component: Cascader
//     },
//     {
//         name: 'Transfer',
//         path: '/transfer',
//         component: Transfer
//     },
//     {
//         name: 'Loadingbar',
//         path: '/loadingbar',
//         component: Loadingbar
//     },
//     {
//         name: 'Spin',
//         path: '/spin',
//         component: Spin
//     },
//     {
//         name: 'Backtop',
//         path: '/backtop',
//         component: Backtop
//     },
//     {
//         name: 'Form',
//         path: '/form',
//         component: Form
//     },
//     {
//         name: 'SelectTree',
//         path: '/selectTree',
//         component: SelectTree
//     },
//     {
//         name: 'Steps',
//         path: '/steps',
//         component: Steps
//     },
//     {
//         name: 'Circle',
//         path: '/circle',
//         component: Circle
//     },
//     {
//         name: 'Affix',
//         path: '/affix',
//         component: Affix
//     },
//     {
//         name: 'Card',
//         path: '/card',
//         component: Card
//     },
//     {
//         name: 'EditGird',
//         path: '/editgird',
//         component: EditGird
//     },
//     {
//         name: 'GroupTable',
//         path: '/groupTable',
//         component: GroupTable
//     },
//     {
//         name: 'TreeGird',
//         path: '/treeGird',
//         component: TreeGird
//     },
//     {
//         name: 'AsycTreeGird',
//         path: '/asyctreeGird',
//         component: AsycTreeGird
//     },
//     {
//         name: 'SelectTable',
//         path: '/selectTable',
//         component: SelectTable
//     },
//     {
//         name: 'FastDate',
//         path: '/fastDate',
//         component: FastDate
//     },
//     {
//         name: 'SplicePanel',
//         path: '/splicePanel',
//         component: SplicePanel
//     },
//     {
//         name: 'Panel',
//         path: '/panel',
//         component: Panel
//     },
//     {
//         name: 'Hello',
//         path: '/hello',
//         component: Hello
//     },
//     {
//         name: 'SimpleTable',
//         path: '/simpleTable',
//         component: SimpleTable
//     },
//     {
//         name: 'TransferTable',
//         path: '/transferTable',
//         component: TransferTable
//     },
//     {
//         name:'FormGird',
//         path:'/formGird',
//         component: FormGird
//     },
//     {
//         name:'Rate',
//         path:'/rate',
//         component: Rate
//     },
//     {
//         name: 'Textdiff',
//         path: '/textdiff',
//         component: Textdiff
//     },
//     {
//         name: 'TypefieldRange',
//         path: '/typefieldRange',
//         component: TypefieldRange
//     },
//     {
//         name: 'FileImport',
//         path: '/fileimport',
//         component: FileImport
//     },
//     {
//         name: 'FileExport',
//         path: '/fileexport',
//         component: FileExport
//     },
//     {
//         name: 'Split',
//         path: '/split',
//         component: Split
//     },
//     {
//         name: 'Drawer',
//         path: '/drawer',
//         component: Drawer
//     },
//     {
//         name: 'DownLoad',
//         path: '/downLoad',
//         component: DownLoad
//     },
//     {
//         name: 'Log',
//         path: '/log',
//         component: Log
//     },
//     {
//         name: 'tag',
//         path: '/tag',
//         component: tag
//     },
//     {
//         name: 'SimpleTreeGird',
//         path: '/simpleTreeGird',
//         component: SimpleTreeGird
//     },
//     {
//         name: 'Calendar',
//         path: '/calendar',
//         component: Calendar
//     }
//  ]
// })
const router = new Router({
    routes: [
      // { name: 'cuiyang', path: '/cuiyang', component: Cuiyang },
      { path: '/', redirect: '/home' },
      { name: 'home', path: '/home', component:Home},
      { name: 'myExample', path: '/myExample', component:MyExample},
      { name: 'switchs', path: '/switchs', component:Switchs },
      { name: 'typefield', path: '/typefield', component: Typefield},
      {
          name: 'Input',
          path: '/Input',
          component:Input
      },
      {
          name: 'inputNum',
          path: '/inputNum',
          component:InputNumber
      },
      {
          name: 'checkbox',
          path: '/checkbox',
          component:Checkbox
      },
      {
          name: 'radio',
          path: '/radio',
          component:Radio
      },
      {
          name: 'icon',
          path: '/icon',
          component:Icon
      },
      {
          name: 'buttons',
          path: '/buttons',
          component:Buttons
      },
      {
          name: 'messages',
          path: '/messages',
          component:Messages
      },
      {
          name: 'notices',
          path: '/notices',
          component:Notices
      },
      {
          name: 'alert',
          path: '/alerts',
          component:Alerts
      },
      {
          name: 'msgBox',
          path: '/msgBox',
          component:MsgBox
      },
      {
          name: 'tooltip',
          path: '/tooltip',
          component:Tooltip
      },
      {
          name: 'poptip',
          path: '/poptip',
          component:Poptip
      },
      {
          name: 'progress',
          path: '/progress',
          component:Progress
      },
      {
          name: 'slider',
          path: '/slider',
          component:Slider
      },
      {
          name: 'badge',
          path: '/badge',
          component:Badge
      },
      {
          name: 'carousel',
          path: '/carousel',
          component:Carousel
      },
      {
          name: 'grid',
          path: '/grid',
          component:Grid
      },
      {
          name: 'select',
          path: '/select',
          component:Select
      },
      {
          name: 'simpleSelect',
          path: '/simpleSelect',
          component:SimpleSelect
      },
      {
          name: 'menu',
          path: '/menu',
          component: Menu
      },
      {
          name: 'breadcrumb',
          path: '/breadcrumb',
          component: Breadcrumb
      },
      {
          name: 'layout',
          path: '/layout',
          component: Layout
      },
      {
          name: 'upload',
          path: '/upload',
          component: Upload
      },
      {
          name: 'table',
          path: '/table',
          component: Table ,
          meta: {
              isKeepAlive: true
          }
      },
      {
          name: 'page',
          path: '/page',
          component: Page
      },
      {
          name: 'DatePicker',
          path: '/datePicker',
          component: DatePicker
      },
      {
          name: 'TimePicker',
          path: '/timePicker',
          component: TimePicker
      },
      {
          name: 'Tree',
          path: '/tree',
          component: Tree
      },
      {
          name: 'Tabs',
          path: '/tabs',
          component: Tabs
      },
      {
          name: 'Dropdown',
          path: '/dropdown',
          component: Dropdown
      },
      {
          name: 'Timeline',
          path: '/timeline',
          component: Timeline
      },
      {
          name: 'Collapse',
          path: '/collapse',
          component: Collapse
      },
      {
          name: 'Cascader',
          path: '/cascader',
          component: Cascader
      },
      {
          name: 'Transfer',
          path: '/transfer',
          component: Transfer
      },
      {
          name: 'Loadingbar',
          path: '/loadingbar',
          component: Loadingbar
      },
      {
          name: 'Spin',
          path: '/spin',
          component: Spin
      },
      {
          name: 'Backtop',
          path: '/backtop',
          component: Backtop
      },
      {
          name: 'Form',
          path: '/form',
          component: Form
      },
      {
          name: 'SelectTree',
          path: '/selectTree',
          component: SelectTree
      },
      {
          name: 'Steps',
          path: '/steps',
          component: Steps
      },
      {
          name: 'Circle',
          path: '/circle',
          component: Circle
      },
      {
          name: 'Affix',
          path: '/affix',
          component: Affix
      },
      {
          name: 'Card',
          path: '/card',
          component: Card
      },
      {
          name: 'EditGird',
          path: '/editgird',
          component: EditGird
      },
      {
          name: 'GroupTable',
          path: '/groupTable',
          component: GroupTable
      },
      {
          name: 'TreeGird',
          path: '/treeGird',
          component: TreeGird
      },
      {
          name: 'AsycTreeGird',
          path: '/asyctreeGird',
          component: AsycTreeGird
      },
      {
          name: 'SelectTable',
          path: '/selectTable',
          component: SelectTable
      },
      {
        name: 'SimpleMultiSelect',
        path: '/simpleMultiSelect',
        component: SimpleMultiSelect
      },
      {
          name: 'FastDate',
          path: '/fastDate',
          component: FastDate
      },
      {
          name: 'SplicePanel',
          path: '/splicePanel',
          component: SplicePanel
      },
      {
          name: 'Panel',
          path: '/panel',
          component: Panel
      },
      {
          name: 'Hello',
          path: '/hello',
          component: Hello
      },
      {
          name: 'SimpleTable',
          path: '/simpleTable',
          component: SimpleTable
      },
      {
          name: 'TransferTable',
          path: '/transferTable',
          component: TransferTable
      },
      {
          name:'FormGird',
          path:'/formGird',
          component: FormGird
      },
      {
          name:'Rate',
          path:'/rate',
          component: Rate
      },
      {
          name: 'Textdiff',
          path: '/textdiff',
          component: Textdiff
      },
      {
          name: 'TypefieldRange',
          path: '/typefieldRange',
          component: TypefieldRange
      },
      {
          name: 'FileImport',
          path: '/fileimport',
          component: FileImport
      },
      {
          name: 'FileExport',
          path: '/fileexport',
          component: FileExport
      },
      {
          name: 'Split',
          path: '/split',
          component: Split
      },
      {
          name: 'Drawer',
          path: '/drawer',
          component: Drawer
      },
      {
          name: 'DownLoad',
          path: '/downLoad',
          component: DownLoad
      },
      {
          name: 'Log',
          path: '/log',
          component: Log
      },
      {
          name: 'tag',
          path: '/tag',
          component: Tag
      },
      {
          name: 'SimpleTreeGird',
          path: '/simpleTreeGird',
          component: SimpleTreeGird
      },
      {
          name: 'Calendar',
          path: '/calendar',
          component: Calendar
      },
      {
        name: 'Schedule',
        path: '/schedule',
        component: Schedule
      },
      {
        name: 'Test',
        path: '/test',
        component: Test,
      },
      {
        name: 'Test2',
        path: '/test2',
        component: Test2,
      },
      {
        name: 'Test3',
        path: '/test3',
        component: Test3,
      },
      {
        name: 'Test4',
        path: '/test4',
        component: Test4,
      },
  ]
})

router.beforeEach((to, from, next) => {
  let top = document.body.scrollTop
  if (top > 0) {
    const timer = setInterval(() => {
      scrollTo(0, top)
      top -= 100
      if (top <= 0) {
        scrollTo(0, 0)
        clearInterval(timer)
      }
    }, 20)
  }
  next()
})

export default router
