<template>
  <div id="app" class="wrapper">
    <nav>
      <span>快速访问</span>
      <h-select @on-change="handleChange" filterable style="margin: 5px 0 10px 5px;max-width: 300px">
        <h-option
          v-for="op in options"
          :key="op.label"
          :value="op.path"
          :label="op.name"
        ></h-option>
      </h-select>
      <ul>
        <span>基础组件</span>
        <li>
          <router-link to="/home">安装</router-link>
        </li>
        <li>
          <router-link to="/download">download</router-link>
        </li>
        <li>
          <router-link to="/hello">Hello</router-link>
        </li>
        <li>
          <router-link to="/icon">Icon</router-link>
        </li>
        <li>
          <router-link to="/grid">Grid</router-link>
        </li>
        <li>
          <router-link to="/layout">layout</router-link>
        </li>
        <li>
          <router-link to="/buttons">buttons</router-link>
        </li>
        <br />
        <span>表单组件</span>
        <li>
          <router-link to="/Input">1Input</router-link>
        </li>
        <li>
          <router-link to="/radio">2Radio</router-link>
        </li>
        <li>
          <router-link to="/checkbox">3Checkbox</router-link>
        </li>
        <li>
          <router-link to="/select">4Select</router-link>
        </li>
        <li>
          <router-link to="/simpleSelect">SimpleSelect</router-link>
        </li>
        <li>
          <router-link to="/typefield">Typefield</router-link>
        </li>
        <li>
          <router-link to="/typefieldRange">TypefieldRange</router-link>
        </li>
        <li>
          <router-link to="/slider">Slider</router-link>
        </li>
        <li>
          <router-link to="/switchs">Switchs</router-link>
        </li>
        <li>
          <router-link to="/inputNum">InputNumber</router-link>
        </li>
        <li>
          <router-link to="/datePicker">datePicker</router-link>
        </li>
        <li>
          <router-link to="/fastDate">fastDate</router-link>
        </li>
        <li>
          <router-link to="/splicePanel">splicePanel</router-link>
        </li>
        <li>
          <router-link to="/timePicker">timePicker</router-link>
        </li>
        <li>
          <router-link to="/calendar">calendar</router-link>
        </li>
        <li>
          <router-link to="/upload">Upload</router-link>
        </li>
        <li>
          <router-link to="/cascader">Cascader</router-link>
        </li>
        <li>
          <router-link to="/transfer">Transfer</router-link>
        </li>
        <li>
          <router-link to="/selectTree">SelectTree</router-link>
        </li>
        <li>
          <router-link to="/selectTable">SelectTable</router-link>
        </li>
        <li>
          <router-link to="/simpleMultiSelect">SimpleMultiSelect</router-link>
        </li>
        <li>
          <router-link to="/form">Form</router-link>
        </li>
        <li>
          <router-link to="/formGird">FormGird</router-link>
        </li>
        <br />
        <span>视图组件</span>
        <li>
          <router-link to="/alerts">Alerts</router-link>
        </li>
        <li>
          <router-link to="/messages">Messages</router-link>
        </li>
        <li>
          <router-link to="/notices">Notices</router-link>
        </li>
        <li>
          <router-link to="/msgBox">MsgBox</router-link>
        </li>
        <li>
          <router-link to="/drawer">Drawer</router-link>
        </li>
        <li>
          <router-link to="/tooltip">Tooltip</router-link>
        </li>
        <li>
          <router-link to="/poptip">Poptip</router-link>
        </li>
        <li>
          <router-link to="/progress">Progress</router-link>
        </li>
        <li>
          <router-link to="/timeline">Timeline</router-link>
        </li>
        <li>
          <router-link to="/collapse">Collapse</router-link>
        </li>
        <li>
          <router-link to="/panel">Panel</router-link>
        </li>
        <li>
          <router-link to="/card">Card</router-link>
        </li>
        <br />
        <span>导航组件</span>
        <li>
          <router-link to="/menu">Menu</router-link>
        </li>
        <li>
          <router-link to="/breadcrumb">breadcrumb</router-link>
        </li>
        <li>
          <router-link to="/tabs">Tabs</router-link>
        </li>
        <li>
          <router-link to="/dropdown">Dropdown</router-link>
        </li>
        <li>
          <router-link to="/steps">Steps</router-link>
        </li>
        <br />
        <span>其他组件</span>
        <li>
          <router-link to="/waves">Waves</router-link>
        </li>
        <li>
          <router-link to="/badge">Badge</router-link>
        </li>
        <li>
          <router-link to="/carousel">Carousel</router-link>
        </li>
        <li>
          <router-link to="/tree">Tree</router-link>
        </li>
        <li>
          <router-link to="/simpleTree">SimpleTree</router-link>
        </li>
        <li>
          <router-link to="/loadingbar">Loadingbar</router-link>
        </li>
        <li>
          <router-link to="/backtop">Backtop</router-link>
        </li>
        <li>
          <router-link to="/spin">Spin</router-link>
        </li>
        <li>
          <router-link to="/circle">Circle</router-link>
        </li>
        <li>
          <router-link to="/affix">Affix</router-link>
        </li>
        <li>
          <router-link to="/schedule">Schedule</router-link>
        </li>
        <br />
        <span>表格组件</span>
        <li>
          <router-link to="/page">Page</router-link>
        </li>
        <li>
          <router-link to="/table">Table</router-link>
        </li>
        <li>
          <router-link to="/editgird">EditGird</router-link>
        </li>
        <li>
          <router-link to="/groupTable">GroupTable</router-link>
        </li>
        <li>
          <router-link to="/treeGird">TreeGird</router-link>
        </li>
        <li>
          <router-link to="/simpleTable">SimpleTable</router-link>
        </li>
        <li>
          <router-link to="/transferTable">TransferTable</router-link>
        </li>
        <li>
          <router-link to="/asyctreeGird">AsycTreeGird</router-link>
        </li>
        <li>
          <router-link to="/simpleTreeGird">SimpleTreeGird</router-link>
        </li>
        <br />
        <span>特殊</span>
        <li>
          <router-link to="/textdiff">Textdiff</router-link>
        </li>
        <li>
          <router-link to="/split">Split</router-link>
        </li>
        <li>
          <router-link to="/fileimport">FileImport</router-link>
        </li>
        <li>
          <router-link to="/fileexport">FileExport</router-link>
        </li>
        <li>
          <router-link to="/log">Log</router-link>
        </li>
        <li>
          <router-link to="/tag">tag</router-link>
        </li>
        <br>
        <span>自定义test页面</span>
        <li>
          <router-link to="/test">test1</router-link>
          <router-link to="/test2">test2</router-link>
          <router-link to="/test3">test3</router-link>
          <router-link to="/test4">test4</router-link>
        </li>
      </ul>
    </nav>
    <!-- <keep-alive>
       <keep-alive :include="page">  -->
    <router-view></router-view>
    <!-- </keep-alive> 
       <router-view v-if="!isKeepAlive"></router-view> -->

    <!-- </keep-alive> -->
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      loaded: false,
      loadClass: "load",
      page: "tableq",
      isKeepAlive: true,
      options: [
        { name: "switchs", path: "/switchs"},
        { name: "typefield", path: "/typefield"},
        {
          name: "Input",
          path: "/Input"
        },
        {
          name: "inputNum",
          path: "/inputNum"
        },
        {
          name: "checkbox",
          path: "/checkbox"
        },
        {
          name: "radio",
          path: "/radio"
        },
        {
          name: "icon",
          path: "/icon"
        },
        {
          name: "buttons",
          path: "/buttons"
        },
        {
          name: "messages",
          path: "/messages"
        },
        {
          name: "notices",
          path: "/notices"
        },
        {
          name: "alert",
          path: "/alerts"
        },
        {
          name: "msgBox",
          path: "/msgBox"
        },
        {
          name: "tooltip",
          path: "/tooltip"
        },
        {
          name: "poptip",
          path: "/poptip"
        },
        {
          name: "progress",
          path: "/progress"
        },
        {
          name: "slider",
          path: "/slider"
        },
        {
          name: "badge",
          path: "/badge"
        },
        {
          name: "carousel",
          path: "/carousel"
        },
        {
          name: "grid",
          path: "/grid"
        },
        {
          name: "select",
          path: "/select"
        },
        {
          name: "simpleSelect",
          path: "/simpleSelect"
        },
        {
          name: "menu",
          path: "/menu"
        },
        {
          name: "breadcrumb",
          path: "/breadcrumb"
        },
        {
          name: "layout",
          path: "/layout"
        },
        {
          name: "upload",
          path: "/upload"
        },
        {
          name: "table",
          path: "/table"
        },
        {
          name: "page",
          path: "/page"
        },
        {
          name: "DatePicker",
          path: "/datePicker"
        },
        {
          name: "TimePicker",
          path: "/timePicker"
        },
        {
          name: "Tree",
          path: "/tree"
        },
        {
          name: "Tabs",
          path: "/tabs"
        },
        {
          name: "Dropdown",
          path: "/dropdown"
        },
        {
          name: "Timeline",
          path: "/timeline"
        },
        {
          name: "Collapse",
          path: "/collapse"
        },
        {
          name: "Cascader",
          path: "/cascader"
        },
        {
          name: "Transfer",
          path: "/transfer"
        },
        {
          name: "Loadingbar",
          path: "/loadingbar"
        },
        {
          name: "Spin",
          path: "/spin"
        },
        {
          name: "Backtop",
          path: "/backtop"
        },
        {
          name: "Form",
          path: "/form"
        },
        {
          name: "SelectTree",
          path: "/selectTree"
        },
        {
          name: "Steps",
          path: "/steps"
        },
        {
          name: "Circle",
          path: "/circle"
        },
        {
          name: "Affix",
          path: "/affix"
        },
        {
          name: "Card",
          path: "/card"
        },
        {
          name: "EditGird",
          path: "/editgird"
        },
        {
          name: "GroupTable",
          path: "/groupTable"
        },
        {
          name: "TreeGird",
          path: "/treeGird"
        },
        {
          name: "AsycTreeGird",
          path: "/asyctreeGird"
        },
        {
          name: "SelectTable",
          path: "/selectTable"
        },
        {
          name: "SimpleMultiSelect",
          path: "/simpleMultiSelect"
        },
        {
          name: "FastDate",
          path: "/fastDate"
        },
        {
          name: "SplicePanel",
          path: "/splicePanel"
        },
        {
          name: "Panel",
          path: "/panel"
        },
        {
          name: "Hello",
          path: "/hello"
        },
        {
          name: "SimpleTable",
          path: "/simpleTable"
        },
        {
          name: "TransferTable",
          path: "/transferTable"
        },
        {
          name: "FormGird",
          path: "/formGird"
        },
        {
          name: "Rate",
          path: "/rate"
        },
        {
          name: "Textdiff",
          path: "/textdiff"
        },
        {
          name: "TypefieldRange",
          path: "/typefieldRange"
        },
        {
          name: "FileImport",
          path: "/fileimport"
        },
        {
          name: "FileExport",
          path: "/fileexport"
        },
        {
          name: "Split",
          path: "/split"
        },
        {
          name: "Drawer",
          path: "/drawer"
        },
        {
          name: "DownLoad",
          path: "/downLoad"
        },
        {
          name: "Log",
          path: "/log"
        },
        {
          name: "tag",
          path: "/tag"
        },
        {
          name: "SimpleTreeGird",
          path: "/simpleTreeGird"
        },
        {
          name: "Calendar",
          path: "/calendar"
        },
        {
          name: "Schedule",
          path: "/schedule"
        }
      ]
    };
  },
  methods: {
    handleChange(val) {
      this.$router.push(val);
    }
  }
};
</script>
<style type="text/css">
/*body{
    overflow: hidden !important;
  }
  #app{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

  }*/
</style>
<style scoped>
#app ul {
  border-bottom: solid 1px #eee;
}
#app ul li {
  display: inline-block;
  padding: 2px 3px;
}
#app ul li a:link {
  color: blue;
}
#app ul li a:hover {
  color: pink;
}
#app ul li a:visited {
  color: red;
}
#app div:not(.h-select) {
  /*width: 96%;*/
  margin: 50px 2%;
}
li {
  display: inline-block;
  text-decoration: underline;
  margin-right: 10px !important;
  font-size: 16px;
}
</style>
