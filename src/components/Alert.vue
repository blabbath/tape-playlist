<template>
    <transition tag="alert" name="alert">
        <cds-alert-group
            status="warning"
            aria-label="This is an example warning alert group"
            v-if="alert"
        >
            <cds-alert
                cds-i18n='{ "closeButtonAriaLabel": "close warning alert"}'
                :closable="true"
                @click="closeAlert()"
            >
                {{ alert }}
            </cds-alert>
        </cds-alert-group>
    </transition>
</template>
<script>
export default {
    props: ['alert'],
    methods: {
        closeAlert: function () {
            this.$store.commit('closeAlert')
        },
    },
}
</script>
<style scoped>
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
