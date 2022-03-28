<template>
    <div class="login">
        <p cds-text="display" cds-layout="p-t:xxl p-b:xl">Mixtape Recorder</p>
        <div
            spacing-padding
            cds-layout="vertical gap:lg align:horizontal-center"
            class="text-area"
        >
            <AboutText></AboutText>
        </div>
    </div>
</template>
<script>
import AboutText from '../components/AboutText.vue'

export default {
    components: { AboutText },
    beforeCreate() {
        if (!localStorage.getItem('token')) {
            window.location.href = '/'
        }
    },
}
</script>
<style scoped>
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.text-area {
    width: 40%;
}

.btn {
    background-color: black;
    color: white;
    text-decoration: none;
    padding: 18px 32px 18px 36px;
    border-radius: 500px;
    text-transform: uppercase;
    font-weight: 300;
    display: inline-flex;
    align-items: center;
}
</style>
