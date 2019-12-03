<template>
<div>
    <h-row>
        <h-col span="4">
            <h-time-picker v-model="value1" format="HH’mm’ss" placeholder="选择时间" style="width: 168px"></h-time-picker>
        </h-col>
       <h-col span="4">
            <h-time-picker v-model="value2" format="HH’mm’ss" type="timerange" placement="bottom-end" placeholder="选择时间" style="width: 168px"></h-time-picker>
        </h-col>
        <h-col span="4">
           <h-date-picker  :value="value3" type="datetime" placeholder="选择日期和时间" style="width: 200px"></h-date-picker>
        </h-col>
    </h-row>
</div>
</template>
<script>
    export default {
        data () {
            return {
                value1: '09:41:00',
                value2: ['09:41:00', '12:00:00'],
                value3: '2019-11-06 00:00:00',
            }
        }
    }
</script>