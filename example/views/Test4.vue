<template>
  <div>
    <h-button @click="test">hiddenCol</h-button>
    <h-button @click="hiddenOneCol">隐藏一列</h-button>
    <!-- <h-table :columns="columns" :data="data1" :notSetWidth="notSetWidth"></h-table> -->
    <h-table border :columns="columns" :data="data1" notSetWidth></h-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      notSetWidth:true,
      columns: [
        // 列表配置
        {
          type: "selection",
          width: 70,
          align: "center",
          fixed: "left"
        },
        {
          title: "序号",
          width: 70,
          type: "index",
          align: "center",
          fixed: "left"
        },
        {
          title: "用户姓名",
          key: "user_name",
          fixed: "left",
          hiddenCol: false,
        },
        {
          title: "登录名称",
          key: "user_id",
          hiddenCol: false,
        },
        {
          title: "所属机构",
          key: "tenant_name"
        },
        {
          title: "所属部门",
          key: "org_name"
        },
        {
          title: "手机号码",
          key: "mobile"
        },
        {
          title: "固定电话",
          key: "phone"
        },
        {
          title: "邮件地址",
          key: "email"
        },

        {
          title: "用户状态",
          key: "user_status",
        },
        {
          title: "角色名称",
          key: "role_names"
        },
        {
          title: "授权产品",
          key: "authorized_product"
        },
        {
          title: "最后登录时间",
          key: "last_login_time"
        },
        {
          title: "创建时间",
          key: "create_date_time"
        },
        {
          title: "锁定时间",
          key: "lock_time"
        },
        {
          title: "锁定经办",
          key: "locked_in"
        },
        {
          title: "创建经办",
          key: "creator"
        },
        {
          title: "创建机构",
          key: "create_institution"
        },
        {
          title: "注销时间",
          key: "logout_time"
        },
        {
          title: "注销经办",
          key: "cancellation"
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          align: "center",
          width: 150,
          // render: (h, params) => {
          //   return h("div", 'xiangqing');
          // }
        }
      ],
      data1: [
        {
          authorized_product: "SM0922广发天鸿5号投资投私募基金",
          cancel_handle: "程芳",
          cancel_time: "1989-05-16  10:00:51",
          cancellation: "黄强",
          create_date_time: "2007-01-18  14:57:05",
          create_institution: "投资投私募基金",
          creator: "什专与放科养构白查强",
          email: "8762802@email.com",
          index: 0,
          last_login_time: "2016-06-01  01:32:01",
          lock_handle: "贾丽",
          lock_time: "2002-11-20  03:54:29",
          locked_in: "叶伟",
          logout_time: "1972-03-25  08:56:14",
          mobile: "17766668888",
          org_name: "别今下何实定积段则整",
          phone: "020-66668888",
          role_names: "基金管理 | 披露0",
          tenant_name: "质组时王压都",
          user_id: "黄丽",
          user_name: "秦静",
          user_status: "1"
        },
        {
          authorized_product: "SM0922广发天鸿5号投资投私募基金",
          cancel_handle: "程芳",
          cancel_time: "1989-05-16  10:00:51",
          cancellation: "黄强",
          create_date_time: "2007-01-18  14:57:05",
          create_institution: "投资投私募基金",
          creator: "什专与放科养构白查强",
          email: "8762802@email.com",
          index: 0,
          last_login_time: "2016-06-01  01:32:01",
          lock_handle: "贾丽",
          lock_time: "2002-11-20  03:54:29",
          locked_in: "叶伟",
          logout_time: "1972-03-25  08:56:14",
          mobile: "17766668888",
          org_name: "别今下何实定积段则整",
          phone: "020-66668888",
          role_names: "基金管理 | 披露0",
          tenant_name: "质组时王压都",
          user_id: "黄丽",
          user_name: "秦静",
          user_status: "1"
        },
        {
          authorized_product: "SM0922广发天鸿5号投资投私募基金",
          cancel_handle: "程芳",
          cancel_time: "1989-05-16  10:00:51",
          cancellation: "黄强",
          create_date_time: "2007-01-18  14:57:05",
          create_institution: "投资投私募基金",
          creator: "什专与放科养构白查强",
          email: "8762802@email.com",
          index: 0,
          last_login_time: "2016-06-01  01:32:01",
          lock_handle: "贾丽",
          lock_time: "2002-11-20  03:54:29",
          locked_in: "叶伟",
          logout_time: "1972-03-25  08:56:14",
          mobile: "17766668888",
          org_name: "别今下何实定积段则整",
          phone: "020-66668888",
          role_names: "基金管理 | 披露0",
          tenant_name: "质组时王压都",
          user_id: "黄丽",
          user_name: "秦静",
          user_status: "1"
        },
        {
          authorized_product: "SM0922广发天鸿5号投资投私募基金",
          cancel_handle: "程芳",
          cancel_time: "1989-05-16  10:00:51",
          cancellation: "黄强",
          create_date_time: "2007-01-18  14:57:05",
          create_institution: "投资投私募基金",
          creator: "什专与放科养构白查强",
          email: "8762802@email.com",
          index: 0,
          last_login_time: "2016-06-01  01:32:01",
          lock_handle: "贾丽",
          lock_time: "2002-11-20  03:54:29",
          locked_in: "叶伟",
          logout_time: "1972-03-25  08:56:14",
          mobile: "17766668888",
          org_name: "别今下何实定积段则整",
          phone: "020-66668888",
          role_names: "基金管理 | 披露0",
          tenant_name: "质组时王压都",
          user_id: "黄丽",
          user_name: "秦静",
          user_status: "1"
        },
        {
          authorized_product: "SM0922广发天鸿5号投资投私募基金",
          cancel_handle: "程芳",
          cancel_time: "1989-05-16  10:00:51",
          cancellation: "黄强",
          create_date_time: "2007-01-18  14:57:05",
          create_institution: "投资投私募基金",
          creator: "什专与放科养构白查强",
          email: "8762802@email.com",
          index: 0,
          last_login_time: "2016-06-01  01:32:01",
          lock_handle: "贾丽",
          lock_time: "2002-11-20  03:54:29",
          locked_in: "叶伟",
          logout_time: "1972-03-25  08:56:14",
          mobile: "17766668888",
          org_name: "别今下何实定积段则整",
          phone: "020-66668888",
          role_names: "基金管理 | 披露0",
          tenant_name: "质组时王压都",
          user_id: "黄丽",
          user_name: "秦静",
          user_status: "1"
        },
        {
          authorized_product: "SM0922广发天鸿5号投资投私募基金",
          cancel_handle: "程芳",
          cancel_time: "1989-05-16  10:00:51",
          cancellation: "黄强",
          create_date_time: "2007-01-18  14:57:05",
          create_institution: "投资投私募基金",
          creator: "什专与放科养构白查强",
          email: "8762802@email.com",
          index: 0,
          last_login_time: "2016-06-01  01:32:01",
          lock_handle: "贾丽",
          lock_time: "2002-11-20  03:54:29",
          locked_in: "叶伟",
          logout_time: "1972-03-25  08:56:14",
          mobile: "17766668888",
          org_name: "别今下何实定积段则整",
          phone: "020-66668888",
          role_names: "基金管理 | 披露0",
          tenant_name: "质组时王压都",
          user_id: "黄丽",
          user_name: "秦静",
          user_status: "1"
        },
        {
          authorized_product: "SM0922广发天鸿5号投资投私募基金",
          cancel_handle: "程芳",
          cancel_time: "1989-05-16  10:00:51",
          cancellation: "黄强",
          create_date_time: "2007-01-18  14:57:05",
          create_institution: "投资投私募基金",
          creator: "什专与放科养构白查强",
          email: "8762802@email.com",
          index: 0,
          last_login_time: "2016-06-01  01:32:01",
          lock_handle: "贾丽",
          lock_time: "2002-11-20  03:54:29",
          locked_in: "叶伟",
          logout_time: "1972-03-25  08:56:14",
          mobile: "17766668888",
          org_name: "别今下何实定积段则整",
          phone: "020-66668888",
          role_names: "基金管理 | 披露0",
          tenant_name: "质组时王压都",
          user_id: "黄丽",
          user_name: "秦静",
          user_status: "1"
        },
        {
          authorized_product: "SM0922广发天鸿5号投资投私募基金",
          cancel_handle: "程芳",
          cancel_time: "1989-05-16  10:00:51",
          cancellation: "黄强",
          create_date_time: "2007-01-18  14:57:05",
          create_institution: "投资投私募基金",
          creator: "什专与放科养构白查强",
          email: "8762802@email.com",
          index: 0,
          last_login_time: "2016-06-01  01:32:01",
          lock_handle: "贾丽",
          lock_time: "2002-11-20  03:54:29",
          locked_in: "叶伟",
          logout_time: "1972-03-25  08:56:14",
          mobile: "17766668888",
          org_name: "别今下何实定积段则整",
          phone: "020-66668888",
          role_names: "基金管理 | 披露0",
          tenant_name: "质组时王压都",
          user_id: "黄丽",
          user_name: "秦静",
          user_status: "1"
        },
        {
          authorized_product: "SM0922广发天鸿5号投资投私募基金",
          cancel_handle: "程芳",
          cancel_time: "1989-05-16  10:00:51",
          cancellation: "黄强",
          create_date_time: "2007-01-18  14:57:05",
          create_institution: "投资投私募基金",
          creator: "什专与放科养构白查强",
          email: "8762802@email.com",
          index: 0,
          last_login_time: "2016-06-01  01:32:01",
          lock_handle: "贾丽",
          lock_time: "2002-11-20  03:54:29",
          locked_in: "叶伟",
          logout_time: "1972-03-25  08:56:14",
          mobile: "17766668888",
          org_name: "别今下何实定积段则整",
          phone: "020-66668888",
          role_names: "基金管理 | 披露0",
          tenant_name: "质组时王压都",
          user_id: "黄丽",
          user_name: "秦静",
          user_status: "1"
        },
        {
          authorized_product: "SM0922广发天鸿5号投资投私募基金",
          cancel_handle: "程芳",
          cancel_time: "1989-05-16  10:00:51",
          cancellation: "黄强",
          create_date_time: "2007-01-18  14:57:05",
          create_institution: "投资投私募基金",
          creator: "什专与放科养构白查强",
          email: "8762802@email.com",
          index: 0,
          last_login_time: "2016-06-01  01:32:01",
          lock_handle: "贾丽",
          lock_time: "2002-11-20  03:54:29",
          locked_in: "叶伟",
          logout_time: "1972-03-25  08:56:14",
          mobile: "17766668888",
          org_name: "别今下何实定积段则整",
          phone: "020-66668888",
          role_names: "基金管理 | 披露0",
          tenant_name: "质组时王压都",
          user_id: "黄丽",
          user_name: "秦静",
          user_status: "1"
        },
        {
          authorized_product: "SM0922广发天鸿5号投资投私募基金",
          cancel_handle: "程芳",
          cancel_time: "1989-05-16  10:00:51",
          cancellation: "黄强",
          create_date_time: "2007-01-18  14:57:05",
          create_institution: "投资投私募基金",
          creator: "什专与放科养构白查强",
          email: "8762802@email.com",
          index: 0,
          last_login_time: "2016-06-01  01:32:01",
          lock_handle: "贾丽",
          lock_time: "2002-11-20  03:54:29",
          locked_in: "叶伟",
          logout_time: "1972-03-25  08:56:14",
          mobile: "17766668888",
          org_name: "别今下何实定积段则整",
          phone: "020-66668888",
          role_names: "基金管理 | 披露0",
          tenant_name: "质组时王压都",
          user_id: "黄丽",
          user_name: "秦静",
          user_status: "1"
        },
        {
          authorized_product: "SM0922广发天鸿5号投资投私募基金",
          cancel_handle: "程芳",
          cancel_time: "1989-05-16  10:00:51",
          cancellation: "黄强",
          create_date_time: "2007-01-18  14:57:05",
          create_institution: "投资投私募基金",
          creator: "什专与放科养构白查强",
          email: "8762802@email.com",
          index: 0,
          last_login_time: "2016-06-01  01:32:01",
          lock_handle: "贾丽",
          lock_time: "2002-11-20  03:54:29",
          locked_in: "叶伟",
          logout_time: "1972-03-25  08:56:14",
          mobile: "17766668888",
          org_name: "别今下何实定积段则整",
          phone: "020-66668888",
          role_names: "基金管理 | 披露0",
          tenant_name: "质组时王压都",
          user_id: "黄丽",
          user_name: "秦静",
          user_status: "1"
        },
        {
          authorized_product: "SM0922广发天鸿5号投资投私募基金",
          cancel_handle: "程芳",
          cancel_time: "1989-05-16  10:00:51",
          cancellation: "黄强",
          create_date_time: "2007-01-18  14:57:05",
          create_institution: "投资投私募基金",
          creator: "什专与放科养构白查强",
          email: "8762802@email.com",
          index: 0,
          last_login_time: "2016-06-01  01:32:01",
          lock_handle: "贾丽",
          lock_time: "2002-11-20  03:54:29",
          locked_in: "叶伟",
          logout_time: "1972-03-25  08:56:14",
          mobile: "17766668888",
          org_name: "别今下何实定积段则整",
          phone: "020-66668888",
          role_names: "基金管理 | 披露0",
          tenant_name: "质组时王压都",
          user_id: "黄丽",
          user_name: "秦静",
          user_status: "1"
        }
      ],
      hiddenColIndex: 0
    };
  },
  methods: {
    test() {     
      // this.columns.map((v, index) => {
      //   this.$set(this.columns[index], 'hiddenCol', true)
      //   if ([1,2,4,6].includes(index)) this.$set(this.columns[index], 'hiddenCol', false)
      // })
      let me = this
      me.columns.map((v, index) => {
        me.$set(me.columns[index], 'hiddenCol', false)
        if (![1,2,3,4].includes(index) && index !== me.columns.length - 1) {
          me.$set(me.columns[index], 'hiddenCol', true)
        }
      })
      return
      // let me = this
      // me.columns.map((v, index) => {
      //   me.$set(me.columns[index], 'hiddenCol', true)
      //   if (![1,2,3,4].includes(index) && index !== me.columns.length - 1) {
      //     me.$set(me.columns[index], 'hiddenCol', true)
      //   }
      // })
    },

    hiddenOneCol(){
      let me = this
      me.columns.map((v, index) => {
        if(index === me.hiddenColIndex){
          me.$set(me.columns[me.hiddenColIndex], 'hiddenCol', true)
        }
      })
       --me.hiddenColIndex
    }
  },

  mounted(){
    this.hiddenColIndex = this.columns.length -1
    let me = this
    me.columns.map((v, index) => {
        me.$set(me.columns[index], 'hiddenCol', false)
    })
  }
};
</script>
