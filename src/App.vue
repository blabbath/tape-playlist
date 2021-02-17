<template>
    <app-header></app-header>
    <router-view />
</template>

<script>
import AppHeader from './components/Header.vue'
export default {
    name: 'tape',
    components: {
        AppHeader,
    },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap');
#app {
    font-family: 'Roboto', sans-serif;
    height: 100%;
}
html,
body {
    height: 100%;
}
</style>
