<template>
    <transition tag="alert" name="alert">
        <cds-alert-group
            :status="alertStatus"
            aria-label="This is an example warning alert group"
            v-if="alertMessage"
        >
            <cds-alert
                cds-i18n='{ "closeButtonAriaLabel": "close warning alert"}'
                :closable="true"
                @click="closeAlert()"
            >
                {{ alertMessage }}
            </cds-alert>
        </cds-alert-group>
    </transition>
</template>
<script>
export default {
    props: ['alertMessage', 'alertStatus'],
    methods: {
        closeAlert () {
            this.$store.commit('closeAlert')
        },
    },
}
</script>
<style scoped>
cds-alert-group {
    margin: 0.5rem 0 0.5rem 0;
}

.alert-enter-from {
    opacity: 0;
    transform: scaleY(0.5);
}

.alert-enter-to {
    opacity: 1;
    transform: scaleY(1);
}

.alert-enter-active {
    transition: all 0.33s ease;
}

.alert-leave-from {
    opacity: 1;
    transform: scaleY(1);
}
.alert-leave-to {
    opacity: 0;
    transform: scaleY(0.5);
}
.alert-leave-active {
    transition: all 0.33s ease;
}
</style>
