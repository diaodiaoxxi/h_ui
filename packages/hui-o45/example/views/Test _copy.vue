

<template>
<div>
    <h-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <h-form-item label="姓名" prop="name">
            <h-input v-model="formValidate.name" placeholder="请输入姓名"></h-input>
        </h-form-item>
        <h-form-item label="选择日期">
            <h-row>
                <h-col span="11">
                    <h-form-item prop="date">
                        <h-date-picker type="date" placeholder="选择日期" v-model="formValidate.date"></h-date-picker>
                    </h-form-item>
                </h-col>
                <h-col span="2" style="text-align: center">-</h-col>
                <h-col span="11">
                    <h-form-item prop="time">
                        <h-time-picker type="time" placeholder="选择时间" v-model="formValidate.time"></h-time-picker>
                    </h-form-item>
                </h-col>
                  <h-col span="11">
                    <h-form-item prop="timerange">
                        <h-time-picker type="timerange" placeholder="选择时间" v-model="formValidate.timerange"></h-time-picker>
                    </h-form-item>
                </h-col>
            </h-row>
        </h-form-item>
        
        <h-form-item>
            <h-button type="primary" @click="handleSubmit('formValidate')">提交</h-button>
            <h-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</h-button>
        </h-form-item>
    </h-form>
</div>
</template>
<script>
    export default {
        data () {
            return {
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: '',
                    timerange: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                        { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'string', message: '请选择时间', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
