<template>
    <p cds-text="section" cds-layout="m:lg">About</p>
</template>
<script>
export default {
    beforeCreate() {
        if (!this.$store.state.token) {
            window.location.href = 'login'
        }
    },
}
</script>
