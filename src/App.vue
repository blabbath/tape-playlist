<template>
    <app-header></app-header>
    <app-content></app-content>
</template>

<script>
import AppHeader from './components/Header.vue'
import AppContent from './components/Content.vue'
export default {
    name: 'tape',
    components: {
        AppHeader,
        AppContent,
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
