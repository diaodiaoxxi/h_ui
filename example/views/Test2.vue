<template>
<div>
    <h-progress ref="process" :percent="percent" :status="status" @on-status-change="statusChange"></h-progress>
    <h-button-group size="large">
        <h-button icon="addition" @click="add"></h-button>
        <h-button icon="offline" @click="minus"></h-button>
        <h-button @click="$refs.process.currentStatus = 'wrong'">set worng</h-button>
        <h-button @click="status = 'wrong'">set worng</h-button>
    </h-button-group>
</div>
</template>
<script>
    export default {
        data () {
            return {
                percent: 0,
                status: 'wrong'
            }
        },
        methods: {
            add () {
                if (this.percent >= 100) {
                    return false;
                }
                this.percent += 10;
            },
            minus () {
                if (this.percent <= 0) {
                    return false;
                }
                this.percent -= 10;
            },
            statusChange(val) {
                console.log(val)
                this.status = val
            }
        }
    }
</script>
