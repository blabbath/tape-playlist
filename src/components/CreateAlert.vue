<template>
    <div class="alert-container" v-if="show">
        <cds-alert-group
            :status="alertStatus"
            aria-label="This is an example warning alert group"
        >
            <cds-alert
                cds-i18n='{ "closeButtonAriaLabel": "close warning alert"}'
                :closable="true"
                @click="closeAlert()"
            >
                {{ alertMessage }}
            </cds-alert>
        </cds-alert-group>
    </div>
</template>
<script>
export default {
    props: ['alertMessage', 'alertStatus', 'alertCount'],

    data() {
        return {
            show: false,
        }
    },
    methods: {
        closeAlert () {
            this.show = false
        },
    },
    watch: {
        alertMessage () {
            this.show = true
        },

        alertCount () {
            this.show = true
        },
    },
}
</script>

<style scoped>
.alert-container {
    position: absolute;
    transform: translateY(3.8rem);
}
cds-alert-group {
    margin: 0.5rem 0 0.5rem 0;
}
</style>
