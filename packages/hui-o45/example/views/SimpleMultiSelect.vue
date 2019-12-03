<template>
  <div>
    <h-form ref="form" :model="form" :label-width="80">
      <h-form-item label="输入框" prop="input">
        <h-input v-model="form.input" placeholder="请输入"></h-input>
      </h-form-item>
      <h-form-item label="选择器" prop="select">
        <h-multi-select v-model="form.select">
          <h-multi-block :data="bigData"></h-multi-block>
        </h-multi-select>
      </h-form-item>
      <h-form-item>
        <h-button type="primary">提交</h-button>
        <h-button type="ghost" style="margin-left: 8px">取消</h-button>
      </h-form-item>
    </h-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bigData: [
        {
          label: "test-1",
          value: "1"
        },
        {
          label: "test-2",
          value: "2"
        },
        {
          label: "test-3",
          value: "3"
        },
        {
          label: "test-4",
          value: "4"
        },
        {
          label: "test-5",
          value: "5"
        }
      ],
      form: {
        input: "",
        select: ""
      }
    };
  },
  mounted() {
    this.form.select = "1,2,5";
    setTimeout(() => {
      this.$refs["form"].resetFields();
    }, 1000);
  }
};
</script>
